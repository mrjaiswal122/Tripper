'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Loader2, AlertCircle, RotateCcw, Maximize, Info } from 'lucide-react';

// Monastery data mapping
const monasteryData: Record<string, {
  name: string;
  description: string;
  location: string;
  founded: string;
  significance: string;
}> = {
  'rumtek-monastery': {
    name: 'Rumtek Monastery',
    description: 'The largest monastery in Sikkim, also known as Dharmachakra Centre. It serves as the main seat of the Karmapa lineage.',
    location: 'East Sikkim, 24 km from Gangtok',
    founded: '1740 (rebuilt in 1960s)',
    significance: 'Seat of the 16th Karmapa and center of Kagyu lineage'
  },
  'enchey-monastery': {
    name: 'Enchey Monastery',
    description: 'A 200-year-old monastery meaning "solitary temple". It belongs to the Nyingma order of Vajrayana Buddhism.',
    location: 'Gangtok, Sikkim',
    founded: '1840',
    significance: 'Important center for Nyingma Buddhism in Sikkim'
  },
  'pemayangtse-monastery': {
    name: 'Pemayangtse Monastery',
    description: 'One of the oldest monasteries in Sikkim, meaning "Perfect Sublime Lotus". It offers spectacular views of the Kanchenjunga range.',
    location: 'Pelling, West Sikkim',
    founded: '1705',
    significance: 'Second oldest monastery in Sikkim, head of all monasteries of Nyingma order'
  },
  'tashiding-monastery': {
    name: 'Tashiding Monastery',
    description: 'Sacred monastery situated on a hilltop between the Teesta and Rathong rivers, offering panoramic views.',
    location: 'West Sikkim',
    founded: '1641',
    significance: 'One of the most sacred monasteries in Sikkim Buddhism'
  },
  'dubdi-monastery': {
    name: 'Dubdi Monastery',
    description: 'The first monastery built in Sikkim, also known as Hermit\'s Cell. It\'s a small but historically significant monastery.',
    location: 'Yuksom, West Sikkim',
    founded: '1701',
    significance: 'First monastery established in Sikkim'
  },
  'phensang-monastery': {
    name: 'Phensang Monastery',
    description: 'Ancient monastery located in North Sikkim, known for its serene environment and traditional architecture.',
    location: 'North Sikkim',
    founded: '1721',
    significance: 'Important monastery for the northern region of Sikkim'
  },
  'ralang-monastery': {
    name: 'Ralang Monastery',
    description: 'Important monastery known for its spiritual significance and beautiful location in the hills of Sikkim.',
    location: 'South Sikkim',
    founded: '1768',
    significance: 'Center for Buddhist teachings and meditation'
  },
  'sang-monastery': {
    name: 'Sang Monastery',
    description: 'Historic monastery with beautiful traditional architecture and rich cultural heritage.',
    location: 'West Sikkim',
    founded: '1697',
    significance: 'One of the oldest monasteries preserving ancient Buddhist traditions'
  }
};

