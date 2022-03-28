"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
const field_1 = require("./field");
class Table {
    constructor(name) {
        this._fields = new Array();
        this._name = name;
    }
    set name(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    get fields() {
        return this._fields;
    }
    createField(name, type) {
        let field = new field_1.Field(name, type);
        this._fields.push(field);
        return field;
    }
    getFieldByName(fieldName) {
        for (let field of this.fields) {
            if (field.name == fieldName)
                return field;
        }
    }
    removeField(field) {
        this._fields = this._fields.filter(function (ele) {
            return ele != field;
        });
    }
    getSQL(database) {
        let result = `CREATE TABLE IF NOT EXISTS \`${database}\`.\`${this.name}\` (`;
        for (let i = 0; i < this.fields.length; i++) {
            let fieldSQL = this.fields[i].getSQL();
            if (fieldSQL.error) {
                return { result: undefined, error: fieldSQL.error };
            }
            if (i == this.fields.length - 1)
                result += `${this.fields[i].getSQL().result}`;
            else
                result += `${this.fields[i].getSQL().result}, `;
        }
        return {
            result: `${result});`, error: undefined
        };
    }
}
exports.Table = Table;
