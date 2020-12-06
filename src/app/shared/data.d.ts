export interface IWisher {
  name: string;
  phone?: number;
  address?: string;
  description?: string;
  code: string;
}

export interface IWisherPair {
  id: number;
  pairId: number;
  code: string;
}