/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { UtilsFile } from './../../gencore/core/UtilsFile';
import { BaseModel } from "../../gencore/core/BaseModel";
import { UtilsColumn } from '../../gencore/core/UtilsColumn';
// module.js
export default function(model: BaseModel) {
    const formModels = model.getColumnsByTemplate(['react_model'])?.map(col => {
        const hasRequired = UtilsColumn.hasValidate(col, 'required');
        if (col.isPrimaryKey) return `${col.name}: ${['Long', 'Ref'].includes(col.type || '') ? 'number' : col?.type};`;
        return `${col.name}${hasRequired ? '' : '?'}: ${['Long', 'Ref'].includes(col.type || '') ? 'number' : col?.type};`;
    }).join(`
    `);
    const contentFile = `export interface ${model.entityName}Model {
    ${formModels}
}
`
UtilsFile.writeFile(`/web-app-political/src/Services/Models`, `/${model.entityName}Model.ts`, contentFile);
};
