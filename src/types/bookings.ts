import type { CabinData } from "./capinData";
import type { GuestData } from "./guests";

export type Booking = {
  id: number;
  startDate: Date;
  endDate: Date;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: string;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  created_at: Date;
  cabins: CabinData;
  guests: GuestData;
};

export type BookingView = {
  id: number;
  created_at: Date;
  startDate: Date;
  endDate: Date;
  numNights: number;
  numGuests: number;
  status: string;
  totalPrice: number;
  cabins: {
    name: string;
  };
  guests: {
    fullName: string;
    email: string;
  };
};

export type updateBooking = {
  status: string;
  isPaid: boolean;
};

export type BookingFilter = {
  field: string;
  value: string;
};

export type BookingSortBy = {
  field: string;
  direction: string;
};
