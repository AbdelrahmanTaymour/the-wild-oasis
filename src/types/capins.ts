export interface Cabin {
  id: number;
  name: string;
  description: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
}

export interface CabinForm {
  name: string;
  description: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image?: FileList;
}

export interface CreateEditCabin {
  name: string;
  description: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: File | string;
}
