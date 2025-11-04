import PageTransition from '../../components/PageTransition';
import Navbar from '../../components/Navbar';
import HeroSection from '../../components/HeroSection';
import FeaturesSection from '../../components/FeaturesSection';
import BenefitsSection from '../../components/BenefitsSection';
import CTASection from '../../components/CTASection';
import Footer from '../../components/Footer';

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-primary to-primary/40">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <CTASection />
        <Footer />
      </div>
    </PageTransition>
  );
}