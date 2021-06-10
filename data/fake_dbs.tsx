type OWNER = {
  name?: string;
  age?: number;
  currentFines?: number;
  id?: string;
};

type CAR = {
  brand?: string;
  color?: string;
  wanted?: boolean;
  ownerID?: string;
  plateID?: string;
};

type OWNER_ONLY = {
  owners: OWNER[];
};
type CARS_ONLY = {
  cars: CAR[];
};

export type CAR_DB = {
  owners?: OWNER[];
  cars?: CAR[];
};

export const fake_db_1: OWNER_ONLY = {
  owners: [
    {
      name: "1kk",
      currentFines: 10000000,
    },
    {
      name: "-200k",
      currentFines: -200000,
    },
    {
      name: "0",
      currentFines: 0,
    },
    {
      name: "9999",
      currentFines: 9999,
    },
    {
      name: "1",
      currentFines: 1,
    },
  ],
};

export const fake_db_2: CAR_DB = {
  owners: [
    {
      name: "Lucas Paul",
      id: "00x00x01",
    },
    {
      name: "Fake Paul",
      id: "uCfFwlXBXS",
    },
  ],
  cars: [
    {
      brand: "mercedes",
      color: "red",
      wanted: true,
      ownerID: "00x00x01",
      plateID: "MERCEDES?",
    },
    {
      brand: "ferrari",
      color: "yellow",
      wanted: true,
      ownerID: "00x00x01",
      plateID: "YELLOW?",
    },
    {
      brand: "ferrari",
      color: "red",
      wanted: false,
      ownerID: "00x00x01",
      plateID: "NON-WANTED",
    },
    {
      brand: "mercedes",
      color: "red",
      wanted: true,
      ownerID: "uCfFwlXBXS",
      plateID: "MERCEDES? WRONG PAUL BTW",
    },
    {
      brand: "ferrari",
      color: "yellow",
      wanted: true,
      ownerID: "uCfFwlXBXS",
      plateID: "YELLOW? WRONG PAUL BTW",
    },
    {
      brand: "ferrari",
      color: "red",
      wanted: false,
      ownerID: "uCfFwlXBXS",
      plateID: "NON-WANTED?  WRONG PAUL BTW",
    },
    {
      brand: "ferrari",
      color: "red",
      wanted: true,
      ownerID: "uCfFwlXBXS",
      plateID: "WRONG PAUL KEKW",
    },
    {
      brand: "ferrari",
      color: "red",
      wanted: true,
      ownerID: "00x00x01",
      plateID: "NICE!",
    },
  ],
};
