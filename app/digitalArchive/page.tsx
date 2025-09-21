import React from 'react'
import Image from "next/image";

const cardData = [
  {
    img: "/digital/d1.jpeg",
    title: "Thangka Painting",
    description:
      "The thangka is very much a part of Sikkimese Buddhism and it is painted in the traditional Tibetan style. A thangka could depict a deity, a mandala (geometric figure with symbolic meaning that is also used as an aid in meditation), or a spiritually significant event from the life of a Buddhist master.",
    link: null,
  },
  {
    img: "/digital/d2.jpg",
    title: "dpal spungs thub bstan chos 'khor gling gi spar gzhiʼi gsung rab pe cin dpe mdzod khang du bzhugs su gsol baʼi gsung 'bum gyi dkar chag",
    description: null,
    link: "https://library.bdrc.io/show/bdr:W3KG174?s=%2Fshow%2Fbdr%3AMW3KG174#open-viewer",
  },
  {
    img: "/digital/d3.jpg",
    title: null,
    description: null,
    link: "https://library.bdrc.io/show/bdr:W1KG22448?s=%2Fshow%2Fbdr%3AMW1KG22448%3Fs%3D%252Fosearch%252Fsearch%253FprintMethod%25255B0%25255D%25253DPrintMethod_Manuscript%252526q%25253Dsikkim%25252520in%25252520the%25252520nyingmapa%25252520tradition#open-viewer."
  },
  {
    img: "/digital/d4.jpg",
    title: null,
    description: null,
    link: "https://library.bdrc.io/show/bdr:W1KG26281?s=%2Fshow%2Fbdr%3AMW1KG26281%3Fs%3D%252Fosearch%252Fsearch%253FinCollection%25255B0%25255D%25253DPR1LOKESH01#open-viewer"
  }
];

type Props = {}

function DigitalArchive({}: Props) {
  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Digital Archive</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {cardData.map((card, i) => (
          <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-4">
            <div className="w-full h-56 relative mb-4">
              <Image src={card.img} alt={card.title || `Digital Archive ${i+1}`} fill style={{objectFit:'cover'}}/>
            </div>
            {card.title && <h2 className="text-lg font-semibold mb-2 text-center">{card.title}</h2>}
            {card.description && <p className="text-sm text-gray-700 mb-2 text-center">{card.description}</p>}
            {card.link && (
              <a href={card.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mt-auto">View More</a>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

export default DigitalArchive