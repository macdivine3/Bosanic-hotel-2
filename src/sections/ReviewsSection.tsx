import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    quote: 'Clean, calm, and exactly what I needed after a long week.',
    name: 'Amaka O.',
    meta: 'January 2026 • Google',
    rating: 5,
  },
  {
    quote: 'The staff made everything easy—check-in, dinner, checkout.',
    name: 'Tunde K.',
    meta: 'December 2025 • Booking.com',
    rating: 5,
  },
  {
    quote: 'Best sleep I\'ve had in Benin. Quiet street, great bed.',
    name: 'Ngozi E.',
    meta: 'November 2025 • TripAdvisor',
    rating: 5,
  },
];

interface ReviewsSectionProps {
  rootRef: React.RefObject<HTMLElement | null>;
}

export default function ReviewsSection({ rootRef }: ReviewsSectionProps) {
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = rootRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation with stagger
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, [rootRef]);

  return (
    <section
      ref={rootRef}
      className="relative w-full bg-[#F6F7F6] py-16 lg:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 lg:mb-16 will-change-transform">
          <div className="section-label text-[#6B7280] mb-4">REVIEWS</div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-headline text-[#11130E]">
            What guests are saying.
          </h2>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group bg-white border border-[#11130E]/10 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#11130E]/25 will-change-transform"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#2F5D50] text-[#2F5D50]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="font-serif text-lg lg:text-xl text-[#11130E] mb-8 leading-relaxed">
                "{review.quote}"
              </p>

              {/* Author */}
              <div>
                <div className="font-sans text-[10px] lg:text-xs font-medium tracking-widest text-[#11130E] uppercase">
                  {review.name}
                </div>
                <div className="font-sans text-[10px] lg:text-xs text-[#6B7280] mt-2">
                  {review.meta}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
