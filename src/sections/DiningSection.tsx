import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function DiningSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(
        rightPanelRef.current,
        { x: '60vw', opacity: 1 },
        { x: 0, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        leftPanelRef.current,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        dividerRef.current,
        { scaleY: 0, transformOrigin: 'top' },
        { scaleY: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        [h2Ref.current, bodyRef.current, ctaRef.current, noteRef.current],
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        labelRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'none' },
        0.1
      );

      // SETTLE (30-70%): Micro parallax
      const diningImg = rightPanelRef.current?.querySelector('img');
      if (diningImg) {
        scrollTl.fromTo(
          diningImg,
          { y: 0 },
          { y: '-3vh', ease: 'none' },
          0.3
        );
      }

      // EXIT (70-100%)
      scrollTl.fromTo(
        leftPanelRef.current,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        rightPanelRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: '12vw', scale: 1.05, opacity: 0.35, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        dividerRef.current,
        { scaleY: 1 },
        { scaleY: 0, transformOrigin: 'top', ease: 'power2.in' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="dining"
      className="relative w-full h-screen bg-[#F6F7F6] overflow-hidden"
    >
      {/* Left Text Panel */}
      <div
        ref={leftPanelRef}
        className="absolute top-0 left-0 w-[48vw] h-full bg-[#F6F7F6] flex items-center will-change-transform"
      >
        <div className="px-[6vw] py-[10vh]">
          {/* Section Label */}
          <div
            ref={labelRef}
            className="section-label text-[#6B7280] mb-8"
          >
            DINING
          </div>

          <h2
            ref={h2Ref}
            className="font-serif text-headline-sm lg:text-headline text-[#11130E] mb-8 max-w-[30vw] will-change-transform"
          >
            Local flavors, simple plates.
          </h2>

          <p
            ref={bodyRef}
            className="font-sans text-body text-[#11130E]/75 mb-10 max-w-[30vw] leading-relaxed will-change-transform"
          >
            Breakfast is on us. The restaurant serves familiar dishes made with
            local ingredients—served calmly, without rush.
          </p>

          <div ref={ctaRef} className="mb-6 will-change-transform">
            <Button
              variant="outline"
              className="group border-[#11130E]/20 text-[#11130E] hover:bg-[#11130E] hover:text-white font-sans text-sm tracking-wide px-8 py-6 transition-all hover:-translate-y-0.5"
            >
              View menu
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div
            ref={noteRef}
            className="font-sans text-xs text-[#6B7280] will-change-transform"
          >
            Open daily 7:00–10:00 (breakfast)
          </div>
        </div>
      </div>

      {/* Vertical Divider */}
      <div
        ref={dividerRef}
        className="absolute top-0 left-[48vw] w-px h-full bg-[#11130E]/15 will-change-transform"
      />

      {/* Right Image Panel */}
      <div
        ref={rightPanelRef}
        className="absolute top-0 right-0 w-[52vw] h-full will-change-transform"
      >
        <img
          src="/dining_table.jpg"
          alt="Dining Experience"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
