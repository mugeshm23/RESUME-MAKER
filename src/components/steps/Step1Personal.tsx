import React, { useState } from 'react';
import { PersonalInfo } from '../../types';
import { StepNavigationButtons } from './StepNavigationButtons';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface Step1Props {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  onNext: () => void;
  onBack: () => void;
  onSave: () => void;
}

export const Step1Personal: React.FC<Step1Props> = ({
  data,
  onChange,
  onNext,
  onBack,
  onSave,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!data.fullName.trim()) {
      errs.fullName = 'Please enter your full name.';
    }
    if (!data.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errs.email = 'Please enter a valid email address (e.g. name@example.com).';
    }
    if (!data.phone.trim()) {
      errs.phone = 'Please enter your phone number.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  const updateField = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-blue-900 text-sm">
        <p className="font-semibold text-blue-950">Let's start with your basic information.</p>
        <p className="text-blue-700 text-xs mt-0.5">
          Recruiters use these contact channels to reach out for interview invitations. Only provide links you are comfortable sharing.
        </p>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-2xs space-y-5">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <User className="w-5 h-5 text-blue-600" />
          <span>Contact Details</span>
        </h2>

        {/* Full Name & Title */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="input-full-name"
              type="text"
              placeholder="e.g. Hasan Mohamed Mahfooz"
              value={data.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              className={`w-full px-3.5 py-2 text-sm bg-stone-50 border rounded-lg focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.fullName
                  ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30'
                  : 'border-stone-300 focus:ring-blue-500'
              }`}
            />
            {errors.fullName && (
              <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
              Professional Title
            </label>
            <input
              id="input-prof-title"
              type="text"
              placeholder="e.g. Software Engineer / Aspiring Full Stack Developer"
              value={data.professionalTitle}
              onChange={(e) => updateField('professionalTitle', e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <p className="text-[11px] text-stone-500 mt-1">Appears directly under your name on the resume.</p>
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-stone-500" />
              <span>Email Address <span className="text-rose-500">*</span></span>
            </label>
            <input
              id="input-email"
              type="email"
              placeholder="e.g. hasan@example.com"
              value={data.email}
              onChange={(e) => updateField('email', e.target.value)}
              className={`w-full px-3.5 py-2 text-sm bg-stone-50 border rounded-lg focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30'
                  : 'border-stone-300 focus:ring-blue-500'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-rose-600 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-stone-500" />
              <span>Phone Number <span className="text-rose-500">*</span></span>
            </label>
            <input
              id="input-phone"
              type="tel"
              placeholder="e.g. +91 98765 43210"
              value={data.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className={`w-full px-3.5 py-2 text-sm bg-stone-50 border rounded-lg focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.phone
                  ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/30'
                  : 'border-stone-300 focus:ring-blue-500'
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Location fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-stone-500" />
              <span>City</span>
            </label>
            <input
              id="input-city"
              type="text"
              placeholder="e.g. Karur / Chennai"
              value={data.city}
              onChange={(e) => updateField('city', e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
              State / Province
            </label>
            <input
              id="input-state"
              type="text"
              placeholder="e.g. Tamil Nadu"
              value={data.state}
              onChange={(e) => updateField('state', e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
              Country
            </label>
            <input
              id="input-country"
              type="text"
              placeholder="e.g. India"
              value={data.country}
              onChange={(e) => updateField('country', e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Optional Street Address */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
            Street Address <span className="text-stone-400 lowercase font-normal">(optional)</span>
          </label>
          <input
            id="input-address"
            type="text"
            placeholder="e.g. 124 North Street (Optional - city & country are usually sufficient for ATS)"
            value={data.address || ''}
            onChange={(e) => updateField('address', e.target.value)}
            className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Professional Profiles */}
        <div className="pt-2 border-t border-stone-100 space-y-3">
          <p className="text-xs font-bold text-stone-700 uppercase tracking-wider">
            Online Presence & Portfolio Links
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                <span>LinkedIn Profile URL</span>
              </label>
              <input
                id="input-linkedin"
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={data.linkedin}
                onChange={(e) => updateField('linkedin', e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
                <Github className="w-3.5 h-3.5 text-stone-800" />
                <span>GitHub Profile URL</span>
              </label>
              <input
                id="input-github"
                type="url"
                placeholder="https://github.com/username"
                value={data.github}
                onChange={(e) => updateField('github', e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>Portfolio / Personal Website</span>
              </label>
              <input
                id="input-portfolio"
                type="url"
                placeholder="https://yourwebsite.dev"
                value={data.portfolio}
                onChange={(e) => updateField('portfolio', e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <StepNavigationButtons
        currentStep={1}
        totalSteps={17}
        onBack={onBack}
        onNext={handleNext}
        onSave={onSave}
      />
    </div>
  );
};
