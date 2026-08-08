import { useLang } from '@/lib/LanguageContext';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajan Mehta',
    city: 'Gwalior',
    service: 'Healthcare Support',
    rating: 5,
    text: 'After my father\'s stroke, we were desperate for quality care. Swatanya Wellness sent us a trained nurse within 24 hours. The care has been exceptional — medication on time, physiotherapy twice a week. Dad is recovering faster than expected.',
    avatar: 'RM',
    lang: 'English',
  },
  {
    name: 'सुनीता शर्मा',
    city: 'दिल्ली',
    service: 'घरेलू सेवा',
    rating: 5,
    text: 'मेरी 78 वर्षीया माँ अकेली रहती हैं। स्वतंत्र वेलनेस ने हमें एक बेहतरीन देखभाल करने वाली दी जो उनका खाना बनाती है, घर साफ रखती है और उनसे बात करती है। माँ बहुत खुश हैं।',
    avatar: 'SS',
    lang: 'Hindi',
  },
  {
    name: 'Lakshmi Krishnaswamy',
    city: 'Gwalior',
    service: 'Companion Care',
    rating: 5,
    text: 'Amma was lonely after Appa passed away. The companion from Swatanya Wellness is like family now. She reads to Amma, takes her for walks, and keeps her mentally active. We cannot imagine life without this service.',
    avatar: 'LK',
    lang: 'English',
  },
  {
    name: 'Ashok Patil',
    city: 'Gwalior',
    service: 'Emergency Support',
    rating: 5,
    text: 'At 2 AM, my father-in-law had a heart attack. One call to Swatanya Wellness and within 15 minutes, an emergency responder was at our door. The hospital coordination was seamless. They truly saved his life.',
    avatar: 'AP',
    lang: 'English',
  },
];

export default function TestimonialsSection() {
  const { t } = useLang();

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-gradient-to-br from-primary/5 to-secondary/5" data-testid="section-testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
            Success Stories
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
            data-testid="heading-testimonials"
          >
            {t('testimonials')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real stories from real families across India who trusted us with their most precious loved ones.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
              data-testid={`testimonial-card-${idx}`}
            >
              {/* Quote icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-primary/20" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full gradient-saffron flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">{testimonial.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.city}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {testimonial.service}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall rating */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-8 py-5 border border-border shadow-sm">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-6 h-6 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <div className="text-left">
              <p className="font-bold text-foreground">4.9 out of 5</p>
              <p className="text-xs text-muted-foreground">Based on 100+ reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
