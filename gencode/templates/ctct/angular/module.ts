import { BaseModel } from "../../../gencore/core/BaseModel";
import { UtilsFile } from "../../../gencore/core/UtilsFile";
export default function(model: BaseModel, moduleName?: string) {
    const contentFile = `
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { ${model.entityName}RoutingModule } from './${model.entityEntryNameHyphen}-routing.module';
import { ${model.entityName}IndexComponent } from './${model.entityEntryNameHyphen}-index/${model.entityEntryNameHyphen}-index.component';
import { ${model.entityName}SearchComponent } from './${model.entityEntryNameHyphen}-search/${model.entityEntryNameHyphen}-search.component';
import { ${model.entityName}FormComponent } from './${model.entityEntryNameHyphen}-form/${model.entityEntryNameHyphen}-form.component';

@NgModule({
    declarations: [
        ${model.entityName}IndexComponent,
        ${model.entityName}SearchComponent,
        ${model.entityName}FormComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ${model.entityName}RoutingModule
    ]
})
export class ${model.entityName}Module {}
`
    moduleName = moduleName || model.entityEntryNameHyphen;
    UtilsFile.writeFile(`/com.viettel.erp/political-web-app/src/app/modules/${moduleName}`, `/${model.entityEntryNameHyphen}.module.ts`, contentFile);
};