"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  User,
  Mail,
  Pencil,
  MessageSquare,
  Send,
  Check,
  Loader2,
  AlertCircle,
} from "lucide-react";

import confetti from "canvas-confetti";

// Set NEXT_PUBLIC_FORMSPREE_FORM_ID in your .env.local — see the
// setup notes at the bottom of this file.
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID}`;

const MAX_MESSAGE_LENGTH = 500;

const fieldClasses =
  "peer w-full rounded-xl border border-white/10 bg-white/5 pl-12 pr-4 pt-6 pb-2 text-sm outline-none transition-all duration-300 focus:border-cyan-400 focus:shadow-[0_0_25px_rgba(34,211,238,.2)] sm:pl-14 sm:pr-5 sm:text-base";

const floatingLabelClasses =
  "pointer-events-none absolute left-12 top-4 origin-left text-slate-400 transition-all duration-200 -translate-y-1 text-xs peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-focus:-translate-y-1 peer-focus:text-xs peer-focus:text-cyan-400 sm:left-14 sm:peer-placeholder-shown:text-base";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageLength, setMessageLength] = useState(0);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), {
    stiffness: 200,
    damping: 20,
    mass: 0.4,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), {
    stiffness: 200,
    damping: 20,
    mass: 0.4,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLFormElement>) {
    if (window.matchMedia?.("(pointer: coarse)").matches) return;
    const rect = formRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID) {
      setStatus("error");
      setErrorMessage(
        "Form isn't configured yet — missing NEXT_PUBLIC_FORMSPREE_FORM_ID."
      );
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });

        form.reset();
        setMessageLength(0);

        setTimeout(() => setStatus("idle"), 3000);
      } else {
        const data = await response.json().catch(() => null);
        setErrorMessage(
          data?.errors?.[0]?.message ??
            "Something went wrong. Please try again, or email me directly."
        );
        setStatus("error");
      }
    } catch {
      setErrorMessage(
        "Couldn't reach the server. Check your connection and try again."
      );
      setStatus("error");
    }
  }

  const loading = status === "loading";
  const success = status === "success";
  const error = status === "error";

  return (
    <motion.form
      ref={formRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className="glass relative overflow-hidden rounded-2xl border border-white/10 p-5 sm:rounded-3xl sm:p-8"
    >
      {/* Background Glow */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div
        className="relative z-10"
        style={{ transform: "translateZ(24px)" }}
      >
        <h3 className="text-2xl font-bold sm:text-3xl">
          Let's Build Something Amazing
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
          Have an idea, opportunity, or project in mind? Fill out the form
          below and I'll get back to you as soon as possible.
        </p>

        <div className="mt-7 space-y-5 sm:mt-10 sm:space-y-6">
          {/* Honeypot — hidden from real visitors, catches bots.
              Formspree silently drops any submission where this is filled. */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
            aria-hidden="true"
          />
          <input type="hidden" name="_subject" value="New Portfolio Contact" />

          {/* Name */}
          <div className="relative">
            <User
              size={20}
              className="absolute left-4 top-1/2 text-cyan-400 sm:left-5"
              style={{ transform: "translateY(-50%) translateZ(16px)" }}
            />
            <input
              id="contact-name"
              name="name"
              required
              placeholder=" "
              className={fieldClasses}
            />
            <label htmlFor="contact-name" className={floatingLabelClasses}>
              Your Name
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <Mail
              size={20}
              className="absolute left-4 top-1/2 text-cyan-400 sm:left-5"
              style={{ transform: "translateY(-50%) translateZ(16px)" }}
            />
            <input
              id="contact-email"
              name="email"
              required
              type="email"
              placeholder=" "
              className={fieldClasses}
            />
            <label htmlFor="contact-email" className={floatingLabelClasses}>
              Email Address
            </label>
          </div>

          {/* Purpose */}
          <div className="relative">
            <Pencil
              size={20}
              className="absolute left-4 top-1/2 text-cyan-400 sm:left-5"
              style={{ transform: "translateY(-50%) translateZ(16px)" }}
            />
            <select
              id="contact-purpose"
              name="purpose"
              required
              defaultValue=""
              className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:shadow-[0_0_25px_rgba(34,211,238,.2)] sm:pl-14 sm:pr-5 sm:text-base"
            >
              <option value="" disabled>
                Purpose of Contact
              </option>
              <option>Internship Opportunity</option>
              <option>Full-Time Opportunity</option>
              <option>Freelance Project</option>
              <option>Collaboration</option>
              <option>General Inquiry</option>
              <option>Other</option>
            </select>
          </div>

          {/* Message */}
          <div className="relative">
            <MessageSquare
              size={20}
              className="absolute left-4 top-5 text-cyan-400 sm:left-5"
              style={{ transform: "translateZ(16px)" }}
            />
            <textarea
              id="contact-message"
              name="message"
              required
              rows={6}
              maxLength={MAX_MESSAGE_LENGTH}
              placeholder="Tell me about your project, opportunity, or idea..."
              onChange={(e) => setMessageLength(e.target.value.length)}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 pb-8 text-sm outline-none transition-all duration-300 focus:border-cyan-400 focus:shadow-[0_0_25px_rgba(34,211,238,.2)] sm:pl-14 sm:pr-5 sm:text-base"
            />
            <span className="pointer-events-none absolute bottom-3 right-5 text-xs text-slate-500">
              {messageLength}/{MAX_MESSAGE_LENGTH}
            </span>
          </div>
        </div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              className="mt-6 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300"
            >
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <p>{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit */}
        <div
          className="relative mt-7 sm:mt-10"
          style={{ transform: "translateZ(20px)" }}
        >
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl"
          />

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading && !success ? { scale: 1.03 } : {}}
            whileTap={{ scale: 0.97 }}
            className="group relative flex h-12 w-full items-center justify-center rounded-full bg-cyan-400 text-sm font-semibold text-slate-950 shadow-[0_0_40px_rgba(34,211,238,.35)] disabled:cursor-not-allowed disabled:opacity-80 sm:h-14 sm:text-base"
          >
            <AnimatePresence mode="wait">
              {status === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  Send Message
                  <motion.div
                    whileHover={{ x: 6, y: -2, rotate: -18 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Send size={18} />
                  </motion.div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  <Send size={18} />
                  Try Again
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
                  <Loader2 size={20} className="animate-spin" />
                  Sending...
                </motion.div>
              )}

              {success && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: [1, 0.92, 1.06, 1] }}
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

