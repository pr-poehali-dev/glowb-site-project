
import { useContext, useState, FormEvent } from 'react';
import { MusicContext, PhotoContext } from '../contexts/ContentContext';
import { Music, Photo } from '../types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import Icon from "@/components/ui/icon";
import { format } from 'date-fns';

const AdminPanel = () => {
  const { music, setMusic } = useContext(MusicContext);
  const { photos, setPhotos } = useContext(PhotoContext);
  
  // Form states
  const [musicForm, setMusicForm] = useState({
    title: '',
    artist: 'GLOWB',
    coverUrl: '',
    audioUrl: '',
    duration: '',
  });
  
  const [photoForm, setPhotoForm] = useState({
    title: '',
    imageUrl: '',
    description: '',
  });

  const handleMusicSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!musicForm.title || !musicForm.coverUrl) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newMusic: Music = {
      id: Date.now().toString(),
      ...musicForm,
      uploadDate: new Date().toISOString(),
    };
    
    setMusic([newMusic, ...music]);
    setMusicForm({
      title: '',
      artist: 'GLOWB',
      coverUrl: '',
      audioUrl: '',
      duration: '',
    });
  };
  
  const handlePhotoSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!photoForm.title || !photoForm.imageUrl) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newPhoto: Photo = {
      id: Date.now().toString(),
      ...photoForm,
      uploadDate: new Date().toISOString(),
    };
    
    setPhotos([newPhoto, ...photos]);
    setPhotoForm({
      title: '',
      imageUrl: '',
      description: '',
    });
  };
  
  const handleDeleteMusic = (id: string) => {
    setMusic(music.filter(item => item.id !== id));
  };
  
  const handleDeletePhoto = (id: string) => {
    setPhotos(photos.filter(item => item.id !== id));
  };

  return (
    <div className="container mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      
      <div className="glass-effect p-6 rounded-xl mb-8">
        <Tabs defaultValue="music">
          <TabsList className="mb-6">
            <TabsTrigger value="music">Upload Music</TabsTrigger>
            <TabsTrigger value="photos">Upload Photos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="music">
            <form onSubmit={handleMusicSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Title *</label>
                  <Input 
                    value={musicForm.title}
                    onChange={(e) => setMusicForm({...musicForm, title: e.target.value})}
                    placeholder="Track title"
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium">Artist</label>
                  <Input 
                    value={musicForm.artist}
                    onChange={(e) => setMusicForm({...musicForm, artist: e.target.value})}
                    placeholder="Artist name"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium">Cover Image URL *</label>
                  <Input 
                    value={musicForm.coverUrl}
                    onChange={(e) => setMusicForm({...musicForm, coverUrl: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium">Audio URL *</label>
                  <Input 
                    value={musicForm.audioUrl}
                    onChange={(e) => setMusicForm({...musicForm, audioUrl: e.target.value})}
                    placeholder="https://example.com/audio.mp3"
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium">Duration</label>
                  <Input 
                    value={musicForm.duration}
                    onChange={(e) => setMusicForm({...musicForm, duration: e.target.value})}
                    placeholder="3:45"
                  />
                </div>
              </div>
              
              {musicForm.coverUrl && (
                <div className="mt-4">
                  <p className="text-sm mb-2">Cover Preview:</p>
                  <img 
                    src={musicForm.coverUrl} 
                    alt="Cover preview" 
                    className="w-32 h-32 object-cover rounded-lg"
                    onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Invalid+URL'}
                  />
                </div>
              )}
              
              <Button type="submit" className="bg-glowb-blue-deep hover:bg-glowb-blue mt-4">
                <Icon name="Upload" className="mr-2 h-4 w-4" />
                Upload Music
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="photos">
            <form onSubmit={handlePhotoSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Title *</label>
                  <Input 
                    value={photoForm.title}
                    onChange={(e) => setPhotoForm({...photoForm, title: e.target.value})}
                    placeholder="Photo title"
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium">Image URL *</label>
                  <Input 
                    value={photoForm.imageUrl}
                    onChange={(e) => setPhotoForm({...photoForm, imageUrl: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium">Description</label>
                  <Textarea 
                    value={photoForm.description}
                    onChange={(e) => setPhotoForm({...photoForm, description: e.target.value})}
                    placeholder="Add a description for this photo"
                    rows={3}
                  />
                </div>
              </div>
              
              {photoForm.imageUrl && (
                <div className="mt-4">
                  <p className="text-sm mb-2">Image Preview:</p>
                  <img 
                    src={photoForm.imageUrl} 
                    alt="Image preview" 
                    className="w-48 h-32 object-cover rounded-lg"
                    onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Invalid+URL'}
                  />
                </div>
              )}
              
              <Button type="submit" className="bg-glowb-blue-deep hover:bg-glowb-blue mt-4">
                <Icon name="Upload" className="mr-2 h-4 w-4" />
                Upload Photo
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Manage Music */}
        <div className="glass-effect p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Manage Music</h2>
          {music.length === 0 ? (
            <p className="text-center text-gray-500 py-6">No music uploaded yet.</p>
          ) : (
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {music.map(track => (
                <div key={track.id} className="flex items-center bg-white bg-opacity-10 rounded-lg p-3">
                  <img 
                    src={track.coverUrl} 
                    alt={track.title} 
                    className="w-12 h-12 rounded-md object-cover mr-3"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{track.title}</h3>
                    <p className="text-xs text-gray-500">
                      {format(new Date(track.uploadDate), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleDeleteMusic(track.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Manage Photos */}
        <div className="glass-effect p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Manage Photos</h2>
          {photos.length === 0 ? (
            <p className="text-center text-gray-500 py-6">No photos uploaded yet.</p>
          ) : (
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {photos.map(photo => (
                <div key={photo.id} className="flex items-center bg-white bg-opacity-10 rounded-lg p-3">
                  <img 
                    src={photo.imageUrl} 
                    alt={photo.title} 
                    className="w-16 h-12 rounded-md object-cover mr-3"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{photo.title}</h3>
                    <p className="text-xs text-gray-500">
                      {format(new Date(photo.uploadDate), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
