import Dexie from "dexie";

const db = new Dexie("recordsDB");
db.version(1).stores({
  records: "url,title"
});

export default db;
