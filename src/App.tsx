
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PhotoGallery from "./pages/PhotoGallery";
import MusicPlayer from "./pages/MusicPlayer";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import { useState } from "react";
import { MusicContext, PhotoContext } from "./contexts/ContentContext";
import { Music, Photo } from "./types";

const queryClient = new QueryClient();

// Sample data
const sampleMusic: Music[] = [
  {
    id: "1",
    title: "Skyblue Dreams",
    artist: "GLOWB",
    coverUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop",
    audioUrl: "#", // Would be a real URL in production
    duration: "3:42",
    uploadDate: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Bubble Pop",
    artist: "GLOWB",
    coverUrl: "https://images.unsplash.com/photo-1611601322175-ef8ec8c85426?q=80&w=2070&auto=format&fit=crop",
    audioUrl: "#", // Would be a real URL in production
    duration: "4:15",
    uploadDate: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Star Gaze",
    artist: "GLOWB",
    coverUrl: "https://images.unsplash.com/photo-1614113489855-66422ad300a4?q=80&w=2062&auto=format&fit=crop",
    audioUrl: "#", // Would be a real URL in production
    duration: "3:28",
    uploadDate: new Date().toISOString(),
  }
];

const samplePhotos: Photo[] = [
  {
    id: "1",
    title: "Summer Concert",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop",
    description: "Live stage performance from our summer tour",
    uploadDate: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Music Video BTS",
    imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop",
    description: "Behind the scenes from our latest music video",
    uploadDate: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Fan Meeting",
    imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop",
    description: "Meeting our amazing fans at the showcase",
    uploadDate: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Dance Practice",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop",
    description: "Rehearsing for the upcoming world tour",
    uploadDate: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Album Photo Shoot",
    imageUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2070&auto=format&fit=crop",
    description: "Working with photographers for our new album",
    uploadDate: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Award Ceremony",
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop",
    description: "Thank you for all the love and support!",
    uploadDate: new Date().toISOString(),
  }
];

const App = () => {
  const [music, setMusic] = useState<Music[]>(sampleMusic);
  const [photos, setPhotos] = useState<Photo[]>(samplePhotos);

  return (
    <QueryClientProvider client={queryClient}>
      <MusicContext.Provider value={{ music, setMusic }}>
        <PhotoContext.Provider value={{ photos, setPhotos }}>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="photos" element={<PhotoGallery />} />
                  <Route path="music" element={<MusicPlayer />} />
                  <Route path="admin" element={<AdminPanel />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </PhotoContext.Provider>
      </MusicContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
