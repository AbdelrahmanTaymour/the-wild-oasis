export interface BookingsStatsProps {
  created_at: Date;
  totalPrice: number;
  extrasPrice: number;
}

export interface BaseStat {
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
}

export interface StaysStatsProps extends BaseStat {
  guests: {
    fullName: string;
  };
}

export interface DashboardTodayActivities extends BaseStat {
  guests: {
    countryFlag: string;
    fullName: string;
    nationality: string;
  };
}

export interface DashboardDurationStats {
  duration: string;
  value: number;
  color: string;
}
