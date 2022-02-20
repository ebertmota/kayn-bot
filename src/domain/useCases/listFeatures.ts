import { Feature } from '@/domain/entities';

type Output = Feature[];
export type ListFeatures = () => Output;
type Setup = () => ListFeatures;

export const setupListFeatures: Setup = () => () => {
  return [
    {
      category: '🎵  Music',
      commands: ['play', 'pause', 'stop'],
    },
  ];
};
