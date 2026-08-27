export type CabinData = {
  id: number;
  name: string;
  description: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
};

export type CabinFormData = {
  name: string;
  description: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image?: FileList;
};

export type CreateEditCabinData = {
  name: string;
  description: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: File | string;
};
