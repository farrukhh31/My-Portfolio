"use client";

import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import {
  HiOutlineMail,
  HiOutlineDownload,
} from "react-icons/hi";

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
    icon: HiOutlineMail,
    href: "https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=afarrukh553@gmail.com&su=Portfolio%20Inquiry%20for%20Farrukh%20Ahmad",
  },
  {
    icon: HiOutlineDownload,
    href: "/resume.pdf",
  },
];

export default function FooterSocials() {
  return (
    <div className="mt-12 flex justify-center gap-5">
      {socials.map(({ icon: Icon, href }, i) => (
        <motion.a
          key={i}
          href={href}
          target="_blank"
          whileHover={{
            y: -8,
            scale: 1.12,
            rotate: 8,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="glass flex h-14 w-14 items-center justify-center rounded-full border border-white/10 transition hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(34,211,238,.35)]"
        >
          <Icon
            size={22}
            className="text-cyan-300"
          />
        </motion.a>
      ))}
    </div>
  );
}