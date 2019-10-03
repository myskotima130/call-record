import Dexie from "dexie";

const db = new Dexie("recordsDB");
db.version(1).stores({
  records: "id,blob,title,name,tel,date"
});

export default db;
