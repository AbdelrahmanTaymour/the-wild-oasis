import { formatDistance, parseISO, differenceInDays } from "date-fns";

// Helper to normalize input to a Date object safely
const toDate = (date: string | Date): Date =>
  typeof date === "string" ? parseISO(date) : date;

export const subtractDates = (
  date1: string | Date,
  date2: string | Date,
): number => differenceInDays(toDate(date1), toDate(date2));

export const formatDistanceFromNow = (dateStr: string | Date): string =>
  formatDistance(toDate(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

interface GetTodayOptions {
  end?: boolean;
}

export const getToday = function (options: GetTodayOptions = {}): string {
  const today = new Date();

  if (options.end) {
    today.setUTCHours(23, 59, 59, 999);
  } else {
    today.setUTCHours(0, 0, 0, 0);
  }

  return today.toISOString();
};

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value,
  );
