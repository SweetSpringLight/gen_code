import { BaseModel } from "../../../gencore/core/BaseModel";
import { UtilsFile } from "../../../gencore/core/UtilsFile";
export default function(model: BaseModel, moduleName?: string) {
    const contentFile = `
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ${model.entityName}IndexComponent } from './${model.entityEntryNameHyphen}-index/${model.entityEntryNameHyphen}-index.component';
import { ${model.entityName}FormComponent } from './${model.entityEntryNameHyphen}-form/${model.entityEntryNameHyphen}-form.component';

const routes: Routes = [
    {
        path: '${model.entityEntryNameHyphen}',
        component: ${model.entityName}IndexComponent
    },
    {
        path: '${model.entityEntryNameHyphen}/add',
        component: ${model.entityName}FormComponent
    },
    {
        path: '${model.entityEntryNameHyphen}/edit/:id',
        component: ${model.entityName}FormComponent
    },
    {
        path: '${model.entityEntryNameHyphen}/view/:id',
        component: ${model.entityName}FormComponent
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ${model.entityName}RoutingModule {}
`
    moduleName = moduleName || model.entityEntryNameHyphen;
    UtilsFile.writeFile(`/com.viettel.erp/political-web-app/src/app/modules/${moduleName}`, `/${model.entityEntryNameHyphen}-routing.module.ts`, contentFile);
};