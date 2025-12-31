export const colors = {
  Black: "080808",
  Grey: "A8A8A8",
  Blue: "00186B",
  White: "FCFCFC",
  Purple: "75147C",
  Pink: "F6D2D4",
  Red: "D8222B",
};

export const price = 19899;

export const priceFormatters = {
  naira: new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    // minimumFractionDigits: 2,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }),
};

export const deliveryDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};

export const models = [
  "iPhone X / Xs",
  "iPhone Xs Max",
  "iPhone Xr",
  "iPhone 11",
  "iPhone 11 Pro",
  "iPhone 11 Pro Max",
  "iPhone 12 / 12 Pro",
  "iPhone 12 Pro Max",
  "iPhone 13 / 14",
  "iPhone 13 Pro",
  "iPhone 13 Pro Max",
  "iPhone 14 Pro",
  "iPhone 14 Pro Max",
  "iPhone 15",
  "iPhone 15 Pro",
  "iPhone 15 Pro Max",
  "iPhone 16",
  "iPhone 16 Pro",
  "iPhone 16 Pro Max",
  "iPhone 17",
  "iPhone 17 Pro",
  "iPhone 17 Pro Max",
] as const;
