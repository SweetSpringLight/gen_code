import { BaseModel } from "../../../gencore/core/BaseModel";
import { UtilsFile } from "../../../gencore/core/UtilsFile";
export default function(model: BaseModel, moduleName?: string) {
    const renderColumns = model?.getNonePrimarysByTemplate(['angular_form_html', 'angular_search_html', 'angular_list_html', 'angular_import_form']) || [];
    const obj: any = {};
    renderColumns?.forEach(ele => {
        const key = ele?.name || "";
        if (!obj[key]) {
            obj[key] = ele.label || ele.name;
        }
        if (ele?.controlType === "select" && ele?.options instanceof Array && ele?.options.length) {
            ele?.options?.forEach((op: any) => {
                const opLabel: any = ele?.optionLabel || "name";
                if (opLabel && op[opLabel]) {
                    const opKey: any = `${key}.${op[ele?.optionValue || "id"]}`;
                    obj[opKey] = op[opLabel];
                }
            });
        }
    });
    const lines: string[] = [];
    for (const property in obj) {
        lines.push(`"${model.entityCamelName}.${property}": "${obj[property]}"`);
    }
    const contentFile = `
{
    ${lines.join(`\n    ,`)}
}
`;
    moduleName = moduleName || model.entityEntryNameHyphen;
    UtilsFile.writeFile(`/com.viettel.erp/political-web-app/src/app/modules/${moduleName}`, `/locale-vi.json`, contentFile);
};