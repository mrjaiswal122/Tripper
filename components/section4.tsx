import { inriaSerif } from "@/libs/font";
import React from "react";

const properties = [
  {
    title: "HOTELS",
    count: "9,000 hotels",
    image: "hotel.jpg", // replace with your image path
  },
  {
    title: "HOME STAYS",
    count: "5,820 home stays",
    image: "home.jpg",
  },
  {
    title: "RESORTS",
    count: "2,030 resorts",
    image: "resort.jpg",
  },
  {
    title: "COTTAGES",
    count: "3,500 cottages",
    image: "cottage.jpg",
  },
  {
    title: "VILLAS",
    count: "600 villas",
    image: "villas.jpg",
  },
];

const  Section4= () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className={`text-2xl font-semibold mb-6 ${inriaSerif.className}`}>BROWSE BY PROPERTY TYPE</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {properties.map((property, index) => (
          <div key={index} className="group cursor-pointer overflow-hidden rounded-lg shadow-lg">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4 bg-white">
              <h3 className="font-semibold">{property.title}</h3>
              <p className="text-gray-500 text-sm">{property.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section4;
