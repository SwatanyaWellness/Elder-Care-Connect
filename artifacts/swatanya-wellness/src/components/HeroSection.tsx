import { useLang } from '@/lib/LanguageContext';
import { Heart, Shield, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const { t } = useLang();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      data-testid="section-hero"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent/3 blur-3xl" />

      {/* Floating decorative elements */}
      <div className="absolute top-32 right-12 lg:right-24 animate-float hidden md:block">
        <div className="w-16 h-16 rounded-2xl gradient-saffron shadow-lg flex items-center justify-center opacity-80">
          <Heart className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="absolute bottom-40 left-12 lg:left-24 animate-float hidden md:block" style={{ animationDelay: '1s' }}>
        <div className="w-14 h-14 rounded-2xl gradient-green shadow-lg flex items-center justify-center opacity-80">
          <Shield className="w-7 h-7 text-white" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-sm font-medium mb-8 animate-fade-in-up">
          <Shield className="w-4 h-4" />
          India's Most Trusted Elderly Care Service
        </div>

        {/* Main headline */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-in-up"
          style={{ fontFamily: "'Playfair Display', serif", animationDelay: '0.1s' }}
        >
          <span className="text-primary">{t('heroTitle').split(',')[0]},</span>
          <br />
          <span>{t('heroTitle').split(',').slice(1).join(',').trim()}</span>
        </h1>

        {/* Sub-headline */}
        <p
          className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
          data-testid="text-hero-subtitle"
        >
          {t('heroSubtitle')}
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          <a
            href="#register"
            className="w-full sm:w-auto px-8 py-4 gradient-saffron text-white rounded-xl font-semibold text-lg shadow-lg hover:opacity-90 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            data-testid="button-hero-cta"
          >
            {t('getStarted')}
          </a>
          <a
            href="#services"
            className="w-full sm:w-auto px-8 py-4 bg-white text-foreground border-2 border-border rounded-xl font-semibold text-lg hover:border-primary hover:text-primary transition-all duration-300 hover:-translate-y-0.5"
            data-testid="button-hero-learn"
          >
            {t('learnMore')}
          </a>
        </div>

        {/* Stats bar */}
        <div
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-8 max-w-3xl mx-auto animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          {[
            { value: '50,000+', label: 'Elders Served' },
            { value: '25+', label: 'Cities' },
            { value: '5,000+', label: 'Caregivers' },
            { value: '98%', label: 'Satisfaction' },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-border shadow-sm"
              data-testid={`stat-${i}`}
            >
              <div className="text-2xl font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center">
          <a
            href="#services"
            className="text-muted-foreground hover:text-primary transition-colors flex flex-col items-center gap-1 animate-bounce"
            data-testid="link-scroll-down"
          >
            <span className="text-xs font-medium">Explore Services</span>
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
