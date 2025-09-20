'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Star, Utensils, Bed, Camera, Mountain, Heart, Clock } from "lucide-react";

const guides = [
  {
    id: 1,
    name: "Tenzin Norbu",
    specialization: "Monastery & Cultural Guide",
    experience: "12 years",
    languages: ["English", "Nepali", "Tibetan", "Hindi"],
    rating: 4.9,
    image: "/image.png",
    description: "Expert in Buddhist monasteries and Sikkimese culture with deep knowledge of Rumtek and Pemayangtse monasteries.",
    price: "₹2,500/day",
    contact: "+91-9876543210",
    email: "tenzin.guide@sikkim.com"
  },
  {
    id: 2,
    name: "Pemba Sherpa",
    specialization: "Trekking & Adventure Guide",
    experience: "8 years",
    languages: ["English", "Nepali", "Sherpa"],
    rating: 4.8,
    image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
    description: "Certified mountaineering guide specializing in Kanchenjunga region and high-altitude monastery treks.",
    price: "₹3,000/day",
    contact: "+91-9876543211",
    email: "pemba.sherpa@sikkim.com"
  },
  {
    id: 3,
    name: "Lhamo Dolkar",
    specialization: "Photography & Heritage Guide",
    experience: "6 years",
    languages: ["English", "Tibetan", "Bhutia"],
    rating: 4.7,
    image: "https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg",
    description: "Professional photographer and cultural historian specializing in monastery architecture and Buddhist art.",
    price: "₹2,800/day",
    contact: "+91-9876543212",
    email: "lhamo.photo@sikkim.com"
  }
];

const hotels = [
  {
    id: 1,
    name: "Himalayan Heritage Hotel",
    category: "Luxury",
    rating: 4.6,
    image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
    location: "Gangtok",
    price: "₹8,500/night",
    amenities: ["Free WiFi", "Spa", "Mountain View", "Restaurant", "Parking"],
    description: "Luxury hotel with traditional Sikkimese architecture and modern amenities, perfect for monastery visitors."
  },
  {
    id: 2,
    name: "Monastery View Resort",
    category: "Mid-range",
    rating: 4.3,
    image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    location: "Rumtek",
    price: "₹4,200/night",
    amenities: ["Free WiFi", "Garden", "Monastery Shuttle", "Organic Food"],
    description: "Serene resort offering direct views of Rumtek Monastery with guided meditation sessions."
  },
  {
    id: 3,
    name: "Traditional Bhutia Lodge",
    category: "Budget",
    rating: 4.1,
    image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
    location: "Pelling",
    price: "₹2,800/night",
    amenities: ["Free WiFi", "Traditional Meals", "Cultural Programs", "Trekking Gear"],
    description: "Authentic Bhutia-style accommodation with cultural immersion programs and monastery tours."
  }
];

const restaurants = [
  {
    id: 1,
    name: "Taste of Tibet",
    cuisine: "Tibetan & Bhutanese",
    rating: 4.5,
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    location: "Gangtok",
    priceRange: "₹300-800",
    specialties: ["Momos", "Thukpa", "Butter Tea", "Gundruk"],
    description: "Authentic monastery-style vegetarian cuisine with traditional recipes from local monks."
  },
  {
    id: 2,
    name: "Himalayan Kitchen",
    cuisine: "Nepali & Sikkimese",
    rating: 4.4,
    image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
    location: "Pelling",
    priceRange: "₹250-600",
    specialties: ["Dal Bhat", "Sel Roti", "Local Fish", "Organic Vegetables"],
    description: "Farm-to-table restaurant sourcing ingredients from monastery gardens and local organic farms."
  },
  {
    id: 3,
    name: "Monastery Cafe",
    cuisine: "International & Local",
    rating: 4.2,
    image: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg",
    location: "Rumtek",
    priceRange: "₹200-500",
    specialties: ["Meditation Tea", "Healthy Bowls", "Local Bread", "Herbal Drinks"],
    description: "Peaceful cafe within monastery grounds offering mindful dining experiences and meditation breaks."
  }
];

export default function GuidesHotelsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-orange-600 to-green-700 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-blend-overlay"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/3571551/pexels-photo-3571551.jpeg')",
            backgroundColor: 'rgba(0,0,0,0.4)'
          }}
        />
        <div className="relative z-10 flex items-center justify-center h-full text-white">
          <div className="text-center max-w-4xl mx-auto px-6">
            <h1 className="text-5xl font-bold mb-4">Discover Sikkim with Local Experts</h1>
            <p className="text-xl opacity-90">Connect with certified guides and find the perfect accommodation for your monastery journey</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Guides Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Local Guides</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experienced local guides who will enhance your monastery visit with deep cultural insights and spiritual knowledge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <Card key={guide.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 overflow-hidden">
                <div className="relative">
                  <img 
                    src={guide.image} 
                    alt={guide.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-orange-700 font-semibold">
                      <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                      {guide.rating}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">{guide.name}</CardTitle>
                  <CardDescription className="text-orange-600 font-medium text-base">
                    {guide.specialization}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed">{guide.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-green-600" />
                      <span>{guide.experience} experience</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {guide.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-2xl font-bold text-orange-600">{guide.price}</span>
                  </div>
                </CardContent>

                <CardFooter className="space-y-2">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Guide
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Hotels Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Hotels & Accommodations</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comfortable stays near monasteries, from luxury hotels to traditional lodges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <Card key={hotel.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 overflow-hidden">
                <div className="relative">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-600 text-white">
                      {hotel.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-green-700 font-semibold">
                      <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                      {hotel.rating}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">{hotel.name}</CardTitle>
                  <CardDescription className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hotel.location}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed">{hotel.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">{hotel.price}</span>
                      <Bed className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {hotel.amenities.map((amenity) => (
                        <Badge key={amenity} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Check Availability
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Restaurants Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Restaurants & Dining</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Authentic local cuisine and monastery-inspired dining experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant) => (
              <Card key={restaurant.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 overflow-hidden">
                <div className="relative">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-amber-700 font-semibold">
                      <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                      {restaurant.rating}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">{restaurant.name}</CardTitle>
                  <CardDescription className="flex items-center justify-between">
                    <span className="text-amber-600 font-medium">{restaurant.cuisine}</span>
                    <span className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {restaurant.location}
                    </span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed">{restaurant.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-amber-600">{restaurant.priceRange}</span>
                      <Utensils className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-700">Specialties:</p>
                      <div className="flex flex-wrap gap-1">
                        {restaurant.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                    <Heart className="w-4 h-4 mr-2" />
                    Save Restaurant
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-20 bg-gradient-to-r from-orange-600 to-green-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Monastery Journey?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Connect with our local experts and immerse yourself in the rich spiritual heritage of Sikkim's monasteries
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-orange-600 hover:bg-gray-100 border-white">
              Plan Your Visit
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}