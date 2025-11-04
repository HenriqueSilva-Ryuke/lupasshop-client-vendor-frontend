import PageTransition from '../../../components/PageTransition';
import Navbar from '../../../components/Navbar';
import AboutSection from '../../../components/AboutSection';
import Footer from '../../../components/Footer';

export default function About() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-linear-to-br from-purple-900 to-purple-700">
        <Navbar />
        <AboutSection />
        <Footer />
      </div>
    </PageTransition>
  );
}