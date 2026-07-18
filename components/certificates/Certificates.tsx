"use client";

import {
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { certificates } from "./certificatesData";
import type { Certificate } from "./types";

import CertificateHero from "./certificateHero";
import CertificateDetails from "./certificateDetails";
import CertificateStrip from "./certificateStrip";
import CertificateSkeleton from "./certificateSkeleton";


const FILTERS: {
  label: string;
  value: "all" | Certificate["category"];
}[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Game Dev",
    value: "game-dev",
  },
  {
    label: "AI",
    value: "ai",
  },
  {
    label: "Web Dev",
    value: "web-dev",
  },
];


export default function Certificates() {

  const [filter, setFilter] =
    useState<(typeof FILTERS)[number]["value"]>("all");


  const [activeIndex, setActiveIndex] =
    useState(0);


  const [loading, setLoading] =
    useState(false);


  const touchStart =
    useRef<number | null>(null);



  const filtered = useMemo(() => {

    if (filter === "all")
      return certificates;


    return certificates.filter(
      (item) =>
        item.category === filter
    );

  }, [filter]);



  const active =
    filtered[
      Math.min(
        activeIndex,
        filtered.length - 1
      )
    ];



  const next = () => {

    setLoading(true);

    setTimeout(() => {

      setActiveIndex((prev) =>
        prev === filtered.length - 1
          ? 0
          : prev + 1
      );

      setLoading(false);

    }, 250);

  };



  const previous = () => {

    setLoading(true);

    setTimeout(() => {

      setActiveIndex((prev) =>
        prev === 0
          ? filtered.length - 1
          : prev - 1
      );

      setLoading(false);

    },250);

  };



  const goHome = () => {

    setActiveIndex(0);

  };


  const goEnd = () => {

    setActiveIndex(
      filtered.length - 1
    );

  };



  useEffect(() => {

    setActiveIndex(0);

  },[filter]);



  // Auto Play removed: the certificate now only changes when the user
  // explicitly triggers next/previous (via click, keyboard arrows, or
  // swipe) — no more automatic interval-driven advancing.




  // Keyboard Controls

  useEffect(() => {


    const handle =
      (e:KeyboardEvent)=>{


      if(
        e.target instanceof HTMLInputElement
      )
        return;



      switch(e.key){


        case "ArrowRight":
          next();
          break;


        case "ArrowLeft":
          previous();
          break;


        case "Home":
          goHome();
          break;


        case "End":
          goEnd();
          break;


      }

    };



    window.addEventListener(
      "keydown",
      handle
    );


    return()=> 
      window.removeEventListener(
        "keydown",
        handle
      );


  },[filtered]);




  // Swipe Support

  const handleTouchStart =
    (e:React.TouchEvent)=>{

      touchStart.current =
        e.touches[0].clientX;

    };



  const handleTouchEnd =
    (e:React.TouchEvent)=>{


      if(
        touchStart.current === null
      )
        return;



      const difference =
        touchStart.current -
        e.changedTouches[0].clientX;



      if(
        difference > 60
      )
        next();



      if(
        difference < -60
      )
        previous();



      touchStart.current=null;

    };





  if(!active)
    return null;



  return (

<section
id="certificates"
className="
relative
min-h-screen
overflow-hidden
flex
items-center
"
>


<div className="
absolute
inset-0
overflow-hidden
">


<div
className="
absolute
left-1/2
top-1/2
h-[600px]
w-[600px]
-translate-x-1/2
-translate-y-1/2
rounded-full
bg-cyan-500/10
blur-[180px]
"
/>


</div>



<div
className="
container-width
relative
z-10
w-full
"
>



<motion.div
initial={{
opacity:0,
y:20
}}
whileInView={{
opacity:1,
y:0
}}
viewport={{
once:true
}}
className="text-center"
>


<p className="
uppercase
tracking-[0.35em]
text-cyan-400
">
Learning Journey
</p>


<h2 className="
mt-4
text-5xl
font-black
text-white
">
Certificates
</h2>


<p className="
mx-auto
mt-5
max-w-2xl
text-slate-400
">
Verified certifications and continuous learning across Game Development, Artificial Intelligence and Modern Web Technologies.
</p>


</motion.div>





<div
className="
mt-10
flex
flex-wrap
justify-center
gap-4
"
>


{
FILTERS.map(item=>(


<button
key={item.value}
onClick={()=>setFilter(item.value)}
className={`
rounded-full
border
px-6
py-3
transition-all
duration-300

${
filter===item.value
?
"border-cyan-400 bg-cyan-400/15 text-cyan-300"
:
"border-white/10 bg-white/5 text-slate-400 hover:border-cyan-400/30 hover:text-white"
}

`}
>

{item.label}

</button>))
}
</div>
<div
onTouchStart={handleTouchStart}
onTouchEnd={handleTouchEnd}

className="
mt-12
grid
items-center
gap-12
lg:grid-cols-[1.4fr_.9fr]
"
>



{
loading ?

<CertificateSkeleton/>

:

<>


<AnimatePresence mode="wait">


<motion.div

key={active.id+"hero"}

initial={{
opacity:0,
x:-50,
scale:.98
}}

animate={{
opacity:1,
x:0,
scale:1
}}

exit={{
opacity:0,
x:-50,
scale:.98
}}

transition={{
duration:.55,
ease:[0.22,1,0.36,1]
}}

>

<CertificateHero
certificate={active}
onPrevious={previous}
onNext={next}
/>


</motion.div>


</AnimatePresence>





<AnimatePresence mode="wait">


<motion.div

key={active.id+"details"}

initial={{
opacity:0,
x:50
}}

animate={{
opacity:1,
x:0
}}

exit={{
opacity:0,
x:50
}}

transition={{
duration:.55,
ease:[0.22,1,0.36,1]
}}

>


<CertificateDetails
certificate={active}
/>


</motion.div>


</AnimatePresence>



</>

}



</div>





<CertificateStrip

certificates={filtered}

activeIndex={activeIndex}

onSelect={setActiveIndex}

/>





</div>


</section>

  );

}