
import { FormEvent, useState } from 'react';
import { Photo } from '@/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Icon from "@/components/ui/icon";

interface PhotoUploadFormProps {
  onSubmit: (photo: Omit<Photo, 'id' | 'uploadDate'>) => void;
}

const PhotoUploadForm = ({ onSubmit }: PhotoUploadFormProps) => {
  const [form, setForm] = useState({
    title: '',
    imageUrl: '',
    description: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!form.title || !form.imageUrl) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }
    
    onSubmit(form);
    
    // Reset form
    setForm({
      title: '',
      imageUrl: '',
      description: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium">Название *</label>
          <Input 
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Название фото"
            required
          />
        </div>
        
        <div>
          <label className="block mb-2 text-sm font-medium">URL изображения *</label>
          <Input 
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block mb-2 text-sm font-medium">Описание</label>
          <Textarea 
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Добавьте описание для этого фото"
            rows={3}
          />
        </div>
      </div>
      
      {form.imageUrl && (
        <div className="mt-4">
          <p className="text-sm mb-2">Предпросмотр изображения:</p>
          <img 
            src={form.imageUrl} 
            alt="Image preview" 
            className="w-48 h-32 object-cover rounded-lg"
            onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Неверный+URL'}
          />
        </div>
      )}
      
      <Button type="submit" className="bg-glowb-blue-deep hover:bg-glowb-blue mt-4">
        <Icon name="Upload" className="mr-2 h-4 w-4" />
        Загрузить фото
      </Button>
    </form>
  );
};

export default PhotoUploadForm;
