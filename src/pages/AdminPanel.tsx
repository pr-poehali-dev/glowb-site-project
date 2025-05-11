import { useContext } from "react";
import { MusicContext, PhotoContext } from "../contexts/ContentContext";
import { Music, Photo } from "../types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MusicUploadForm from "@/components/admin/MusicUploadForm";
import PhotoUploadForm from "@/components/admin/PhotoUploadForm";
import MusicList from "@/components/admin/MusicList";
import PhotoList from "@/components/admin/PhotoList";

const AdminPanel = () => {
  const { music, setMusic } = useContext(MusicContext);
  const { photos, setPhotos } = useContext(PhotoContext);

  const handleMusicSubmit = (newMusic: Omit<Music, "id" | "uploadDate">) => {
    const musicItem: Music = {
      id: Date.now().toString(),
      ...newMusic,
      uploadDate: new Date().toISOString(),
    };

    setMusic([musicItem, ...music]);
  };

  const handlePhotoSubmit = (newPhoto: Omit<Photo, "id" | "uploadDate">) => {
    const photoItem: Photo = {
      id: Date.now().toString(),
      ...newPhoto,
      uploadDate: new Date().toISOString(),
    };

    setPhotos([photoItem, ...photos]);
  };

  const handleDeleteMusic = (id: string) => {
    setMusic(music.filter((item) => item.id !== id));
  };

  const handleDeletePhoto = (id: string) => {
    setPhotos(photos.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Панель администратора</h1>

      {/* Формы загрузки контента */}
      <div className="glass-effect p-6 rounded-xl mb-8">
        <Tabs defaultValue="music">
          <TabsList className="mb-6">
            <TabsTrigger value="music">Загрузить музыку</TabsTrigger>
            <TabsTrigger value="photos">Загрузить фотографии</TabsTrigger>
          </TabsList>

          <TabsContent value="music">
            <MusicUploadForm onSubmit={handleMusicSubmit} />
          </TabsContent>

          <TabsContent value="photos">
            <PhotoUploadForm onSubmit={handlePhotoSubmit} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Управление контентом */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Управление музыкой */}
        <div className="glass-effect p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Управление музыкой</h2>
          <MusicList items={music} onDelete={handleDeleteMusic} />
        </div>

        {/* Управление фотографиями */}
        <div className="glass-effect p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Управление фотографиями</h2>
          <PhotoList items={photos} onDelete={handleDeletePhoto} />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
