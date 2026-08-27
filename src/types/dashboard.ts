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

export type DashboardDurationStats = {
  duration: string;
  value: number;
  color: string;
};

export type DashboardTodayActivities = {
  id: number;
  cabinId: number;
  guestId: number;
  cabinPrice: number;
  created_at: Date;
  endDate: Date;
  extrasPrice: number;
  hasBreakfast: boolean;
  isPaid: boolean;
  numGuests: number;
  numNights: number;
  observations: string;
  startDate: Date;
  status: string;
  totalPrice: number;

  guests: {
    countryFlag: string;
    fullName: string;
    nationality: string;
  };
};
