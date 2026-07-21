export default function Grid() {
  return (
    <div
      className="
      pointer-events-none
      absolute
      inset-0
      -z-30
      opacity-[0.05]
      sm:opacity-[0.06]
      bg-size-[28px_28px]
      sm:bg-size-[38px_38px]
      lg:bg-size-[50px_50px]
      [background-image:
      linear-gradient(to_right,#ffffff_1px,transparent_1px),
      linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
      "
    />
  );
}