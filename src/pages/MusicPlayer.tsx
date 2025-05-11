
import { useContext, useState } from 'react';
import { MusicContext } from '../contexts/ContentContext';
import { 
  Play, Pause, SkipBack, SkipForward, 
  Volume2, VolumeX, Repeat, Shuffle, Heart
} from 'lucide-react';
import Icon from "@/components/ui/icon";
import { Slider } from '@/components/ui/slider';
import { format } from 'date-fns';

const MusicPlayer = () => {
  const { music } = useContext(MusicContext);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState(0);
  
  const currentTrack = music[currentTrackIndex];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex(prev => (prev > 0 ? prev - 1 : music.length - 1));
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex(prev => (prev < music.length - 1 ? prev + 1 : 0));
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleLike = (id: string) => {
    setIsLiked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleProgressChange = (value: number[]) => {
    setProgress(value[0]);
  };

  return (
    <div className="container mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <span className="mr-2">Music Player</span>
        <span className="glass-effect px-3 py-1 text-sm rounded-full">
          {music.length} tracks
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Album covers and playlist */}
        <div className="lg:col-span-2 bg-white bg-opacity-10 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Playlist</h2>
          <div className="space-y-4">
            {music.map((track, index) => (
              <div 
                key={track.id} 
                className={`flex items-center rounded-lg p-3 cursor-pointer transition-all ${
                  index === currentTrackIndex 
                    ? 'glass-effect' 
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
                onClick={() => {
                  setCurrentTrackIndex(index);
                  setIsPlaying(true);
                }}
              >
                <img 
                  src={track.coverUrl} 
                  alt={track.title} 
                  className="w-12 h-12 rounded-md object-cover mr-4"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{track.title}</h3>
                  <p className="text-sm text-gray-600">{track.artist}</p>
                </div>
                <div className="text-sm">{track.duration}</div>
                {index === currentTrackIndex && isPlaying && (
                  <div className="ml-4 music-visualizer">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main player */}
        <div className="glass-effect p-6 rounded-xl flex flex-col">
          <div className="flex-grow flex flex-col items-center justify-center">
            <img 
              src={currentTrack?.coverUrl} 
              alt={currentTrack?.title}
              className={`w-64 h-64 object-cover rounded-lg shadow-lg mb-6 ${isPlaying ? 'animate-float' : ''}`}
            />
            
            <h2 className="text-2xl font-bold mb-1">{currentTrack?.title}</h2>
            <p className="text-gray-600 mb-6">{currentTrack?.artist}</p>
            
            <div className="w-full mb-6">
              <Slider
                value={[progress]}
                max={100}
                step={1}
                onValueChange={handleProgressChange}
                className="w-full"
              />
              <div className="flex justify-between text-xs mt-2">
                <span>{formatTime(progress)}</span>
                <span>{currentTrack?.duration}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-6 mb-6">
              <button 
                onClick={() => toggleLike(currentTrack?.id)} 
                className="hover-glow rounded-full p-2"
              >
                <Heart 
                  className={`h-5 w-5 ${isLiked[currentTrack?.id] ? 'fill-glowb-pink text-glowb-pink' : ''}`} 
                />
              </button>
              <button onClick={handlePrevTrack} className="hover-glow rounded-full p-2">
                <SkipBack className="h-5 w-5" />
              </button>
              <button 
                onClick={handlePlayPause} 
                className="bg-glowb-blue-deep text-white rounded-full p-4 hover-glow"
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </button>
              <button onClick={handleNextTrack} className="hover-glow rounded-full p-2">
                <SkipForward className="h-5 w-5" />
              </button>
              <button onClick={toggleMute} className="hover-glow rounded-full p-2">
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
            </div>
            
            <div className="flex space-x-4">
              <button className="glass-effect px-3 py-2 rounded-lg flex items-center hover-glow">
                <Shuffle className="h-4 w-4 mr-2" />
                <span className="text-sm">Shuffle</span>
              </button>
              <button className="glass-effect px-3 py-2 rounded-lg flex items-center hover-glow">
                <Repeat className="h-4 w-4 mr-2" />
                <span className="text-sm">Repeat</span>
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-xs text-gray-500">
            <p>Added: {format(new Date(currentTrack?.uploadDate), 'MMMM dd, yyyy')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to format time from seconds
const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default MusicPlayer;
