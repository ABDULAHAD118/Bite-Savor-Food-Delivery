export interface StoreContextType {
  food_list: {
    _id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    category: string;
  }[];
  cartItem?: { [key: string]: number };
  addToCart?: (id: string) => void;
  removeFromCart?: (id: string) => void;
  URL?: string;
}

export interface food_list {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
}

export interface NavbarProps {
  setShowLogin: (value: boolean) => void;
}

export interface LoginPopupProps {
  setShowLogin: (value: boolean) => void;
}

export interface FoodItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}
