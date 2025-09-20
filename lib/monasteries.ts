export type Monastery = {
  id: number
  name: string
  slug: string
  region: string
  description: string
  bestTime: string
  tips: string
  nearby: string[]
  aliases?: string[]
}

export const monasteries: Monastery[] = [
  {
    id: 1,
    name: "Rumtek Monastery",
    slug: "rumtek-monastery",
    region: "East Sikkim",
    description: "Largest monastery in Sikkim (Dharmachakra Centre), seat-in-exile of the Karmapa; intricate murals and golden stupa.",
    bestTime: "Oct–Dec, Mar–May",
    tips: "From Gangtok ~1–1.5 hrs by taxi. Dress modestly; check festival dates for masked cham dances.",
    nearby: ["Gangtok", "Enchey Monastery", "Ranka"],
    aliases: ["Dharmachakra Centre", "Rumtek"],
  },
  {
    id: 2,
    name: "Enchey Monastery",
    slug: "enchey-monastery",
    region: "Gangtok",
    description: "200-year-old Gompa meaning ‘solitary temple’; prayer flags, quiet courtyards, views over Gangtok.",
    bestTime: "Year-round; clearest skies Oct–Dec",
    tips: "Short hop from Gangtok main town; pair with local viewpoints.",
    nearby: ["Gangtok", "Rumtek Monastery"],
    aliases: ["Enchey"],
  },
  {
    id: 3,
    name: "Pemayangtse Monastery",
    slug: "pemayangtse-monastery",
    region: "West Sikkim (Pelling)",
    description: "Among Sikkim’s oldest; ‘Perfect Sublime Lotus’. Woodwork, ancient statues, and views toward Kanchenjunga.",
    bestTime: "Oct–Dec, Mar–Apr",
    tips: "Base in Pelling to combine with Rabdentse ruins and local waterfalls.",
    nearby: ["Pelling", "Rabdentse Ruins"],
    aliases: ["Pemayangtse"],
  },
  {
    id: 4,
    name: "Tashiding Monastery",
    slug: "tashiding-monastery",
    region: "West Sikkim",
    description: "Sacred hilltop between Teesta and Rathong rivers; revered for holy chortens and Bumchu festival.",
    bestTime: "Oct–Dec, Mar–May",
    tips: "Hilly approach; check festival calendar if you wish to witness rituals.",
    nearby: ["Yuksom", "Pelling"],
    aliases: ["Tashiding"],
  },
  {
    id: 5,
    name: "Dubdi Monastery",
    slug: "dubdi-monastery",
    region: "West Sikkim (Yuksom)",
    description: "First monastery of Sikkim (1701); serene forested walk; historic coronation site nearby.",
    bestTime: "Oct–Dec, Mar–May",
    tips: "Light trekking path; carry water and start early for shade.",
    nearby: ["Yuksom", "Norbugang Coronation Throne"],
    aliases: ["Dubdi"],
  },
  {
    id: 6,
    name: "Phensang Monastery",
    slug: "phensang-monastery",
    region: "North Sikkim",
    description: "Historic monastery with annual festival, tranquil ambiance, and lush surroundings.",
    bestTime: "Oct–Dec, Mar–May",
    tips: "Roads can be slow in monsoon; keep buffer time.",
    nearby: ["Mangan", "Gangtok"],
    aliases: ["Phensang"],
  },
  {
    id: 7,
    name: "Ralang Monastery",
    slug: "ralang-monastery",
    region: "South/West Sikkim",
    description: "Important Kagyu lineage monastery; colorful architecture and spacious prayer halls.",
    bestTime: "Oct–Dec, Mar–May",
    tips: "Combine with Tashiding on a longer transfer day.",
    nearby: ["Ravangla", "Tashiding"],
    aliases: ["Ralong"],
  },
  {
    id: 8,
    name: "Sang Monastery",
    slug: "sang-monastery",
    region: "East Sikkim",
    description: "Smaller, peaceful complex known for quiet reflection and local prayer gatherings.",
    bestTime: "Oct–Dec, Mar–May",
    tips: "Good for a short, calm visit en route to other sites.",
    nearby: ["Rumtek", "Gangtok"],
    aliases: ["Sang"],
  },
]
