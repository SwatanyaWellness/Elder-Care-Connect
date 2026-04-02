import { useLang } from '@/lib/LanguageContext';
import { useState, useEffect, useRef } from 'react';
import { Users, MapPin, Heart, Star, Clock, Award } from 'lucide-react';

const metrics = [
  { icon: Users, value: 50000, suffix: '+', key: 'elders', color: 'text-orange-600', bg: 'bg-orange-50' },
  { icon: MapPin, value: 25, suffix: '+', key: 'cities', color: 'text-green-700', bg: 'bg-green-50' },
  { icon: Heart, value: 5000, suffix: '+', key: 'caregivers', color: 'text-blue-700', bg: 'bg-blue-50' },
  { icon: Star, value: 98, suffix: '%', key: 'satisfaction', color: 'text-purple-700', bg: 'bg-purple-50' },
  { icon: Clock, value: 24, suffix: 'hrs', key: 'response', color: 'text-red-600', bg: 'bg-red-50' },
  { icon: Award, value: 8, suffix: '+', key: 'years', color: 'text-amber-700', bg: 'bg-amber-50' },
];

function useCountUp(target: number, duration: number = 1500, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function MetricCard({ metric, metricsLabel, startCount }: { metric: typeof metrics[0], metricsLabel: Record<string, string>, startCount: boolean }) {
  const count = useCountUp(metric.value, 1500, startCount);
  const Icon = metric.icon;
  const label = metricsLabel[metric.key] || metric.key;

  return (
    <div
      className="group bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
      data-testid={`metric-${metric.key}`}
    >
      <div className={`w-14 h-14 rounded-xl ${metric.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-7 h-7 ${metric.color}`} />
      </div>
      <div className="text-4xl font-bold text-foreground mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
        <span className={metric.color}>{count.toLocaleString('en-IN')}</span>
        <span className="text-2xl">{metric.suffix}</span>
      </div>
      <p className="text-sm font-semibold text-muted-foreground">{label}</p>
    </div>
  );
}

const trustBadges = [
  { label: 'ISO 9001:2015 Certified', detail: 'Quality Management' },
  { label: 'Ministry of Health Registered', detail: 'Government Approved' },
  { label: 'NASSCOM Member', detail: 'Tech Excellence' },
  { label: 'CII Awarded', detail: 'Best Elder Care 2023' },
];

export default function CredibilitySection() {
  const { t, tNested } = useLang();
  const metricsLabel = tNested('metrics');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-muted/30" ref={sectionRef} data-testid="section-credibility">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
            Our Impact
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
            data-testid="heading-credibility"
          >
            {t('whyChooseUs')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Numbers that speak of trust, dedication, and the difference we make every single day.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-16">
          {metrics.map((m) => (
            <MetricCard key={m.key} metric={m} metricsLabel={metricsLabel} startCount={startCount} />
          ))}
        </div>

        {/* Trust Badges */}
        <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
          <h3 className="text-center font-bold text-foreground text-xl mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Certifications & Recognition
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {trustBadges.map((badge, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-4 rounded-xl bg-muted/40 border border-border"
                data-testid={`badge-trust-${idx}`}
              >
                <div className="w-12 h-12 rounded-full gradient-saffron flex items-center justify-center mb-3">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-foreground text-sm">{badge.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{badge.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Cities */}
        <div className="mt-12 text-center">
          <p className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">Serving across major cities</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat'].map((city) => (
              <span
                key={city}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-foreground border border-border shadow-sm"
                data-testid={`city-badge-${city}`}
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
