"use client";

import {
    motion,
    useMotionTemplate,
    useMotionValue,
} from "framer-motion";

export default function ScrollSpotlight(){

    const x=useMotionValue(-500);
    const y=useMotionValue(-500);

    return(

        <motion.div

        onMouseMove={(e)=>{

            x.set(e.clientX);

            y.set(e.clientY);

        }}

        className="absolute inset-0"

        style={{

background:useMotionTemplate`
radial-gradient(
250px circle at ${x}px ${y}px,
rgba(34,211,238,.12),
transparent 70%)
`

        }}

        />

    )

}