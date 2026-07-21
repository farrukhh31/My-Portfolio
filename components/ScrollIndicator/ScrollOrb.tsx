"use client";

import {
    motion,
    MotionValue,
    useMotionValueEvent,
} from "framer-motion";

import { useState } from "react";

type Props = {
    position: {
        x: number;
        y: number;
        angle: number;
    };

    velocity: MotionValue<number>;
};

export default function ScrollOrb({
    position,
    velocity,
}: Props) {

    const [stretch, setStretch] = useState(1);

    useMotionValueEvent(
        velocity,
        "change",
        latest => {

            const amount = Math.min(
                Math.abs(latest) * 10,
                0.35
            );

            setStretch(1 + amount);

        }
    );

    return (

        <motion.div

            animate={{

                left: `${position.x}%`,

                top: `${position.y / 10}%`,

                rotate: position.angle,

                scaleX: stretch,

                scaleY: 2 - stretch,

            }}

            transition={{

                left: {
                    type: "spring",
                    stiffness: 250,
                    damping: 22,
                },

                top: {
                    type: "spring",
                    stiffness: 250,
                    damping: 22,
                },

                rotate: {
                    type: "spring",
                    stiffness: 180,
                },

                scaleX: {
                    duration: .18,
                },

                scaleY: {
                    duration: .18,
                },

            }}

            className="absolute z-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none"

        >

            {/* HUGE OUTER GLOW */}

            <motion.div

                animate={{

                    scale: [1, 1.25, 1],

                    opacity: [.25, .45, .25],

                }}

                transition={{

                    repeat: Infinity,

                    duration: 3,

                }}

                className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 blur-3xl"

            />

            {/* PULSE RING */}

            <motion.div

                animate={{

                    scale: [1, 1.9],

                    opacity: [.8, 0],

                }}

                transition={{

                    repeat: Infinity,

                    duration: 2,

                    ease: "easeOut",

                }}

                className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300"

            />

            {/* GLASS SHELL */}

            <div

                className="
                absolute
                left-1/2
                top-1/2
                h-8
                w-8
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-white/40
                bg-white/10
                backdrop-blur-xl
                "

            />

            {/* CORE */}

            <motion.div

                animate={{

                    scale: [1, 1.12, 1],

                }}

                transition={{

                    repeat: Infinity,

                    duration: 2,

                }}

                className="
                relative
                h-5
                w-5
                rounded-full
                bg-linear-to-br
                from-cyan-200
                via-cyan-300
                to-cyan-500
                shadow-[0_0_35px_rgba(34,211,238,.95)]
                "

            />

            {/* PARTICLE 1 */}

            <motion.div

                animate={{

                    rotate: 360,

                }}

                transition={{

                    repeat: Infinity,

                    duration: 4,

                    ease: "linear",

                }}

                className="absolute inset-0"

            >

                <div className="absolute left-1/2 -top-3 h-2 w-2 rounded-full bg-cyan-200" />

            </motion.div>

            {/* PARTICLE 2 */}

            <motion.div

                animate={{

                    rotate: -360,

                }}

                transition={{

                    repeat: Infinity,

                    duration: 5,

                    ease: "linear",

                }}

                className="absolute inset-0"

            >

                <div className="absolute -left-2 top-1/2 h-2 w-2 rounded-full bg-cyan-300" />

            </motion.div>

            {/* PARTICLE 3 */}

            <motion.div

                animate={{

                    rotate: 360,

                }}

                transition={{

                    repeat: Infinity,

                    duration: 6,

                    ease: "linear",

                }}

                className="absolute inset-0"

            >

                <div className="absolute right-0 bottom-0 h-1.5 w-1.5 rounded-full bg-cyan-100" />

            </motion.div>

        </motion.div>

    );

}