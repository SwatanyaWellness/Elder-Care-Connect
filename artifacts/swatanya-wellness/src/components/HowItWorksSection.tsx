import { useLang } from '@/lib/LanguageContext';
import { ClipboardList, UserCheck, HeartHandshake } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    titleKey: 'step1',
    descKey: 'step1Desc',
    step: '01',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    gradient: 'gradient-saffron',
  },
  {
    icon: UserCheck,
    titleKey: 'step2',
    descKey: 'step2Desc',
    step: '02',
    color: 'text-green-700',
    bg: 'bg-green-50',
    gradient: 'gradient-green',
  },
  {
    icon: HeartHandshake,
    titleKey: 'step3',
    descKey: 'step3Desc',
    step: '03',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    gradient: 'bg-gradient-to-br from-blue-500 to-blue-700',
  },
];

export default function HowItWorksSection() {
  const { t } = useLang();

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white" data-testid="section-how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
            Simple Process
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
            data-testid="heading-how-it-works"
          >
            {t('howItWorks')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Getting started is simple. From registration to care in just 3 easy steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-orange-200 via-green-200 to-blue-200" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.titleKey}
                  className="relative flex flex-col items-center text-center group"
                  data-testid={`step-card-${idx + 1}`}
                >
                  {/* Step number */}
                  <div className="relative z-10 mb-6">
                    <div className={`w-20 h-20 rounded-2xl ${step.gradient} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white border-2 border-border shadow-sm flex items-center justify-center">
                      <span className="text-xs font-bold text-foreground">{step.step}</span>
                    </div>
                  </div>

                  <h3
                    className="text-xl font-bold text-foreground mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                    {t(step.descKey)}
                  </p>

                  {/* Arrow for desktop */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 -right-4 text-muted-foreground/40 text-2xl z-20">
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-muted/40 rounded-2xl p-6 border border-border">
            <div className="text-left">
              <p className="font-bold text-foreground">Ready to get started?</p>
              <p className="text-sm text-muted-foreground">Join 500+ families who trust Swatanya Wellness</p>
            </div>
            <a
              href="#register"
              className="px-6 py-3 gradient-saffron text-white rounded-xl font-semibold shadow-md hover:opacity-90 transition-all whitespace-nowrap"
              data-testid="button-howitworks-cta"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
