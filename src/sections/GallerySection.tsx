import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: '/gallery_bed_detail.jpg', alt: 'Bed Detail', className: 'col-span-2 row-span-2' },
  { src: '/gallery_bathroom.jpg', alt: 'Bathroom', className: 'col-span-1 row-span-1' },
  { src: '/gallery_exterior.jpg', alt: 'Exterior', className: 'col-span-1 row-span-1' },
  { src: '/gallery_food.jpg', alt: 'Food', className: 'col-span-2 row-span-1' },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Tiles animation with stagger
      tilesRef.current.forEach((tile, index) => {
        if (!tile) return;

        gsap.fromTo(
          tile,
          { y: 40 + index * 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: tile,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Subtle parallax
        gsap.fromTo(
          tile.querySelector('img'),
          { y: 0 },
          {
            y: index === 0 ? -24 : -16,
            ease: 'none',
            scrollTrigger: {
              trigger: tile,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative w-full bg-[#F6F7F6] py-24 lg:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 will-change-transform">
          <div className="section-label text-[#6B7280] mb-4">GALLERY</div>
          <h2 className="font-serif text-headline-sm lg:text-headline text-[#11130E]">
            A few moments from Bosanic.
          </h2>
        </div>

        {/* Mosaic Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Large left tile */}
          <div
            ref={(el) => { tilesRef.current[0] = el; }}
            className="col-span-2 lg:col-span-2 row-span-2 aspect-[4/3] lg:aspect-auto lg:h-[520px] overflow-hidden will-change-transform"
          >
            <img
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Top right tile */}
          <div
            ref={(el) => { tilesRef.current[1] = el; }}
            className="col-span-1 row-span-1 aspect-[16/10] overflow-hidden will-change-transform"
          >
            <img
              src={galleryImages[1].src}
              alt={galleryImages[1].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Middle right tile */}
          <div
            ref={(el) => { tilesRef.current[2] = el; }}
            className="col-span-1 row-span-1 aspect-[16/10] overflow-hidden will-change-transform"
          >
            <img
              src={galleryImages[2].src}
              alt={galleryImages[2].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Bottom wide tile */}
          <div
            ref={(el) => { tilesRef.current[3] = el; }}
            className="col-span-2 lg:col-span-3 row-span-1 aspect-[21/9] overflow-hidden will-change-transform"
          >
            <img
              src={galleryImages[3].src}
              alt={galleryImages[3].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
