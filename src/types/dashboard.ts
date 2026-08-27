export type BookingsStatsProps = {
  created_at: Date;
  totalPrice: number;
  extrasPrice: number;
};

export type StaysStatsProps = {
  id: number;
  cabinId: number;
  guestId: number;
  cabinPrice: number;
  created_at: Date;
  startDate: Date;
  endDate: Date;
  extrasPrice: number;
  hasBreakfast: boolean;
  isPaid: boolean;
  numGuests: number;
  numNights: number;
  observations: string;
  status: string;
  totalPrice: number;

  guests: {
    fullName: string;
  };
};
