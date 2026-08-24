export type Booking = {
  id: number;
  startDate: Date;
  endDate: Date;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extraPrice: number;
  totalPrice: number;
  status: string;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  created_at: Date;
  cabinId: number;
  guestId: number;
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

export type createUpdateBooking = {
  startDate: Date;
  endDate: Date;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extraPrice: number;
  status: string;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabinId: number;
  guestId: number;
};

export type BookingFilter = {
  field: string;
  value: string;
};

export type BookingSortBy = {
  field: string;
  direction: string;
};
