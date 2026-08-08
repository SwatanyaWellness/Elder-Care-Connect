import { useState, useEffect } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { LANGUAGES, type Language } from '@/lib/translations';
import { Menu, X, Globe, Phone } from 'lucide-react';

export default function Navbar() {
  const { t, tNested, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const nav = tNested('navbar');

  const links = [
    { href: '#services', label: nav.services },
    { href: '#how-it-works', label: nav.howItWorks },
    { href: '#register', label: nav.register },
    { href: '#testimonials', label: nav.testimonials },
    { href: '#faq', label: nav.faq },
    { href: '#contact', label: nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-border'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3" data-testid="link-brand">
            <div className="w-10 h-10 rounded-full gradient-saffron flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>S</span>
            </div>
            <div>
              <span
                className="font-bold text-primary text-lg leading-tight block"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {t('brand')}
              </span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wide uppercase hidden sm:block">
                Elderly Care Services
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" data-testid="nav-desktop">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all duration-200"
                data-testid={`link-nav-${link.href.replace('#', '')}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all duration-200 border border-border"
                data-testid="button-lang-toggle"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:block">{LANGUAGES.find(l => l.code === lang)?.nativeLabel}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-border overflow-hidden z-50 max-h-72 overflow-y-auto">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                       onClick={() => { setLang(l.code as Language); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-primary/5 transition-colors ${lang === l.code ? 'text-primary font-semibold bg-primary/5' : 'text-foreground'}`}
                      data-testid={`button-lang-${l.code}`}
                    >
                      <span className="font-medium">{l.nativeLabel}</span>
                      <span className="text-muted-foreground ml-2 text-xs">{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Emergency CTA */}
            <a
              href="tel:7898985703"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-all duration-200 border border-red-200"
              data-testid="link-emergency"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden md:block text-xs">Emergency</span>
            </a>

            {/* Register CTA */}
            <a
              href="#register"
              className="hidden sm:flex items-center px-4 py-2 gradient-saffron text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-all duration-200 shadow-sm"
              data-testid="link-register-cta"
            >
              {nav.register}
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
              data-testid="button-menu-toggle"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden border-t border-border py-4 space-y-1" data-testid="nav-mobile">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-all"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex gap-2">
              <a
                href="tel:7898985703"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-200"
              >
                <Phone className="w-4 h-4" /> Emergency
              </a>
              <a
                href="#register"
                onClick={() => setOpen(false)}
                className="flex-1 flex items-center justify-center py-2.5 gradient-saffron text-white rounded-lg text-sm font-semibold"
              >
                {nav.register}
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Close lang dropdown on outside click */}
      {langOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
      )}
    </header>
  );
}
