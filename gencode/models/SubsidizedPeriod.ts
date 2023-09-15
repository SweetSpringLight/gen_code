import { BaseRefMany } from './../gencore/core/BaseRefMany';
/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";
import { BaseRefOne } from "../gencore/core/BaseRefOne";
import { CatAllowance } from "./CatAllowance";
import { SubsidizedBeneficialOrg } from './SubsidizedBeneficialOrg';

export class SubsidizedPeriod extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'subsidizedPeriodId',
            dbName: 'subsidized_period_id',
            length: 20,
            isPrimaryKey: true,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'react_model']
        },
        {
            type: 'Long',
            name: 'decisionYear',
            dbName: 'decision_year',
            label: 'Năm quyết định',
            validate: ['required'],
            controlType: 'selectYearFromTo',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'react_search', 'react_list', 'react_form', 'react_model', 'angular_form_html', 'angular_search_html', 'angular_list_html']
        },
        {
            type: 'String',
            name: 'name',
            dbName: 'name',
            length: 200,
            label: 'Tên đợt trợ cấp',
            validate: ['required'],
            controlType: 'text',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'react_form', 'react_list', 'react_search', 'react_model', 'angular_form_html', 'angular_search_html', 'angular_list_html']
        },
        {
            type: 'Long',
            name: 'decisionOrgId',
            dbName: 'decision_org_id',
            controlType: 'organization',
            label: 'Đơn vị quyết định',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'react_form', 'react_search', 'react_model', 'angular_form_html', 'angular_search_html']
        },
        {
            type: 'Long',
            name: 'beneficiaryType',
            dbName: 'beneficiary_type',
            controlType: 'select',
            label: 'Đối tượng hưởng',
            validate: ['required'],
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'react_form', 'react_list', 'react_search', 'react_model', 'angular_form_html', 'angular_search_html', 'angular_list_html'],
            options: [
                { id: 1, name: 'Bản thân CBNV', className: 'table-status primary' },
                { id: 2, name: 'Thân nhân CBNV', className: 'table-status info' },
                { id: 3, name: 'Cả hai', className: 'table-status' }
            ]
        },
        {
            type: 'Ref',
            name: 'subsidizedType',
            dbName: 'subsidized_type',
            controlType: 'select',
            label: 'Loại trợ cấp',
            validate: ['required'],
            optionValue: 'id',
            optionLabel: 'name',
            refModel: new BaseRefOne({model: CatAllowance, refId: 'id', refAttrs: ['name'], refNameAlias: 'subsidizedType'}),
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'react_form', 'react_search', 'react_model', 'angular_import_form', 'angular_form_html', 'angular_search_html']
        },
        // {
        //     name: 'subsidizedTypeName',
        //     label: 'Loại trợ cấp',
        //     templates: ['react_list']
        // },
        {
            type: 'Date',
            name: 'decisionDate',
            dbName: 'decision_date',
            controlType: 'date',
            validate: [],
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'react_model']
        },
        {
            type: 'String',
            name: 'decisionNumber',
            dbName: 'decision_number',
            controlType: 'text',
            length: 200,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'react_model']
        },
        {
            type: 'Ref',
            name: 'listSubsidizedBeneficialOgrId',
            controlType: 'multiOrganization',
            label: 'Đơn vị hưởng',
            refModel: new BaseRefMany({model: SubsidizedBeneficialOrg, refId: 'subsidizedPeriodId', refAttrs: ['beneficialOrgId'], refNameAlias: ''}),
            templates: ['java_dto', 'java_form', 'react_form', 'angular_form_html'],
        }
    ];

    constructor() {
        super('subsidized_period', 'SubsidizedPeriod');
    }
}