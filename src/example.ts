import { Field, FieldAttribute, FieldIndex, FieldType } from "./tabel/field"

let field = new Field("id", FieldType.VARCHAR)
field.length = 22
field.attribute = FieldAttribute.BINARY
field.autoIncrement = true
field.default = "22"
field.index = FieldIndex.PRIMARY

console.log(field.getSQL())