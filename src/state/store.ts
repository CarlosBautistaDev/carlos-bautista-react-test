import create from 'zustand';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface Store {
  products: Product[];
  setProducts: (products: Product[]) => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const useStore = create<Store>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  isAuthenticated: false,
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
}));