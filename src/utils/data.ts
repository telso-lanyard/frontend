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
    minimumFractionDigits: 2,
  }),
};
