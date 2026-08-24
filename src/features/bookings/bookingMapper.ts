export const bookingStatusToTagName: Record<
  string,
  "blue" | "green" | "silver"
> = {
  unconfirmed: "blue",
  "checked-in": "green",
  "checked-out": "silver",
};
