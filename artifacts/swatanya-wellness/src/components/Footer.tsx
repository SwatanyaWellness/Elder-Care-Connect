import { useLang } from '@/lib/LanguageContext';
import { Heart, Phone, Mail, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

export default function Footer() {
  const { t, tNested } = useLang();
  const nav = tNested('navbar');

  return (
    <footer className="bg-foreground text-background" data-testid="footer">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full gradient-saffron flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>S</span>
              </div>
              <div>
                <span className="font-bold text-xl leading-tight block" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t('brand')}
                </span>
                <span className="text-xs text-background/60 font-medium tracking-wide uppercase">
                  Elderly Care Services
                </span>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed max-w-sm mb-6">
              {t('tagline')}. Serving the elderly of Gwalior, Madhya Pradesh with compassion, professionalism, and respect.
            </p>

            {/* Emergency Banner */}
            <div className="bg-red-900/40 border border-red-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span className="text-red-300 text-xs font-semibold uppercase tracking-wide">{t('emergencyHotline')} — {t('available24x7')}</span>
              </div>
              <a href="tel:18007928269" className="text-white font-bold text-xl hover:text-red-300 transition-colors">
                1800-SWATANYA
              </a>
              <p className="text-background/60 text-xs mt-1">(1800-792-8269) — Free Call</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {[
                { Icon: Facebook, href: '#', label: 'Facebook' },
                { Icon: Twitter, href: '#', label: 'Twitter' },
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Youtube, href: '#', label: 'YouTube' },
                { Icon: Linkedin, href: '#', label: 'LinkedIn' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center text-background/60 hover:bg-primary hover:text-white transition-all duration-200"
                  aria-label={label}
                  data-testid={`link-social-${label.toLowerCase()}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-background mb-5 text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: '#home', label: nav.home },
                { href: '#services', label: nav.services },
                { href: '#how-it-works', label: nav.howItWorks },
                { href: '#register', label: nav.register },
                { href: '#testimonials', label: nav.testimonials },
                { href: '#faq', label: nav.faq },
                { href: '#contact', label: nav.contact },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-background/60 hover:text-primary transition-colors"
                    data-testid={`footer-link-${link.href.replace('#', '')}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-background mb-5 text-sm uppercase tracking-wide">Contact</h4>
            <ul className="space-y-4">
              <li>
                <div className="flex items-center gap-2 text-background/60">
                  <Phone className="w-4 h-4 text-primary" />
                  <a href="tel:18007928269" className="text-sm hover:text-primary transition-colors">
                    {t('phone')}
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2 text-background/60">
                  <Mail className="w-4 h-4 text-primary" />
                  <a href="mailto:care@swatanyawellness.in" className="text-sm hover:text-primary transition-colors">
                    {t('email')}
                  </a>
                </div>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="font-bold text-background mb-4 text-sm uppercase tracking-wide">Our Services</h4>
              <ul className="space-y-2">
                {['Healthcare Support', 'Emergency Support', 'Physiotherapy', 'Dementia Care', 'Medication Management', 'Doctor Visit Escort'].map((s) => (
                  <li key={s} className="text-sm text-background/60 flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-xs text-center sm:text-left">
            {t('footer')} Made with <Heart className="inline w-3 h-3 text-red-400" /> for India's elderly.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-background/50 hover:text-background transition-colors text-xs">{t('privacyPolicy')}</a>
            <a href="#" className="text-background/50 hover:text-background transition-colors text-xs">{t('termsOfService')}</a>
            <a href="#" className="text-background/50 hover:text-background transition-colors text-xs">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
