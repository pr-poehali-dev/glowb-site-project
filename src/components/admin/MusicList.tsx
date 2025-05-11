
import { Music } from '@/types';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';

interface MusicListProps {
  items: Music[];
  onDelete: (id: string) => void;
}

const MusicList = ({ items, onDelete }: MusicListProps) => {
  if (items.length === 0) {
    return <p className="text-center text-gray-500 py-6">Музыка еще не загружена.</p>;
  }

  return (
    <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
      {items.map(track => (
        <div key={track.id} className="flex items-center bg-white bg-opacity-10 rounded-lg p-3">
          <img 
            src={track.coverUrl} 
            alt={track.title} 
            className="w-12 h-12 rounded-md object-cover mr-3"
          />
          <div className="flex-grow">
            <h3 className="font-semibold">{track.title}</h3>
            <p className="text-xs text-gray-500">
              {format(new Date(track.uploadDate), 'dd.MM.yyyy')}
            </p>
          </div>
          <button 
            onClick={() => onDelete(track.id)}
            className="text-gray-500 hover:text-red-500 transition-colors"
            aria-label="Удалить трек"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default MusicList;
