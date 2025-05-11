
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { MusicContext, PhotoContext } from '../contexts/ContentContext';
import { ArrowUpRight } from 'lucide-react';
import Icon from "@/components/ui/icon";

const HomePage = () => {
  const { music } = useContext(MusicContext);
  const { photos } = useContext(PhotoContext);
  
  // Get the latest music and photos
  const latestMusic = music.slice(0, 3);
  const latestPhotos = photos.slice(0, 4);

  return (
    <div className="container mx-auto animate-fade-in">
      {/* Hero Section */}
      <section className="glass-effect p-8 md:p-12 rounded-2xl mb-16 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-float">GLOWB.exe</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Explore the ethereal world of your favorite K-pop group through music and visual stories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/music" 
              className="glass-effect hover-glow px-6 py-3 rounded-lg flex items-center justify-center"
            >
              <Icon name="Music" className="mr-2 h-5 w-5" />
              Listen to Music
            </Link>
            <Link 
              to="/photos" 
              className="glass-effect hover-glow px-6 py-3 rounded-lg flex items-center justify-center"
            >
              <Icon name="Image" className="mr-2 h-5 w-5" />
              View Photo Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Music Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Music</h2>
          <Link to="/music" className="text-glowb-blue-deep hover:underline flex items-center">
            View all <Icon name="ArrowUpRight" className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestMusic.map((track) => (
            <div key={track.id} className="glass-effect p-4 rounded-xl hover-glow">
              <img 
                src={track.coverUrl} 
                alt={track.title} 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-bold text-lg">{track.title}</h3>
              <p className="text-sm mb-3">{track.artist}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs">{track.duration}</span>
                <Link 
                  to={`/music`} 
                  className="bg-glowb-blue-deep bg-opacity-20 hover:bg-opacity-40 rounded-full p-2 transition-all"
                >
                  <Icon name="Play" className="h-5 w-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Photos Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Photos</h2>
          <Link to="/photos" className="text-glowb-blue-deep hover:underline flex items-center">
            View all <Icon name="ArrowUpRight" className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {latestPhotos.map((photo) => (
            <div key={photo.id} className="relative group">
              <img 
                src={photo.imageUrl} 
                alt={photo.title} 
                className="w-full h-56 object-cover rounded-lg hover-glow transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <h3 className="text-white font-semibold px-3 py-2 glass-effect rounded-lg">
                  {photo.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
