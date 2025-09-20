// "use client";
// import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
// import { TextRollUpEffect } from "./ui/text-rollup-effect";
// import { inriaSerif } from "@/libs/font";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// type Props = {};
// const mapper = [
//   {
//     imageUrl: "/main.jpg",
//     name: "",
//   },
//   {
//     imageUrl: "/main2.webp",
//     name: "",
//   },
//   {
//     imageUrl: "/main3.jpg",
//     name: "",
//   },
//   {
//     imageUrl: "/main4.jpg",
//     name: "",
//   },
// ];

// function Mapper() {
//   const [frame, setFrame] = useState(0);
//   const containerRef = useRef<(HTMLDivElement | null)[]>([]);
//   const timelineRef = useRef<gsap.core.Timeline | null>(null);

//   // Cleanup for refs
//   useEffect(() => {
//     return () => {
//       containerRef.current = [];
//       if (timelineRef.current) {
//         timelineRef.current.kill();
//       }
//     };
//   }, []);

//   // Animate frame change
//   useGSAP(
//     () => {
//       if (!containerRef.current[frame]) return;
//       gsap.to(containerRef.current, {
//         x: -frame * window.innerWidth,
//         duration: 0.7,
//         ease: "power2.inOut",
//       });
//     },
//     { dependencies: [frame], scope: containerRef }
//   );

//   // Timeline for auto-advancing frames
//   const startTimeline = () => {
//     if (timelineRef.current) {
//       timelineRef.current.kill();
//     }
//     const tl = gsap.timeline({ repeat: -1 });
//     for (let i = 1; i <= mapper.length; i++) {
//       tl.to({}, {
//         duration: 3,
//         onComplete: () => {
//           setFrame(prev => (prev + 1) % mapper.length);
//         },
//       });
//     }
//     timelineRef.current = tl;
//   };

//   const stopTimeline = () => {
//     if (timelineRef.current) {
//       timelineRef.current.kill();
//       timelineRef.current = null;
//     }
//   };

//   useEffect(() => {
//     startTimeline();
//     return () => {
//       stopTimeline();
//     };
//   }, []);
//   return (
//     <>
//       <div
//         className="w-fit flex relative"
//         style={{ transform: `translateX(${-frame * 100}vw)` }}
//       >
//         {mapper.map((data, index) => (
//           <div
//             ref={(ref) => {
//               containerRef.current[index] = ref;
//             }}
//             key={index}
//             className="w-[100vw] h-[100vh] relative"
//           >
//             <img
//               src={data.imageUrl}
//               alt={data.name}
//               className="w-full h-full object-cover"
//             />
//             <div
//               className={` ${inriaSerif.className} absolute left-1/2 top-[80%] text-nowrap -translate-x-1/2 text-4xl text-white w-fit h-fit`}
//             >
//               <h1 className=" text-center italic font-bold flex">
//                 “
//                 <TextRollUpEffect>
//                   Discover the Living Heritage of Sikkim’s Monasteries
//                 </TextRollUpEffect>
//                 ”.
//               </h1>
//               <h2 className="text-3xl text-center flex justify-center">
//                 <a href="#" className="capitalize pr-2">
//                   Explore Monasteries
//                 </a>
//                 <a href="#" className="capitalize pr-2">
//                   | Virtual Tour
//                 </a>
//                 <a href="#" className="capitalize pr-2">
//                   | Plan Your Visit.
//                 </a>
//               </h2>
//             </div>
//             <Control frame={frame} setFrame={setFrame} stop={stopTimeline} />
//           </div>
//         ))}
//         {/* Controls */}
//       </div>
//     </>
//   );
// }
// export { Mapper };

// type ControlProps = {
//   setFrame: Dispatch<SetStateAction<number>>;
//   frame: number;
//   stop:()=>void;
// };
// function Control({ setFrame, frame,stop }: ControlProps) {
//   return (
//     <div className="absolute outline-2 top-[93%] left-[50vw] -translate-x-1/2 flex gap-3">
//       {mapper.map((_, i) => (
//         <button
//           key={i}
//           onClick={() => setFrame(i)}
//           className={`h-2 w-2 cursor-pointer  outline-offset-2 ${
//             i == frame ? "outline-2" : ""
//           } outline-white rounded-full bg-white`}
//         ></button>
//       ))}
//       <button onClick={stop} className="pl-10 border" > Stop</button>
//     </div>
//   );
// }
"use client";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { TextRollUpEffect } from "./ui/text-rollup-effect";
import { inriaSerif } from "@/libs/font";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type Props = {};

const mapper = [
  {
    imageUrl: "/main.jpg",
    name: "Monastery View 1",
  },
  {
    imageUrl: "/main2.webp", 
    name: "Monastery View 2",
  },
  {
    imageUrl: "/main3.jpg",
    name: "Monastery View 3", 
  },
  {
    imageUrl: "/main4.jpg",
    name: "Monastery View 4",
  },
];

