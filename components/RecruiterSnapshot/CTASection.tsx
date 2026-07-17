"use client";

import GlassCard from "./GlassCard";
import { recruiterData } from "./data";
import { motion } from "framer-motion";

export default function CTASection() {
  const { contact } = recruiterData;

  return (
    <GlassCard delay={0.7}>

      <div className="flex flex-col gap-6">

        <div>
          <h3
            className="
              text-2xl
              font-semibold
              text-white
            "
          >
            {contact.title}
          </h3>


          <p
            className="
              mt-3
              max-w-lg
              text-gray-300
            "
          >
            {contact.description}
          </p>
        </div>


        <div
          className="
            flex
            flex-wrap
            gap-3
          "
        >

          <motion.a
            whileHover={{
              scale: 1.05,
            }}
            href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=afarrukh553@gmail.com&su=Portfolio%20Inquiry%20for%20Farrukh%20Ahmad"
            className="
              rounded-xl
              bg-cyan-400
              px-5
              py-3
              font-medium
              text-black
            "
          >
            Contact Me
          </motion.a>


          <motion.a
            whileHover={{
              scale: 1.05,
            }}
            href="https://www.linkedin.com/in/farrukh-ahmed-248356246/"
            target="_blank"
            className="
              rounded-xl
              border
              border-white/20
              bg-white/5
              px-5
              py-3
              font-medium
              text-white
            "
          >
            LinkedIn
          </motion.a>


          <motion.a
            whileHover={{
              scale: 1.05,
            }}
            href="https://github.com/farrukhh31"
            target="_blank"
            className="
              rounded-xl
              border
              border-white/20
              bg-white/5
              px-5
              py-3
              font-medium
              text-white
            "
          >
            GitHub
          </motion.a>


        </div>


      </div>

    </GlassCard>
  );
}