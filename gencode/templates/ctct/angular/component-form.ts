import { BaseColumn } from './../../../gencore/core/BaseColumn';
import { BaseModel } from "../../../gencore/core/BaseModel";
import { ImportUtils } from "../../../gencore/core/ImportUtils";
import { UtilsColumn } from "../../../gencore/core/UtilsColumn";
import { UtilsFile } from "../../../gencore/core/UtilsFile";
export default function(model: BaseModel, moduleName?: string) {
    const importUtils = new ImportUtils();
    moduleName = moduleName || model.entityEntryNameHyphen;
    const renderColumns = model?.getNonePrimaryColumnByTemplate('angular_form_html') || [];
    const allColumns = model?.allColumn?.filter(ele => ele.options instanceof Array && ele.options.length) || [];
    const lazyLoadOption = renderColumns?.filter(col => col.options instanceof Array && col.options.length) || [];
    const columnPrimary = model?.getPrimary()?.name;
    moduleName = moduleName || model.entityEntryNameHyphen;
    const initConstructor: any = [];
    const arrFormConfig: any = [];
    const buildRelation: string[] = [];
    const validateRelations: string[] = [];
    const renderRelationFormSave: string[] = [];
    const renderRelationMapping: string [] = [];
    const renderRelationBuild: string[] = [];
    const renderRelationAction: string[] = [];
    const renderConstants: string[] = [];
    const dynamicImport: string[] = [];
    const listRefFileControl: any[] = [];
    let hasRelationMapping = false;
    initConstructor.push(`\n        private router: Router`);
    initConstructor.push(`\n        public actr: ActivatedRoute`);
    initConstructor.push(`\n        private app: AppComponent`);
    initConstructor.push(`\n        private formBuilder: FormBuilder`);
    initConstructor.push(`\n        private modalService: NgbModal`);
    initConstructor.push(`\n        private ${model.entityCamelName}Service: ${model.entityName}Service`);
    if (columnPrimary) {
        arrFormConfig.push(`\n        ${columnPrimary}: [null]`);
    }
    const mapMultiControlType = ['multiOrganization', 'multiPartyOrganization'];
    const listIgnore = ['refTable', 'refInput', 'multiOrganization', 'multiPartyOrganization', 'multiFile'];
    renderColumns?.forEach(column => {
        const refModel = column.refModel;
        const _rModel = refModel?.getModel();
        if (UtilsColumn.isRef(column)) {
            if (mapMultiControlType.includes(column?.controlType || "")) {
                const hasRequired = UtilsColumn.hasValidate(column, 'required');
                buildRelation.push(`const ${column.name} = data['${column.name}'] || [];`);
                buildRelation.push(`        this.formSave.addControl('${column.name}', this.formBuilder.array(${column.name}${hasRequired ? `, ValidationService.required` : ``}));`);
            } else if (column?.controlType === "select") {
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
        if (column?.controlType === 'multiFile') {
            buildRelation.push(`        this.formSave.addControl('${column.name}', this.build${UtilsColumn.jsUcfirst(column.name || "")}(data));`);
            renderRelationAction.push(`\n    build${UtilsColumn.jsUcfirst(column.name || "")}(data?: any) {`);
            renderRelationAction.push(`        const controls = new FileControl(null);`);
            renderRelationAction.push(`        if (data && data.fileAttachment && data.fileAttachment.${column.name}) {`);
            renderRelationAction.push(`            controls.setFileAttachment(data.fileAttachment.${column.name});`);
            renderRelationAction.push(`        }`);
            renderRelationAction.push(`        return controls;`);
            renderRelationAction.push(`    }`);
            importUtils.addImport(`import { FileControl } from '@app/core/models/file.control';`);
        }
        if ((column?.controlType === "refTable" || column?.controlType === "refInput") && refModel) {
            hasRelationMapping = true;
            const rModel = refModel.getModel();
            const colRefModel = rModel.getNonePrimaryColumnByTemplate('angular_form_html') || [];
            buildRelation.push(`    this.formSave.addControl('${column.name}', this.buildForm${rModel.entityName}(data['${column.name}']));`);
            validateRelations.push(`if (this.formSave.controls.${column.name}.value instanceof Array && !this.formSave.controls.${column.name}.value.length) {`);
            validateRelations.push(`            this.app.warningMessage('pleaseChooseAtLeastOne');`);
            validateRelations.push(`            return false;`);
            validateRelations.push(`        }\n`);
            validateRelations.push(`        if (!CommonUtils.isValidForm(this.formSave.controls.${column.name})) {`);
            validateRelations.push(`            return false;`);
            validateRelations.push(`        }`);
            //
            renderRelationFormSave.push(`this.formSave['${column.name}'].value = this.${column.name}.value;`);
            //
            renderRelationMapping.push(`    firstRowIndex: any = 0;`);
            renderRelationMapping.push(`    pageSize: any = 10;`);
            //
            // renderRelationBuild.push(`this.buildForm${rModel.entityName}();`);
            //
            renderRelationAction.push(`\n    buildForm${rModel.entityName}(listData?: any) {`);
            renderRelationAction.push(`        const controls = new FormArray([]);`);
            renderRelationAction.push(`        if (!(listData instanceof Array) || !listData.length) {`);
            renderRelationAction.push(`            listData = [{}];`);
            renderRelationAction.push(`        }`);
            renderRelationAction.push(`        const groupConfig = this.buildFormGroup${rModel.entityName}();`);
            dynamicImport.push(`import _ from 'lodash';`);
            renderRelationAction.push(`        for (const i in listData) {`);
            renderRelationAction.push(`            const group: FormGroup = _.cloneDeep(groupConfig);`);
            renderRelationAction.push(`            const param = listData[i];`);
            renderRelationAction.push(`            group.patchValue(param);`);
            colRefModel?.forEach(ele => {
                if (ele?.controlType === 'multiFile') {
                    renderRelationAction.push(`            group.addControl('${ele.name}', this.build${UtilsColumn.jsUcfirst(ele.name || "")}(param));`);
                    listRefFileControl.push(ele);
                }
                if (mapMultiControlType.includes(ele?.controlType || "")) {
                    const hasRequired = UtilsColumn.hasValidate(ele, 'required');
                    renderRelationAction.push(`            const ${ele.name} = param['${ele.name}'] || [];`);
                    renderRelationAction.push(`            group.addControl('${ele.name}', this.formBuilder.array(${ele.name}${hasRequired ? `, ValidationService.required` : ``}));`);
                }
            });
            renderRelationAction.push(`            controls.push(group);`);
            renderRelationAction.push(`        }`);
            renderRelationAction.push(`        return controls;`);
            renderRelationAction.push(`    }\n`);
            renderRelationAction.push(`    buildFormGroup${rModel.entityName}(): FormGroup {`);
            renderRelationAction.push(`        const group = {`);
            const buildFileControlTable: BaseColumn[] = [];
            colRefModel.forEach((item: BaseColumn) => {
                const validates = item.validate || [];
                const dynamicValidate: any[] = [];
                if (item.controlType && !listIgnore.includes(item.controlType)) {
                    if (item.controlType === "number") {
                        dynamicValidate.push(`ValidationService.positiveInteger`);
                    }
                    validates.forEach(validate => {
                        if (validate === "required") {
                            dynamicValidate.push(`ValidationService.required`);
                        } else if (validate === "maxlength") {
                            dynamicValidate.push(`ValidationService.maxLength(${item.length})`);
                        }
                    });
                    renderRelationAction.push(`            ${item.name}: [null${validates.length ? `, [${dynamicValidate.join(', ')}]`: ''}], // ${item.label}`);
                } else if (item?.controlType === "multiFile") {
                    buildFileControlTable.push(item);
                }
            });
            renderRelationAction.push(`        }`);
            renderRelationAction.push(`        const formGroup: FormGroup = this.buildForm({}, group);`);
            // buildFileControlTable.forEach(item => {
            //     renderRelationAction.push(`        formGroup.addControl('${column.name}', this.build${UtilsColumn.jsUcfirst(item.name || "")}({}));`);
            //     importUtils.addImport(`import { FileControl } from '@app/core/models/file.control';`);
            // });
            renderRelationAction.push(`        return formGroup;`);
            renderRelationAction.push(`    }\n`);

            // render add row
            renderRelationAction.push(`    addRow${rModel.entityName}() {`);
            renderRelationAction.push(`        const controls = this.formSave.controls.${column.name} as FormArray;`);
            renderRelationAction.push(`        controls.insert(controls.length, this.buildFormGroup${rModel.entityName}());`);
            renderRelationAction.push(`        this.sortDataTable(this.formSave.controls.${column.name});`);
            renderRelationAction.push(`        const maxPage = Math.ceil(this.formSave.controls.${column.name}.value.length / this.pageSize);`);
            renderRelationAction.push(`        this.firstRowIndex = (maxPage - 1) * this.pageSize;`);
            renderRelationAction.push(`    }\n`);
            // render remove row
            renderRelationAction.push(`    removeRow${rModel.entityName}(index: number, item: FormGroup) {`);
            renderRelationAction.push(`        const controls = this.formSave.controls.${column.name} as FormArray;`);
            renderRelationAction.push(`        controls.removeAt(index);`);
            renderRelationAction.push(`        if (!controls.value.length) {`);
            renderRelationAction.push(`            this.formSave.setControl('list${rModel.entityName}', this.buildForm${rModel.entityName}());`);
            renderRelationAction.push(`        }`);
            renderRelationAction.push(`        this.sortDataTable(this.formSave.controls.${column.name});`);
            renderRelationAction.push(`    }\n`);
            // render relation validate
        }
        if (column?.controlType === "selectYear") {
            renderRelationMapping.push(`listYear: any = []`);
            renderRelationBuild.push(`\n        this.listYear = CommonUtils.getYearList(20, 0);`);
        }
        if (column.name) {
            const validates: string[] = [];
            if (UtilsColumn.hasValidate(column, "required")) {
                validates.push(`ValidationService.required`);
            }
            if (UtilsColumn.hasValidate(column, "maxlength")) {
                validates.push(`ValidationService.maxLength(${column.length})`);
            }
            if (column.controlType && !listIgnore.includes(column.controlType)) {
                arrFormConfig.push(`\n        ${column.name}: [null${validates.length ? `, ${validates}`: ''}]`);
            }
        }
    });
    listRefFileControl?.forEach(column => {
        renderRelationAction.push(`\n    build${UtilsColumn.jsUcfirst(column.name || "")}(data?: any) {`);
        renderRelationAction.push(`        const controls = new FileControl(null);`);
        renderRelationAction.push(`        if (data && data.fileAttachment && data.fileAttachment.${column.name}) {`);
        renderRelationAction.push(`            controls.setFileAttachment(data.fileAttachment.${column.name});`);
        renderRelationAction.push(`        }`);
        renderRelationAction.push(`        return controls;`);
        renderRelationAction.push(`    }`);
        importUtils.addImport(`import { FileControl } from '@app/core/models/file.control';`);
    });
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
    if (hasRelationMapping) {
        dynamicImport.push(`import { SortEvent } from 'primeng/api';`);
        renderRelationAction.push(`    customSort(event: SortEvent) {`);
        renderRelationAction.push(`        event.data.sort((data1, data2) => {`);
        renderRelationAction.push(`            const value1 = data1.value[event.field];`);
        renderRelationAction.push(`            const value2 = data2.value[event.field];`);
        renderRelationAction.push(`            let result = null;`);
        renderRelationAction.push(`            if (value1 == null && value2 != null) {`);
        renderRelationAction.push(`                result = -1;`);
        renderRelationAction.push(`            } else if (value1 != null && value2 == null) {`);
        renderRelationAction.push(`                result = 1;`);
        renderRelationAction.push(`            } else if (value1 == null && value2 == null) {`);
        renderRelationAction.push(`                result = 0;`);
        renderRelationAction.push(`            } else {`);
        renderRelationAction.push(`                result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;`);
        renderRelationAction.push(`            }`);
        renderRelationAction.push(`            return (event.order * result);`);
        renderRelationAction.push(`        });`);
        renderRelationAction.push(`    }\n`);

        renderRelationAction.push(`    sortDataTable(dataTable) {`);
        renderRelationAction.push(`        const _event = {`);
        renderRelationAction.push(`            data: dataTable.controls,`);
        renderRelationAction.push(`            field: 'sortOrder',`);
        renderRelationAction.push(`            mode: 'single',`);
        renderRelationAction.push(`            order: 1`);
        renderRelationAction.push(`        }`);
        renderRelationAction.push(`        this.customSort(_event);`);
        renderRelationAction.push(`    }\n`);
    }
    const objFormConfig = `{${arrFormConfig.join(",")}\n    }`;
    const contentFile = `
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { BaseComponent } from '@app/shared/components/base-component/base-component.component';
import { CommonUtils, ValidationService } from '@app/shared/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ${model.entityName}Service } from '@app/core/services/${moduleName}/${model.entityEntryNameHyphen}.service';
${dynamicImport.join(`\n`)}
${importUtils.toString()}
@Component({
    selector: '${model.entityEntryNameHyphen}-form',
    templateUrl: './${model.entityEntryNameHyphen}-form.component.html'
})
export class ${model.entityName}FormComponent extends BaseComponent implements OnInit {
    formSave: FormGroup;
    isUpdate: boolean = false;
    isInsert: boolean = false;
    isView: boolean = false;
    operationKey = 'action.view';
    adResourceKey = 'resource.${model.entityCamelName}';
    ${columnPrimary}: any = null;
    formConfig = ${objFormConfig};
    ${renderRelationMapping.join(`\n`)}${renderConstants.join(``)}
    constructor(${initConstructor}) {
        super(null, CommonUtils.getPermissionCode("resource.${model.entityCamelName}"));
        ${renderRelationBuild.join(`\n`)}
        this.router.events.subscribe((e: any) => {
            // If it is a NavigationEnd event re-initalise the component
            if (e instanceof NavigationEnd) {
                const params = this.actr.snapshot.params;
                if (params) {
                    this.${columnPrimary} = params.id;
                } else {
                    this.setFormValue();
                }
            }
        });
    }

    ngOnInit() {
        const subPaths = this.router.url.split('/');
        if (subPaths.length > 3) {
            this.isView = subPaths[3] === 'view';
            this.isUpdate = subPaths[3] === 'edit';
            this.isInsert = subPaths[3] === 'add';
        }
        this.setFormValue();
    }

    get f() {
        return this.formSave.controls;
    }

    buildForms(data?: any) {
        this.formSave = this.buildForm(data, this.formConfig, ACTION_FORM.INSERT, []);
        ${buildRelation.join(`\n`)}
    }

    async setFormValue() {
        this.buildForms({});
        if (CommonUtils.isValidId(this.${columnPrimary})) {
            const rest = await this.${model.entityCamelName}Service.findOne(this.${columnPrimary}).toPromise();
            if (rest.type === RESPONSE_TYPE.SUCCESS && rest.data) {
                this.buildForms(rest.data);
            }
        }
    }

    isValidFormSave() {
        if (!CommonUtils.isValidForm(this.formSave)) {
            return false;
        }
        ${validateRelations.join(`\n`)}
        return true;
    }

    async onSaveOrUpdate() {
        if (!this.isValidFormSave()) {
            return;
        }
        this.app.confirmMessage(null, async () => {
            const rest = await this.${model.entityCamelName}Service.saveOrUpdate(this.formSave.value).toPromise();
            if (rest.type === RESPONSE_TYPE.SUCCESS) {
                this.onClose();
            }
        }, () => {});
    }
    ${renderRelationAction.join(`\n`)}
    onClose() {
        this.router.navigate(['/${moduleName}/${model.entityEntryNameHyphen}']);
    }
}`;
    UtilsFile.writeFile(`/com.viettel.erp/political-web-app/src/app/modules/${moduleName}/${model.entityEntryNameHyphen}-form`, `/${model.entityEntryNameHyphen}-form.component.ts`, contentFile);
};