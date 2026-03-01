import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  rootRef: React.RefObject<HTMLElement | null>;
  onScrollToBooking?: () => void;
  onScrollToRooms?: () => void;
}

export default function HeroSection({ rootRef, onScrollToBooking, onScrollToRooms }: HeroSectionProps) {
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  // Load animation (on mount)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Initial states
      gsap.set([leftPanelRef.current, rightPanelRef.current], { opacity: 0 });
      gsap.set(leftPanelRef.current, { x: '-12vw' });
      gsap.set(rightPanelRef.current, { x: '12vw' });
      gsap.set(dividerRef.current, { scaleY: 0, transformOrigin: 'top' });
      gsap.set(h1Ref.current, { y: 24, opacity: 0 });
      gsap.set([bodyRef.current, ctaRef.current], { y: 16, opacity: 0 });
      gsap.set(metaRef.current, { opacity: 0 });
      gsap.set(scrollHintRef.current, { opacity: 0 });

      // Animation sequence
      tl.to([leftPanelRef.current, rightPanelRef.current], {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
      })
        .to(dividerRef.current, { scaleY: 1, duration: 0.8 }, '-=0.6')
        .to(metaRef.current, { opacity: 1, duration: 0.6 }, '-=0.4')
        .to(h1Ref.current, { y: 0, opacity: 1, duration: 0.7 }, '-=0.3')
        .to(bodyRef.current, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
        .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
        .to(scrollHintRef.current, { opacity: 0.6, duration: 0.5 }, '-=0.2');
    }, rootRef);

    return () => ctx.revert();
  }, [rootRef]);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const section = rootRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        // DESKTOP: Pinned exit animation
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
            contentRef.current,
            { x: 0, opacity: 1 },
            { x: '10vw', opacity: 0, ease: 'power2.in' },
            0.1
          );

          scrollTl.fromTo(
            leftPanelRef.current,
            { x: 0, scale: 1, opacity: 1 },
            { x: '-10vw', scale: 1.06, opacity: 0.35, ease: 'power2.in' },
            0.1
          );

          scrollTl.fromTo(
            dividerRef.current,
            { scaleY: 1 },
            { scaleY: 0, transformOrigin: 'bottom', ease: 'power2.in' },
            0.15
          );
        },

        // MOBILE: Simple fade-out parallax (no pinning)
        "(max-width: 1023px)": function () {
          gsap.to(contentRef.current, {
            opacity: 0,
            y: -50,
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom center",
              scrub: true,
            }
          });
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, [rootRef]);

  return (
    <section
      ref={rootRef}
      className="relative w-full min-h-[100dvh] lg:h-screen bg-[#F6F7F6] overflow-hidden flex flex-col lg:block"
    >
      {/* Left Media Panel */}
      <div
        ref={leftPanelRef}
        className="relative lg:absolute top-0 left-0 w-full h-[40vh] lg:w-[52vw] lg:h-full will-change-transform"
      >
        <img
          src="/hero_room.jpg"
          alt="Bosanic Hotel Room"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Vertical Divider */}
      <div
        ref={dividerRef}
        className="hidden lg:block absolute top-0 left-[52vw] w-px h-full bg-[#11130E]/15 will-change-transform"
      />

      {/* Right Content Panel */}
      <div
        ref={rightPanelRef}
        className="relative lg:absolute top-0 right-0 w-full lg:w-[48vw] h-full bg-[#F6F7F6] flex items-center will-change-transform"
      >
        <div ref={contentRef} className="px-6 py-12 lg:px-[6vw] lg:py-[10vh] will-change-transform w-full">
          {/* Meta Label */}
          <div
            ref={metaRef}
            className="lg:absolute top-[10vh] right-[6vw] section-label text-[#6B7280] mb-6 lg:mb-0"
          >
            BENIN CITY • GRA
          </div>

          {/* Main Content */}
          <div className="max-w-xl lg:max-w-[28vw]">
            <h1
              ref={h1Ref}
              className="font-serif text-4xl sm:text-5xl lg:text-display text-[#11130E] mb-6 lg:mb-8 will-change-transform"
            >
              Stay in the quiet side of Benin City.
            </h1>

            <p
              ref={bodyRef}
              className="font-sans text-base lg:text-body text-[#11130E]/75 mb-8 lg:mb-10 leading-relaxed lg:leading-relaxed will-change-transform"
            >
              A small hotel with clean lines, warm service, and spaces designed
              for rest. Close to the airport, tucked away from the noise.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-6 will-change-transform">
              <Button
                onClick={onScrollToBooking}
                className="w-full sm:w-auto bg-[#2F5D50] hover:bg-[#244a40] text-white font-sans text-sm tracking-wide px-8 py-6 transition-all hover:-translate-y-0.5"
              >
                Book your stay
              </Button>

              <button
                onClick={onScrollToRooms}
                className="group flex items-center gap-2 font-sans text-sm text-[#11130E]/80 hover:text-[#2F5D50] transition-colors"
              >
                View rooms
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Scroll Hint */}
          <div
            ref={scrollHintRef}
            className="hidden lg:block absolute bottom-[6vh] left-[6vw] font-sans text-xs text-[#6B7280] tracking-wide will-change-transform"
          >
            Scroll to explore
          </div>
        </div>
      </div>
    </section>
  );
}
