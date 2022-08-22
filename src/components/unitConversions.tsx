export const IMPERIAL_CONVERSIONS = {
  tbsp: {
    unit: "tsp",
    amount: 3
  },
  ounce: {
    unit: "tbsp",
    amount: 2
  },
  cup: {
    unit: "ounce",
    amount: 8
  },
  pint: {
    unit: "cup",
    amount: 2
  },
  quart: {
    unit: "pint",
    amount: 2
  },
  gallon: {
    unit: "quart",
    amount: 4
  },
  pound: {
    unit: "ounce",
    amount: 16
  }
};

export const IMPERIAL_TO_METRIC = {
  tsp: {
    unit: "ml",
    amount: 4.93
  },
  tbsp: {
    unit: "ml",
    amount: 14.79
  },
  ounce: {
    unit: "ml",
    amount: 29.57
  },
  cup: {
    unit: "ml",
    amount: 236.59
  },
  pint: {
    unit: "ml",
    amount: 568.26
  },
  quart: {
    unit: "l",
    amount: 0.946
  },
  gallon: {
    unit: "l",
    amount: 3.785
  },
  pound: {
    unit: "g",
    amount: 454
  }
};
