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

  // Section Refs
  const heroRef = useRef<HTMLElement>(null);
  const roomsRef = useRef<HTMLElement>(null);
  const amenitiesRef = useRef<HTMLElement>(null);
  const diningRef = useRef<HTMLElement>(null);
  const locationRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const reviewsRef = useRef<HTMLElement>(null);
  const bookingRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const sectionRefs = {
    hero: heroRef,
    rooms: roomsRef,
    amenities: amenitiesRef,
    dining: diningRef,
    location: locationRef,
    gallery: galleryRef,
    reviews: reviewsRef,
    booking: bookingRef,
    contact: contactRef,
  };

  useEffect(() => {
    // GSAP Global Config for Performance
    gsap.config({ force3D: true });

    // Normalize scroll for mobile (prevents address bar jumps)
    const normalizeScroll = ScrollTrigger.normalizeScroll({
      allowNestedScroll: true,
    });

    return () => {
      normalizeScroll?.disable();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation sectionRefs={sectionRefs} />

      {/* Main content */}
      <main className="relative">
        <HeroSection rootRef={heroRef} onScrollToBooking={() => bookingRef.current?.scrollIntoView({ behavior: 'smooth' })} onScrollToRooms={() => roomsRef.current?.scrollIntoView({ behavior: 'smooth' })} />
        <RoomSection rootRef={roomsRef} onScrollToBooking={() => bookingRef.current?.scrollIntoView({ behavior: 'smooth' })} />
        <AmenitiesSection rootRef={amenitiesRef} />
        <DiningSection rootRef={diningRef} />
        <LocationSection rootRef={locationRef} />
        <GallerySection rootRef={galleryRef} />
        <ReviewsSection rootRef={reviewsRef} />
        <BookingSection rootRef={bookingRef} />
        <ContactSection rootRef={contactRef} onScrollToBooking={() => bookingRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      </main>
    </div>
  );
}

export default App;
