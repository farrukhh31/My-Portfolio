"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Pencil,
  MessageSquare,
  Send,
  Check,
  Loader2,
} from "lucide-react";

import confetti from "canvas-confetti";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 2200)
    );

    setLoading(false);
    setSuccess(true);

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="glass relative overflow-hidden rounded-3xl border border-white/10 p-8"
    >
      {/* Background Glow */}

      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative z-10">

        <h3 className="text-3xl font-bold">
          Let's Build Something Amazing
        </h3>

        <p className="mt-3 leading-7 text-slate-400">
          Have an idea, opportunity, or project in mind?
          Fill out the form below and I'll get back to you
          as soon as possible.
        </p>

        <div className="mt-10 space-y-6">

          {/* Name */}

          <div className="relative">
            <User
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-400"
            />

            <input
              required
              placeholder="Your Name"
              className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-14 pr-5 outline-none transition-all duration-300 focus:border-cyan-400 focus:shadow-[0_0_25px_rgba(34,211,238,.2)]"
            />
          </div>

          {/* Email */}

          <div className="relative">
            <Mail
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-400"
            />

            <input
              required
              type="email"
              placeholder="Email Address"
              className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-14 pr-5 outline-none transition-all duration-300 focus:border-cyan-400 focus:shadow-[0_0_25px_rgba(34,211,238,.2)]"
            />
          </div>

          {/* Purpose */}

          <div className="relative">
            <Pencil
              size={20}
              className="absolute left-5 top-5 text-cyan-400"
            />

            <select
              required
              defaultValue=""
className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 py-4 pl-14 pr-5 text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:shadow-[0_0_25px_rgba(34,211,238,.2)]"         >
              <option value="" disabled>
                Purpose of Contact
              </option>

              <option>
                Internship Opportunity
              </option>

              <option>
                Full-Time Opportunity
              </option>

              <option>
                Freelance Project
              </option>

              <option>
                Collaboration
              </option>

              <option>
                General Inquiry
              </option>

              <option>
                Other
              </option>

            </select>
          </div>

          {/* Message */}

          <div className="relative">
            <MessageSquare
              size={20}
              className="absolute left-5 top-5 text-cyan-400"
            />

            <textarea
              required
              rows={6}
              placeholder="Tell me about your project, opportunity, or idea..."
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 py-4 pl-14 pr-5 outline-none transition-all duration-300 focus:border-cyan-400 focus:shadow-[0_0_25px_rgba(34,211,238,.2)]"
            />
          </div>

        </div>

        {/* Submit */}

        <div className="relative mt-10">

          <motion.div
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl"
          />

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={
              !loading && !success
                ? {
                    scale: 1.03,
                  }
                : {}
            }
            whileTap={{
              scale: 0.97,
            }}
            className="group relative flex h-14 w-full items-center justify-center rounded-full bg-cyan-400 font-semibold text-slate-950 shadow-[0_0_40px_rgba(34,211,238,.35)]"
          >
            <AnimatePresence mode="wait">

              {!loading && !success && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  Send Message

                  <motion.div
                    whileHover={{
                      x: 6,
                      y: -2,
                      rotate: -18,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                    }}
                  >
                    <Send size={18} />
                  </motion.div>
                </motion.div>
              )}

              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />

                  Sending...
                </motion.div>
              )}

              {success && (
                <motion.div
                  key="success"
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: [1, 0.92, 1.06, 1],
                  }}
                  className="flex items-center gap-3"
                >
                  <Check size={20} />

                  Message Sent Successfully
                </motion.div>
              )}

            </AnimatePresence>
          </motion.button>

        </div>

      </div>
    </motion.form>
  );
}