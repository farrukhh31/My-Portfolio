"use client";

type Props = {
  total: number;
  current: number;
};

export default function ProgressBar({
  total,
  current,
}: Props) {
  const width =
    total <= 1
      ? 100
      : ((current + 1) / total) * 100;

  return (
    <div className="mx-auto mt-8 w-56">
      <div className="h-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-400 transition-all duration-500"
          style={{
            width: `${width}%`,
          }}
        />
      </div>

      <p className="mt-3 text-center text-sm text-slate-500">
        {current + 1} / {total}
      </p>
    </div>
  );
}