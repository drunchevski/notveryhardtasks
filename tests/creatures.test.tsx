import creatures_db from "../data/creatures_db.json";
import {
  harmedBySpecie,
  statsByStatus,
  specieByStatusStats,
  getAttributes,
  compareCreatures,
  fightAll,
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

const myGetAttributes = (db: CREATURE_DB, specie: string) =>
  db[specie]?.attributes ?? "NOT_FOUND";

const myCompareCreatures = (
  db: CREATURE_DB,
  creatureA: string,
  creatureB: string,
  attr: ATRS | any
) => {
  const attrsA = myGetAttributes(db, creatureA);
  const attrsB = myGetAttributes(db, creatureB);
  const a = attrsA !== "NOT_FOUND" ? attrsA[attr] : undefined;
  const b = attrsB !== "NOT_FOUND" ? attrsB[attr] : undefined;
  if (a === undefined || b === undefined) return "NOT_FOUND";

  if (a === b) return "DRAW";
  if (a > b) return creatureA;
  return creatureB;
};

const myFightAll = (db: CREATURE_DB, specie: string) => {
  const attackerAttrs = myGetAttributes(db, specie);
  if (attackerAttrs == "NOT_FOUND") throw { attackerAttrs, specie };
  const getMaxAttr = ({ STR, INT, AGL }) => Math.max(STR, INT, AGL);
  const attack = attackerAttrs.ATK + getMaxAttr(attackerAttrs);

  const results = [];
  for (const defender in db) {
    if (defender === specie) continue;
    const defenderAttrs = myGetAttributes(db, defender);
    if (defenderAttrs === "NOT_FOUND") throw { defenderAttrs, defender };
    const defense = defenderAttrs.DEF + getMaxAttr(defenderAttrs);
    if (attack - defense > 0) results.push(defender);
  }
  return results;
};

describe("CREATURES TASKS", () => {
  afterEach(() => {
    console.log(
      "\x1b[36m",
      `${expect.getState().currentTestName}: PASSED`,
      "\x1b[0m"
    );
  });

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

  (getAttributes !== undefined ? test : test.skip)(
    "Testing getAttributes",
    () => {
      expect(getAttributes(creatures_db, "orleon")).toEqual(
        myGetAttributes(creatures_db, "orleon")
      );
      expect(getAttributes(creatures_db, "wrong_specie")).toEqual(
        myGetAttributes(creatures_db, "wrong_specie")
      );
    }
  );

  (compareCreatures !== undefined ? test : test.skip)(
    "Testing compareCreatures",
    () => {
      expect(compareCreatures(creatures_db, "orleon", "fury", "STR")).toEqual(
        myCompareCreatures(creatures_db, "orleon", "fury", "STR")
      );
      expect(compareCreatures(creatures_db, "orleon", "fury", "AGL")).toEqual(
        myCompareCreatures(creatures_db, "orleon", "fury", "AGL")
      );
      expect(compareCreatures(creatures_db, "orleon", "furry", "AGL")).toEqual(
        myCompareCreatures(creatures_db, "orleon", "furry", "AGL")
      );
      expect(compareCreatures(creatures_db, "orlean", "fury", "AGL")).toEqual(
        myCompareCreatures(creatures_db, "orlean", "fury", "AGL")
      );
      expect(compareCreatures(creatures_db, "orleon", "fury", "TUP")).toEqual(
        myCompareCreatures(creatures_db, "orleon", "fury", "TUP")
      );
      expect(compareCreatures(creatures_db, "orlean", "furry", "TUP")).toEqual(
        myCompareCreatures(creatures_db, "orlean", "furry", "TUP")
      );
      expect(compareCreatures(creatures_db, "orlean", "furry", "STR")).toEqual(
        myCompareCreatures(creatures_db, "orlean", "furry", "STR")
      );
      expect(compareCreatures(creatures_db, "buldiga", "fury", "INT")).toEqual(
        myCompareCreatures(creatures_db, "buldiga", "fury", "INT")
      );
      expect(
        compareCreatures(creatures_db, "saprano", "everlio", "DEF")
      ).toEqual(myCompareCreatures(creatures_db, "saprano", "everlio", "DEF"));
    }
  );

  (fightAll !== undefined ? test : test.skip)("Testing fightAll", () => {
    expect(fightAll(creatures_db, "orleon")).toEqual(
      myFightAll(creatures_db, "orleon")
    );
  });

  // console.log(getAttributes(db, "everlio"));
  // console.log(getAttributes(db, 0));
  // console.log(getAttributes(db, "furry"));
});
