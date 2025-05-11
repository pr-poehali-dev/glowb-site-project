import { useContext, useState } from "react";
import { PhotoContext } from "../contexts/ContentContext";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { format } from "date-fns";

const PhotoGallery = () => {
  const { photos } = useContext(PhotoContext);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const openPhotoDetail = (id: string) => {
    setSelectedPhoto(id);
  };

  const closePhotoDetail = () => {
    setSelectedPhoto(null);
  };

  const currentPhoto = photos.find((photo) => photo.id === selectedPhoto);

  return (
    <div className="container mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <span className="mr-2">K-pop Photo Gallery</span>
        <span className="glass-effect px-3 py-1 text-sm rounded-full">
          {photos.length} photos
        </span>
      </h1>

      {photos.length === 0 ? (
        <div className="glass-effect p-8 text-center rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Галерея пуста</h2>
          <p className="text-gray-600">
            Добавьте свои первые фотографии через панель администратора!
          </p>
        </div>
      ) : (
        <div className="photo-grid">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="photo-item overflow-hidden rounded-xl"
              onClick={() => openPhotoDetail(photo.id)}
            >
              <div className="relative group h-full cursor-pointer">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-bold text-lg">{photo.title}</h3>
                  {photo.caption && (
                    <p className="text-sm text-white/80 mt-1">
                      {photo.caption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Photo Detail Dialog */}
      <Dialog open={!!selectedPhoto} onOpenChange={closePhotoDetail}>
        <DialogContent className="sm:max-w-4xl glass-effect border-none">
          {currentPhoto && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={currentPhoto.imageUrl}
                  alt={currentPhoto.title}
                  className="w-full h-full object-cover"
                />
                {currentPhoto.caption && (
                  <div className="p-2 text-center bg-black bg-opacity-20">
                    <p className="text-sm italic">{currentPhoto.caption}</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold mb-2">
                  {currentPhoto.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {format(new Date(currentPhoto.uploadDate), "MMMM dd, yyyy")}
                </p>
                <p className="mb-4">{currentPhoto.description}</p>
                <div className="glass-effect p-3 rounded-lg mt-auto">
                  <p className="text-sm">Tap or click outside to close</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhotoGallery;
