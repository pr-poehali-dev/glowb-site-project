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
    title: "Sample Track 1",
    artist: "GLOWBYTE",
    coverUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    audioUrl: "#", // Would be a real URL in production
    duration: "3:42",
    uploadDate: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Sample Track 2",
    artist: "GLOWBYTE",
    coverUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop",
    audioUrl: "#", // Would be a real URL in production
    duration: "4:15",
    uploadDate: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Sample Track 3",
    artist: "GLOWBYTE",
    coverUrl:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop",
    audioUrl: "#", // Would be a real URL in production
    duration: "3:28",
    uploadDate: new Date().toISOString(),
  },
];

const samplePhotos: Photo[] = [
  {
    id: "1",
    title: "Sample Photo 1",
    imageUrl:
      "https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2129&auto=format&fit=crop",
    description: "Example photo with blue gradient",
    uploadDate: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Sample Photo 2",
    imageUrl:
      "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2070&auto=format&fit=crop",
    description: "Abstract blue background",
    uploadDate: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Sample Photo 3",
    imageUrl:
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=2070&auto=format&fit=crop",
    description: "Blue sky with clouds",
    uploadDate: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Sample Photo 4",
    imageUrl:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop",
    description: "Abstract blue texture",
    uploadDate: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Sample Photo 5",
    imageUrl:
      "https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?q=80&w=2026&auto=format&fit=crop",
    description: "Soft blue background",
    uploadDate: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Sample Photo 6",
    imageUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop",
    description: "Technology blue background",
    uploadDate: new Date().toISOString(),
  },
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
