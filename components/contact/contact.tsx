"use client";

import Container from "@/components/ui/Container";
import ContactHeading from "./contactHeading";
import ContactCard from "./contactCard";
import ContactForm from "./contactForm";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-40"
    >
      <Container>

        <ContactHeading />

        <div className="mt-20 grid gap-10 lg:grid-cols-2">

          <ContactCard />

          <ContactForm />

        </div>

      </Container>
    </section>
  );
}