import { BaseModel } from "../../../gencore/core/BaseModel";
import { UtilsColumn } from "../../../gencore/core/UtilsColumn";
import { UtilsFile } from "../../../gencore/core/UtilsFile";
export default function(model: BaseModel) {
    const allColumns = model?.allColumn?.filter(ele => ele.options instanceof Array && ele.options.length) || [];
    const lines: any[] = [];
    allColumns?.forEach(ele => {
        const options = ele.options;
        lines.push(`export const ${UtilsColumn.jsUcString(ele.name)}_OPTION = [`);
        options?.forEach(option => {
            if (option instanceof Object) {
                const obj: any = option || {};
                lines.push(`  {`);
                for (const key in obj) {
                    const isNumber = Number.isInteger(obj[key]);
                    lines.push(`    ${key}: ${isNumber ? obj[key] : `"${obj[key]}"`},`);
                }
                lines.push(`  },`);
            } else {
                lines.push(`  ${option},`);
            }
        });
        lines.push(`]`);
    });
    const contentFile = `
${lines.join('\n')}
`;
    UtilsFile.writeFile(`/com.viettel.erp/political-web-app/src/app/modules/${model.entityEntryNameHyphen}`, `/constants.ts`, contentFile);
};