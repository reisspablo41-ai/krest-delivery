import HeaderWithVideo from './Components/HeaderWithVideo';
import StatsBar from './Components/StatsBar';
import FleetMapWrapper from './Components/FleetMapWrapper';
import Features from './Components/Features';
import HowItWorks from './Components/HowItWorks';
import GlobalReach from './Components/GlobalReach';
import IndustrySolutions from './Components/IndustrySolutions';
import FeaturedKrest from './Components/FeaturedKrest';
import Testimonials from './Components/Testimonials';
import BusinessCTA from './Components/BusinessCTA';
import FeaturesReturn from './Components/FeaturesReturn';
import TechnologyTracking from './Components/TechnologyTracking';
import Update from './Components/Update';
import PetService from './Components/PetService';
import Footer from './Components/Footer';

export default function Home() {
  return (
    <div>
      <HeaderWithVideo />
      <StatsBar />
      <FleetMapWrapper />
      <Features />
      <HowItWorks />
      <GlobalReach />
      <IndustrySolutions />
      <FeaturedKrest />
      <PetService />
      <Testimonials />
      <BusinessCTA />
      <FeaturesReturn />
      <TechnologyTracking />
      <Update />
      <Footer />
    </div>
  );
}
