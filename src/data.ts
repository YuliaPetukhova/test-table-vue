export type Employee = {
  ID: number;
  Title: string;
  Price: string;
  Quantity: string;
  ProductName: string;
  Actions: string;
  NameItem: string;
  TotalAmount: string;
};

export const employees: Employee[] = [
  {
    Actions: "",
    ID: 1,
    Title: "Mr.",
    NameItem: "Мраморный щебень 2 кг",
    Price: "1231",
    Quantity: "12",
    ProductName: "jheart@dx-email.com",
    TotalAmount: "1231",
  },
  {
    Actions: "",
    ID: 2,
    Title: "Mrs.",
    NameItem: "Мраморный щебень 3 кг",
    Price: "1231",
    Quantity: "12",
    ProductName: "oliviap@dx-email.com",
    TotalAmount: "1231",
  },
  {
    Actions: "",
    ID: 3,
    Title: "Mr.",
    NameItem: "Мраморный щебень 5 кг",
    Price: "1231",
    Quantity: "12",
    ProductName: "robertr@dx-email.com",
    TotalAmount: "1231",
  },
];

export type Status = {
  id: number;

  name: string;
};
