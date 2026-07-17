"use client";

import { Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const socials = [
  {
    icon: FaGithub,
    href: "https://github.com/farrukhh31",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/farrukh-ahmed-248356246/",
  },
  {
    icon: Mail,
     href: "https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=afarrukh553@gmail.com&su=Portfolio%20Inquiry%20for%20Farrukh%20Ahmad",
  },
];

export default function SocialLinks() {
  return (
    <div className="mt-10 flex gap-5">

      {socials.map(({ icon: Icon, href }, i) => (
        <motion.a
          whileHover={{
            y: -6,
            scale: 1.1,
          }}
          key={i}
          href={href}
          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:border-cyan-400/40"
        >
          <Icon size={22} />
        </motion.a>
      ))}

    </div>
  );
}