
import { createContext } from 'react';
import { Music, Photo } from '../types';

export interface MusicContextType {
  music: Music[];
  setMusic: React.Dispatch<React.SetStateAction<Music[]>>;
}

export interface PhotoContextType {
  photos: Photo[];
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
}

export const MusicContext = createContext<MusicContextType>({
  music: [],
  setMusic: () => {},
});

export const PhotoContext = createContext<PhotoContextType>({
  photos: [],
  setPhotos: () => {},
});
