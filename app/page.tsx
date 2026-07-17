import Navbar from "@/components/layout/navbar";
import Hero from "@/components/hero/Hero";
import About1 from "@/components/About1/About";
import Project1 from "@/components/Projects1/Projects";
import Experience from "@/components/Experience/experience";
import Skills from "@/components/skills/Skills";
import Certificates from "@/components/certificates/Certificates";
import Recruiters from "@/components/RecruiterSnapshot/RecruiterSnapshot";
import Contact from "@/components/contact/contact";
import Footer from "@/components/footer/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Recruiters/>
      <About1 />
      {/* <Projects /> */}
      <Project1 />
      <Experience />
      <Skills />
      <Certificates />
      <Contact />
      <Footer />

    </>
  );
}