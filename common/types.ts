export type Breed = {
  id: string;
  name: string;
  breeds: Record<string, any>[];
  description: string;
};
export type Breeds = Breed[];

export type Category = {
  id: number;
  name: string;
};

export type Categories = Category[];

export type CatT = {
  breeds: Breeds;
  categories: Categories;
  id: string;
  url: string;
};

export type CatsT = CatT[];
