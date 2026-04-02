import { useLang } from '@/lib/LanguageContext';
import { Heart, Home, Baby, AlertCircle } from 'lucide-react';

const services = [
  {
    icon: Heart,
    key: 'healthcare',
    descKey: 'healthcareDesc',
    gradient: 'gradient-saffron',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    features: ['Medication Reminders', 'Blood Pressure Monitoring', 'Doctor Visit Escort', 'Physiotherapy', 'Diet Planning', 'Lab Test Assistance'],
  },
  {
    icon: Home,
    key: 'household',
    descKey: 'householdDesc',
    gradient: 'gradient-green',
    color: 'text-green-700',
    bg: 'bg-green-50',
    features: ['Meal Preparation', 'House Cleaning', 'Laundry & Ironing', 'Grocery Shopping', 'Bill Payment Assistance', 'Plant & Pet Care'],
  },
  {
    icon: Baby,
    key: 'nanny',
    descKey: 'nannyDesc',
    gradient: 'bg-gradient-to-br from-blue-500 to-blue-700',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    features: ['Daily Companion', 'Personal Hygiene Help', 'Mobility Assistance', 'Emotional Support', 'Recreation Activities', 'Memory Care'],
  },
  {
    icon: AlertCircle,
    key: 'emergency',
    descKey: 'emergencyDesc',
    gradient: 'bg-gradient-to-br from-red-500 to-red-700',
    color: 'text-red-700',
    bg: 'bg-red-50',
    features: ['24/7 Emergency Line', 'Hospital Coordination', 'Ambulance Dispatch', 'Family Notification', 'ICU Companion', 'Post-Hospital Care'],
  },
];

export default function ServicesSection() {
  const { t } = useLang();

  return (
    <section id="services" className="py-20 lg:py-28 bg-white relative" data-testid="section-services">
      {/* Top divider */}
      <div className="section-divider mb-16" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
            What We Offer
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
            data-testid="heading-services"
          >
            {t('ourServices')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('servicesSubtitle')}</p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.key}
                className="group relative bg-white rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                data-testid={`card-service-${svc.key}`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Accent top bar */}
                <div className={`h-1.5 w-full ${svc.gradient}`} />

                <div className="p-6 lg:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-xl ${svc.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                      <Icon className={`w-7 h-7 ${svc.color}`} />
                    </div>
                    <div>
                      <h3
                        className="text-xl font-bold text-foreground mb-1"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {t(svc.key)}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{t(svc.descKey)}</p>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="grid grid-cols-2 gap-2">
                    {svc.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${svc.color.replace('text-', 'bg-')}`} />
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#register"
                    className={`mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold ${svc.bg} ${svc.color} hover:opacity-80 transition-all duration-200`}
                    data-testid={`button-service-${svc.key}`}
                  >
                    Book This Service
                    <span>→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
