/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
 import { UtilsFile } from '../../../gencore/core/UtilsFile';
 import { BaseModel } from "../../../gencore/core/BaseModel";
 import { BaseColumn } from '../../../gencore/core/BaseColumn';
import { UtilsColumn } from '../../../gencore/core/UtilsColumn';
 // module.js
export default function(model: BaseModel, moduleName?: string) {
    const renderColumns = model?.getNonePrimaryColumnByTemplate('angular_form_html') || [];
    const dynamicControl: string[] = [];
    const dynamicRefControl: string[] = [];
    const renderTableColumn = (col: BaseColumn) => {
        switch (col?.controlType) {
            case 'partyOrganization':
                dynamicRefControl.push(`                            <party-org-selector`);
                dynamicRefControl.push(`                                [property]="item.controls.${col.name}"`);
                dynamicRefControl.push(`                                operationKey="action.view"`);
                dynamicRefControl.push(`                                adResourceKey="resource.${model.entityCamelName}"`);
                dynamicRefControl.push(`                                disabled={${col?.disabled || false}}`);
                dynamicRefControl.push(`                                [defaultValue]="true"`);
                dynamicRefControl.push(`                                [isRequiredField]="false"`);
                dynamicRefControl.push(`                                [disabled]="isView ? true : null"`);
                dynamicRefControl.push(`                            ></party-org-selector>`);
                dynamicRefControl.push(`                            <app-control-messages [control]="item.controls.${col.name}"></app-control-messages>`);
                break;
            case 'organization':
                dynamicRefControl.push(`                            <org-selector`);
                dynamicRefControl.push(`                                [property]="item.controls.${col.name}"`);
                dynamicRefControl.push(`                                operationKey="action.view"`);
                dynamicRefControl.push(`                                adResourceKey="resource.${model.entityCamelName}"`);
                dynamicRefControl.push(`                                [disabled]="isView ? true : null"`);
                dynamicRefControl.push(`                            ></org-selector>`);
                dynamicRefControl.push(`                            <app-control-messages [control]="item.controls.${col.name}"></app-control-messages>`);
                break;
            case 'multiOrganization':
                dynamicRefControl.push(`                            <multi-org-selector`);
                dynamicRefControl.push(`                                [property]="item.controls.${col.name}"`);
                dynamicRefControl.push(`                                operationKey="action.view"`);
                dynamicRefControl.push(`                                adResourceKey="resource.${model.entityCamelName}"`);
                dynamicRefControl.push(`                                [disabled]="isView ? true : null"`);
                dynamicRefControl.push(`                            ></multi-org-selector>`);
                dynamicRefControl.push(`                            <app-control-messages [control]="item.controls.${col.name}"></app-control-messages>`);
                break;
            case 'select':
                dynamicRefControl.push(`                            <select-filter`);
                dynamicRefControl.push(`                                [placeHolder]="'common.label.cboMustSelect'"`);
                dynamicRefControl.push(`                                [property]="item.controls.${col.name}"`);
                dynamicRefControl.push(`                                [options]="list${UtilsColumn.jsUcfirst(col.name || "")}"`);
                dynamicRefControl.push(`                                optionLabel="${col?.refModel?.refAttrs ? col?.refModel?.refAttrs[0]: 'name'}"`);
                dynamicRefControl.push(`                                optionValue="${col?.refModel?.refId || 'id'}"`);
                dynamicRefControl.push(`                                [disabled]="isView ? true : null"`);
                dynamicRefControl.push(`                            ></select-filter>`);
                dynamicRefControl.push(`                            <app-control-messages [control]="item.controls.${col.name}"></app-control-messages>`);
                break;
            case 'multiSelect':
                dynamicRefControl.push(`                            <multi-select-filter`);
                dynamicRefControl.push(`                                (placeHolder)="'common.label.cboMustSelect'"`);
                dynamicRefControl.push(`                                [property]="item.controls.${col.name}"`);
                dynamicRefControl.push(`                                [options]="list${UtilsColumn.jsUcfirst(col.name || "")}"`);
                dynamicRefControl.push(`                                optionLabel="${col?.refModel?.refAttrs ? col?.refModel?.refAttrs[0]: 'name'}"`);
                dynamicRefControl.push(`                                optionValue="${col?.refModel?.refId || 'id'}"`);
                dynamicRefControl.push(`                                [disabled]="isView ? true : null"`);
                dynamicRefControl.push(`                                maxSelectedLabels="100"`);
                dynamicRefControl.push(`                            ></multi-select-filter>`);
                dynamicRefControl.push(`                            <app-control-messages [control]="item.controls.${col.name}"></app-control-messages>`);
                break;
            case 'dataPicker':
                dynamicRefControl.push(`                            <data-picker #data`);
                dynamicRefControl.push(`                                [property]="item.controls.${col.name}"`);
                dynamicRefControl.push(`                                operationKey="action.view"`);
                dynamicRefControl.push(`                                adResourceKey="resource.${model.entityCamelName}"`);
                dynamicRefControl.push(`                                objectBO="${col?.refModel?.getModel()?.entityName}BO"`);
                dynamicRefControl.push(`                                codeField="${col?.refModel?.getModel()?.entityCamelName}Code"`);
                dynamicRefControl.push(`                                nameField="${col?.refModel?.refAttrs ? col?.refModel?.refAttrs[0] : 'name'}"`);
                dynamicRefControl.push(`                                emailField="email"`);
                dynamicRefControl.push(`                                mobileNumberField="mobileNumber"`);
                dynamicRefControl.push(`                                selectField="employeeId"`);
                dynamicRefControl.push(`                                [disabled]="isView ? true : null"`);
                dynamicRefControl.push(`                            ></data-picker>`);
                dynamicRefControl.push(`                            <app-control-messages [control]="item.controls.${col.name}"></app-control-messages>`);
                break;
            case 'date':
            case 'datetime':
                dynamicRefControl.push(`                            <date-picker #data`);
                dynamicRefControl.push(`                                [property]="item.controls.${col.name}"`);
                dynamicRefControl.push(`                                [disabled]="isView ? true : null"`);
                dynamicRefControl.push(`                            ></date-picker>`);
                dynamicRefControl.push(`                            <app-control-messages [control]="item.controls.${col.name}"></app-control-messages>`);
                break;
            case 'number':
                dynamicRefControl.push(`                            <input maxlength="${col.length}"`);
                dynamicRefControl.push(`                                type="number"`);
                dynamicRefControl.push(`                                name="${col.name}"`);
                dynamicRefControl.push(`                                formControlName="${col.name}"`);
                dynamicRefControl.push(`                                class="form-control"`);
                dynamicRefControl.push(`                                min="0" maxlength="${col.length}"`);
                dynamicRefControl.push(`                                [attr.disabled]="isView ? true : null"`);
                dynamicRefControl.push(`                            />`);
                dynamicRefControl.push(`                            <app-control-messages [control]="item.controls.${col.name}"></app-control-messages>`);
                break;
            case 'radio':
                dynamicRefControl.push(`                            <input type="radio" class="form-control" />`);
                dynamicRefControl.push(`                            <app-control-messages [control]="item.controls.${col.name}"></app-control-messages>`);
                break;
            case 'switch':
                dynamicRefControl.push(`                            <label class="i-switch bg-info m-t-xs m-r" id="isKey">`);
                dynamicRefControl.push(`                                <input type="checkbox" name="${col.name}" [value]="1" formControlName="${col.name}" [attr.disabled]="isView ? true : null" />`);
                dynamicRefControl.push(`                                <i></i>`);
                dynamicRefControl.push(`                            </label>`);
                dynamicRefControl.push(`                            <app-control-messages [control]="item.controls.${col.name}"></app-control-messages>`);
                break;
            case 'multiFile':
                dynamicRefControl.push(`                            <multi-file-chooser`);
                dynamicRefControl.push(`                                [property]="item.controls.${col.name}"`);
                dynamicRefControl.push(`                                fileName="${col.name}"`);
                dynamicRefControl.push(`                                [validMaxSize]="50"`);
                dynamicRefControl.push(`                                [disabled]="isView ? true : null"`);
                dynamicRefControl.push(`                                ></multi-file-chooser>`);
                dynamicRefControl.push(`                            <app-control-messages [control]="item.controls.${col.name}"></app-control-messages>`);
                break;
            case 'text':
                dynamicRefControl.push(`                            <input`);
                dynamicRefControl.push(`                                type="text"`);
                dynamicRefControl.push(`                                class="form form-control"`);
                dynamicRefControl.push(`                                name="${col.name}"`);
                dynamicRefControl.push(`                                formControlName="${col.name}"`);
                dynamicRefControl.push(`                                [attr.disabled]="isView ? true : null"`);
                dynamicRefControl.push(`                            />`);
                dynamicRefControl.push(`                            <app-control-messages [control]="item.controls.${col.name}"></app-control-messages>`);
                break;
        }
    }
    renderColumns?.forEach((col, idx) => {
        const colModel = UtilsColumn.isRef(col) ? col?.refModel : null;
        const _refModel = colModel?.getModel();
        const colEven = idx % 2 === 0 ? 2 : 3;
        const isGroupRow = (idx + 2) % 2 === 0;
        if (idx === 0) {
            dynamicControl.push(`<div class="ui-g-12">`);
        } else if (isGroupRow) {
            dynamicControl.push(`                <div class="ui-g-12">`);
        }
        switch (col?.controlType) {
            case 'partyOrganization':
                dynamicControl.push(`                    <label class="ui-g-12 ui-md-6 ui-lg-${colEven} control-label vt-align-right ${col?.validate?.includes('required') ? 'required' : ''}">`);
                dynamicControl.push(`                        {{'${model.entityCamelName}.${col.name}' | translate}}`);
                dynamicControl.push(`                    </label>`);
                dynamicControl.push(`                    <div class="ui-g-12 ui-md-6 ui-lg-3">`);
                dynamicControl.push(`                        <party-org-selector`);
                dynamicControl.push(`                            [property]="f['${col.name}']"`);
                dynamicControl.push(`                            operationKey="action.view"`);
                dynamicControl.push(`                            adResourceKey="resource.${model.entityCamelName}"`);
                dynamicControl.push(`                            disabled={${col?.disabled || false}}`);
                dynamicControl.push(`                            [defaultValue]="true"`);
                dynamicControl.push(`                            [isRequiredField]="false"`);
                dynamicControl.push(`                            [disabled]="isView ? true : null"`);
                dynamicControl.push(`                        ></party-org-selector>`);
                dynamicControl.push(`                        <app-control-messages [control]="f['${col.name}']"></app-control-messages>`);
                dynamicControl.push(`                    </div>`);
                break;
            case 'organization':
                dynamicControl.push(`                    <label class="ui-g-12 ui-md-6 ui-lg-${colEven} control-label vt-align-right ${col?.validate?.includes('required') ? 'required' : ''}">`);
                dynamicControl.push(`                        {{'${model.entityCamelName}.${col.name}' | translate}}`);
                dynamicControl.push(`                    </label>`);
                dynamicControl.push(`                    <div class="ui-g-12 ui-md-6 ui-lg-3">`);
                dynamicControl.push(`                        <org-selector`);
                dynamicControl.push(`                            [property]="f['${col.name}']"`);
                dynamicControl.push(`                            operationKey="action.view"`);
                dynamicControl.push(`                            adResourceKey="resource.${model.entityCamelName}"`);
                dynamicControl.push(`                            [disabled]="isView ? true : null"`);
                dynamicControl.push(`                        ></org-selector>`);
                dynamicControl.push(`                        <app-control-messages [control]="f['${col.name}']"></app-control-messages>`);
                dynamicControl.push(`                    </div>`);
                break;
            case 'multiOrganization':
                dynamicControl.push(`                    <label class="ui-g-12 ui-md-6 ui-lg-${colEven} control-label vt-align-right ${col?.validate?.includes('required') ? 'required' : ''}">`);
                dynamicControl.push(`                        {{'${model.entityCamelName}.${col.name}' | translate}}`);
                dynamicControl.push(`                    </label>`);
                dynamicControl.push(`                    <div class="ui-g-12 ui-md-6 ui-lg-3">`);
                dynamicControl.push(`                        <multi-org-selector`);
                dynamicControl.push(`                            [property]="f['${col.name}']"`);
                dynamicControl.push(`                            operationKey="action.view"`);
                dynamicControl.push(`                            adResourceKey="resource.${model.entityCamelName}"`);
                dynamicControl.push(`                            [disabled]="isView ? true : null"`);
                dynamicControl.push(`                        ></multi-org-selector>`);
                dynamicControl.push(`                        <app-control-messages [control]="f['${col.name}']"></app-control-messages>`);
                dynamicControl.push(`                    </div>`);
                break;
            case 'select':
            case 'selectYear':
                const options = col.controlType === "selectYear" ? `listYear` : colModel ? `list${UtilsColumn.jsUcfirst(_refModel?.entityCamelName || '')}` : `list${UtilsColumn.jsUcfirst(col.name || "")}`;
                const optionLabel = col.controlType === "selectYear" ? "year" : col?.refModel?.refAttrs ? col?.refModel?.refAttrs[0] : 'name';
                const optionValue = col.controlType === "selectYear" ? "year" : col?.refModel?.refId || 'id';
                dynamicControl.push(`                    <label class="ui-g-12 ui-md-6 ui-lg-${colEven} control-label vt-align-right ${col?.validate?.includes('required') ? 'required' : ''}">`);
                dynamicControl.push(`                        {{'${model.entityCamelName}.${col.name}' | translate}}`);
                dynamicControl.push(`                    </label>`);
                dynamicControl.push(`                    <div class="ui-g-12 ui-md-6 ui-lg-3">`);
                dynamicControl.push(`                        <select-filter`);
                dynamicControl.push(`                            [placeHolder]="'common.label.cboMustSelect'"`);
                dynamicControl.push(`                            [property]="f['${col.name}']"`);
                dynamicControl.push(`                            [options]="${options}"`);
                dynamicControl.push(`                            optionLabel="${optionLabel}"`);
                dynamicControl.push(`                            optionValue="${optionValue}"`);
                dynamicControl.push(`                            [disabled]="isView ? true : null"`);
                dynamicControl.push(`                        ></select-filter>`);
                dynamicControl.push(`                        <app-control-messages [control]="f['${col.name}']"></app-control-messages>`);
                dynamicControl.push(`                    </div>`);
                break;
            case 'multiSelect':
                dynamicControl.push(`                    <label class="ui-g-12 ui-md-6 ui-lg-${colEven} control-label vt-align-right ${col?.validate?.includes('required') ? 'required' : ''}">`);
                dynamicControl.push(`                        {{'${model.entityCamelName}.${col.name}' | translate}}`);
                dynamicControl.push(`                    </label>`);
                dynamicControl.push(`                    <div class="ui-g-12 ui-md-6 ui-lg-3">`);
                dynamicControl.push(`                        <multi-select-filter`);
                dynamicControl.push(`                            (placeHolder)="'common.label.cboMustSelect'"`);
                dynamicControl.push(`                            [property]="f['${col.name}']"`);
                dynamicControl.push(`                            [options]="list${UtilsColumn.jsUcfirst(col.name || "")}"`);
                dynamicControl.push(`                            optionLabel="${col?.refModel?.refAttrs ? col?.refModel?.refAttrs[0]: 'name'}"`);
                dynamicControl.push(`                            optionValue="${col?.refModel?.refId || 'id'}"`);
                dynamicControl.push(`                            [disabled]="isView ? true : null"`);
                dynamicControl.push(`                            maxSelectedLabels="100"`);
                dynamicControl.push(`                        ></multi-select-filter>`);
                dynamicControl.push(`                        <app-control-messages [control]="f['${col.name}']"></app-control-messages>`);
                dynamicControl.push(`                    </div>`);
                break;
            case 'dataPicker':
                dynamicControl.push(`                    <label class="ui-g-12 ui-md-6 ui-lg-${colEven} control-label vt-align-right ${col?.validate?.includes('required') ? 'required' : ''}">`);
                dynamicControl.push(`                        {{'${model.entityCamelName}.${col.name}' | translate}}`);
                dynamicControl.push(`                    </label>`);
                dynamicControl.push(`                    <div class="ui-g-12 ui-md-6 ui-lg-3">`);
                dynamicControl.push(`                        <data-picker #data`);
                dynamicControl.push(`                            [property]="f['${col.name}']"`);
                dynamicControl.push(`                            operationKey="action.view"`);
                dynamicControl.push(`                            adResourceKey="resource.${model.entityCamelName}"`);
                dynamicControl.push(`                            objectBO="${col?.refModel?.getModel()?.entityName}BO"`);
                dynamicControl.push(`                            codeField="${col?.refModel?.getModel()?.entityCamelName}Code"`);
                dynamicControl.push(`                            nameField="${col?.refModel?.refAttrs ? col?.refModel?.refAttrs[0] : 'name'}"`);
                dynamicControl.push(`                            emailField="email"`);
                dynamicControl.push(`                            mobileNumberField="mobileNumber"`);
                dynamicControl.push(`                            selectField="employeeId"`);
                dynamicControl.push(`                            [disabled]="isView ? true : null"`);
                dynamicControl.push(`                        ></data-picker>`);
                dynamicControl.push(`                        <app-control-messages [control]="f['${col.name}']"></app-control-messages>`);
                dynamicControl.push(`                    </div>`);
                break;
            case 'date':
            case 'datetime':
                dynamicControl.push(`                    <label class="ui-g-12 ui-md-6 ui-lg-${colEven} control-label vt-align-right ${col?.validate?.includes('required') ? 'required' : ''}">`);
                dynamicControl.push(`                        {{'${model.entityCamelName}.${col.name}' | translate}}`);
                dynamicControl.push(`                    </label>`);
                dynamicControl.push(`                    <div class="ui-g-12 ui-md-6 ui-lg-3">`);
                dynamicControl.push(`                        <date-picker #data`);
                dynamicControl.push(`                            [property]="f['${col.name}']"`);
                dynamicControl.push(`                            [disabled]="isView ? true : null"`);
                dynamicControl.push(`                        ></date-picker>`);
                dynamicControl.push(`                        <app-control-messages [control]="f['${col.name}']"></app-control-messages>`);
                dynamicControl.push(`                    </div>`);
                break;
            case 'number':
                dynamicControl.push(`                    <label class="ui-g-12 ui-md-6 ui-lg-${colEven} control-label vt-align-right ${col?.validate?.includes('required') ? 'required' : ''}">`);
                dynamicControl.push(`                        {{'${model.entityCamelName}.${col.name}' | translate}}`);
                dynamicControl.push(`                    </label>`);
                dynamicControl.push(`                    <div class="ui-g-12 ui-md-6 ui-lg-3">`);
                dynamicControl.push(`                        <input`);
                dynamicControl.push(`                            type="number"`);
                dynamicControl.push(`                            formControlName="${col.name}"`);
                dynamicControl.push(`                            name="${col.name}"`);
                dynamicControl.push(`                            class="form-control"`);
                dynamicControl.push(`                            [attr.disabled]="isView ? true : null"`);
                dynamicControl.push(`                        />`);
                dynamicControl.push(`                        <app-control-messages [control]="f['${col.name}']"></app-control-messages>`);
                dynamicControl.push(`                    </div>`);
                break;
            case 'radio':
                dynamicControl.push(`                    <label class="ui-g-12 ui-md-6 ui-lg-${colEven} control-label vt-align-right ${col?.validate?.includes('required') ? 'required' : ''}">`);
                dynamicControl.push(`                        {{'${model.entityCamelName}.${col.name}' | translate}}`);
                dynamicControl.push(`                    </label>`);
                dynamicControl.push(`                    <div class="ui-g-12 ui-md-6 ui-lg-3">`);
                dynamicControl.push(`                        <input type="radio" class="form-control" />`);
                dynamicControl.push(`                        <app-control-messages [control]="f['${col.name}']"></app-control-messages>`);
                dynamicControl.push(`                    </div>`);
                break;
            case 'switch':
                dynamicControl.push(`                    <label class="ui-g-12 ui-md-6 ui-lg-${colEven} control-label vt-align-right ${col?.validate?.includes('required') ? 'required' : ''}">`);
                dynamicControl.push(`                        {{'${model.entityCamelName}.${col.name}' | translate}}`);
                dynamicControl.push(`                    </label>`);
                dynamicControl.push(`                    <div class="ui-g-12 ui-md-6 ui-lg-3">`);
                dynamicControl.push(`                        <label class="i-switch bg-info m-t-xs m-r" id="isKey">`);
                dynamicControl.push(`                            <input type="checkbox" name="${col.name}" [value]="1" formControlName="${col.name}" [attr.disabled]="isView ? true : null" />`);
                dynamicControl.push(`                            <i></i>`);
                dynamicControl.push(`                        </label>`);
                dynamicControl.push(`                        <app-control-messages [control]="f['${col.name}']"></app-control-messages>`);
                dynamicControl.push(`                    </div>`);
                break;
            case 'refTable':
                dynamicRefControl.push(`<form id="relation-${model.entityEntryNameHyphen}" [formGroup]="formSave">`);
                dynamicRefControl.push(`    <div class="panel-body panel-table" style="padding: 12px;">`);
                dynamicRefControl.push(`        <p-table [scrollable]="true" [value]="formSave.controls.${col.name}.controls" [paginator]="true" (onPage)="paginate($event)"`);
                dynamicRefControl.push(`            [(first)]="firstRowIndex" [rows]="pageSize" [totalRecords]="formSave.controls.${col.name}.value.length"`);
                dynamicRefControl.push(`            tableStyleClass="table controls-table table-wrapper b-t b-b"`);
                dynamicRefControl.push(`        >`);
                dynamicRefControl.push(`            <div class="tbl-panel">`);
                dynamicRefControl.push(`                <ng-template pTemplate="colgroup" let-columns>`);
                dynamicRefControl.push(`                    <colgroup>`);
                dynamicRefControl.push(`                        <col class="size-1">`);
                const refModel = col.refModel?.getModel();
                if (refModel) {
                    const relationCols = refModel?.getNonePrimaryColumnByTemplate('angular_form_html');
                    relationCols?.forEach(() => {
                        dynamicRefControl.push(`                        <col class="size-6">`);
                    });
                    dynamicRefControl.push(`                        <col *ngIf="!isView && !isDisable" class="size-4">`);
                    dynamicRefControl.push(`                    </colgroup>`);
                    dynamicRefControl.push(`                </ng-template>`);
                    dynamicRefControl.push(`                <ng-template pTemplate="header">`);
                    dynamicRefControl.push(`                    <tr>`);
                    dynamicRefControl.push(`                        <th translate>common.table.index</th>`);
                    relationCols?.forEach((item) => {
                        dynamicRefControl.push(`                        <th translate><span ${UtilsColumn.hasValidate(item, 'required') ? `[ngClass]="'required'"` : ''}>${refModel?.entityCamelName}.${item.name}</span></th>`);
                    });
                    dynamicRefControl.push(`                        <th translate *ngIf="!isView && !isDisable"><span>common.label.action</span></th>`);
                    dynamicRefControl.push(`                    </tr>`);
                    dynamicRefControl.push(`                </ng-template>`);
                    dynamicRefControl.push(`                <ng-template pTemplate="body" let-item let-index="rowIndex">`);
                    dynamicRefControl.push(`                    <tr [formGroup]="item">`);
                    dynamicRefControl.push(`                        <td class="vt-align-center">{{ index + 1 }}</td>`);
                    relationCols?.forEach((item) => {
                        dynamicRefControl.push(`                        <td>`);
                        renderTableColumn(item);
                        dynamicRefControl.push(`                        </td>`);
                    });
                    dynamicRefControl.push(`                        <td class="vt-align-center" *ngIf="!isView && !isDisable">`);
                    dynamicRefControl.push(`                            <button *ngIf="!isView && !isDisable" class="btn-icon plus" type="button" (click)="addRow${refModel.entityName}()" [title]="'titleAdd' | translate"`);
                    dynamicRefControl.push(`                                [innerHTML]="'common.icon.plus' | translate" style="margin-right: 0.8rem;"></button>`);
                    dynamicRefControl.push(`                            <button class="btn-icon minus" type="button" (click)="removeRow${refModel.entityName}(index, item)"`);
                    dynamicRefControl.push(`                                [innerHTML]="'common.icon.minus' | translate"></button>`);
                    dynamicRefControl.push(`                        </td>`);
                    dynamicRefControl.push(`                    </tr>`);
                    dynamicRefControl.push(`                </ng-template>`);
                    dynamicRefControl.push(`            </div>`);
                    dynamicRefControl.push(`        </p-table>`);
                    dynamicRefControl.push(`    </div>`);
                    dynamicRefControl.push(`</form>`);
                }
                break;
            case 'refInput':
                const refModelInput = col.refModel?.getModel();
                if (refModelInput) {
                    dynamicControl.push(`                    <label class="ui-g-12 ui-md-6 ui-lg-${colEven} control-label vt-align-right ${col?.validate?.includes('required') ? 'required' : ''}">`);
                    dynamicControl.push(`                        {{'${model.entityCamelName}.${col.name}' | translate}}`);
                    dynamicControl.push(`                    </label>`);
                    dynamicControl.push(`                    <div class="ui-g-12 ui-md-6 ui-lg-3 group-items">`);
                    dynamicControl.push(`                        <div *ngFor="let item of formSave.controls.${col.name}.controls, let i = index">`);
                    const relationCols = refModelInput?.getNonePrimaryColumnByTemplate('angular_form_html');
                    relationCols?.forEach(item => {
                        dynamicControl.push(`                            <div [formGroup]="item">`);
                        dynamicControl.push(`                                <div class="d-flex group-control">`);
                        if (item?.controlType === "text") {
                            dynamicControl.push(`                                    <input`);
                            dynamicControl.push(`                                        type="text"`);
                            dynamicControl.push(`                                        class="form form-control"`);
                            dynamicControl.push(`                                        name="${item.name}"`);
                            dynamicControl.push(`                                        formControlName="${item.name}"`);
                            dynamicControl.push(`                                        [attr.disabled]="isView ? true : null"`);
                            dynamicControl.push(`                                    />`);
                        }
                        dynamicControl.push(`                                    <div *ngIf="!isView && !isDisable" style="margin-left: 0.8rem" class="d-flex group-action">`);
                        dynamicControl.push(`                                        <button class="btn-icon plus" type="button" (click)="addRow${refModelInput.entityName}()" [title]="'titleAdd' | translate"`);
                        dynamicControl.push(`                                            [innerHTML]="'common.icon.plus' | translate" style="margin-right: 0.4rem;"></button>`);
                        dynamicControl.push(`                                        <button class="btn-icon minus" type="button" (click)="removeRow${refModelInput.entityName}(i, item)"`);
                        dynamicControl.push(`                                            [innerHTML]="'common.icon.minus' | translate"></button>`);
                        dynamicControl.push(`                                    </div>`);
                        dynamicControl.push(`                                </div>`);
                        dynamicControl.push(`                                <app-control-messages [control]="item.controls.${item.name}"></app-control-messages>`);
                        dynamicControl.push(`                            </div>`);
                    });
                    dynamicControl.push(`                        </div>`);
                    dynamicControl.push(`                    </div>`);
                }
                break;
            case 'multiFile':
                dynamicControl.push(`                    <label class="ui-g-12 ui-md-6 ui-lg-${colEven} control-label vt-align-right ${col?.validate?.includes('required') ? 'required' : ''}">`);
                dynamicControl.push(`                        {{'${model.entityCamelName}.${col.name}' | translate}}`);
                dynamicControl.push(`                    </label>`);
                dynamicControl.push(`                    <div class="ui-g-12 ui-md-6 ui-lg-3">`);
                dynamicControl.push(`                        <multi-file-chooser`);
                dynamicControl.push(`                            [property]="f['${col.name}']"`);
                dynamicControl.push(`                            fileName="${col.name}"`);
                dynamicControl.push(`                            [validMaxSize]="50"`);
                dynamicControl.push(`                            [disabled]="isView ? true : null"`);
                dynamicControl.push(`                        ></multi-file-chooser>`);
                dynamicControl.push(`                        <app-control-messages [control]="f['${col.name}']"></app-control-messages>`);
                dynamicControl.push(`                    </div>`);
                break;
            case 'text':
                dynamicControl.push(`                    <label class="ui-g-12 ui-md-6 ui-lg-${colEven} control-label vt-align-right ${col?.validate?.includes('required') ? 'required' : ''}">`);
                dynamicControl.push(`                        {{'${model.entityCamelName}.${col.name}' | translate}}`);
                dynamicControl.push(`                    </label>`);
                dynamicControl.push(`                    <div class="ui-g-12 ui-md-6 ui-lg-3">`);
                dynamicControl.push(`                        <input`);
                dynamicControl.push(`                            type="text"`);
                dynamicControl.push(`                            class="form form-control"`);
                dynamicControl.push(`                            name="${col.name}"`);
                dynamicControl.push(`                            formControlName="${col.name}"`);
                dynamicControl.push(`                            [attr.disabled]="isView ? true : null"`);
                dynamicControl.push(`                        />`);
                dynamicControl.push(`                        <app-control-messages [control]="f['${col.name}']"></app-control-messages>`);
                dynamicControl.push(`                    </div>`);
                break;
        }
        if (!isGroupRow || (isGroupRow && idx === renderColumns.length - 1)) {
            dynamicControl.push(`                </div>`);
        }
    });
    const contentFile = `
<div *ngIf="(hasPermission('action.update') && isUpdate) || (hasPermission('action.insert') && isInsert) || (hasPermission('action.view') && isView)">
    <div class="panel panel-default">
        <form id="formSave" [formGroup]="formSave">
            <div class="panel-heading vt-relative">
                <strong class="text-u-c">
                    <i class="fa fa-th"></i>&nbsp;
                    <span *ngIf="isInsert" translate>${model.entityCamelName}.label.${model.entityCamelName}Insert</span>
                    <span *ngIf="isUpdate" translate>${model.entityCamelName}.label.${model.entityCamelName}Update</span>
                    <span *ngIf="isView" translate>${model.entityCamelName}.label.${model.entityCamelName}View</span>
                </strong>
            </div>
            <div class="panel-body padding-xl ui-g">
                ${dynamicControl.join(`\n`)}
            </div>
            <div class="panel-footer vt-area-button">
                <button type="submit" *ngIf="!isView" (click)="onSaveOrUpdate()" class="btn btn-sm btn-info"
                    [innerHTML]="'common.button.icon.save' | translate"></button>
                <button type="button" (click)="onClose()" class="btn btn-sm btn-danger"
                    [innerHTML]="'common.button.out' | translate"></button>
            </div>
        </form>
    </div>
</div>
${dynamicRefControl.join(`\n`)}
<div *ngIf="(!hasPermission('action.update') && isUpdate) || (!hasPermission('action.insert') && isInsert)">
  {{'common.haveNoPermission' | translate}}
</div>
`;
moduleName = moduleName || model.entityEntryNameHyphen;
UtilsFile.writeFile(`/com.viettel.erp/political-web-app/src/app/modules/${moduleName}/${model.entityEntryNameHyphen}-form`, `/${model.entityEntryNameHyphen}-form.component.html`, contentFile);
};