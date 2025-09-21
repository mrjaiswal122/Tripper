
import {Mapper }from "@/components/image-courosle";
import { inriaSerif } from "@/libs/font";
import { TextRollUpEffect } from "@/components/ui/text-rollup-effect"
import Section2 from "@/components/section2";
import Section3 from "@/components/section3";
import Section6 from "@/components/section6";
import GetInTouch from "@/components/get-in-touch";
import Section4 from "@/components/section4";
import Section5 from "@/components/section5";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
<main className="w-screen ">

<Mapper/>
<Section2/>
<Section3 />
<Section4 />
{/* <Section5 /> */}
<Section6 />
<GetInTouch />
<Footer />
</main>
    </>
  );
}
