import type { Cabin } from "./capins";
import type { Guest } from "./guests";

export interface Booking {
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
  cabins: Cabin;
  guests: Guest;
}

export interface BookingView {
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
}

export interface UpdateBooking {
  status: string;
  isPaid?: boolean;
  hasBreakfast?: boolean;
  extrasPrice?: number;
  totalPrice?: number;
}

export interface BookingFilter {
  field: string;
  value: string;
}

export interface BookingSortBy {
  field: string;
  direction: "asc" | "desc";
}
