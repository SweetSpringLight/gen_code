import { BaseModel } from "../../../gencore/core/BaseModel";
import { UtilsColumn } from "../../../gencore/core/UtilsColumn";
import { UtilsFile } from "../../../gencore/core/UtilsFile";
export default function(model: BaseModel, moduleName?: string) {
    const renderColumns = model?.getNonePrimaryColumnByTemplate('angular_search_html') || [];
    const renderTable = model?.getNonePrimaryColumnByTemplate('angular_list_html') || [];
    const dynamicControl: string[] = [];
    renderColumns?.forEach((col, idx) => {
        const refModel = col.refModel;
        const _rModel = refModel?.getModel();
        const colEven = idx % 2 === 0 ? 2 : 3;
        const isGroupRow = (idx + 2) % 2 === 0;
        if (idx === 0) {
            dynamicControl.push(`<div class="ui-g-12">`);
        } else if (isGroupRow) {
            dynamicControl.push(`                    <div class="ui-g-12">`);
        }
        switch (col?.controlType) {
            case 'partyOrganization':
                dynamicControl.push(`                        <label class="ui-g-12 ui-md-6 ui-lg-${colEven} control-label vt-align-right">`);
                dynamicControl.push(`                            {{'${model.entityCamelName}.${col.name}' | translate}}`);
                dynamicControl.push(`                        </label>`);
                dynamicControl.push(`                        <div class="ui-g-12 ui-md-6 ui-lg-3">`);
                dynamicControl.push(`                            <party-org-selector`);
                dynamicControl.push(`                                [property]="f['${col.name}']"`);
                dynamicControl.push(`                                operationKey="action.view"`);
                dynamicControl.push(`                                adResourceKey="resource.${model.entityCamelName}"`);
                dynamicControl.push(`                                disabled={${col?.disabled || false}}`);
                dynamicControl.push(`                                [defaultValue]="true"`);
                dynamicControl.push(`                                [isRequiredField]="false"`);
                dynamicControl.push(`                                [disabled]="isView ? true : null"`);
                dynamicControl.push(`                            ></party-org-selector>`);
                dynamicControl.push(`                            <app-control-messages [control]="f['${col.name}']"></app-control-messages>`);
                dynamicControl.push(`                        </div>`);
                break;
            case 'organization':
                dynamicControl.push(`                        <label class="ui-g-12 ui-md-6 ui-lg-${colEven} control-label vt-align-right">`);
                dynamicControl.push(`                            {{'${model.entityCamelName}.${col.name}' | translate}}`);
                dynamicControl.push(`                        </label>`);
                dynamicControl.push(`                        <div class="ui-g-12 ui-md-6 ui-lg-3">`);
                dynamicControl.push(`                            <org-selector`);
                dynamicControl.push(`                                [property]="f['${col.name}']"`);
                dynamicControl.push(`                                operationKey="action.view"`);
                dynamicControl.push(`                                adResourceKey="resource.${model.entityCamelName}"`);
                dynamicControl.push(`                                [disabled]="isView ? true : null"`);
                dynamicControl.push(`                             ></org-selector>`);
                dynamicControl.push(`                            <app-control-messages [control]="f['${col.name}']"></app-control-messages>`);
                dynamicControl.push(`                        </div>`);
                break;
            case 'multiOrganization':
                dynamicControl.push(`                        <label class="ui-g-12 ui-md-6 ui-lg-${colEven} control-label vt-align-right">`);
                dynamicControl.push(`                            {{'${model.entityCamelName}.${col.name}' | translate}}`);
                dynamicControl.push(`                        </label>`);
                dynamicControl.push(`                        <div class="ui-g-12 ui-md-6 ui-lg-3">`);
                dynamicControl.push(`                            <multi-org-selector`);
                dynamicControl.push(`                                [property]="f['${col.name}']"`);
                dynamicControl.push(`                                operationKey="action.view"`);
                dynamicControl.push(`                                adResourceKey="resource.${model.entityCamelName}"`);
                dynamicControl.push(`                                [disabled]="isView ? true : null"`);
                dynamicControl.push(`                            ></multi-org-selector>`);
                dynamicControl.push(`                            <app-control-messages [control]="f['${col.name}']"></app-control-messages>`);
                dynamicControl.push(`                        </div>`);
                break;
            case 'select':
            case 'selectYear':
                const options = col.controlType === "selectYear" ? `listYear` : refModel ? `list${UtilsColumn.jsUcfirst(_rModel?.entityCamelName || '')}` : `list${UtilsColumn.jsUcfirst(col.name || "")}`;
                const optionLabel = col.controlType === "selectYear" ? "year" : col?.refModel?.refAttrs ? col?.refModel?.refAttrs[0] : 'name';
                const optionValue = col.controlType === "selectYear" ? "year" : col?.refModel?.refId || 'id';
                dynamicControl.push(`                        <label class="ui-g-12 ui-md-6 ui-lg-${colEven} control-label vt-align-right">`);
                dynamicControl.push(`                            {{'${model.entityCamelName}.${col.name}' | translate}}`);
                dynamicControl.push(`                        </label>`);
                dynamicControl.push(`                        <div class="ui-g-12 ui-md-6 ui-lg-3">`);
                dynamicControl.push(`                            <select-filter`);
                dynamicControl.push(`                                [placeHolder]="'common.label.cboMustSelect'"`);
                dynamicControl.push(`                                [property]="f['${col.name}']"`);
                dynamicControl.push(`                                [options]="${options}"`);
                dynamicControl.push(`                                optionLabel="${optionLabel}"`);
                dynamicControl.push(`                                optionValue="${optionValue}"`);
                dynamicControl.push(`                                [disabled]="isView ? true : null"`);
                dynamicControl.push(`                            ></select-filter>`);
                dynamicControl.push(`                            <app-control-messages [control]="f['${col.name}']"></app-control-messages>`);
                dynamicControl.push(`                        </div>`);
                break;
            case 'multiSelect':
                dynamicControl.push(`                        <label class="ui-g-12 ui-md-6 ui-lg-${colEven} control-label vt-align-right">`);
                dynamicControl.push(`                            {{'${model.entityCamelName}.${col.name}' | translate}}`);
                dynamicControl.push(`                        </label>`);
                dynamicControl.push(`                        <div class="ui-g-12 ui-md-6 ui-lg-3">`);
                dynamicControl.push(`                            <multi-select-filter`);
                dynamicControl.push(`                                (placeHolder)="'common.label.cboMustSelect'"`);
                dynamicControl.push(`                                [property]="f['${col.name}']"`);
                dynamicControl.push(`                                [options]="list${UtilsColumn.jsUcfirst(col.name || "")}"`);
                dynamicControl.push(`                                optionLabel="${col?.refModel?.refAttrs ? col?.refModel?.refAttrs[0]: 'name'}"`);
                dynamicControl.push(`                                optionValue="${col?.refModel?.refId || 'id'}"`);
                dynamicControl.push(`                                [disabled]="isView ? true : null"`);
                dynamicControl.push(`                                maxSelectedLabels="100"`);
                dynamicControl.push(`                            ></multi-select-filter>`);
                dynamicControl.push(`                            <app-control-messages [control]="f['${col.name}']"></app-control-messages>`);
                dynamicControl.push(`                        </div>`);
                break;
            case 'dataPicker':
                dynamicControl.push(`                            <label class="ui-g-12 ui-md-6 ui-lg-${colEven} control-label vt-align-right">`);
                dynamicControl.push(`                                {{'${model.entityCamelName}.${col.name}' | translate}}`);
                dynamicControl.push(`                            </label>`);
                dynamicControl.push(`                            <div class="ui-g-12 ui-md-6 ui-lg-3">`);
                dynamicControl.push(`                                <data-picker #data`);
                dynamicControl.push(`                                    [property]="f['${col.name}']"`);
                dynamicControl.push(`                                    operationKey="action.view"`);
                dynamicControl.push(`                                    adResourceKey="resource.${model.entityCamelName}"`);
                dynamicControl.push(`                                    objectBO="${col?.refModel?.getModel()?.entityName}BO"`);
                dynamicControl.push(`                                    codeField="${col?.refModel?.getModel()?.entityCamelName}Code"`);
                dynamicControl.push(`                                    nameField="${col?.refModel?.refAttrs ? col?.refModel?.refAttrs[0] : 'name'}"`);
                dynamicControl.push(`                                    emailField="email"`);
                dynamicControl.push(`                                    mobileNumberField="mobileNumber"`);
                dynamicControl.push(`                                    selectField="employeeId"`);
                dynamicControl.push(`                                    [disabled]="isView ? true : null"`);
                dynamicControl.push(`                                ></data-picker>`);
                dynamicControl.push(`                                <app-control-messages [control]="f['${col.name}']"></app-control-messages>`);
                dynamicControl.push(`                            </div>`);
                break;
            case 'date':
            case 'datetime':
                dynamicControl.push(`                        <label class="ui-g-12 ui-md-6 ui-lg-${colEven} control-label vt-align-right">`);
                dynamicControl.push(`                            {{'${model.entityCamelName}.${col.name}' | translate}}`);
                dynamicControl.push(`                        </label>`);
                dynamicControl.push(`                        <div class="ui-g-12 ui-md-6 ui-lg-3">`);
                dynamicControl.push(`                            <date-picker #data`);
                dynamicControl.push(`                                [property]="f['${col.name}']"`);
                dynamicControl.push(`                                [disabled]="isView ? true : null"`);
                dynamicControl.push(`                            ></date-picker>`);
                dynamicControl.push(`                            <app-control-messages [control]="f['${col.name}']"></app-control-messages>`);
                dynamicControl.push(`                        </div>`);
                break;
            case 'number':
                dynamicControl.push(`                    <label class="ui-g-12 ui-md-6 ui-lg-${colEven} control-label vt-align-right">`);
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
                dynamicControl.push(`                    <label class="ui-g-12 ui-md-6 ui-lg-${colEven} control-label vt-align-right">`);
                dynamicControl.push(`                        {{'${model.entityCamelName}.${col.name}' | translate}}`);
                dynamicControl.push(`                    </label>`);
                dynamicControl.push(`                    <div class="ui-g-12 ui-md-6 ui-lg-3">`);
                dynamicControl.push(`                        <input type="radio" class="form-control" />`);
                dynamicControl.push(`                        <app-control-messages [control]="f['${col.name}']"></app-control-messages>`);
                dynamicControl.push(`                    </div>`);
                break;
            case 'switch':
                dynamicControl.push(`                    <label class="ui-g-12 ui-md-6 ui-lg-${colEven} control-label vt-align-right">`);
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
            case 'text':
                dynamicControl.push(`                        <label class="ui-g-12 ui-md-6 ui-lg-${colEven} control-label vt-align-right">`);
                dynamicControl.push(`                            {{'${model.entityCamelName}.${col.name}' | translate}}`);
                dynamicControl.push(`                        </label>`);
                dynamicControl.push(`                        <div class="ui-g-12 ui-md-6 ui-lg-3">`);
                dynamicControl.push(`                            <input`);
                dynamicControl.push(`                                type="text"`);
                dynamicControl.push(`                                class="form form-control"`);
                dynamicControl.push(`                                name="${col.name}"`);
                dynamicControl.push(`                                formControlName="${col.name}"`);
                dynamicControl.push(`                                [attr.disabled]="isView ? true : null"`);
                dynamicControl.push(`                            />`);
                dynamicControl.push(`                            <app-control-messages [control]="f['${col.name}']"></app-control-messages>`);
                dynamicControl.push(`                        </div>`);
                break;
        }
        if (!isGroupRow || (isGroupRow && idx === renderColumns.length - 1)) {
            dynamicControl.push(`                    </div>`);
        }
    });
    const colgroup: string[] = [];
    const tableHeader: string[] = [];
    const tableBody: string[] = [];
    renderTable?.forEach(col => {
        colgroup.push(`<col>`);
        tableHeader.push(`<th [pSortableColumn]="'${col.name}'">`);
        tableHeader.push(`    {{'${model.entityCamelName}.${col.name}' | translate}}`);
        tableHeader.push(`    <p-sortIcon [field]="'${col.name}'"></p-sortIcon>`);
        tableHeader.push(`</th>`);
        const hasOptionValue = col.controlType === 'select' && col.options instanceof Array && col.options.length;
        if (hasOptionValue) {
            tableBody.push(`<td class="vt-align-center" translate>${model.entityCamelName}.${col.name}.{{item.${col.name}}}</td>`);
        } else {
            if (col?.controlType === 'dataPicker' || col?.controlType === 'datetime' || col?.controlType === 'date') {
                tableBody.push(`<td class="vt-align-center">{{item.${col.name}|displayDate}}</td>`);
            } else {
                tableBody.push(`<td class="vt-align-center">{{item.${col.name}}}</td>`);
            }
        }
    });
    const contentFile = `
<div *ngIf="hasPermission('action.view')">
    <div id="searchArea">
        <div class="panel panel-default">
            <div class="panel-heading" translate>
                <strong class="text-u-c">
                    <i class="fa fa-th"></i>
                    common.label.search.info
                </strong>
            </div>
            <form id="form-search-${model.entityEntryNameHyphen}" [formGroup]="formSearch">
                <div class="panel-body padding-xl ui-g">
                    ${dynamicControl.join(`\n`)}
                </div>
                <div class="panel-footer vt-area-button">
                    <button type="submit" class="btn btn-sm btn-info" (click)="processSearch()"
                        [innerHTML]="'common.button.icon.search' | translate"></button>
                    <button *ngIf="hasPermission('action.insert')" type="button" class="btn btn-sm btn-info"
                        (click)="prepareSaveOrUpdate()" [innerHTML]="'common.button.icon.addNew' | translate"></button>
                    <button *ngIf="hasPermission('action.export')" type="button" class="btn btn-sm btn-info"
                        (click)="processExport()" [innerHTML]="'common.button.icon.exportFile' | translate"></button>
                </div>
            </form>
        </div>
    </div>
    <div class="listArea">
        <div class="panel panel-default">
            <div class="panel-heading vt-relative">
                <strong class="text-u-c">
                <i class="fa fa-th"></i> {{'subsidizedPeriod.label.subsidizedPeriodList' | translate}}
                </strong>
            </div>
            <div class="panel-body panel-table">
                <p-table #ptable [value]="resultList.data.data" [paginator]="true" (onLazyLoad)="processSearch($event)" [lazy]="true"
                    [rows]="10" [totalRecords]="resultList.data.recordsTotal" [scrollable]="true" [lazyLoadOnInit]="false"
                    tableStyleClass="table table-wrapper table-hover table-striped b-t b-b" styleClass="controlOverflow"
                >
                    <ng-template pTemplate="colgroup" let-columns>
                        <colgroup>
                            <col class="size-1">
                            <col class="size-2">
                            <col class="size-2">
                            <col class="size-2">
                            ${colgroup.join(`\n                            `)}
                        </colgroup>
                    </ng-template>
                    <ng-template pTemplate="header">
                        <tr>
                            <!-- stt -->
                            <th>{{'common.table.index' | translate}}</th>
                            <!-- xem -->
                            <th translate>common.label.view</th>
                            <!-- sửa -->
                            <th>{{'common.label.edit' | translate}}</th>
                            <!-- xóa -->
                            <th>{{'common.label.delete' | translate}}</th>
                            ${tableHeader.join(`\n                            `)}
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-item let-index="rowIndex+1">
                        <tr>
                            <td class="vt-align-center">{{index}}</td>
                            <td class="vt-align-center">
                                <a class="btn-table edit" (click)="processView(item, true)"
                                title="{{'common.label.view' | translate}}"><i class="fas fa-eye"></i></a>
                            </td>
                            <td class="vt-align-center" *ngIf="hasPermission('action.update')">
                                <a class="btn-table edit" (click)="prepareSaveOrUpdate(item)"
                                    title="{{'common.label.edit' | translate}}"><i class="fa fa-edit"></i></a>
                            </td>
                            <td *ngIf="hasPermission('action.delete')" class="vt-align-center">
                                <a class="btn-table delete" (click)="processDelete(item)"
                                    title="{{'common.label.delete' | translate}}"><i class="fa fa-trash-alt"></i></a>
                            </td>
                            ${tableBody.join(`\n                            `)}
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="emptymessage">
                        <tr class="emptymessage">
                        <td [attr.colspan]="${renderColumns.length + 1}" [innerHTML]="'app.noRecords' | translate">
                        </td>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="paginatorleft">
                        <table-footer [resultList]="resultList.data"></table-footer>
                    </ng-template>
                </p-table>
            </div>
        </div>
    </div>
</div>
`;
    moduleName = moduleName || model.entityEntryNameHyphen;
    UtilsFile.writeFile(`/com.viettel.erp/political-web-app/src/app/modules/${moduleName}/${model.entityEntryNameHyphen}-search`, `/${model.entityEntryNameHyphen}-search.component.html`, contentFile);
};