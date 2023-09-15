/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
 import { UtilsFile } from '../../../gencore/core/UtilsFile';
 import { BaseModel } from "../../../gencore/core/BaseModel";
 import { BaseColumn } from '../../../gencore/core/BaseColumn';
 // module.js
export default function(model: BaseModel, moduleName?: string) {
    const contentFile = `
    <div *ngIf="hasPermission('action.view')">
        <${model.entityEntryNameHyphen}-search></${model.entityEntryNameHyphen}-search>
    </div>
    <div *ngIf="!hasPermission('action.view')">
        {{'common.haveNoPermission' | translate}}
    </div>
`;
moduleName = moduleName || model.entityEntryNameHyphen;
UtilsFile.writeFile(`/com.viettel.erp/political-web-app/src/app/modules/${moduleName}/${model.entityEntryNameHyphen}-index`, `/${model.entityEntryNameHyphen}-index.component.html`, contentFile);
};