export default function MonasteryPage() {
  const router = useRouter();
  const params = useParams();
  const sceneRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slug = params?.slug as string;
  const monastery = monasteryData[slug];

  useEffect(() => {
    if (!monastery) return;

    // Load A-Frame script
    const aframeScript = document.createElement('script');
    aframeScript.src = 'https://aframe.io/releases/1.4.0/aframe.min.js';
    aframeScript.onload = () => {
      initializeAFrame();
    };
    document.head.appendChild(aframeScript);

    return () => {
      // Cleanup
      if (aframeScript.parentNode) {
        aframeScript.parentNode.removeChild(aframeScript);
      }
    };
  }, [monastery, slug]);

  const initializeAFrame = () => {
    if (!sceneRef.current) return;

    // Create A-Frame scene
    const scene = document.createElement('a-scene');
    scene.setAttribute('embedded', 'true');
    scene.setAttribute('vr-mode-ui', 'enabled: false');
    scene.setAttribute('device-orientation-permission-ui', 'enabled: false');
    
    // Add loading screen
    scene.innerHTML = `
      <!-- Assets -->
      <a-assets>
        <img id="monastery-panorama" src="/monastery/${slug}.jpg" crossorigin="anonymous">
      </a-assets>

      <!-- 360 degree image -->
      <a-sky 
        id="panorama" 
        src="#monastery-panorama" 
        rotation="0 -90 0"
        material="shader: flat"
      ></a-sky>

      <!-- Camera with look controls -->
      <a-camera 
        id="camera"
        look-controls="enabled: true; touchEnabled: true"
        wasd-controls="enabled: false"
        position="0 1.6 0"
        fov="80"
      >
        <!-- Cursor for mobile interaction -->
        <a-cursor 
          position="0 0 -1"
          geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
          material="color: white; shader: flat; opacity: 0.8"
          animation__mouseenter="property: scale; to: 1.4 1.4 1.4; startEvents: mouseenter; dur: 150"
          animation__mouseleave="property: scale; to: 1 1 1; startEvents: mouseleave; dur: 150"
        ></a-cursor>
      </a-camera>

      <!-- Lighting -->
      <a-light type="ambient" color="#ffffff" intensity="0.8"></a-light>
    `;

    // Clear existing content and add scene
    sceneRef.current.innerHTML = '';
    sceneRef.current.appendChild(scene);

    // Handle loading and errors
    const skyElement = scene.querySelector('#panorama');
    const imageAsset = scene.querySelector('#monastery-panorama');

    if (imageAsset) {
      imageAsset.addEventListener('load', () => {
        setIsLoading(false);
      });

      imageAsset.addEventListener('error', () => {
        setImageError(true);
        setIsLoading(false);
      });
    }

    // Handle fullscreen changes
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
  };

  const handleBack = () => {
    router.back();
  };

  const handleReset = () => {
    const camera = sceneRef.current?.querySelector('#camera');
    if (camera) {
      camera.setAttribute('rotation', '0 0 0');
      camera.setAttribute('position', '0 1.6 0');
    }
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement && sceneRef.current) {
      try {
        await sceneRef.current.requestFullscreen();
      } catch (err) {
        console.error('Error attempting to enable fullscreen:', err);
      }
    } else if (document.exitFullscreen) {
      await document.exitFullscreen();
    }
  };

  if (!monastery) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Monastery Not Found</h1>
          <p className="text-gray-600 mb-6">The monastery you're looking for doesn't exist.</p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (imageError) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Image Not Available</h1>
          <p className="text-gray-600 mb-6">
            The 360° image for {monastery.name} is not available at the moment.
          </p>
          <button
            onClick={handleBack}
            className="mt-20 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back to Map
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 bg-black z-50 flex items-center justify-center">
          <div className="text-center text-white">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Loading 360° View</h2>
            <p className="text-gray-300">Preparing immersive experience of {monastery.name}</p>
          </div>
        </div>
      )}

      {/* A-Frame Scene Container */}
      <div ref={sceneRef} className="w-full h-full" />

      {/* Fixed UI Controls - Always Visible */}
      <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
        <div className="p-4 flex items-start justify-between">
          {/* Back Button - Always visible */}
          <button
            onClick={handleBack}
            className="pointer-events-auto flex items-center space-x-2 px-4 py-2 mt-10 bg-black/70 backdrop-blur-sm text-white rounded-lg hover:bg-black/80 transition-all duration-200 shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Map</span>
          </button>

          {/* Title */}
          <div className="pointer-events-auto text-center mt-10">
            <h1 className="text-white text-xl font-bold bg-black/70 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg">
              {monastery.name}
            </h1>
          </div>

          {/* Info Toggle */}
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="pointer-events-auto p-2 mt-10 bg-black/70 backdrop-blur-sm text-white rounded-lg hover:bg-black/80 transition-all duration-200 shadow-lg"
          >
            <Info className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Bottom Controls - Always visible */}
      <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
        <div className="p-4 flex items-center justify-center space-x-4">
          <button
            onClick={handleReset}
            className="pointer-events-auto flex items-center space-x-2 px-4 py-2 bg-black/70 backdrop-blur-sm text-white rounded-lg hover:bg-black/80 transition-all duration-200 shadow-lg"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset View</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="pointer-events-auto flex items-center space-x-2 px-4 py-2 bg-black/70 backdrop-blur-sm text-white rounded-lg hover:bg-black/80 transition-all duration-200 shadow-lg"
          >
            <Maximize className="w-4 h-4" />
            <span>{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
          </button>
        </div>
      </div>

      {/* Info Panel */}
      {showInfo && (
        <div className="fixed top-20 right-4 bottom-20 z-40 pointer-events-auto">
          <div className="bg-black/80 backdrop-blur-md text-white p-6 rounded-lg shadow-2xl max-w-sm h-full overflow-y-auto">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold mb-2">About</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{monastery.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">Location</h3>
                <p className="text-sm text-gray-300">{monastery.location}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Founded</h3>
                <p className="text-sm text-gray-300">{monastery.founded}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2">Significance</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{monastery.significance}</p>
              </div>

              <div className="pt-4 border-t border-gray-600">
                <p className="text-xs text-gray-400">
                  💡 Tip: Drag to look around, pinch to zoom on mobile, or use mouse wheel on desktop.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions for first-time users */}
      {!isLoading && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none">
          <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm animate-pulse">
            Drag to explore • Scroll to zoom
          </div>
        </div>
      )}
    </div>
  );
}