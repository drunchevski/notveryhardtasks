import creatures_db from "../data/creatures_db.json";
import {
  harmedBySpecie,
  statsByStatus,
  specieByStatusStats,
} from "../tasks/creatures";
import { STATUSES } from "../data/creatures_additional_info.json";

type ATRS = "STR" | "INT" | "AGL" | "HP" | "ATK" | "DEF";
type STATUSUS = "freezed" | "burned" | "electrocuted" | "shot" | "beaten";
type CREATURE_DB = Record<
  string,
  { attributes: Record<ATRS, number>; statuses: Record<STATUSUS, number> }
>;

const myHarmedBySpecie = (db: CREATURE_DB) => {
  const resultTable = {};
  for (const specie in db) {
    resultTable[specie] = STATUSES.reduce(
      (sum, status) => sum + db[specie].statuses[status],
      0
    );
  }
  return resultTable;
};

const myStatsByStatus = (db: CREATURE_DB) => {
  const resultTable = {};
  for (const status of STATUSES) {
    resultTable[status] = {};
    for (const specie in db) {
      resultTable[status][specie] = db[specie].statuses[status];
    }
  }
  return resultTable;
};

const mySpecieByStatusStats = (db: CREATURE_DB) => {
  const statsByStatusTable = myStatsByStatus(db);
  const resultTable = {};
  for (const status of STATUSES) {
    const counts: number[] = Object.values(statsByStatusTable[status]);
    resultTable[status] = {
      max: Math.max(...counts),
      min: Math.min(...counts),
      sum: counts.reduce((sum, cur) => sum + cur, 0),
    };
  }
  return resultTable;
};

describe("CREATURES TASKS", () => {
  (harmedBySpecie !== undefined ? test : test.skip)(
    "Testing myHarmedBySpecie",
    () => {
      expect(harmedBySpecie(creatures_db)).toEqual(
        myHarmedBySpecie(creatures_db)
      );
    }
  );

  (statsByStatus !== undefined ? test : test.skip)(
    "Testing myStatsByStatus",
    () => {
      expect(statsByStatus(creatures_db)).toEqual(
        myStatsByStatus(creatures_db)
      );
    }
  );

  (specieByStatusStats !== undefined ? test : test.skip)(
    "Testing mySpecieByStatusStats",
    () => {
      expect(specieByStatusStats(creatures_db)).toEqual(
        mySpecieByStatusStats(creatures_db)
      );
    }
  );
});
