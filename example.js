"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_1 = require("./tabel/field");
let field = new field_1.Field("id", field_1.FieldType.VARCHAR);
field.length = 22;
field.attribute = field_1.FieldAttribute.BINARY;
field.autoIncrement = true;
field.default = "22";
field.index = field_1.FieldIndex.PRIMARY;
console.log(field.getSQL());