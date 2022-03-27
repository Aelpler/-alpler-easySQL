"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldIndex = exports.FieldAttribute = exports.FieldType = exports.Field = void 0;
const logger = __importStar(require("@alpler/logger"));
/** Default Length for all the fields where the length was not set */
let defaultLength = 150;
class Field {
    constructor(name, type) {
        this._notNull = false;
        this._autoIncrement = false;
        this._name = name;
        this._type = type;
    }
    set name(name) {
        this._name = name;
    }
    set type(type) {
        this._type = type;
    }
    set length(length) {
        this._length = length.toString();
    }
    /** For some reason it doesn't allow default as parameter can anyone explain why? */
    set default(def) {
        this._default = def;
    }
    set attribute(attribute) {
        this._attribute = attribute;
    }
    set notNull(notNull) {
        this._notNull = notNull;
    }
    set index(index) {
        this._index = index;
    }
    set autoIncrement(autoIncrement) {
        this._autoIncrement = autoIncrement;
    }
    set comment(comment) {
        this._comment = comment;
    }
    set extraAttribute(extraAttribute) {
        this._length = extraAttribute;
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
    get length() {
        if (isNaN(Number(this._length)))
            return NaN;
        return Number(this._length);
    }
    get default() {
        return this._default;
    }
    get attribute() {
        return this._attribute;
    }
    get notNull() {
        return this._notNull;
    }
    get index() {
        return this._index;
    }
    get autoIncrement() {
        return this._autoIncrement;
    }
    get comment() {
        return this._comment;
    }
    get extraAttribute() {
        if (typeof (this._length) == "number")
            return "";
        return this._length;
    }
    /**
     * returns Field as SQL code
     * example: id INT AUTO_INCREMENT PRIMARY KEY NOT NULL
     */
    getSQL() {
        let result = `${this.name} ${this.type.name}`;
        /** Checks if length is needed and is not given will set default as length if not given but will give out a warn because,
        * it could end in an error the value is longer than the length of the field
        */
        if (this.type.lengthNeeded && isNaN(this.length)) {
            logger.log(logger.LogLevel.WARN, "@alpler/easySQL/field.ts:getSQL()", `No length was given, but was needed at ${this.name}` +
                ` ${this.type.name} length will now be default value ${defaultLength}`);
            this.length = defaultLength;
        }
        /** Checks if extraAttribute is needed if yes checks if length is extra attribute in form of string
         * will just return error as result so mysql will say no
        */
        if (this.type.extraAttributeNeeded) {
            if (!this._length || !isNaN(Number(this._length))) {
                logger.log(logger.LogLevel.FATAL, "@alpler/easySQL/field.ts:getSQL()", `No extra attribute was given, but was needed at ${this.name} ${this.type.name}`);
                return `No extra attribute was given, but was needed at ${this.name} ${this.type.name}`;
            }
        }
        if (this._length)
            result += `(${this._length})`;
        if (this.autoIncrement)
            result += " AUTO_INCREMENT";
        if (this.attribute)
            result += ` ${this.attribute}`;
        if (this.index)
            result += ` ${this.index}`;
        if (this.notNull) {
            result += " NOT NULL";
        }
        else if (this.default)
            result += ` NOT NULL DEFAULT '${this.default}'`;
        else
            result += " NULL";
        if (this.comment)
            result += ` COMMENT '${this.comment}'`;
        return result;
    }
}
exports.Field = Field;
class FieldType {
    constructor(name, lengthNeeded, extraAttributeNeeded) {
        this._extraAttributeNeeded = false;
        this._name = name;
        this._lengthNeeded = lengthNeeded;
        this._extraAttributeNeeded = extraAttributeNeeded || false;
    }
    get name() {
        return this._name;
    }
    get lengthNeeded() {
        return this._lengthNeeded;
    }
    get extraAttributeNeeded() {
        return this._extraAttributeNeeded;
    }
}
exports.FieldType = FieldType;
/** Default values */
FieldType.TINYTEXT = new FieldType('TINYTEXT', false, false);
FieldType.TEXT = new FieldType('TEXT', false, false);
FieldType.MEDIUMTEXT = new FieldType('MEDIUMTEXT', false, false);
FieldType.LONGTEXT = new FieldType('LONGTEXT', false, false);
FieldType.TINYBLOB = new FieldType('TINYBLOB', false, false);
FieldType.BLOB = new FieldType('BLOB', false, false);
FieldType.MEDIUMBLOB = new FieldType('MEDIUMBLOB', false, false);
FieldType.LONGBLOB = new FieldType('LONGBLOB', false, false);
FieldType.CHAR = new FieldType('CHAR', true, false);
FieldType.VARCHAR = new FieldType('VARCHAR', true, false);
FieldType.BINARY = new FieldType('BINARY', false, false);
FieldType.VARBINARY = new FieldType('VARBINARY', false, false);
FieldType.ENUM = new FieldType('ENUM', false, true);
FieldType.SET = new FieldType('SET', false, true);
FieldType.TINYINT = new FieldType('TINYINT', false, false);
FieldType.SMALLINT = new FieldType('SMALLINT', false, false);
FieldType.INT = new FieldType('INT', false, false);
FieldType.MEDIUMINT = new FieldType('MEDIUMINT', false, false);
FieldType.BIGINT = new FieldType('BIGINT', false, false);
FieldType.BOOLEAN = new FieldType('BOOLEAN', false, false);
FieldType.FLOAT = new FieldType('FLOAT', false, false);
FieldType.DOUBLE = new FieldType('DOUBLE', false, false);
FieldType.DECIMAL = new FieldType('DECIMAL', false, false);
FieldType.BIT = new FieldType('BIT', false, false);
FieldType.DATE = new FieldType('DATE', false, false);
FieldType.TIME = new FieldType('TIME', false, false);
FieldType.DATETIME = new FieldType('DATETIME', false, false);
FieldType.TIMESTAMP = new FieldType('TIMESTAMP', false, false);
FieldType.YEAR = new FieldType('YEAR', false, false);
FieldType.GEOMETRY = new FieldType('GEOMETRY', false, false);
FieldType.POINT = new FieldType('POINT', false, false);
FieldType.LINESTRING = new FieldType('LINESTRING', false, false);
FieldType.POLYGON = new FieldType('POLYGON', false, false);
FieldType.MULTIPOINT = new FieldType('MULTIPOINT', false, false);
FieldType.MULTILINESTRING = new FieldType('MULTILINESTRING', false, false);
FieldType.MULTIPOLYGON = new FieldType('MULTIPOLYGON', false, false);
FieldType.GEOMETRYCOLLECTION = new FieldType('GEOMETRYCOLLECTION', false, false);
FieldType.JSON = new FieldType('JSON', false, false);
var FieldAttribute;
(function (FieldAttribute) {
    FieldAttribute["BINARY"] = "BINARY";
    FieldAttribute["UNSIGEND"] = "UNSIGNED";
    FieldAttribute["UNSIGNED_ZEROFILL"] = "UNSIGNED ZEROFILL";
    FieldAttribute["ON_UPDATE_CURRENT_TIMESTAMP"] = "ON UPDATE CURRENT_TIMESTAMP";
})(FieldAttribute = exports.FieldAttribute || (exports.FieldAttribute = {}));
var FieldIndex;
(function (FieldIndex) {
    FieldIndex["PRIMARY"] = "PRIMARY";
    FieldIndex["UNIQUE"] = "UNIQUE";
    FieldIndex["INDEX"] = "INDEX";
    FieldIndex["FULLTEXT"] = "FULLTEXT";
    FieldIndex["SPATIAL"] = "SPATIAL";
})(FieldIndex = exports.FieldIndex || (exports.FieldIndex = {}));
