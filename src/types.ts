export interface Music {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;
  duration: string;
  uploadDate: string;
}

export interface Photo {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  caption?: string; // Добавлено поле для подписи к фото
  uploadDate: string;
}
