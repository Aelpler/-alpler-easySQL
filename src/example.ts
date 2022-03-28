import { Database } from "./tabel/database"
import { Field, FieldIndex, FieldType } from "./tabel/field"
import { Table } from "./tabel/table"


let database = new Database("bernd")
let table = database.createTable("Bernde")
let field = table.createField("field", FieldType.INT)
field.autoIncrement = true
field.index = FieldIndex.PRIMARY

let be = new Field("be", FieldType.TEXT)

console.log(database.getSQL().result)