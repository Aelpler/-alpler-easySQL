import * as logger from "@alpler/logger"
import { Field, FieldType } from "./field"

export class Table {

    private _name: string
    private _fields: Array<Field> = new Array()

    constructor(name: string) {
        this._name = name
    }

    set name(name) {
        this._name = name
    }

    get name() {
        return this._name
    }

    get fields() {
        return this._fields
    }

    createField(name: string, type: FieldType) {
        let field = new Field(name, type)
        this._fields.push(field)
        return field
    }

    getFieldByName(fieldName: string): Field {
        for (let field of this.fields) {
            if (field.name == fieldName)
                return field
        }
    }

    removeField(field: Field) {
        this._fields = this._fields.filter(function (ele) {
            return ele != field;
        });
    }

    getSQL(database: string): { result: string, error: Error } {
        let result = `CREATE TABLE IF NOT EXISTS \`${database}\`.\`${this.name}\` (`

        for (let i = 0; i < this.fields.length; i++) {
            let fieldSQL = this.fields[i].getSQL()
            if (fieldSQL.error) {
                return { result: undefined, error: fieldSQL.error }
            }

            if (i == this.fields.length - 1)
                result += `${this.fields[i].getSQL().result}`
            else
                result += `${this.fields[i].getSQL().result}, `
        }

        return {
            result: `${result});`, error: undefined
        }
    }

}