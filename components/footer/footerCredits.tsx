export default function FooterCredits() {
  return (
    <div className="mt-14 text-center">

      <p className="text-slate-400">
        Built with
      </p>

      <div className="mt-4 flex flex-wrap justify-center gap-3">

        {[
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind",
          "Framer Motion",
        ].map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300"
          >
            {tech}
          </span>
        ))}

      </div>

      <p className="mt-10 text-sm text-slate-500">
        © {new Date().getFullYear()} Farrukh Ahmad.
        Crafted with ❤️ using modern web technologies.
      </p>

    </div>
  );
}