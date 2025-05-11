
import { FormEvent, useState } from 'react';
import { Music } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from "@/components/ui/icon";

interface MusicUploadFormProps {
  onSubmit: (music: Omit<Music, 'id' | 'uploadDate'>) => void;
}

const MusicUploadForm = ({ onSubmit }: MusicUploadFormProps) => {
  const [form, setForm] = useState({
    title: '',
    artist: 'GLOWB',
    coverUrl: '',
    audioUrl: '',
    duration: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!form.title || !form.coverUrl) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }
    
    onSubmit(form);
    
    // Reset form
    setForm({
      title: '',
      artist: 'GLOWB',
      coverUrl: '',
      audioUrl: '',
      duration: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium">Название трека *</label>
          <Input 
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Название трека"
            required
          />
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium">Исполнитель</label>
          <Input 
            name="artist"
            value={form.artist}
            onChange={handleChange}
            placeholder="Имя исполнителя"
          />
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium">URL обложки *</label>
          <Input 
            name="coverUrl"
            value={form.coverUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium">URL аудио *</label>
          <Input 
            name="audioUrl"
            value={form.audioUrl}
            onChange={handleChange}
            placeholder="https://example.com/audio.mp3"
            required
          />
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium">Длительность</label>
          <Input 
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="3:45"
          />
        </div>
      </div>
      
      {form.coverUrl && (
        <div className="mt-4">
          <p className="text-sm mb-2">Предпросмотр обложки:</p>
          <img 
            src={form.coverUrl} 
            alt="Cover preview" 
            className="w-32 h-32 object-cover rounded-lg"
            onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Неверный+URL'}
          />
        </div>
      )}
      
      <Button type="submit" className="bg-glowb-blue-deep hover:bg-glowb-blue mt-4">
        <Icon name="Upload" className="mr-2 h-4 w-4" />
        Загрузить музыку
      </Button>
    </form>
  );
};

export default MusicUploadForm;
