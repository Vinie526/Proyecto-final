export type MenuItem = {
  id?: string; // Firestore document ID
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

export type LunchOption = {
  id: string;
  name: string;
  price: number;
};

export type LunchCategory = {
  id:string;
  name: string;
  limit: number;
  options: LunchOption[];
};