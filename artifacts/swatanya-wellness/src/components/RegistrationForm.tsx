import { useState, useRef } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';
import { Upload, CheckCircle, Loader2, User, Shield, MapPin, Clock } from 'lucide-react';

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/formResponse';

interface FormData {
  name: string;
  age: string;
  govtIdType: string;
  govtIdNumber: string;
  serviceType: string;
  address: string;
  city: string;
  duration: string;
  phone: string;
  email: string;
  photo: File | null;
}

export default function RegistrationForm() {
  const { t, tNested, lang } = useLang();
  const fileRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photoName, setPhotoName] = useState('');

  const [form, setForm] = useState<FormData>({
    name: '',
    age: '',
    govtIdType: '',
    govtIdNumber: '',
    serviceType: '',
    address: '',
    city: '',
    duration: '',
    phone: '',
    email: '',
    photo: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const cities = translations[lang].cities;
  const idTypes = tNested('idTypes');
  const serviceTypes = tNested('serviceTypes');
  const durations = tNested('durations');

  const validate = () => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.age || parseInt(form.age) < 50 || parseInt(form.age) > 120) errs.age = 'Valid age (50–120) required';
    if (!form.govtIdType) errs.govtIdType = 'ID type required';
    if (!form.govtIdNumber.trim()) errs.govtIdNumber = 'ID number required';
    if (!form.serviceType) errs.serviceType = 'Service type required';
    if (!form.address.trim()) errs.address = 'Address required';
    if (!form.city) errs.city = 'City required';
    if (!form.duration) errs.duration = 'Duration required';
    if (!form.phone.trim() || !/^\+?[0-9]{10,13}$/.test(form.phone.trim())) errs.phone = 'Valid phone number required';
    return errs;
  };

  const handleChange = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);

    // Submit to Google Forms (form action URL would be configured here)
    const formBody = new URLSearchParams({
      'entry.name': form.name,
      'entry.age': form.age,
      'entry.govtIdType': form.govtIdType,
      'entry.govtIdNumber': form.govtIdNumber,
      'entry.serviceType': form.serviceType,
      'entry.address': form.address,
      'entry.city': form.city,
      'entry.duration': form.duration,
      'entry.phone': form.phone,
      'entry.email': form.email,
      'entry.language': lang,
    });

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString(),
      });
    } catch {
      // no-cors mode always triggers catch, treat as success
    }

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <section id="register" className="py-20 lg:py-28 bg-gradient-to-br from-secondary/5 to-primary/5" data-testid="section-register">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-lg border border-border">
            <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-secondary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t('successTitle')}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">{t('successDesc')}</p>
            <div className="bg-muted rounded-xl p-4 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">What happens next?</p>
              <p>{t('assignmentNote')}</p>
            </div>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: '', age: '', govtIdType: '', govtIdNumber: '', serviceType: '', address: '', city: '', duration: '', phone: '', email: '', photo: null }); }}
              className="mt-6 px-6 py-3 gradient-saffron text-white rounded-xl font-semibold hover:opacity-90 transition-all"
              data-testid="button-register-again"
            >
              Register Another Person
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="py-20 lg:py-28 bg-gradient-to-br from-secondary/5 to-primary/5" data-testid="section-register">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
            Start Today
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('register')}
          </h2>
          <p className="text-muted-foreground text-lg">{t('registerSubtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-lg border border-border overflow-hidden" data-testid="form-registration">
          {/* Section: Personal Details */}
          <div className="p-8 border-b border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full gradient-saffron flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-foreground text-lg">Personal Information</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="name">{t('fullName')} *</label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter full name"
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.name ? 'border-destructive bg-destructive/5' : 'border-border bg-muted/30 focus:border-primary'}`}
                  data-testid="input-name"
                />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="age">{t('age')} *</label>
                <input
                  id="age"
                  type="number"
                  min="50"
                  max="120"
                  value={form.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  placeholder="e.g. 70"
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.age ? 'border-destructive bg-destructive/5' : 'border-border bg-muted/30 focus:border-primary'}`}
                  data-testid="input-age"
                />
                {errors.age && <p className="text-destructive text-xs mt-1">{errors.age}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="phone">Phone Number *</label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+91 78989 85703"
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.phone ? 'border-destructive bg-destructive/5' : 'border-border bg-muted/30 focus:border-primary'}`}
                  data-testid="input-phone"
                />
                {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-foreground mb-1.5" htmlFor="email">Email Address (optional)</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="email@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  data-testid="input-email"
                />
              </div>
            </div>
          </div>

          {/* Section: ID Verification */}
          <div className="p-8 border-b border-border bg-muted/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full gradient-green flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-foreground text-lg">Identity Verification</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Govt ID Type */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">{t('govtId')} *</label>
                <select
                  value={form.govtIdType}
                  onChange={(e) => handleChange('govtIdType', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white ${errors.govtIdType ? 'border-destructive' : 'border-border focus:border-primary'}`}
                  data-testid="select-govtidtype"
                >
                  <option value="">Select ID type</option>
                  {Object.entries(idTypes).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
                {errors.govtIdType && <p className="text-destructive text-xs mt-1">{errors.govtIdType}</p>}
              </div>

              {/* Govt ID Number */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">{t('govtIdNumber')} *</label>
                <input
                  type="text"
                  value={form.govtIdNumber}
                  onChange={(e) => handleChange('govtIdNumber', e.target.value)}
                  placeholder="Enter ID number"
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors.govtIdNumber ? 'border-destructive bg-destructive/5' : 'border-border bg-muted/30 focus:border-primary'}`}
                  data-testid="input-govtidnumber"
                />
                {errors.govtIdNumber && <p className="text-destructive text-xs mt-1">{errors.govtIdNumber}</p>}
              </div>

              {/* Photo Upload */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-foreground mb-1.5">{t('uploadPhoto')}</label>
                <div
                  className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                  onClick={() => fileRef.current?.click()}
                  data-testid="div-photo-upload"
                >
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  {photoName ? (
                    <p className="text-sm text-secondary font-medium">{photoName}</p>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground font-medium">{t('uploadPhotoHint')}</p>
                      <p className="text-xs text-muted-foreground/60 mt-1">Click to browse</p>
                    </>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) { setForm((prev) => ({ ...prev, photo: file })); setPhotoName(file.name); }
                  }}
                  data-testid="input-photo"
                />
              </div>
            </div>
          </div>

          {/* Section: Service Selection */}
          <div className="p-8 border-b border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-foreground text-lg">Service Details</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Service Type */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">{t('serviceType')} *</label>
                <select
                  value={form.serviceType}
                  onChange={(e) => handleChange('serviceType', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white ${errors.serviceType ? 'border-destructive' : 'border-border focus:border-primary'}`}
                  data-testid="select-servicetype"
                >
                  <option value="">Select service</option>
                  {Object.entries(serviceTypes).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
                {errors.serviceType && <p className="text-destructive text-xs mt-1">{errors.serviceType}</p>}
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">{t('duration')} *</label>
                <select
                  value={form.duration}
                  onChange={(e) => handleChange('duration', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white ${errors.duration ? 'border-destructive' : 'border-border focus:border-primary'}`}
                  data-testid="select-duration"
                >
                  <option value="">Select duration</option>
                  {Object.entries(durations).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
                {errors.duration && <p className="text-destructive text-xs mt-1">{errors.duration}</p>}
              </div>
            </div>
          </div>

          {/* Section: Address */}
          <div className="p-8 border-b border-border bg-muted/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-foreground text-lg">Location Details</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">{t('city')} *</label>
                <select
                  value={form.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white ${errors.city ? 'border-destructive' : 'border-border focus:border-primary'}`}
                  data-testid="select-city"
                >
                  <option value="">Select city</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {errors.city && <p className="text-destructive text-xs mt-1">{errors.city}</p>}
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-foreground mb-1.5">{t('address')} *</label>
                <textarea
                  value={form.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="House/Flat no., Street, Area, Landmark..."
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none ${errors.address ? 'border-destructive bg-destructive/5' : 'border-border bg-muted/30 focus:border-primary'}`}
                  data-testid="textarea-address"
                />
                {errors.address && <p className="text-destructive text-xs mt-1">{errors.address}</p>}
              </div>
            </div>
          </div>

          {/* Assignment note */}
          <div className="px-8 py-5 bg-secondary/5 border-b border-border">
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-secondary" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{t('assignmentNote')}</p>
            </div>
          </div>

          {/* Submit button */}
          <div className="p-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 gradient-saffron text-white rounded-xl font-bold text-lg shadow-md hover:opacity-90 hover:shadow-lg transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-3"
              data-testid="button-submit"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                t('submitForm')
              )}
            </button>
            <p className="text-center text-xs text-muted-foreground mt-3">
              Your data is secure and will only be used for caregiver assignment.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
