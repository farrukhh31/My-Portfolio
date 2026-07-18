import Navbar from "@/components/Navbar/navbar";
import Hero from "@/components/hero/Hero";
import About from "@/components/About/About";
import Project from "@/components/Projects/Projects";
import Experience from "@/components/Experience/experience";
import Skills from "@/components/Skills/Skills";
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
      <About />
      <Skills />
      <Project />
      <Experience />
      <Certificates />
      <Contact />
      <Footer />

    </>
  );
}