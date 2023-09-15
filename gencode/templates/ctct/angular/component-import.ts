import { BaseModel } from "../../../gencore/core/BaseModel";
import { ImportUtils } from '../../../gencore/core/ImportUtils';
import { UtilsColumn } from "../../../gencore/core/UtilsColumn";
import { UtilsFile } from "../../../gencore/core/UtilsFile";
export default function(model: BaseModel, moduleName?: string) {
    moduleName = moduleName || model.entityEntryNameHyphen;
    const renderColumns = model?.getNonePrimaryColumnByTemplate('angular_import_form') || [];
    const columnPrimary = model?.getPrimary()?.name;
    const arrFormConfig: any = [];
    const buildRelation: string[] = [];
    const validateRelations: string[] = [];
    const renderRelationFormSave: string[] = [];
    renderColumns?.forEach(column => {
        const refModel = column.refModel;
        if (refModel && refModel.isRefMany()) {
            buildRelation.push(`this.formSave.controls['${column.name}'] = new FormArray([]);`);
            buildRelation.push(`        if (data['${column.name}'] instanceof Array && data['${column.name}'].length) {`);
            buildRelation.push(`            this.formSave.setControl('${column.name}', this.formBuilder.array(data['${column.name}']))`);
            buildRelation.push(`        }`);
            validateRelations.push(`if (!this.formSave.controls['${column.name}'].value.length) {`);
            validateRelations.push(`            return false;`);
            validateRelations.push(`        }`);
            renderRelationFormSave.push(`this.formSave['${column.name}'] = this.formSave.get('${column.name}').value;`);
        }
        if (column.name) {
            const validates: string[] = [];
            if (UtilsColumn.hasValidate(column, "required")) {
                validates.push(`ValidationService.required`);
            }
            if (UtilsColumn.hasValidate(column, "maxlength")) {
                validates.push(`ValidationService.maxLength(${column.length})`);
            }
            arrFormConfig.push(`\n        ${column.name}: [null${validates.length ? `, ${validates}`: ''}]`);
        }
    });
    arrFormConfig.push(`\n        fileImport: [null, ValidationService.required]`);
    const objFormConfig = `{${arrFormConfig.join(",")}\n    }`;
    const initConstructor: any = [];
    initConstructor.push(`\n        public activeModal: NgbActiveModal`);
    initConstructor.push(`\n        public actr: ActivatedRoute`);
    initConstructor.push(`\n        private ${model.entityCamelName}Service: ${model.entityName}Service`);
    const contentFile = `
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base-component/base-component.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { CommonUtils, ValidationService } from '@app/shared/services';
import { ${model.entityName}Service } from '@app/core/services/${moduleName}/${model.entityEntryNameHyphen}.service';
import { RESPONSE_TYPE } from '@app/core';
@Component({
    selector: 'import-${model.entityEntryNameHyphen}',
    templateUrl: './import-${model.entityEntryNameHyphen}.component.html'
})
export class Import${model.entityName}Component extends BaseComponent implements OnInit {
    formSave: FormGroup;
    public dataError: any;
    formConfig = ${objFormConfig}
    ${columnPrimary}: any = null;
    constructor(${initConstructor}) {
        super(null, CommonUtils.getPermissionCode("resource.${model.entityCamelName}"));
        this.formSave = this.buildForm({}, this.formConfig);
    }

    ngOnInit() {}

    get f() {
        return this.formSave.controls;
    }

    async onDownloadTemplate() {
        const formData = {
            ${columnPrimary}: this.${columnPrimary}
        };
        const rest = await this.${model.entityCamelName}Service.downloadTemplateImport(formData).toPromise();
        if (rest.status === 200) {
            saveAs(rest, 'template_import_${model.tableName}.xls');
        }
    }

    async onImport() {
        if (!CommonUtils.isValidForm(this.formSave)) {
            return;
        }
        const rest = await this.${model.entityCamelName}Service.processImport(this.formSave.value).toPromise();
        if (rest.type === RESPONSE_TYPE.SUCCESS) {
            this.activeModal.close(rest);
            this.dataError = null;
        } else {
            this.dataError = rest.data;
        }
    }

    setFormValue(propertyConfigs: any, data?: any) {
        this.propertyConfigs = propertyConfigs;
        this.formSave.value['${columnPrimary}'] = data.${columnPrimary};
        this.${columnPrimary} = data.${columnPrimary};
    }
}`;
    UtilsFile.writeFile(`/com.viettel.erp/political-web-app/src/app/modules/${moduleName}/import-${model.entityEntryNameHyphen}`, `/import-${model.entityEntryNameHyphen}.component.ts`, contentFile);
};