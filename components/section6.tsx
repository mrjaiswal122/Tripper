import { inriaSerif, italianno } from "@/libs/font";
import React from "react";

const Section6 = () => {
  return (
    <section
      className="relative h-[75vh] w-full bg-cover bg-center my-10  overflow-hidden"
      style={{ backgroundImage: "url('./explore.jpg')" }} // Place image inside /public
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0  flex items-center ml-20 ">
        <div className="text-left text-white max-w-3xl px-6">
          {/* Title */}
          <h1 className={` ${inriaSerif.className}text-2xl md:text-4xl font-extrabold mb-6 drop-shadow-lg`}>
            Begin Your Journey Through the Monasteries of Sikkim
          </h1>

          {/* Subtitle */}
          <p className={`${italianno.className} text-5xl italic mb-8`}>
            From 360° virtual tours to travel guides, let your spiritual and cultural journey begin here.
          </p>

          {/* Clickable Text (acts as button) */}
          <a
          href="/monasteries"
          className="inline-block hover:scale-105  ease-in px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-300 hover:shadow-lg transition-all duration-300"
        >
        EXPLORE NOW →
</a>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 rotate-90"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </section>
  );
};

export default Section6;