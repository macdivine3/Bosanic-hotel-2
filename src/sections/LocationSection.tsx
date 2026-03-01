import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plane, MapPin, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const locationFeatures = [
  { icon: Plane, text: '5 min to Benin City Airport' },
  { icon: MapPin, text: '10 min to city center' },
  { icon: Shield, text: 'Secure parking available' },
];

interface LocationSectionProps {
  rootRef: React.RefObject<HTMLElement | null>;
}

export default function LocationSection({ rootRef }: LocationSectionProps) {
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = rootRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        // DESKTOP: Pinned animations
        "(min-width: 1024px)": function () {
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: '+=100%',
              pin: true,
              scrub: 0.6,
            },
          });

          scrollTl.fromTo(
            leftPanelRef.current,
            { x: '-20vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'none' },
            0
          );

          scrollTl.fromTo(
            rightPanelRef.current,
            { x: '20vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'none' },
            0
          );

          scrollTl.fromTo(
            dividerRef.current,
            { scaleY: 0, transformOrigin: 'top' },
            { scaleY: 1, ease: 'none' },
            0.1
          );

          scrollTl.fromTo(
            [h2Ref.current, bodyRef.current, featuresRef.current, ctaRef.current],
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, ease: 'power2.out' },
            0.2
          );
        },

        // MOBILE: Reveal animations
        "(max-width: 1023px)": function () {
          gsap.fromTo(
            [h2Ref.current, bodyRef.current, featuresRef.current, ctaRef.current],
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.2,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
              }
            }
          );
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, [rootRef]);

  return (
    <section
      ref={rootRef}
      className="relative w-full min-h-screen bg-[#F6F7F6] overflow-hidden flex flex-col lg:block"
    >
      {/* Left Image Panel */}
      <div
        ref={leftPanelRef}
        className="relative lg:absolute top-0 left-0 w-full h-[40vh] lg:w-[52vw] lg:h-full will-change-transform"
      >
        <img
          src="/location_street.jpg"
          alt="Location Street View"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Vertical Divider */}
      <div
        ref={dividerRef}
        className="hidden lg:block absolute top-0 left-[52vw] w-px h-full bg-[#11130E]/15 will-change-transform"
      />

      {/* Right Text Panel */}
      <div
        ref={rightPanelRef}
        className="relative lg:absolute top-0 right-0 w-full lg:w-[48vw] h-full bg-[#F6F7F6] flex items-center will-change-transform"
      >
        <div className="px-6 py-12 lg:px-[6vw] lg:py-[10vh] w-full">
          {/* Section Label */}
          <div
            ref={labelRef}
            className="section-label text-[#6B7280] mb-6 lg:mb-8 lg:text-right"
          >
            LOCATION
          </div>

          <h2
            ref={h2Ref}
            className="font-serif text-3xl sm:text-4xl lg:text-headline text-[#11130E] mb-6 lg:mb-8 lg:max-w-[30vw] will-change-transform"
          >
            Close to the airport, away from the noise.
          </h2>

          <p
            ref={bodyRef}
            className="font-sans text-base lg:text-body text-[#11130E]/75 mb-8 lg:mb-10 lg:max-w-[30vw] leading-relaxed will-change-transform"
          >
            We're in GRA—minutes from the terminal, tucked into a leafy street
            that stays quiet at night.
          </p>

          {/* Location Features */}
          <div ref={featuresRef} className="space-y-4 mb-10 will-change-transform">
            {locationFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <feature.icon className="w-4 h-4 text-[#2F5D50]" strokeWidth={1.5} />
                <span className="font-sans text-sm text-[#11130E]/80">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          <div ref={ctaRef} className="will-change-transform">
            <Button
              variant="outline"
              className="w-full sm:w-auto group border-[#11130E]/20 text-[#11130E] hover:bg-[#11130E] hover:text-white font-sans text-sm tracking-wide px-8 py-6 transition-all hover:-translate-y-0.5"
            >
              Get directions
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
