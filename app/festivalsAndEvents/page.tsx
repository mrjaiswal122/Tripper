'use client'

import React, { useMemo, useState } from 'react';
import { Calendar, MapPin, Users, Clock, Star, Info, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

// Event type
interface CulturalEvent {
  id: number;
  name: string;
  month: number; // 0-based index (0 = January)
  date: string;
  category: string;
  location: string;
  description: string;
  rituals: string[];
  significance: string;
  duration: string;
  participants: string;
  color: string; // hex color used to generate css classes
}

export default function FestivalsAndEventsPage() {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Comprehensive Sikkim Cultural Events Data
  const culturalEvents: CulturalEvent[] = [
    { id: 1, name: 'Maghey Sankranti', month: 0, date: '14-15', category: 'Hindu Festival', location: 'Throughout Sikkim', description: 'Harvest festival marking the end of winter solstice', rituals: ['Holy dips in rivers', 'Sesame seed offerings', 'Traditional feasts'], significance: 'Agricultural celebration', duration: '1 day', participants: 'All communities', color: '#8B4513' },
    { id: 2, name: 'Loosong/Namsoong', month: 0, date: 'Variable', category: 'Bhutia/Lepcha Festival', location: 'North & East Sikkim', description: 'Sikkimese New Year celebration', rituals: ['Cham dances', 'Archery competitions', 'Traditional music'], significance: 'New Year harvest festival', duration: '3-5 days', participants: 'Bhutia and Lepcha communities', color: '#228B22' },
    { id: 3, name: 'Losar', month: 1, date: 'Variable (Tibetan Calendar)', category: 'Buddhist Festival', location: 'All monasteries', description: 'Tibetan Buddhist New Year', rituals: ['Monastery prayers', 'Butter lamp offerings', 'Cham dances', 'Family gatherings'], significance: 'Most important Buddhist festival', duration: '15 days', participants: 'Buddhist communities', color: '#DAA520' },
    { id: 4, name: 'Maha Shivaratri', month: 1, date: 'Variable', category: 'Hindu Festival', location: 'Shiva temples, Legship', description: 'Night of Lord Shiva', rituals: ['Night vigil', 'Fasting', 'Shiva linga worship'], significance: 'Spiritual awakening', duration: '1 day', participants: 'Hindu devotees', color: '#483D8B' },
    { id: 5, name: 'Holi', month: 2, date: 'Variable', category: 'Hindu Festival', location: 'Urban areas', description: 'Festival of colors', rituals: ['Color throwing', 'Holika dahan', 'Traditional sweets'], significance: 'Victory of good over evil', duration: '2 days', participants: 'All communities', color: '#B22222' },
    { id: 6, name: 'Tendong Lho Rum Faat', month: 2, date: 'Variable', category: 'Lepcha Festival', location: 'Tendong Hill, South Sikkim', description: 'Lepcha thanksgiving festival', rituals: ['Mountain worship', 'Traditional prayers', 'Nature offerings'], significance: 'Commemorates Mt. Tendong saving Lepchas from floods', duration: '1 day', participants: 'Lepcha community', color: '#006400' },
    { id: 7, name: 'Ram Navami', month: 3, date: 'Variable', category: 'Hindu Festival', location: 'Hindu temples', description: 'Birth of Lord Rama', rituals: ['Ramayana recitation', 'Temple processions', 'Fasting'], significance: 'Celebration of dharma', duration: '1 day', participants: 'Hindu devotees', color: '#FF4500' },
    { id: 8, name: 'Baisakhi', month: 3, date: '13-14', category: 'Sikh/Hindu Festival', location: 'Gurudwaras and temples', description: 'Harvest festival and Sikh New Year', rituals: ['Gurudwara prayers', 'Community feast', 'Folk dances'], significance: 'Formation of Khalsa', duration: '1 day', participants: 'Sikh and Hindu communities', color: '#FF8C00' },
    { id: 9, name: 'Buddha Jayanti', month: 4, date: 'Variable (Full moon)', category: 'Buddhist Festival', location: 'All monasteries', description: 'Birth, enlightenment, and nirvana of Buddha', rituals: ['Monastery prayers', 'Butter lamp lighting', 'Buddhist scripture reading', 'Processions'], significance: 'Triple blessed day', duration: '1 day', participants: 'Buddhist communities', color: '#B8860B' },
    { id: 10, name: 'Saga Dawa', month: 4, date: 'Full month', category: 'Buddhist Festival', location: 'Throughout Sikkim', description: 'Holy Buddhist month', rituals: ['Daily prayers', 'Vegetarianism', 'Charitable acts', 'Circumambulation'], significance: 'Month of merit', duration: '1 month', participants: 'Buddhist practitioners', color: '#CD853F' },
    { id: 11, name: 'Rath Yatra', month: 5, date: 'Variable', category: 'Hindu Festival', location: 'Urban areas', description: 'Chariot festival of Lord Jagannath', rituals: ['Chariot procession', 'Devotional songs', 'Prasad distribution'], significance: 'Divine journey', duration: '1 day', participants: 'Hindu devotees', color: '#A52A2A' },
    { id: 12, name: 'Drukpa Tseshi', month: 5, date: 'Variable', category: 'Buddhist Festival', location: 'Monasteries', description: 'First sermon of Buddha', rituals: ['Special prayers', 'Teaching sessions', 'Meditation'], significance: 'Dharma wheel turning', duration: '1 day', participants: 'Buddhist monks and devotees', color: '#800080' },
    { id: 13, name: "Guru Rinpoche's Thrunkar Tshechu", month: 6, date: '10th day of lunar month', category: 'Buddhist Festival', location: 'Major monasteries', description: 'Birthday of Guru Padmasambhava', rituals: ['Cham dances', 'Thangka display', 'Sacred mask dances'], significance: "Guru Rinpoche's birth", duration: '3 days', participants: 'Buddhist communities', color: '#00008B' },
    { id: 14, name: 'Bhanu Jayanti', month: 6, date: '13', category: 'Cultural Festival', location: 'Throughout Sikkim', description: 'Birth anniversary of poet Bhanu Bhakta', rituals: ['Poetry recitation', 'Cultural programs', 'Literary events'], significance: 'Nepali literature celebration', duration: '1 day', participants: 'Nepali community', color: '#556B2F' },
    { id: 15, name: 'Independence Day', month: 7, date: '15', category: 'National Festival', location: 'Throughout Sikkim', description: "India's Independence Day", rituals: ['Flag hoisting', 'Cultural programs', 'Parades'], significance: 'National celebration', duration: '1 day', participants: 'All citizens', color: '#FF6347' },
    { id: 16, name: 'Janmashtami', month: 7, date: 'Variable', category: 'Hindu Festival', location: 'Krishna temples', description: 'Birth of Lord Krishna', rituals: ['Midnight prayers', 'Dahi handi', 'Krishna leela'], significance: 'Divine incarnation', duration: '2 days', participants: 'Hindu devotees', color: '#4B0082' },
    { id: 17, name: 'Raksha Bandhan', month: 7, date: 'Variable (Full moon)', category: 'Hindu Festival', location: 'Homes throughout Sikkim', description: 'Brother-sister bond celebration', rituals: ['Rakhi tying', 'Gift exchange', 'Family gatherings'], significance: 'Sibling protection vow', duration: '1 day', participants: 'Hindu families', color: '#C71585' },
    { id: 18, name: 'Ganesh Chaturthi', month: 8, date: 'Variable', category: 'Hindu Festival', location: 'Hindu temples', description: 'Birth of Lord Ganesha', rituals: ['Ganesh installation', 'Modak offerings', 'Visarjan'], significance: 'Remover of obstacles', duration: '10 days', participants: 'Hindu communities', color: '#D2691E' },
    { id: 19, name: 'Indra Jatra', month: 8, date: 'Variable', category: 'Newar Festival', location: 'Urban areas', description: 'Festival of rain god Indra', rituals: ['Mask dances', 'Chariot pulling', 'Living goddess worship'], significance: 'Harvest and rain celebration', duration: '8 days', participants: 'Newar community', color: '#A0522D' },
    { id: 20, name: 'Pang Lhabsol', month: 8, date: 'Variable', category: 'Sikkimese Festival', location: 'Rabdentse, Kanchenjunga', description: 'Worship of Mt. Kanchenjunga', rituals: ['Warrior dances', 'Mountain deity worship', 'Mask dances'], significance: 'Guardian deity worship', duration: '2 days', participants: 'All Sikkimese', color: '#696969' },
    { id: 21, name: 'Durga Puja/Dashain', month: 9, date: 'Variable (9 days)', category: 'Hindu Festival', location: 'Throughout Sikkim', description: 'Victory of Durga over evil', rituals: ['Durga worship', 'Animal sacrifice', 'Tika ceremony', 'Family reunions'], significance: 'Most important Hindu festival in Sikkim', duration: '10 days', participants: 'Hindu communities', color: '#800000' },
    { id: 22, name: 'Dussehra', month: 9, date: 'Variable', category: 'Hindu Festival', location: 'Throughout Sikkim', description: 'Victory of good over evil', rituals: ['Ravana effigy burning', 'Ram Leela', 'Weapon worship'], significance: "Rama's victory", duration: '1 day', participants: 'All communities', color: '#DC143C' },
    { id: 23, name: 'Tihar/Diwali', month: 10, date: 'Variable (5 days)', category: 'Hindu Festival', location: 'Throughout Sikkim', description: 'Festival of lights', rituals: ['Lamp lighting', 'Rangoli', 'Deusi-Bhailo songs', 'Dog and crow worship'], significance: 'Victory of light over darkness', duration: '5 days', participants: 'All communities', color: '#FFD700' },
    { id: 24, name: 'Lhabab Duchen', month: 10, date: 'Variable', category: 'Buddhist Festival', location: 'Monasteries', description: "Buddha's descent from heaven", rituals: ['Special prayers', 'Merit multiplication day', 'Lamp offerings'], significance: "Buddha's return to earth", duration: '1 day', participants: 'Buddhist communities', color: '#F0E68C' },
    { id: 25, name: 'Guru Nanak Jayanti', month: 10, date: 'Variable (Full moon)', category: 'Sikh Festival', location: 'Gurudwaras', description: 'Birth of Guru Nanak', rituals: ['Akhand Path', 'Langar', 'Prabhat Pheri'], significance: 'Founder of Sikhism', duration: '1 day', participants: 'Sikh community', color: '#BDB76B' },
    { id: 26, name: 'Kagyed Dance', month: 11, date: '28-29', category: 'Buddhist Festival', location: 'Major monasteries', description: 'Sacred masked dance festival', rituals: ['Cham dances', 'Evil spirit expulsion', 'New year preparation'], significance: 'Spiritual cleansing', duration: '2 days', participants: 'Monastery communities', color: '#4682B4' },
    { id: 27, name: 'Christmas', month: 11, date: '25', category: 'Christian Festival', location: 'Churches and urban areas', description: 'Birth of Jesus Christ', rituals: ['Midnight mass', 'Carol singing', 'Gift exchange'], significance: 'Christian celebration', duration: '1 day', participants: 'Christian community', color: '#32CD32' },
    { id: 28, name: 'Tamu Lochar', month: 11, date: '30', category: 'Gurung Festival', location: 'Gurung communities', description: 'Gurung New Year', rituals: ['Traditional dances', 'Community feast', 'Cultural programs'], significance: 'Gurung calendar new year', duration: '1 day', participants: 'Gurung community', color: '#6B8E23' },
  ];

  const filteredEvents = useMemo(() => {
    return culturalEvents.filter((event) => {
      const monthMatch = event.month === selectedMonth;
      const categoryMatch = selectedCategory === 'all' || event.category === selectedCategory;
      return monthMatch && categoryMatch;
    });
  }, [selectedMonth, selectedCategory]);

  const categories = ['all', ...Array.from(new Set(culturalEvents.map((event) => event.category)))];

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const EventCard: React.FC<{ event: CulturalEvent }> = ({ event }) => (
    <div className="bg-[#fdf6e7] rounded-md shadow-lg overflow-hidden border border-amber-800/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-medieval text-amber-900">{event.name}</h3>
          <span className={`px-3 py-1 text-xs font-garamond font-bold rounded-full text-amber-100 shadow-md event-color-${event.id}`}>
            {event.category}
          </span>
        </div>

        <div className="space-y-2 text-sm text-stone-700 font-garamond">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-800" />
            <span>
              {event.date} {months[event.month]}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-800" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-800" />
            <span>{event.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-800" />
            <span>{event.participants}</span>
          </div>
        </div>

        <p className="mt-4 text-md text-stone-800 font-garamond italic">"{event.description}"</p>

        <div className="mt-4 border-t border-amber-800/20 pt-3">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-amber-700" />
            <span className="text-sm font-bold font-garamond text-stone-800">Significance</span>
          </div>
          <p className="text-sm text-stone-700 font-garamond">{event.significance}</p>
        </div>

        <div className="mt-3">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-amber-700" />
            <span className="text-sm font-bold font-garamond text-stone-800">Key Rituals</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            {event.rituals.map((ritual, idx) => (
              <span key={idx} className="text-xs bg-amber-200/50 text-amber-900 px-2 py-1 rounded-sm border border-amber-800/20 font-garamond">
                {ritual}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const TableView: React.FC = () => (
    <div className="overflow-x-auto border-4 border-amber-900 rounded-lg shadow-2xl bg-[#fdf6e7]">
      <table className="min-w-full">
        <thead className="bg-amber-800 text-amber-100 font-medieval tracking-wider">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-bold uppercase">Festival</th>
            <th className="px-4 py-3 text-left text-sm font-bold uppercase">Date</th>
            <th className="px-4 py-3 text-left text-sm font-bold uppercase">Category</th>
            <th className="px-4 py-3 text-left text-sm font-bold uppercase">Location</th>
            <th className="px-4 py-3 text-left text-sm font-bold uppercase">Duration</th>
            <th className="px-4 py-3 text-left text-sm font-bold uppercase">Description</th>
            <th className="px-4 py-3 text-left text-sm font-bold uppercase">Key Rituals</th>
          </tr>
        </thead>
        <tbody className="font-garamond text-stone-800">
          {filteredEvents.map((event, idx) => (
            <tr key={event.id} className={idx % 2 === 0 ? 'bg-amber-100/50' : 'bg-transparent'}>
              <td className="px-4 py-3 text-md font-bold text-stone-900">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full shadow-inner event-color-${event.id}`} />
                  {event.name}
                </div>
              </td>
              <td className="px-4 py-3 text-md">{event.date}</td>
              <td className="px-4 py-3 text-md">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full text-white shadow-md event-color-${event.id}`}>
                  {event.category}
                </span>
              </td>
              <td className="px-4 py-3 text-md">{event.location}</td>
              <td className="px-4 py-3 text-md">{event.duration}</td>
              <td className="px-4 py-3 text-md max-w-xs">{event.description}</td>
              <td className="px-4 py-3 text-md">
                <div className="max-w-xs">{event.rituals.slice(0, 2).join(', ')}{event.rituals.length > 2 && '...'}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=MedievalSharp&family=EB+Garamond:ital,wght@0,400;0,700;1,400&display=swap');
        .font-medieval { font-family: 'MedievalSharp', cursive; }
        .font-garamond { font-family: 'EB Garamond', serif; }
        /* Event color classes (converted from inline styles) */
        .event-color-1 { background-color: #8B4513; }
        .event-color-2 { background-color: #228B22; }
        .event-color-3 { background-color: #DAA520; }
        .event-color-4 { background-color: #483D8B; }
        .event-color-5 { background-color: #B22222; }
        .event-color-6 { background-color: #006400; }
        .event-color-7 { background-color: #FF4500; }
        .event-color-8 { background-color: #FF8C00; }
        .event-color-9 { background-color: #B8860B; }
        .event-color-10 { background-color: #CD853F; }
        .event-color-11 { background-color: #A52A2A; }
        .event-color-12 { background-color: #800080; }
        .event-color-13 { background-color: #00008B; }
        .event-color-14 { background-color: #556B2F; }
        .event-color-15 { background-color: #FF6347; }
        .event-color-16 { background-color: #4B0082; }
        .event-color-17 { background-color: #C71585; }
        .event-color-18 { background-color: #D2691E; }
        .event-color-19 { background-color: #A0522D; }
        .event-color-20 { background-color: #696969; }
        .event-color-21 { background-color: #800000; }
        .event-color-22 { background-color: #DC143C; }
        .event-color-23 { background-color: #FFD700; }
        .event-color-24 { background-color: #F0E68C; }
        .event-color-25 { background-color: #BDB76B; }
        .event-color-26 { background-color: #4682B4; }
        .event-color-27 { background-color: #32CD32; }
        .event-color-28 { background-color: #6B8E23; }
      `}</style>

      <div className="min-h-screen bg-[#F1EADF] p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-cover bg-center bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] rounded-lg shadow-2xl p-6 mb-6 border-4 border-amber-900">
            <div className="bg-amber-100/80 p-6 rounded-md backdrop-blur-sm">
              <h1 className="text-4xl sm:text-5xl font-medieval text-amber-900 mb-2 text-center">Chronicles of Sikkim</h1>
              <p className="text-stone-700 font-garamond text-center text-lg">A ledger of festivals, events, and sacred celebrations in the realm</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 font-garamond">
                <div className="bg-amber-700 text-amber-50 p-3 rounded-md border-2 border-amber-900 shadow-lg">
                  <div className="text-2xl font-bold">{culturalEvents.length}</div>
                  <div className="text-sm">Total Edicts</div>
                </div>
                <div className="bg-amber-700 text-amber-50 p-3 rounded-md border-2 border-amber-900 shadow-lg">
                  <div className="text-2xl font-bold">{categories.length - 1}</div>
                  <div className="text-sm">Varieties</div>
                </div>
                <div className="bg-amber-700 text-amber-50 p-3 rounded-md border-2 border-amber-900 shadow-lg">
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm">Moons</div>
                </div>
                <div className="bg-amber-700 text-amber-50 p-3 rounded-md border-2 border-amber-900 shadow-lg">
                  <div className="text-2xl font-bold">4</div>
                  <div className="text-sm">Creeds</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-200/70 rounded-lg shadow-lg p-4 mb-6 border-2 border-amber-800">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1))}
                  className="p-2 rounded-full bg-amber-800 text-amber-100 hover:bg-amber-700 transition-colors shadow-md"
                  aria-label="Previous Month"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="px-6 py-2 bg-amber-900 text-amber-50 rounded-lg font-medieval text-xl min-w-[200px] text-center shadow-lg">
                  {months[selectedMonth]}
                </div>
                <button
                  onClick={() => setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1))}
                  className="p-2 rounded-full bg-amber-800 text-amber-100 hover:bg-amber-700 transition-colors shadow-md"
                  aria-label="Next Month"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-amber-900" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="font-garamond px-4 py-2 border-2 border-amber-800 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 bg-amber-50 text-amber-900"
                  aria-label="Filter by Category"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Varieties' : cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 font-garamond font-bold">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-md transition-colors border-2 border-amber-800 shadow-md ${viewMode === 'grid' ? 'bg-amber-800 text-white' : 'bg-amber-300 hover:bg-amber-400 text-amber-900'}`}
                >
                  Scroll View
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-4 py-2 rounded-md transition-colors border-2 border-amber-800 shadow-md ${viewMode === 'table' ? 'bg-amber-800 text-white' : 'bg-amber-300 hover:bg-amber-400 text-amber-900'}`}
                >
                  Ledger View
                </button>
              </div>
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="bg-[#fdf6e7] rounded-lg shadow-lg p-12 text-center border-2 border-amber-800/30">
              <Calendar className="w-16 h-16 mx-auto text-stone-400 mb-4" />
              <h3 className="text-2xl font-medieval text-stone-700 mb-2">The Archives Are Empty</h3>
              <p className="text-stone-500 font-garamond text-lg">
                No cultural edicts found for the moon of {months[selectedMonth]} in the selected variety.
              </p>
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <TableView />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
