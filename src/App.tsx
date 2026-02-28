import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import RoomSection from './sections/RoomSection';
import AmenitiesSection from './sections/AmenitiesSection';
import DiningSection from './sections/DiningSection';
import LocationSection from './sections/LocationSection';
import GallerySection from './sections/GallerySection';
import ReviewsSection from './sections/ReviewsSection';
import BookingSection from './sections/BookingSection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Global snap for pinned sections
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    };

    // Delay to allow all section ScrollTriggers to initialize
    const timer = setTimeout(setupGlobalSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative">
        {/* Section 1: Hero - z-10 */}
        <div className="relative z-10">
          <HeroSection />
        </div>
        
        {/* Section 2: Rooms - z-20 */}
        <div className="relative z-20">
          <RoomSection />
        </div>
        
        {/* Section 3: Amenities - z-30 */}
        <div className="relative z-30">
          <AmenitiesSection />
        </div>
        
        {/* Section 4: Dining - z-40 */}
        <div className="relative z-40">
          <DiningSection />
        </div>
        
        {/* Section 5: Location - z-50 */}
        <div className="relative z-50">
          <LocationSection />
        </div>
        
        {/* Flowing sections */}
        <GallerySection />
        <ReviewsSection />
        <BookingSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
