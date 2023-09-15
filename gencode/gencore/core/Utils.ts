/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import moment from "moment";
const SIGNED_ARR = ["à", "á", "ạ", "ả", "ã", "â", "ầ", "ấ", "ậ", "ẩ", "ẫ",
    "ă", "ằ", "ắ", "ặ", "ẳ", "ẵ", "è", "é", "ẹ", "ẻ", "ẽ", "ê", "ề", "ế", "ệ", "ể", "ễ", "ì", "í", "ị", "ỉ",
    "ĩ", "ò", "ó", "ọ", "ỏ", "õ", "ô", "ồ", "ố", "ộ", "ổ", "ỗ", "ơ", "ờ", "ớ", "ợ", "ở", "ỡ", "ù", "ú", "ụ",
    "ủ", "ũ", "ư", "ừ", "ứ", "ự", "ử", "ữ", "ỳ", "ý", "ỵ", "ỷ", "ỹ", "đ", "À", "Á", "Ạ", "Ả", "Ã", "Â", "Ầ",
    "Ấ", "Ậ", "Ẩ", "Ẫ", "Ă", "Ằ", "Ắ", "Ặ", "Ẳ", "Ẵ", "È", "É", "Ẹ", "Ẻ", "Ẽ", "Ê", "Ề", "Ế", "Ệ", "Ể", "Ễ",
    "Ì", "Í", "Ị", "Ỉ", "Ĩ", "Ò", "Ó", "Ọ", "Ỏ", "Õ", "Ô", "Ồ", "Ố", "Ộ", "Ổ", "Ỗ", "Ơ", "Ờ", "Ớ", "Ợ", "Ở",
    "Ỡ", "Ù", "Ú", "Ụ", "Ủ", "Ũ", "Ư", "Ừ", "Ứ", "Ự", "Ử", "Ữ", "Ỳ", "Ý", "Ỵ", "Ỷ", "Ỹ", "Đ", "đ"];
    const UNSIGNED_ARR = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a",
    "a", "a", "a", "a", "a", "a", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "i", "i", "i", "i",
    "i", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "u", "u", "u",
    "u", "u", "u", "u", "u", "u", "u", "u", "y", "y", "y", "y", "y", "d", "A", "A", "A", "A", "A", "A", "A",
    "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E",
    "I", "I", "I", "I", "I", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O",
    "O", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "Y", "Y", "Y", "Y", "Y", "D", "d"];
export class Utils {
    public static alias(tableName?: string, sufix?: string | number) {
        if (tableName) {
            const a = tableName.split('_');
            const alias: string[] = [];
            for (let i = 0; i < a.length; i++) {
                alias.push(a[i].charAt(0).toString());
            }
            if (sufix) {
                alias.push(sufix.toString());
            }
            return alias.join('');
        }
        return '';
    }
    /**
     * convert date to format
     * @param {*} value
     * @param {*} format
     * @returns
     */
    static convertDateToString = (timestamps: any, format: any = "DD/MM/YYYY") => {
        if (!timestamps) return null;
        return moment(timestamps).format(format);
    }

    static isNullOrEmpty = (checkValue: any) => {
        if (checkValue == null || checkValue == undefined) {
            return true;
        }
        var typeOf = typeof checkValue;
        if (typeOf === "undefined") {
            return true;
        }
        if (typeOf === "string") {
            return checkValue.trim() == "";
        }
        if (Array.isArray(checkValue) && checkValue.length == 0) {
            return true;
        }
        return false;
    }
    /**
     * replace all
     * @param *
     * @returns
     */
    static replaceAll = (input: any, find: any, replace: any) => {
        if (this.isNullOrEmpty(input)) {
            return input;
        }
        return input.split(find).join(replace);
    }

    static removeSign = (originalName: any) => {
        if (!originalName) {
            return "";
        }
        let result = originalName;
        for (let i = 0; i < SIGNED_ARR.length; i++) {
            result = this.replaceAll(result, SIGNED_ARR[i], UNSIGNED_ARR[i]);
        }
        return result;
    }

    static underscoreStr = (string: any) => {
        if (this.isNullOrEmpty(string)) return null;
        const splitCharacter = this.replaceAll(string, " ", "_")
        const textUnder = this.removeSign(splitCharacter);
        return textUnder;
    }
}