import Dexie from "dexie";

const db = new Dexie("recordsDB");
db.version(1).stores({
  records: "id,blob,title,name,tel,date"
});

db.records.add({
  id:1,
  blob:"blob",
  title:"sada",
  name: "contact.name",
  tel: "contact.tel",
  date: new Date()
})

export default db;
