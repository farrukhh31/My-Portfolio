// "use client";

// import { motion } from "framer-motion";
// import {
//   Calendar,
//   Building2,
//   CheckCircle2,
//   Clock3,
//   Award,
//   ExternalLink,
// } from "lucide-react";

// import type { Certificate } from "./certificatesData";

// type Props = {
//   certificate: Certificate;
// };

// export default function CertificateInfo({
//   certificate,
// }: Props) {
//   const completed =
//     certificate.status === "completed";

//   return (
//     <motion.div
//       key={certificate.id}
//       initial={{
//         opacity: 0,
//         x: 30,
//       }}
//       animate={{
//         opacity: 1,
//         x: 0,
//       }}
//       exit={{
//         opacity: 0,
//         x: -30,
//       }}
//       transition={{
//         duration: 0.45,
//       }}
//       className="
//         flex
//         h-[560px]
//         flex-col
//         rounded-[36px]
//         border
//         border-white/10
//         bg-white/[0.04]
//         p-8
//         backdrop-blur-2xl
//       "
//     >
//       {/* Badge */}

//       {completed ? (
//         <div
//           className="
//             mb-6
//             inline-flex
//             w-fit
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
//           Verified Certificate
//         </div>
//       ) : (
//         <div
//           className="
//             mb-6
//             inline-flex
//             w-fit
//             items-center
//             gap-2
//             rounded-full
//             border
//             border-amber-400/30
//             bg-amber-400/10
//             px-4
//             py-2
//             text-sm
//             text-amber-300
//           "
//         >
//           <Clock3 size={18} />
//           Currently Learning
//         </div>
//       )}

//       {/* Title */}

//       <h2
//         className="
//           text-4xl
//           font-black
//           leading-tight
//           text-white
//         "
//       >
//         {certificate.title}
//       </h2>

//       {/* Issuer */}

//       <div
//         className="
//           mt-6
//           flex
//           items-center
//           gap-3
//           text-slate-300
//         "
//       >
//         <Building2 size={18} />

//         {certificate.issuer}
//       </div>

//       {/* Year */}

//       <div
//         className="
//           mt-3
//           flex
//           items-center
//           gap-3
//           text-slate-400
//         "
//       >
//         <Calendar size={18} />

//         {completed
//           ? certificate.year
//           : certificate.expectedCompletion}
//       </div>

//       {/* Description */}

//       {certificate.description && (
//         <p
//           className="
//             mt-8
//             leading-8
//             text-slate-400
//           "
//         >
//           {certificate.description}
//         </p>
//       )}

//       {/* Skills */}

//       <div className="mt-10">

//         <h3
//           className="
//             mb-4
//             text-lg
//             font-semibold
//             text-white
//           "
//         >
//           Skills Covered
//         </h3>

//         <div className="flex flex-wrap gap-3">
//           {certificate.skills.map((skill) => (
//             <motion.div
//               whileHover={{
//                 scale: 1.05,
//               }}
//               key={skill}
//               className="
//                 rounded-full
//                 border
//                 border-cyan-400/20
//                 bg-cyan-400/10
//                 px-4
//                 py-2
//                 text-sm
//                 text-cyan-300
//               "
//             >
//               {skill}
//             </motion.div>
//           ))}
//         </div>

//       </div>

//       {/* Progress */}

//       {!completed && (
//         <div className="mt-10">

//           <div
//             className="
//               flex
//               justify-between
//               text-sm
//             "
//           >
//             <span className="text-slate-400">
//               Overall Progress
//             </span>

//             <span className="font-semibold text-cyan-300">
//               {certificate.progress}%
//             </span>
//           </div>

//           <div
//             className="
//               mt-3
//               h-2.5
//               overflow-hidden
//               rounded-full
//               bg-white/10
//             "
//           >
//             <motion.div
//               initial={{
//                 width: 0,
//               }}
//               animate={{
//                 width: `${certificate.progress}%`,
//               }}
//               transition={{
//                 duration: 1,
//               }}
//               className="
//                 h-full
//                 rounded-full
//                 bg-gradient-to-r
//                 from-cyan-400
//                 via-sky-400
//                 to-fuchsia-500
//               "
//             />
//           </div>

//         </div>
//       )}

//       {/* Credential */}

//       {completed && certificate.credentialId && (
//         <div className="mt-10">

//           <div
//             className="
//               flex
//               items-center
//               gap-3
//               text-slate-400
//             "
//           >
//             <Award size={18} />

//             Credential ID
//           </div>

//           <p
//             className="
//               mt-2
//               rounded-xl
//               bg-black/20
//               px-4
//               py-3
//               font-mono
//               text-cyan-300
//             "
//           >
//             {certificate.credentialId}
//           </p>

//         </div>
//       )}

//       {/* Button */}

//       <div className="mt-auto">

//         {completed ? (
//           <a
//             href={certificate.pdf || certificate.link}
//             target="_blank"
//             rel="noreferrer"
//             className="
//               inline-flex
//               items-center
//               gap-3
//               rounded-full
//               bg-cyan-500
//               px-7
//               py-3
//               font-semibold
//               text-slate-950
//               transition
//               hover:scale-105
//             "
//           >
//             View Certificate

//             <ExternalLink size={18} />
//           </a>
//         ) : (
//           <div
//             className="
//               rounded-2xl
//               border
//               border-cyan-400/20
//               bg-cyan-400/5
//               p-5
//             "
//           >
//             <p className="text-cyan-300">
//               🚀 This certification is currently in
//               progress. The certificate will appear
//               here after successful completion.
//             </p>
//           </div>
//         )}

//       </div>

//     </motion.div>
//   );
// }