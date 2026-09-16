import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import InfrastructureOverview from '../components/sections/InfrastructureOverview';
import Areas from '../components/sections/Areas';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import CaseSpotlight from '../components/sections/CaseSpotlight';
import Experience from '../components/sections/Experience';
import EducationRoadmap from '../components/sections/EducationRoadmap';
import Lab from '../components/sections/Lab';
import SideProjects from '../components/sections/SideProjects';
import Contact from '../components/sections/Contact';

type Props = { onOpenPalette: () => void };

export default function HomePage({ onOpenPalette }: Props) {
  return <>
    <Header onOpenPalette={onOpenPalette} />
    <main id="main">
      <Hero />
      <About />
      <CaseSpotlight />
      <InfrastructureOverview />
      <Areas />
      <Skills />
      <Projects limit={5} />
      <Experience />
      <EducationRoadmap />
      <Lab />
      <SideProjects />
      <Contact onOpenPalette={onOpenPalette} />
    </main>
    <Footer />
  </>;
}
