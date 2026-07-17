"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import StatusBadge from "./StatusBadge";
import SocialLinks from "./SocialLinks";

const infos = [
  {
  icon: Mail,
  title: "Email",
  value: "afarrukh553@gmail.com",
  href: "https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=afarrukh553@gmail.com&su=Portfolio%20Inquiry%20for%20Farrukh%20Ahmad",
},
  {
    icon: MapPin,
    title: "Location",
    value: "Karachi, Pakistan",
  },
];

export default function ContactCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="glass rounded-3xl border border-white/10 p-8"
    >
      <h3 className="text-3xl font-bold">
        Contact Information
      </h3>

      <p className="mt-4 leading-7 text-slate-400">
        Feel free to reach out for internships,
        collaborations, freelance opportunities,
        or simply to connect.
      </p>

      {/* Contact Details */}

      <div className="mt-10 space-y-6">
        {infos.map((item) => (
          <motion.div
            key={item.title}
            whileHover={{ x: 8 }}
            className="flex items-center gap-5"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
              <item.icon size={24} />
            </div>

            <div>
              <p className="text-sm text-slate-400">
                {item.title}
              </p>

              {item.href ? (
                <a
                  href={item.href}
                  className="font-medium transition hover:text-cyan-400"
                >
                  {item.value}
                </a>
              ) : (
                <p className="font-medium">
                  {item.value}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Availability */}

      <StatusBadge />

      {/* WhatsApp CTA */}

      <motion.a
        href="https://wa.me/923022295712"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{
          scale: 1.03,
          y: -2,
        }}
        whileTap={{
          scale: 0.97,
        }}
        className="group mt-6 flex items-center justify-between rounded-2xl border border-green-500/20 bg-gradient-to-r from-green-500/10 to-emerald-500/10 px-6 py-5 transition-all duration-300 hover:border-green-400 hover:shadow-[0_0_35px_rgba(34,197,94,.25)]"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/15">
            <FaWhatsapp
              size={30}
              className="text-green-400"
            />
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Prefer a quick conversation?
            </p>

            <p className="font-semibold text-white">
              Message me on WhatsApp
            </p>
          </div>
        </div>

        <motion.span
          whileHover={{ x: 5 }}
          className="text-2xl text-green-400"
        >
          →
        </motion.span>
      </motion.a>

      {/* Social Links */}

      <div className="mt-8">
        <SocialLinks />
      </div>
    </motion.div>
  );
}