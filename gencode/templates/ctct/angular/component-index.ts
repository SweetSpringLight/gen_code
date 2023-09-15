import { BaseModel } from "../../../gencore/core/BaseModel";
import { UtilsFile } from "../../../gencore/core/UtilsFile";
export default function(model: BaseModel, moduleName?: string) {
    const contentFile = `
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base-component/base-component.component';
import { CommonUtils } from '@app/shared/services';
@Component({
    selector: '${model.entityEntryNameHyphen}-index',
    templateUrl: './${model.entityEntryNameHyphen}-index.component.html'
})
export class ${model.entityName}IndexComponent extends BaseComponent implements OnInit {
    constructor() {
        super(null, CommonUtils.getPermissionCode("resource.${model.entityCamelName}"));
    }

    ngOnInit() {}
}`;
    moduleName = moduleName || model.entityEntryNameHyphen;
    UtilsFile.writeFile(`/com.viettel.erp/political-web-app/src/app/modules/${moduleName}/${model.entityEntryNameHyphen}-index`, `/${model.entityEntryNameHyphen}-index.component.ts`, contentFile);
};