// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";
// import {
//   BrainCircuit,
//   Gamepad2,
//   GraduationCap,
//   Loader2,
//   CheckCircle2,
// } from "lucide-react";

// import type { Certificate } from "./certificatesData";

// type Props = {
//   certificate: Certificate;
// };

// const icons = {
//   "game-dev": Gamepad2,
//   ai: BrainCircuit,
//   "web-dev": GraduationCap,
// };

// export default function CertificatePreview({
//   certificate,
// }: Props) {
//   const Icon = icons[certificate.category];

//   const completed =
//     certificate.status === "completed";

//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//         y: 30,
//       }}
//       animate={{
//         opacity: 1,
//         y: 0,
//       }}
//       transition={{
//         duration: 0.6,
//       }}
//       className="
//         relative
//         h-[560px]
//         overflow-hidden
//         rounded-[36px]
//         border
//         border-white/10
//         bg-white/[0.04]
//         p-8
//         backdrop-blur-2xl
//       "
//     >
//       {/* Glow */}
//       <div
//         className="
//           absolute
//           -left-20
//           -top-20
//           h-60
//           w-60
//           rounded-full
//           bg-cyan-500/15
//           blur-[120px]
//         "
//       />

//       {completed ? (
//         <motion.div
//           animate={{
//             y: [0, -8, 0],
//           }}
//           transition={{
//             repeat: Infinity,
//             duration: 5,
//           }}
//           className="
//             relative
//             flex
//             h-full
//             items-center
//             justify-center
//           "
//         >
//           <Image
//             src={certificate.image!}
//             alt={certificate.title}
//             width={900}
//             height={650}
//             className="
//               max-h-full
//               w-auto
//               rounded-2xl
//               border
//               border-white/10
//               shadow-2xl
//             "
//             priority
//           />

//           {/* Shine */}

//           <motion.div
//             animate={{
//               x: [
//                 "-120%",
//                 "180%",
//               ],
//             }}
//             transition={{
//               repeat: Infinity,
//               duration: 4,
//               ease: "linear",
//             }}
//             className="
//               absolute
//               left-0
//               top-0
//               h-full
//               w-40
//               -rotate-12
//               bg-gradient-to-r
//               from-transparent
//               via-white/20
//               to-transparent
//             "
//           />
//         </motion.div>
//       ) : (
//         <div
//           className="
//             relative
//             flex
//             h-full
//             flex-col
//             items-center
//             justify-center
//             text-center
//           "
//         >
//           <div
//             className="
//               flex
//               h-28
//               w-28
//               items-center
//               justify-center
//               rounded-full
//               bg-cyan-500/10
//             "
//           >
//             <Icon
//               size={56}
//               className="text-cyan-400"
//             />
//           </div>

//           <span
//             className="
//               mt-8
//               flex
//               items-center
//               gap-2
//               rounded-full
//               border
//               border-amber-400/30
//               bg-amber-400/10
//               px-5
//               py-2
//               text-sm
//               text-amber-300
//             "
//           >
//             <Loader2
//               size={16}
//               className="animate-spin"
//             />
//             Currently Learning
//           </span>

//           <h3
//             className="
//               mt-8
//               text-3xl
//               font-bold
//               text-white
//             "
//           >
//             {certificate.title}
//           </h3>

//           <p
//             className="
//               mt-3
//               max-w-md
//               text-slate-400
//             "
//           >
//             {certificate.description}
//           </p>

//           <div className="mt-10 w-full max-w-sm">
//             <div
//               className="
//                 h-3
//                 overflow-hidden
//                 rounded-full
//                 bg-white/10
//               "
//             >
//               <motion.div
//                 initial={{
//                   width: 0,
//                 }}
//                 animate={{
//                   width: `${certificate.progress}%`,
//                 }}
//                 transition={{
//                   duration: 1,
//                 }}
//                 className="
//                   h-full
//                   rounded-full
//                   bg-gradient-to-r
//                   from-cyan-400
//                   via-sky-400
//                   to-fuchsia-500
//                 "
//               />
//             </div>

//             <div
//               className="
//                 mt-3
//                 flex
//                 justify-between
//                 text-sm
//               "
//             >
//               <span className="text-slate-400">
//                 Progress
//               </span>

//               <span className="font-semibold text-cyan-300">
//                 {certificate.progress}%
//               </span>
//             </div>
//           </div>

//           <div
//             className="
//               mt-10
//               rounded-full
//               border
//               border-cyan-400/20
//               bg-cyan-400/10
//               px-5
//               py-2
//               text-cyan-300
//             "
//           >
//             Expected Completion •{" "}
//             {certificate.expectedCompletion}
//           </div>
//         </div>
//       )}

//       {completed && (
//         <div
//           className="
//             absolute
//             right-6
//             top-6
//             flex
//             items-center
//             gap-2
//             rounded-full
//             border
//             border-emerald-400/30
//             bg-emerald-400/10
//             px-4
//             py-2
//             text-sm
//             text-emerald-300
//           "
//         >
//           <CheckCircle2 size={18} />
//           Verified
//         </div>
//       )}
//     </motion.div>
//   );
// }