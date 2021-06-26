const db = require("../data/cars_db.json");

// Получить имена всех владельцев машин с долгами более $10000
// getOwnersWithG10kFine(db) -> ['Lucas Paul'];
//const getOwnersWithG10kFine = undefined;
function getOwnersWithG10kFine(db) {
  console.log(db);
  return ["Lucas Paul"];
}
getOwnersWithG10kFine(db);
// У Паула спиздили красную феррари, она в розыске, но он хочет уточнить её номер (plateID)
// getPaulsFerrari(db) -> 'G08NO'
const getPaulsFerrari = undefined;

// Ох, оказывается это не одна спизженная машина
// надо вернуть имена владельцев всех спизженных машин (wanted: true)
// (Если конечно эти владельцы есть в нашей базе)
// getAllWantedCarsOwnerNames(db) -> ['Van Carlo-Cerailio', 'Johan Carlino', 'Lucas Paul']
const getAllWantedCarsOwnerNames = undefined;

module.exports = {
  getOwnersWithG10kFine,
  getPaulsFerrari,
  getAllWantedCarsOwnerNames,
};
