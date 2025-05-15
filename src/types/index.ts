export interface Universe {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  yearDiscovered: number;
  population: string;
  physics: string;
  technology: string;
  uniqueFeatures: string[];
  dangerLevel: number;
  visited: boolean;
}

export interface Character {
  id: string;
  name: string;
  universeId: string;
  species: string;
  imageUrl: string;
  abilities: string[];
  background: string;
  alignment: 'good' | 'neutral' | 'evil';
}