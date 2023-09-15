import { BaseModel } from "../../../gencore/core/BaseModel";
import { ImportUtils } from "../../../gencore/core/ImportUtils";
import { UtilsColumn } from "../../../gencore/core/UtilsColumn";
import { UtilsFile } from "../../../gencore/core/UtilsFile";
export default function(model: BaseModel, moduleName?: string) {
    const importUtils = new ImportUtils();
    moduleName = moduleName || model.entityEntryNameHyphen;
    const renderColumns = model?.getNonePrimaryColumnByTemplate('angular_search_html') || [];
    const initConstructor: any = [];
    const renderRelationMapping: string [] = [];
    const renderRelationBuild: string[] = [];
    const allColumns = model?.allColumn?.filter(ele => ele.options instanceof Array && ele.options.length) || [];
    const columnPrimary = model?.getPrimary()?.name;
    const arrFormConfig: any = [];
    const renderConstants: string[] = [];
    const dynamicImport: string[] = [];
    renderColumns?.forEach(column => {
        const colModel = column.refModel;
        const _rModel = colModel?.getModel();
        if (UtilsColumn.isRef(column)) {
            if (column?.controlType === "select") {
                initConstructor.push(`\n        private ${_rModel?.entityCamelName}Service: ${_rModel?.entityName}Service`);
                importUtils.addImport(`import { ${_rModel?.entityName}Service } from '@app/core/services/${moduleName}/${_rModel?.entityEntryNameHyphen}.service'`);
                renderRelationBuild.push(`\n        ${_rModel?.entityCamelName}Service.findAll().subscribe(res => {`);
                renderRelationBuild.push(`            if (res && res.type === RESPONSE_TYPE.SUCCESS) {`);
                renderRelationBuild.push(`                this.list${UtilsColumn.jsUcfirst(_rModel?.entityCamelName || '')} = res.data;`);
                renderRelationBuild.push(`            }`);
                renderRelationBuild.push(`        });`);
                renderRelationMapping.push(`\n    list${UtilsColumn.jsUcfirst(_rModel?.entityCamelName || '')} = [];`);
            }
        }
        if (column.name) {
            arrFormConfig.push(`\n        ${column.name}: [null]`);
        }
        if (column?.controlType === "selectYear") {
            renderRelationMapping.push(`listYear: any = []`);
            renderRelationBuild.push(`\n        this.listYear = CommonUtils.getYearList(20, 0);`);
        }
    });
    const objFormConfig = `{${arrFormConfig.join(",")}\n    }`;
    initConstructor.push(`\n        private router: Router`);
    initConstructor.push(`\n        private app: AppComponent`);
    initConstructor.push(`\n        private modalService: NgbModal`);
    initConstructor.push(`\n        private ${model.entityCamelName}Service: ${model.entityName}Service`);
    initConstructor.join(",");

    const constants: string[] = ['ACTION_FORM', 'RESPONSE_TYPE'];
    allColumns?.forEach(column => {
        const importConstant = `${UtilsColumn.jsUcString(column.name)}_OPTION`;
        constants.push(importConstant);
        if (column.name) {
            renderConstants.push(`\n    list${UtilsColumn.jsUcfirst(column.name)} = ${importConstant};`);
        }
    });
    if (constants.length) {
        dynamicImport.push(`import { ${constants.join(', ')} } from '@app/core';`);
    }

    const contentFile = `
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { BaseComponent } from '@app/shared/components/base-component/base-component.component';
import { CommonUtils } from '@app/shared/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ${model.entityName}Service } from '@app/core/services/${moduleName}/${model.entityEntryNameHyphen}.service';
${dynamicImport.join(`\n`)}
${importUtils.toString()}
@Component({
    selector: '${model.entityEntryNameHyphen}-search',
    templateUrl: './${model.entityEntryNameHyphen}-search.component.html'
})
export class ${model.entityName}SearchComponent extends BaseComponent implements OnInit {
    formSearch: FormGroup;
    operationKey = 'action.view';
    adResourceKey = 'resource.${model.entityCamelName}';
    resultList: any = {
        data: {
            data: []
        }
    }
    ${renderRelationMapping.join(`\n`)}
    formConfig = ${objFormConfig}${renderConstants.join(``)}
    constructor(${initConstructor}) {
        super(null, CommonUtils.getPermissionCode("resource.${model.entityCamelName}"));
        ${renderRelationBuild.join(`\n`)}
        this.setMainService(this.${model.entityCamelName}Service);
        this.formSearch = this.buildForm({}, this.formConfig, ACTION_FORM.VIEW, []);
    }

    ngOnInit() {
        this.processSearch();
    }

    get f() {
        return this.formSearch.controls;
    }

    processView(rowData: any) {
        this.${model.entityCamelName}Service.findOne(rowData.${columnPrimary}).subscribe(res => {
            if (res.type === RESPONSE_TYPE.SUCCESS && res.data) {
                this.router.navigate(['/${moduleName}/${model.entityEntryNameHyphen}/view/', rowData.${columnPrimary}]);
            } else {
                this.processSearch();
                return;
            }
        });
    }

    async prepareSaveOrUpdate(rowData?: any) {
        if (rowData && rowData.${columnPrimary}) {
            try {
                const rest = await this.${model.entityCamelName}Service.findOne(rowData.${columnPrimary}).toPromise();
                if (rest.type === RESPONSE_TYPE.SUCCESS && rest.data) {
                    this.router.navigate(['/${moduleName}/${model.entityEntryNameHyphen}/edit/', rowData.${columnPrimary}]);
                } else {
                    this.processSearch();
                    return;
                }
            } catch(error)  {
                this.processSearch();
            }
        } else {
            this.router.navigate(['/${moduleName}/${model.entityEntryNameHyphen}/add']);
        }
    }

    async processDelete(rowData: any) {
        this.app.confirmDelete(null, async () => {
            const rest = await this.${model.entityCamelName}Service.deleteById(rowData.${columnPrimary}).toPromise();
            if (rest.type === RESPONSE_TYPE.SUCCESS && rest.data) {
                this.processSearch(null);
            } else {
                this.processSearch();
            }
        }, () => {});
    }
}`;
    UtilsFile.writeFile(`/com.viettel.erp/political-web-app/src/app/modules/${moduleName}/${model.entityEntryNameHyphen}-search`, `/${model.entityEntryNameHyphen}-search.component.ts`, contentFile);
};