import { BaseModel } from "../../../gencore/core/BaseModel";
import { UtilsFile } from "../../../gencore/core/UtilsFile";
export default function(model: BaseModel, moduleName?: string) {
    const contentFile = `
import { Routes } from '@angular/router';
export const CONTENT_ROUTES: Routes = [
    {
        path: '${model.entityEntryNameHyphen}',
        loadChildren: './modules/${model.entityEntryNameHyphen}/${model.entityEntryNameHyphen}.module#${model.entityName}Module'
    }
];
`
    moduleName = moduleName || model.entityEntryNameHyphen;
    UtilsFile.writeFile(`/com.viettel.erp/political-web-app/src/app/modules/${moduleName}`, `/content-layout.routes.ts`, contentFile);
};