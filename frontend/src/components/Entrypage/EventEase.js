import React, {useEffect} from 'react';
import '../../css/Entrypage/EventEase.modules.css';
import Footer from './Footer';
import HeroSection from './HeroSection';


function EventEase() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="eventEase">
      <HeroSection />
      <Footer />
    </div>
  );
}

export default EventEase;