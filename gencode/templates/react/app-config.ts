/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { UtilsFile } from '../../gencore/core/UtilsFile';
import { BaseModel } from "../../gencore/core/BaseModel";
// module.js
export default function(model: BaseModel) {
    const contentFile = `export const CONFIG: any = {
API_PATH: {
    '${model.entityCamelName}': '/v2/${model.entityEntryNameHyphen}s',
}
}`;
UtilsFile.writeFile(`/web-app-political/src/Pages/${model.entityName}`, `/app-config.ts`, contentFile);
};
