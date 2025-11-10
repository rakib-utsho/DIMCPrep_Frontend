export interface PricePlan {
  id: string;
  duration: number;
  price: string;
  title: string;
  description: string[]; // Changed to array of strings
  value: boolean;
  isMilitary?: boolean;
}

const pricePlans: PricePlan[] = [
  // {
  //   id: "price_1RjPSkHB5Tte7vnJ5nks4Rgg",
  //   duration: 1,
  //   price: "£14.99",
  //   title: "For military candidates",
  //   description: [
  //     "Instant Access after verification with a MODNET email account",
  //     "Revision and test modes",
  //     "Extensive performance analysis",
  //     "Fully integrated for Android and iOS users",
  //   ],
  //   value: false,
  //   isMilitary: true,
  // },
  {
    id: "price_1RWOwHHB5Tte7vnJCm9AITHS",
    duration: 3,
    price: "£69.99",
    title: "For the crammers",
    description: [
      "Instant Access",
      "Revision and test modes",
      "Extensive performance analysis",
      "Fully integrated for Android and iOS users",
    ],
    value: false,
  },
  {
    id: "price_1RWP0FHB5Tte7vnJMabykwdp",
    duration: 6,
    price: "£99.99",
    title: "For the strivers",
    description: [
      "Instant Access",
      "Revision and test modes",
      "Extensive performance analysis",
      "Fully integrated for Android and iOS users",
    ],
    value: false,
  },
  {
    id: "price_1RWP0yHB5Tte7vnJMSSJLwTN",
    duration: 12,
    price: "£119.99",
    title: "For the planners",
    description: [
      "Instant Access",
      "Revision and test modes",
      "Extensive performance analysis",
      "Fully integrated for Android and iOS users",
    ],
    value: true,
  },
];

export default pricePlans;
