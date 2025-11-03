
import VitalSpaceHero from '@/components/Hero';
import Newsection from '@/components/exclusivcoffer';
// import ExplorePropertiesSection from '@/components/ExplorePropertiesSection';
import Footer from '@/components/footer';
import PopularSearches from '@/components/searchs';
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* <Navbar /> */} {/* Uncomment if needed; confirm if Hero.tsx navbar is sufficient */}
      <VitalSpaceHero />
      <Newsection />
      <PopularSearches />
      {/* <ExplorePropertiesSection /> */}
      <Footer />
    </div>
  );
};

export default Index;