import * as logger from "@alpler/logger"


/** Default Length for all the fields where the length was not set */
let defaultLength = 150

export class Field {

    private _name: string

    private _type: FieldType
    private _length: string
    private _default: string
    private _attribute: FieldAttribute
    private _notNull: boolean = false
    private _index: FieldIndex
    private _autoIncrement: boolean = false
    private _comment: string

    constructor(name: string, type: FieldType) {
        this._name = name
        this._type = type
    }

    set name(name) {
        this._name = name
    }

    set type(type) {
        this._type = type
    }

    set length(length: number) {
        this._length = length.toString()
    }

    /** For some reason it doesn't allow default as parameter can anyone explain why? */
    set default(def) {
        this._default = def
    }

    set attribute(attribute) {
        this._attribute = attribute
    }

    set notNull(notNull) {
        this._notNull = notNull
    }

    set index(index) {
        this._index = index
    }

    set autoIncrement(autoIncrement) {
        this._autoIncrement = autoIncrement
    }

    set comment(comment) {
        this._comment = comment
    }

    set extraAttribute(extraAttribute) {
        this._length = extraAttribute
    }

    get name() {
        return this._name
    }

    get type() {
        return this._type
    }

    get length(): number {
        if (isNaN(Number(this._length)))
            return NaN
        return Number(this._length)
    }

    get default() {
        return this._default
    }

    get attribute() {
        return this._attribute
    }

    get notNull() {
        return this._notNull
    }

    get index() {
        return this._index
    }

    get autoIncrement() {
        return this._autoIncrement
    }

    get comment() {
        return this._comment
    }

    get extraAttribute() {
        if (typeof (this._length) == "number")
            return ""
        return this._length
    }

    /**
     * returns Field as SQL code
     * example: id INT AUTO_INCREMENT PRIMARY KEY NOT NULL
     */
    getSQL(): string {

        let result: string = `${this.name} ${this.type.name}`

        /** Checks if length is needed and is not given will set default as length if not given but will give out a warn because,
        * it could end in an error the value is longer than the length of the field
        */
        if (this.type.lengthNeeded && isNaN(this.length)) {
            logger.log(logger.LogLevel.WARN, "@alpler/easySQL/field.ts:getSQL()", `No length was given, but was needed at ${this.name}` +
                ` ${this.type.name} length will now be default value ${defaultLength}`)
            this.length = defaultLength
        }

        /** Checks if extraAttribute is needed if yes checks if length is extra attribute in form of string 
         * will just return error as result so mysql will say no
        */
        if (this.type.extraAttributeNeeded) {
            if (!this._length || !isNaN(Number(this._length))) {
                logger.log(logger.LogLevel.FATAL, "@alpler/easySQL/field.ts:getSQL()", `No extra attribute was given, but was needed at ${this.name} ${this.type.name}`)
                return `No extra attribute was given, but was needed at ${this.name} ${this.type.name}`
            }
        }

        if (this._length)
            result += `(${this._length})`

        if (this.autoIncrement)
            result += " AUTO_INCREMENT"

        if (this.attribute)
            result += ` ${this.attribute}`

        if (this.index)
            result += ` ${this.index}`

        if (this.notNull) {
            result += " NOT NULL"
        } else if (this.default)
            result += ` NOT NULL DEFAULT '${this.default}'`
        else
            result += " NULL"

        if (this.comment)
            result += ` COMMENT '${this.comment}'`

        return result
    }
}

export class FieldType {

    /** Default values */
    static readonly TINYTEXT = new FieldType('TINYTEXT', false, false)
    static readonly TEXT = new FieldType('TEXT', false, false)
    static readonly MEDIUMTEXT = new FieldType('MEDIUMTEXT', false, false)
    static readonly LONGTEXT = new FieldType('LONGTEXT', false, false)
    static readonly TINYBLOB = new FieldType('TINYBLOB', false, false)
    static readonly BLOB = new FieldType('BLOB', false, false)
    static readonly MEDIUMBLOB = new FieldType('MEDIUMBLOB', false, false)
    static readonly LONGBLOB = new FieldType('LONGBLOB', false, false)
    static readonly CHAR = new FieldType('CHAR', true, false)
    static readonly VARCHAR = new FieldType('VARCHAR', true, false)
    static readonly BINARY = new FieldType('BINARY', false, false)
    static readonly VARBINARY = new FieldType('VARBINARY', false, false)
    static readonly ENUM = new FieldType('ENUM', false, true)
    static readonly SET = new FieldType('SET', false, true)
    static readonly TINYINT = new FieldType('TINYINT', false, false)
    static readonly SMALLINT = new FieldType('SMALLINT', false, false)
    static readonly INT = new FieldType('INT', false, false)
    static readonly MEDIUMINT = new FieldType('MEDIUMINT', false, false)
    static readonly BIGINT = new FieldType('BIGINT', false, false)
    static readonly BOOLEAN = new FieldType('BOOLEAN', false, false)
    static readonly FLOAT = new FieldType('FLOAT', false, false)
    static readonly DOUBLE = new FieldType('DOUBLE', false, false)
    static readonly DECIMAL = new FieldType('DECIMAL', false, false)
    static readonly BIT = new FieldType('BIT', false, false)
    static readonly DATE = new FieldType('DATE', false, false)
    static readonly TIME = new FieldType('TIME', false, false)
    static readonly DATETIME = new FieldType('DATETIME', false, false)
    static readonly TIMESTAMP = new FieldType('TIMESTAMP', false, false)
    static readonly YEAR = new FieldType('YEAR', false, false)
    static readonly GEOMETRY = new FieldType('GEOMETRY', false, false)
    static readonly POINT = new FieldType('POINT', false, false)
    static readonly LINESTRING = new FieldType('LINESTRING', false, false)
    static readonly POLYGON = new FieldType('POLYGON', false, false)
    static readonly MULTIPOINT = new FieldType('MULTIPOINT', false, false)
    static readonly MULTILINESTRING = new FieldType('MULTILINESTRING', false, false)
    static readonly MULTIPOLYGON = new FieldType('MULTIPOLYGON', false, false)
    static readonly GEOMETRYCOLLECTION = new FieldType('GEOMETRYCOLLECTION', false, false)
    static readonly JSON = new FieldType('JSON', false, false)

    private _name: string
    private _lengthNeeded: boolean
    private _extraAttributeNeeded: boolean = false

    private constructor(name: string, lengthNeeded: boolean, extraAttributeNeeded?: boolean) {
        this._name = name
        this._lengthNeeded = lengthNeeded
        this._extraAttributeNeeded = extraAttributeNeeded || false
    }

    get name() {
        return this._name
    }

    get lengthNeeded() {
        return this._lengthNeeded
    }

    get extraAttributeNeeded() {
        return this._extraAttributeNeeded
    }

}

export enum FieldAttribute {
    BINARY = "BINARY", UNSIGEND = "UNSIGNED",
    UNSIGNED_ZEROFILL = "UNSIGNED ZEROFILL",
    ON_UPDATE_CURRENT_TIMESTAMP = "ON UPDATE CURRENT_TIMESTAMP"
}

export enum FieldIndex {

    PRIMARY = "PRIMARY", UNIQUE = "UNIQUE",
    INDEX = "INDEX", FULLTEXT = "FULLTEXT",
    SPATIAL = "SPATIAL"

}