function Mapper() {
  const [frame, setFrame] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Cleanup for refs
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  // Animate frame change using GSAP only
  useGSAP(
    () => {
      if (!wrapperRef.current) return;
      
      gsap.to(wrapperRef.current, {
        x: -frame * 100 + "%",
        duration: 0.7,
        ease: "power2.inOut",
      });
    },
    { dependencies: [frame] }
  );

  // Timeline for auto-advancing frames
  const startTimeline = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    
    const tl = gsap.timeline({ repeat: -1 });
    
    // Create a sequence for all frames
    for (let i = 0; i < mapper.length; i++) {
      tl.to({}, {
        duration: 3,
        onStart: () => {
          setFrame(i);
        },
      });
    }
    
    timelineRef.current = tl;
  };

  const stopTimeline = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    setIsAutoPlaying(false);
  };

  const resumeTimeline = () => {
    startTimeline();
    setIsAutoPlaying(true);
  };

  const handleManualNavigation = (newFrame: number) => {
    setFrame(newFrame);
    // Restart timeline after manual navigation to sync with the new frame
    if (isAutoPlaying) {
      setTimeout(() => {
        startTimeline();
      }, 100); // Small delay to ensure state update completes
    }
  };

  // Initialize timeline
  useEffect(() => {
    startTimeline();
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      const editable = !!target && (target as HTMLElement).isContentEditable;
      const insideDialog = !!target && !!target.closest('[role="dialog"]');
      if (editable || tag === 'INPUT' || tag === 'TEXTAREA' || insideDialog) {
        return;
      }

      if (event.key === 'ArrowLeft') {
        handleManualNavigation((frame - 1 + mapper.length) % mapper.length);
      } else if (event.key === 'ArrowRight') {
        handleManualNavigation((frame + 1) % mapper.length);
      } else if (event.key === ' ') {
        event.preventDefault();
        isAutoPlaying ? stopTimeline() : resumeTimeline();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [frame, isAutoPlaying]);

  return (
    <div 
      className="w-full h-screen overflow-hidden relative"
      role="region"
      aria-label="Monastery image carousel"
    >
      <div
        ref={wrapperRef}
        className="w-fit flex relative"
        style={{ width: `${mapper.length * 100}vw` }}
      >
        {mapper.map((data, index) => (
          <div
            key={index}
            className="w-screen h-screen relative"
            role="tabpanel"
            aria-hidden={index !== frame}
          >
            <img
              src={data.imageUrl}
              alt={data.name}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div
              className={`${inriaSerif.className} absolute left-1/2 top-[80%] text-nowrap -translate-x-1/2 text-4xl text-white w-fit h-fit`}
            >
              <h1 className="text-center italic font-bold flex flex-col  justify-center ">
                <div className="flex">

                "
                <TextRollUpEffect>
                  Discover the Living Heritage of Sikkim's Monasteries
                </TextRollUpEffect>
                "
                </div>
              </h1>
              <nav className="text-3xl text-center flex justify-center flex-wrap mt-4">
                <a 
                  href="#explore" 
                  className="capitalize pr-2 hover:underline focus:underline outline-none  rounded"
                >
                  Explore Monasteries
                </a>
                <span className="pr-2">|</span>
                <a 
                  href="#virtual-tour" 
                  className="capitalize pr-2 hover:underline focus:underline outline-none  rounded"
                >
                  Virtual Tour
                </a>
                <span className="pr-2">|</span>
                <a 
                  href="#plan-visit" 
                  className="capitalize pr-2 hover:underline focus:underline outline-none  rounded"
                >
                  Plan Your Visit
                </a>
              </nav>
            </div>
          </div>
        ))}
      </div>
      
      <Control 
        frame={frame} 
        setFrame={handleManualNavigation} 
        isAutoPlaying={isAutoPlaying}
        onStop={stopTimeline}
        onResume={resumeTimeline}
      />
    </div>
  );
}

export { Mapper };

type ControlProps = {
  setFrame: (frame: number) => void;
  frame: number;
  isAutoPlaying: boolean;
  onStop: () => void;
  onResume: () => void;
};

function Control({ setFrame, frame, isAutoPlaying, onStop, onResume }: ControlProps) {
  return (
    <div 
      className="absolute top-[94%] left-1/2 -translate-x-1/2 flex items-center gap-3"
      role="tablist"
      aria-label="Carousel navigation"
    >
      {mapper.map((_, i) => (
        <button
          key={i}
          onClick={() => setFrame(i)}
          className={`h-3 w-3 cursor-pointer transition-all duration-200 hover:scale-110 focus:scale-110 outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-transparent ${
            i === frame 
              ? "bg-black scale-125 shadow-lg" 
              : "bg-black/60 hover:bg-black/80"
          } rounded-full`}
          role="tab"
          aria-selected={i === frame}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
      
      <button 
        onClick={isAutoPlaying ? onStop : onResume}
        className="ml-6 px-3 py-1 text-sm font-medium text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-md transition-all duration-200 hover:scale-105 focus:scale-105 outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
        aria-label={isAutoPlaying ? "Pause slideshow" : "Resume slideshow"}
      >
        {isAutoPlaying ? "Pause" : "Resume"}
      </button>
    </div>
  );
}
