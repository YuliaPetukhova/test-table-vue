export type Employee = {
  ID: number;
  OrderNumber: number;
  Title: string;
  Price: number;
  Quantity: number;
  ProductName: number;
  Actions: string;
  NameItem: number;
  TotalAmount: number;
};

export const employees: Employee[] = [
  {
    Actions: "",
    ID: 1,
    OrderNumber: 1,
    Title: "Mr.",
    NameItem: 1,
    Price: 1231,
    Quantity: 2,
    ProductName: 1,
    TotalAmount: 1231,
  },
  {
    Actions: "",
    ID: 2,
    OrderNumber: 2,
    Title: "Mrs.",
    NameItem: 2,
    Price: 1231,
    Quantity: 5,
    ProductName: 2,
    TotalAmount: 1231,
  },
  {
    Actions: "",
    ID: 3,
    OrderNumber: 3,
    Title: "Mr.",
    NameItem: 3,
    Price: 1231,
    Quantity: 8,
    ProductName: 3,
    TotalAmount: 1231,
  },
];

export type NameItem = {
  ID: number;

  Name: string;
};

export const nameItems: NameItem[] = [
  {
    ID: 1,
    Name: "Мраморный щебень, 3 кг",
  },
  {
    ID: 2,
    Name: "Мраморный щебень, 13 кг",
  },
  {
    ID: 3,
    Name: "Мраморный щебень, 23 кг",
  },
];

export type ProductName = {
  ID: number;

  Name: string;
};

export const productNames: ProductName[] = [
  {
    ID: 1,
    Name: "Мраморный щебень",
  },
  {
    ID: 2,
    Name: "Мраморный щебень серый",
  },
  {
    ID: 3,
    Name: "Мраморный щебень белый",
  },
];
