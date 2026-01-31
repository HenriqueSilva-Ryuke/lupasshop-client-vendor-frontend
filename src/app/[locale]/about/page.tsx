import PageTransition from '../../../components/PageTransition';
import Navbar from '../../../components/Navbar';
import AboutSection from '../../../components/AboutSection';
import Footer from '../../../components/Footer';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function About({
 params,
}: {
 params: Promise<{ locale: string }>;
}) {
 await params; // Await params to avoid blocking-route error

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