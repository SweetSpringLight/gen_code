/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { UtilsFile } from '../../gencore/core/UtilsFile';
import { BaseModel } from "../../gencore/core/BaseModel";

// module.js
export default function(model: BaseModel) {
    const renderConstants = model?.allColumn?.filter(col => col.options && col.options.length)?.map(col => {
        return `export const ${col?.dbName?.toString().toUpperCase()}_OPTION = ${JSON.stringify(col?.options)};`;
    }).join(`
`);
    const contentFile = `${renderConstants}`
if (contentFile) {
    UtilsFile.writeFile(`/web-app-political/src/Pages/${model.entityName}`, `/constants.ts`, contentFile);
}
};
