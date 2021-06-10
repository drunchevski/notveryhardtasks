import { CAR_DB } from "../data/fake_dbs";
import cars_db from "../data/cars_db.json";
import { fake_db_1, fake_db_2 } from "../data/fake_dbs";
import {
  getOwnersWithG10kFine,
  getPaulsFerrari,
  getAllWantedCarsOwnerNames,
} from "../tasks/cars";

const my10k = (db: CAR_DB) =>
  db.owners
    .filter((e) => e.currentFines > 10000)
    .map((o) => o.name)
    .sort();

const paulsFerrari = (db: CAR_DB) => {
  const paulsId = db.owners.find((o) => o.name == "Lucas Paul").id;
  const filteredCar = db.cars.find(
    (car) =>
      car.ownerID === paulsId &&
      car.color === "red" &&
      car.brand === "ferrari" &&
      car.wanted === true
  );
  return filteredCar.plateID;
};

const wantedCarsOwnerNames = (db: CAR_DB) => {
  const wantedCars = db.cars.filter((car) => car.wanted);
  const wantedCarsOwners = wantedCars.map((car) => car.ownerID);
  // const filteredCarsOwners = [...new Set(wantedCarsOwners)];
  const wantedCarsOwnerNames = [];

  for (const carOwnerId of wantedCarsOwners) {
    const owner = db.owners.find((owner) => owner.id == carOwnerId);
    if (owner && !wantedCarsOwnerNames.includes(owner.name)) {
      wantedCarsOwnerNames.push(owner.name);
    }
  }
  return wantedCarsOwnerNames;
};

describe("CARS TASKS", () => {
  (getOwnersWithG10kFine !== undefined ? test : test.skip)(
    "Testing getOwnersWithG10kFine",
    () => {
      expect(getOwnersWithG10kFine(cars_db).sort()).toEqual(my10k(cars_db));
      expect(getOwnersWithG10kFine(fake_db_1).sort()).toEqual(my10k(fake_db_1));
    }
  );

  (getPaulsFerrari !== undefined ? test : test.skip)(
    "Testing getPaulsFerrari",
    () => {
      expect(getPaulsFerrari(cars_db)).toEqual(paulsFerrari(cars_db));
      expect(getPaulsFerrari(fake_db_2)).toEqual(paulsFerrari(fake_db_2));
      // expect(getPaulsFerrari(fake_db_1).sort()).toEqual(my10k(fake_db_1));
    }
  );

  (getAllWantedCarsOwnerNames !== undefined ? test : test.skip)(
    "Testing getAllWantedCarsOwnerNames",
    () => {
      expect(getAllWantedCarsOwnerNames(cars_db)).toEqual(
        wantedCarsOwnerNames(cars_db)
      );
      expect(getAllWantedCarsOwnerNames(fake_db_2)).toEqual(
        wantedCarsOwnerNames(fake_db_2)
      );
    }
  );
});
