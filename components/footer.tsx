import React from "react";
import { Youtube, Twitter, Instagram, Facebook } from "lucide-react";
import { inriaSerif } from "@/libs/font";

type Props = {};

function Footer({}: Props) {
  return (
    <footer
      className={`bg-[#757B66] w-screen py-10   gap-10 ${inriaSerif.className} `}
    >
      <div className="w-[85vw] flex mx-auto">
        <section className="flex-1 ">
          <div className="space-y-6  text-white">
            <h1>Sikkim Yatra</h1>
            <h2>Preserving Culture, Experiencing Spirituality</h2>
            <img src="fullLogo.png" alt="full logo" className="h-10 w-40" />
            <p className="">
              “A Project to Preserve the Spiritual Heritage of Sikkim”
            </p>
          </div>
          {/* Socilas */}
          <div className="flex gap-3  mt-6 text-white">
            <Youtube></Youtube>
            <Facebook />
            <Twitter />
            <Instagram></Instagram>
          </div>
        </section>
        <section className="flex flex-1 text-white justify-between">
          <div className="flex flex-col">
            <div className="text-2xl my-3">QUICK LINKS</div>
            <a href="">Home</a>
            <a href="">Monasteries</a>
            <a href="">360° Tours</a>
            <a href="">Guides & Hotels</a>
            <a href="">Digital Archive</a>
          </div>
          <div className="flex flex-col">
            <div className="text-2xl my-3">OUR SERVICES</div>
            <a href="">News Subscription</a>
            <a href="">Trip planner</a>
            <a href="">Events</a>
            <a href="">Adventure</a>
            <a href="">AUA (Ask us anything)</a>
          </div>
          <div className="flex flex-col">
            <div className="text-2xl my-3">TRAVEL ESSENTIALS</div>
            <a href="">Protected Area Permit (PAP)</a>
            <a href="">Restricted Area Permit (RAP)</a>
            <a href="">Travel Agents</a>
            <a href="">TICs</a>
          </div>
        </section>
      </div>
      <div className="w-[85vw] mx-auto h-[2px] mt-6 bg-white"></div>
      <div className="text-white text-sm mx-auto w-fit flex gap-1 mt-3 fort-semi">
        Copyright 2025 <div className="font-bold"> Sikkim Yatra pvt ltd.</div>{" "}
      </div>
    </footer>
  );
}

export default Footer;
