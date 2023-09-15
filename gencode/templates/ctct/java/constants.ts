/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseColumn } from "../../../gencore/core/BaseColumn";
import { BaseModel } from "../../../gencore/core/BaseModel";
import { AUTHOR, LICENSE_TERMS } from "../../../gencore/core/Constants";
import { Utils } from "../../../gencore/core/Utils";
import { UtilsColumn } from "../../../gencore/core/UtilsColumn";
import { UtilsFile } from "../../../gencore/core/UtilsFile";

// module.js
export default function(model: BaseModel, moduleName?: string) {
    // const renderEnumModel = [] as any;
    const colEnumModel = model?.allColumn?.filter(col => col.options && col.options.length);

    const exactTemplate = (column: BaseColumn) => {
        let str = "";
        const costName = model.entityName?.concat(`${UtilsColumn.jsUcfirst(column?.name || '')}`);
        str += `public static enum ${costName} {\n`;
        if (column?.options?.length) {
            const keyType = UtilsColumn.javaType(column)?.trim();
            const _temp = [] as any;
            column.options.forEach(op => {
                const title = Utils.underscoreStr(op?.name || '')?.toUpperCase();
                _temp.push(`        ${title}(${op.id}${keyType == 'Long' ? 'L' : ''}, "${op.name}")`);
            });
            str += _temp.join(`,\n`);
            if (_temp.length) str += `;\n`;
            str += `\n`;
            str += `        private ${keyType} value;\n`;
            str += `        private String label;\n`;
            str += `\n`;
            str += `        private ${costName}(${keyType} value, String label) {\n`;
            str += `            this.value = value;\n`;
            str += `            this.label = label;\n`;
            str += `        }\n`;

            str += `\n`;
            str += `        public static String findByValue(${keyType} value) {\n`;
            str += `            for (${costName} element: ${costName}.values()) {\n`;
            str += `                if (element.getValue().equals(value)) {\n`;
            str += `                    return element.getLabel();\n`;
            str += `                }\n`;
            str += `            }\n`;
            str += `            return null;\n`;
            str += `        }\n`;

            str += `\n`;
            str += `        public ${keyType} getValue() { return value;}\n`;
            str += `        public String getLabel() { return label;}\n`;
        }
        str += `    }\n`
        return str;
    }

    const str = colEnumModel?.map(col => exactTemplate(col)).join(`
    `)


    // const renderEnumModel = () => {
    //     const str = colEnumModel?.map(col => {
    //         const options = [] as any;
    //         col.options?.forEach(op => {

    //             options.push(`${title}(${op.id}L, "${op.name})"`);
    //         });
    //         if (options.length) {
    //             return `public static enum ${model.tableName?.concat(`_${col?.name}`).toUpperCase()} {
    //                 ${options.join(`,
    //                 `)}
    //             }`;
    //         }
    //     });
    //     return str;
    // }
const contentFile = `${LICENSE_TERMS}
${AUTHOR}
public class Constants {
    ${ str }
}
`
UtilsFile.writeFile(`/com.viettel.erp/political-service/src/main/java/com/viettel/politicalv2/repository`, `/${model.entityName}Constants.java`, contentFile);
}
