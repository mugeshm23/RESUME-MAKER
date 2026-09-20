import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Ensure server data directory exists
const DATA_DIR = path.join(process.cwd(), 'data');
const RESUMES_FILE = path.join(DATA_DIR, 'resumes.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadResumes(): any[] {
  try {
    if (fs.existsSync(RESUMES_FILE)) {
      const data = fs.readFileSync(RESUMES_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading resumes file:', err);
  }
  return [];
}

function saveResumes(resumes: any[]): void {
  try {
    fs.writeFileSync(RESUMES_FILE, JSON.stringify(resumes, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing resumes file:', err);
  }
}

// Lazy Gemini AI initialization
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// ==================== REST API ROUTES ====================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Resume CRUD
app.get('/api/resumes', (req, res) => {
  const resumes = loadResumes();
  res.json({ resumes });
});

app.post('/api/resumes', (req, res) => {
  const resume = req.body;
  if (!resume || !resume.id) {
    return res.status(400).json({ error: 'Valid resume object with id is required' });
  }
  
  const resumes = loadResumes();
  const existingIdx = resumes.findIndex((r) => r.id === resume.id);
  
  const updatedResume = {
    ...resume,
    updatedAt: new Date().toISOString(),
  };

  if (existingIdx >= 0) {
    resumes[existingIdx] = updatedResume;
  } else {
    resumes.unshift(updatedResume);
  }

  saveResumes(resumes);
  res.json({ success: true, resume: updatedResume });
});

app.delete('/api/resumes/:id', (req, res) => {
  const { id } = req.params;
  let resumes = loadResumes();
  const initialLen = resumes.length;
  resumes = resumes.filter((r) => r.id !== id);
  saveResumes(resumes);
  res.json({ success: true, deleted: initialLen !== resumes.length });
});

app.post('/api/resumes/:id/duplicate', (req, res) => {
  const { id } = req.params;
  const resumes = loadResumes();
  const existing = resumes.find((r) => r.id === id);
  if (!existing) {
    return res.status(404).json({ error: 'Resume not found' });
  }

  const duplicated = {
    ...existing,
    id: 'res_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    title: `${existing.title || 'Untitled'} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  resumes.unshift(duplicated);
  saveResumes(resumes);
  res.json({ success: true, resume: duplicated });
});

// ==================== AI ASSISTANCE API ====================

// 1. Enhance Career Summary without fabricating facts
app.post('/api/ai/enhance-summary', async (req, res) => {
  const { rawSummary, targetRole, yearsOfExp, skills, experienceSummary, educationLevel } = req.body;
  const ai = getGeminiClient();

  if (!ai) {
    // High quality deterministic fallback when no API key is provided
    let fallback = rawSummary?.trim() || '';
    if (!fallback) {
      const roleText = targetRole ? ` aspiring ${targetRole}` : ' motivated professional';
      fallback = `Dedicated and detail-oriented${roleText} with foundational expertise in ${skills?.slice(0, 3).join(', ') || 'modern engineering practices'}. Passionate about building robust, scalable solutions and contributing immediately to high-impact technical initiatives.`;
    } else {
      // Clean up punctuation and tone
      fallback = fallback.replace(/\bi am\b/gi, 'Dynamic professional with expertise in')
                         .replace(/\bmy name is [^.,]+/gi, '')
                         .trim();
      if (!fallback.endsWith('.')) fallback += '.';
    }
    return res.json({ enhancedSummary: fallback, aiGenerated: false });
  }

  try {
    const prompt = `You are a professional resume editor.
The user provided the following authentic details:
- Target Job Role: ${targetRole || 'Not specified'}
- Current Draft / Notes: "${rawSummary || ''}"
- Years of Experience: ${yearsOfExp || '0 (Fresher/Entry-level)'}
- Key Skills: ${(skills || []).join(', ')}
- Background Notes: ${experienceSummary || educationLevel || 'Recent Graduate / Student'}

CRITICAL RULES:
1. Improve tone, clarity, grammatical precision, and executive phrasing.
2. STRICTLY DO NOT INVENT or assume any achievements, metrics, companies, or qualifications not mentioned.
3. Keep it to 2-4 impactful sentences (40-75 words).
4. Written in third-person professional resume voice (no "I", "my", or "me").
5. Return ONLY the refined summary text with no commentary or markdown backticks.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const text = response.text?.trim() || rawSummary;
    res.json({ enhancedSummary: text, aiGenerated: true });
  } catch (err: any) {
    console.error('Gemini error in enhance-summary:', err);
    res.json({ 
      enhancedSummary: rawSummary || `Motivated ${targetRole || 'professional'} focused on delivering high-quality, maintainable technical solutions.`,
      aiGenerated: false 
    });
  }
});

// 2. Enhance Experience / Project / Internship Bullet Points
app.post('/api/ai/enhance-bullets', async (req, res) => {
  const { inputItem, contextType, roleOrTitle, techStack } = req.body;
  const ai = getGeminiClient();

  if (!ai) {
    // Deterministic fallback action verb enhancement
    const verbs = ['Architected', 'Engineered', 'Developed', 'Implemented', 'Designed', 'Optimized', 'Configured', 'Collaborated on'];
    const chosenVerb = verbs[Math.floor(Math.random() * verbs.length)];
    let cleaned = (inputItem || '').trim();
    cleaned = cleaned.replace(/^(i helped with|i worked on|i did|worked on|responsible for|helped to)\s*/i, '');
    const firstChar = cleaned.charAt(0).toUpperCase();
    cleaned = firstChar + cleaned.slice(1);
    if (!cleaned.endsWith('.')) cleaned += '.';
    const polished = `${chosenVerb} ${cleaned.charAt(0).toLowerCase() + cleaned.slice(1)}`;
    return res.json({ bullet: polished, aiGenerated: false });
  }

  try {
    const prompt = `You are an expert resume consultant specializing in technical resumes.
Context: ${contextType || 'Work Experience'} for role: "${roleOrTitle || 'Contributor'}"
Technologies used: "${techStack || 'Relevant technical tools'}"
User's raw statement: "${inputItem}"

TASK:
Convert this raw statement into ONE concise, impactful resume bullet point starting with a strong past-tense action verb (e.g., Developed, Engineered, Spearheaded, Implemented, Streamlined, Coordinated).

STRICT SAFETY MANDATE:
- DO NOT invent percentages, revenue numbers, team sizes, or specific performance metrics unless the user provided them.
- DO NOT invent technologies not mentioned.
- Keep the user's authentic facts completely true.
- Output ONLY the single revised bullet point with no leading hyphen, asterisks, or quotes.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const bullet = response.text?.trim().replace(/^[-*•]\s*/, '') || inputItem;
    res.json({ bullet, aiGenerated: true });
  } catch (err: any) {
    console.error('Gemini error in enhance-bullets:', err);
    res.json({ bullet: inputItem, aiGenerated: false });
  }
});

// 3. Analyze Job Description & Keyword Matching
app.post('/api/ai/match-keywords', async (req, res) => {
  const { jobDescription, userSkills, resumeText } = req.body;
  const ai = getGeminiClient();

  if (!ai) {
    // Deterministic keyword extractor
    const commonTechs = [
      'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java', 'SQL',
      'PostgreSQL', 'Docker', 'AWS', 'Git', 'HTML', 'CSS', 'Tailwind', 'GraphQL',
      'REST', 'CI/CD', 'Linux', 'Express', 'Next.js', 'MongoDB', 'Redis', 'Kubernetes',
      'Agile', 'Unit Testing', 'Jest', 'C++', 'Go', 'Microservices'
    ];
    const jdLower = (jobDescription || '').toLowerCase();
    const userSkillsLower = (userSkills || []).map((s: string) => s.toLowerCase());

    const matched: string[] = [];
    const missing: string[] = [];

    commonTechs.forEach((tech) => {
      if (jdLower.includes(tech.toLowerCase())) {
        if (userSkillsLower.some((s: string) => s.includes(tech.toLowerCase()))) {
          matched.push(tech);
        } else {
          missing.push(tech);
        }
      }
    });

    return res.json({
      matchedSkills: matched,
      missingSkills: missing.slice(0, 6),
      matchPercentage: matched.length + missing.length > 0 ? Math.round((matched.length / (matched.length + missing.length)) * 100) : 75,
      recommendations: [
        'Review the missing skills list. If you have practical academic or project experience with any of them, consider adding them to your technical skills or projects section.',
        'Ensure key matching technical terms appear in your project descriptions and skills category.',
      ],
      aiGenerated: false,
    });
  }

  try {
    const prompt = `Analyze this Job Description against the Candidate's Resume Profile.

Job Description:
"""
${jobDescription.substring(0, 3000)}
"""

Candidate's Current Skills & Experience:
"""
Skills: ${(userSkills || []).join(', ')}
Summary / Projects excerpt: ${resumeText ? resumeText.substring(0, 1500) : 'None provided'}
"""

Respond with a JSON object in this exact format:
{
  "matchedSkills": ["Skill 1", "Skill 2"],
  "missingSkills": ["Skill A", "Skill B"],
  "matchPercentage": 78,
  "recommendations": [
    "Specific actionable recommendation without fabricating skills",
    "Where in their existing experience they could highlight relevant keywords"
  ]
}

STRICT RULE:
Do not claim the user possesses skills they haven't listed.
Return valid JSON only.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    res.json({
      matchedSkills: parsed.matchedSkills || [],
      missingSkills: parsed.missingSkills || [],
      matchPercentage: parsed.matchPercentage || 70,
      recommendations: parsed.recommendations || ['Align your project bullet points with the core competencies mentioned in the job description.'],
      aiGenerated: true,
    });
  } catch (err: any) {
    console.error('Gemini error in match-keywords:', err);
    res.status(500).json({ error: 'Failed to analyze job description' });
  }
});

// ==================== VITE & STATIC SERVING ====================

async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

start();
