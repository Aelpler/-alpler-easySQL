"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHARSET = exports.Database = void 0;
const table_1 = require("./table");
class Database {
    constructor(name, charset) {
        this._charset = CHARSET.utf8mb4;
        this._tables = new Array();
        this._name = name;
        if (charset)
            this._charset = charset;
    }
    get name() {
        return this._name;
    }
    get charset() {
        return this._charset;
    }
    get tables() {
        return this._tables;
    }
    set name(name) {
        this._name = name;
    }
    set charset(charset) {
        this._charset = charset;
    }
    getTableByName(name) {
        for (let table of this._tables)
            if (table.name == name)
                return table;
    }
    createTable(name) {
        let table = new table_1.Table(name);
        this.tables.push(table);
        return table;
    }
    removeTable(table) {
        this._tables = this._tables.filter(function (ele) {
            return ele != table;
        });
    }
    getSQL() {
        let result = `CREATE SCHEMA IF NOT EXISTS \`${this.name}\` DEFAULT CHARACTER SET ${CHARSET[this.charset]} ;\n`;
        let errorMsg = "";
        result += `USE \`${this.name}\` ;\n`;
        for (let table of this.tables) {
            let tableSQL = table.getSQL(this.name);
            if (tableSQL.error)
                return { result: undefined, error: tableSQL.error };
            result += `${tableSQL.result}\n`;
        }
        return { result: result, error: undefined };
    }
}
exports.Database = Database;
var CHARSET;
(function (CHARSET) {
    CHARSET[CHARSET["armscii8"] = 0] = "armscii8";
    CHARSET[CHARSET["ascii"] = 1] = "ascii";
    CHARSET[CHARSET["big5"] = 2] = "big5";
    CHARSET[CHARSET["binary"] = 3] = "binary";
    CHARSET[CHARSET["cp1250"] = 4] = "cp1250";
    CHARSET[CHARSET["cp1251"] = 5] = "cp1251";
    CHARSET[CHARSET["cp1256"] = 6] = "cp1256";
    CHARSET[CHARSET["cp1257"] = 7] = "cp1257";
    CHARSET[CHARSET["cp850"] = 8] = "cp850";
    CHARSET[CHARSET["cp852"] = 9] = "cp852";
    CHARSET[CHARSET["cp866"] = 10] = "cp866";
    CHARSET[CHARSET["cp932"] = 11] = "cp932";
    CHARSET[CHARSET["dec8"] = 12] = "dec8";
    CHARSET[CHARSET["eucjpms"] = 13] = "eucjpms";
    CHARSET[CHARSET["euckr"] = 14] = "euckr";
    CHARSET[CHARSET["gb18030"] = 15] = "gb18030";
    CHARSET[CHARSET["gb2312"] = 16] = "gb2312";
    CHARSET[CHARSET["gbk"] = 17] = "gbk";
    CHARSET[CHARSET["geostd8"] = 18] = "geostd8";
    CHARSET[CHARSET["greek"] = 19] = "greek";
    CHARSET[CHARSET["hebrew"] = 20] = "hebrew";
    CHARSET[CHARSET["hp8"] = 21] = "hp8";
    CHARSET[CHARSET["keybcs2"] = 22] = "keybcs2";
    CHARSET[CHARSET["koi8r"] = 23] = "koi8r";
    CHARSET[CHARSET["koi8u"] = 24] = "koi8u";
    CHARSET[CHARSET["latin1"] = 25] = "latin1";
    CHARSET[CHARSET["latin2"] = 26] = "latin2";
    CHARSET[CHARSET["latin5"] = 27] = "latin5";
    CHARSET[CHARSET["latin7"] = 28] = "latin7";
    CHARSET[CHARSET["macce"] = 29] = "macce";
    CHARSET[CHARSET["macroman"] = 30] = "macroman";
    CHARSET[CHARSET["sjis"] = 31] = "sjis";
    CHARSET[CHARSET["swe7"] = 32] = "swe7";
    CHARSET[CHARSET["tis620"] = 33] = "tis620";
    CHARSET[CHARSET["ucs2"] = 34] = "ucs2";
    CHARSET[CHARSET["ujis"] = 35] = "ujis";
    CHARSET[CHARSET["utf16"] = 36] = "utf16";
    CHARSET[CHARSET["utf16le"] = 37] = "utf16le";
    CHARSET[CHARSET["utf32"] = 38] = "utf32";
    CHARSET[CHARSET["utf8mb3"] = 39] = "utf8mb3";
    CHARSET[CHARSET["utf8mb4"] = 40] = "utf8mb4";
})(CHARSET = exports.CHARSET || (exports.CHARSET = {}));
