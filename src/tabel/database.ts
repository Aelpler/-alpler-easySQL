import { Table } from "./table"

export class Database {

    private _name: string
    private _charset: CHARSET = CHARSET.utf8mb4
    private _tables: Array<Table> = new Array()

    constructor(name: string, charset?: CHARSET) {
        this._name = name
        if (charset)
            this._charset = charset
    }

    get name() {
        return this._name
    }

    get charset() {
        return this._charset
    }

    get tables() {
        return this._tables
    }

    set name(name) {
        this._name = name
    }

    set charset(charset) {
        this._charset = charset
    }

    getTableByName(name: string): Table {
        for (let table of this._tables)
            if (table.name == name)
                return table
    }

    createTable(name: string): Table {
        let table = new Table(name)
        this.tables.push(table)
        return table
    }

    removeTable(table: Table) {
        this._tables = this._tables.filter(function (ele) {
            return ele != table;
        });
    }

    getSQL(): { result: string, error: Error } {
        let result = `CREATE SCHEMA IF NOT EXISTS \`${this.name}\` DEFAULT CHARACTER SET ${CHARSET[this.charset]} ;\n`
        let errorMsg = ""

        result += `USE \`${this.name}\` ;\n`

        for (let table of this.tables) {
            let tableSQL = table.getSQL(this.name)
            if (tableSQL.error)
                return { result: undefined, error: tableSQL.error }

            result += `${tableSQL.result}\n`
        }

        return { result: result, error: undefined }
    }
}

export enum CHARSET {
    armscii8, ascii, big5, binary, cp1250, cp1251, cp1256, cp1257, cp850, cp852, cp866,
    cp932, dec8, eucjpms, euckr, gb18030, gb2312, gbk, geostd8, greek,
    hebrew, hp8, keybcs2, koi8r, koi8u, latin1, latin2, latin5, latin7, macce, macroman,
    sjis, swe7, tis620, ucs2, ujis, utf16, utf16le, utf32, utf8mb3, utf8mb4

}