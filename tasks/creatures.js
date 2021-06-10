const db = require("../data/creatures_db.json");
const {
  STATUSES,
  ATTRIBUTES,
} = require("../data/creatures_additional_info.json");

/* ЗАДАНИЕ В РАЗРАБОТКЕ */

// Все действия с видами существ должны быть автоматизированы циклами
// Не должно быть строчек когда типо {}.orleon = бла-бла или что-то такое,
// Только конструкции типа {[ключ из переменной]: значение} либо obj[ключ из переменной] = значение;
// Массивы с перечислением видов существ руками тоже писать не нужно,
// Гугли for (const key in obj) | for (const value of array) | Object.keys() | Object.entries() | Object.values()

// Можно (и рекомендуется) использовать содержимое обьекта creatures_additional_info.json внутри фукнции. В отличии от db оно является статичным
// Можно (и рекомендуется переиспользовать функции)

// Вернуть кол-во пострадавших существ по видам
// Вернуть обьект вида
// { [код]: кол-во пострадавших }
// harmedBySpecie(db) -> { orleon: 658, fury: 716, ..., saprano: 651 }
const harmedBySpecie = undefined;

// Вернуть статистику по статусам по каждому виду
// { [статус]: { [название_вида]: кол-во } }
// statsByStatus(db) -> { freezed: {orleon: 123, fury: 35, ... }, burned: { ... }, ... }
const statsByStatus = undefined;

// Вернуть статистику по каждому из статусов: указать минимально, максимального и суммарное кол-во
// { [статус]: { min: кол-во, max: кол-во, sum: кол-во  } }
// specieByStatusStats(db) -> { freezed: {max: 641, min: 0, sum: 830}, burned: {max: 443, min: 0, sum: 691 }, ... }
const specieByStatusStats = undefined;

// Вернуть аттрибуты заданного существа. ('NOT_FOUND' в случае отсуствия информации)
//  getAttributes(db, 'orleon') ->  { STR: 8, INT: 2, ..., DEF: 2 }
const getAttributes = (db, specie) => db[specie]?.attributes ?? "NOT_FOUND";
// console.log(getAttributes(db, "everlio"));
// console.log(getAttributes(db, 0));
// console.log(getAttributes(db, "furry"));

// Вернуть более сильное из двух существ по заданному атрибуту ('NOT_FOUND' в случае отсуствия информации)
// Вернуть 'DRAW' если равны
// compareCreatures(db, orleon, fury, STR) -> fury;
const compareCreatures = (db, creatureA, creatureB, attr) => {
  const attrsA = getAttributes(db, creatureA);
  const attrsB = getAttributes(db, creatureB);
  const a = attrsA !== "NOT_FOUND" ? attrsA[attr] : undefined;
  const b = attrsB !== "NOT_FOUND" ? attrsB[attr] : undefined;
  if (a === undefined || b === undefined) return "NOT_FOUND";

  if (a === b) return "DRAW";
  if (a > b) return creatureA;
  return creatureB;
};
// console.log(compareCreatures(db, "orleon", "fury", "STR"));
// console.log(compareCreatures(db, "orleon", "fury", "AGL"));
// console.log(compareCreatures(db, "orleon", "furry", "AGL"));
// console.log(compareCreatures(db, "orlean", "fury", "AGL"));
// console.log(compareCreatures(db, "orleon", "fury", "TUP"));
// console.log(compareCreatures(db, "orlean", "furry", "TUP"));
// console.log(compareCreatures(db, "orlean", "furry", "STR"));
// console.log(compareCreatures(db, "buldiga", "fury", "INT"));
// console.log(compareCreatures(db, "saprano", "everlio", "DEF"));

module.exports = { harmedBySpecie, statsByStatus, specieByStatusStats };
