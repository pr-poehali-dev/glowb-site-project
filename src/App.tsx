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
const sampleMusic: Music[] = [];
const samplePhotos: Photo[] = [];

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
