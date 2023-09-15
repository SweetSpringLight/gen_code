/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseColumn } from "./BaseColumn";
import { BaseModel } from "./BaseModel";
import { ImpossibleValidate, MapAlign, MapTsType, MapType , MapTypeSql  } from "./Constants";

export class UtilsColumn {
    /**
     * Lấy kiểu dữ liệu java
     * @param model
     * @param property
     * @returns
     */
    public static javaType(column?: BaseColumn): string {
        if (column && column.type) {
            return MapType[column.type];
        } else {
            return 'String ';
        }
    }
    /**
     * Lấy kiểu dữ liệu java
     * @param model
     * @param property
     * @returns
     */
    public static tsType(column?: BaseColumn): string {
        if (column && column.controlType == 'listRefMany') {
            return `${column.refModel?.getModel().entityName}Model[]`;
        }
        if (column && column.type) {
            return MapTsType[column.type];
        } else {
            return 'any';
        }
    }
    public static listAlign(column?: BaseColumn): string {
        if (column && column.controlType) {
            return MapAlign[column.controlType] || 'left';
        } else {
            return 'left';
        }
    }
    /**
     * Lấy kiểu entity
     * @param model
     * @param property
     * @returns
     */
    public static javaRefEntity(column?: BaseColumn): string {
        if (column && column.type == 'Ref') {
            return column.refModel.getModel().entityName || 'String';
        } else {
            return 'String ';
        }
    }
    /**
     * Lấy kiểu dữ liệu java
     * @param model
     * @param property
     * @returns
     */
    public static javaType2(model: BaseModel, property?: string): string {
        if (!property) {
            return 'String';
        }
        const column = model.allColumn?.filter(x => x.name == property);
        if (column) {
            return UtilsColumn.javaType(column[0]);
        }
        return 'String';
    }
    /**
     * Lấy kiểu dữ liệu sql
     * @param model
     * @param property
     * @returns
     */
     public static javaTypeSql(column?: BaseColumn): string {
        if (column && column.type) {
            return MapTypeSql[column.type];
        } else {
            return 'VARCHAR';
        }
    }
    /**
     * Check cột dữ liệu có phải reference table không?
     * @param column
     * @returns
     */
    public static isRef(column?: BaseColumn): boolean {
        if (column && column.type) {
            return column.type == 'Ref';
        } else {
            return false;
        }
    }

    /**
     * Check cột dữ liệu có validate tương ứng không
     * @param column
     * @returns
     */
    public static hasValidate(column?: BaseColumn, validate?: ImpossibleValidate): boolean {
        if (column && column.validate && validate) {
            return column.validate.includes(validate);
        } else {
            return false;
        }
    }

    /**
     * hàm getter
     * @param column
     * @returns
     */
    public static getter(name?: string): string {
        return `get${UtilsColumn.jsUcfirst(name || '')}`;
    }

    /**
     * hàm setter
     * @param column
     * @returns
     */
    public static setter(name: string): string {
        return `set${UtilsColumn.jsUcfirst(name)}`;
    }
    static jsUcfirst(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static jsLCfirst(string: string): string {
        return string.charAt(0).toLowerCase() + string.slice(1);
    }

    static jsUcString(string?: string): string {
        if (!string) return "";
        const regex = /[A-Z]/g;
        const charaters = string.split("");
        let newStr = "";
        charaters.forEach(c => {
            if (regex.test(c)) {
                newStr += "_";
            }
            newStr += c;
        });
        return newStr.toUpperCase();
    }
}