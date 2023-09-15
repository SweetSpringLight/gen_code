
/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";
import { BaseRefMany } from "../gencore/core/BaseRefMany";
import { BaseRefOne } from "../gencore/core/BaseRefOne";
import { Organization } from "./Organization";
import { SubsidyBeneficialOrg } from "./SubsidyBeneficialOrg";
import { SubsidyPerformOrg } from "./SubsidyPerformOrg";
import { SubsidyRequestOrg } from "./SubsidyRequestOrg";
import { SubsidyType } from "./SubsidyType";

export class SubsidyPeriod extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'subsidyPeriodId',
            dbName: 'subsidy_period_id',
            length: 20,
            isPrimaryKey: true,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'String',
            name: 'name',
            dbName: 'name',
            label: 'Tên đợt trợ cấp',
            validate: ['required', 'maxlength'],
            controlType: 'text',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_search_html', 'angular_list_html', 'angular_form_html']
        },
        {
            type: 'Long',
            name: 'objectType',
            dbName: 'object_type',
            length: 1,
            label: 'Lĩnh vực trợ cấp',
            controlType: 'select',
            validate: ['required'],
            options: [
                { id: 1, name: 'Trợ cấp công đoàn', className: 'table-status primary' },
                { id: 2, name: 'Trợ cấp phụ nữ', className: 'table-status info' }
            ],
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html', 'angular_search_html', 'angular_list_html']
        },
        {
            type: 'Long',
            name: 'year',
            dbName: 'year',
            label: 'Năm',
            controlType: 'selectYear',
            validate: ['required'],
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html', 'angular_search_html', 'angular_list_html']
        },
        {
            type: 'Ref',
            name: 'subsidyTypeId',
            dbName: 'subsidy_type_id',
            length: 20,
            label: 'Loại trợ cấp',
            validate: ['required'],
            controlType: 'select',
            optionValue: 'subsidyTypeId',
            optionLabel: 'name',
            refModel: new BaseRefOne({model: SubsidyType, refId: 'subsidyTypeId', refAttrs: ['name'], refNameAlias: 'subsidyType'}),
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html', 'angular_search_html']
        },
        // {
        //     type: 'String',
        //     name: 'subsidyTypeName',
        //     templates: ['angular_list_html']
        // },
        {
            type: 'Long',
            name: 'beneficiaryType',
            dbName: 'beneficiary_type',
            label: 'Đối tượng hưởng',
            controlType: 'select',
            validate: ['required'],
            options: [
                { id: 1, name: 'Bản thân CBNV', className: 'table-status primary' },
                { id: 2, name: 'Thân nhân CBNV', className: 'table-status info' },
                { id: 3, name: 'Cả hai', className: 'table-status info' }
            ],
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html', 'angular_search_html', 'angular_list_html']
        },
        {
            type: 'Long',
            name: 'gender',
            dbName: 'gender',
            label: 'Giới tính',
            controlType: 'select',
            validate: ['required'],
            options: [
                { id: 1, name: 'Nam', className: 'table-status primary' },
                { id: 2, name: 'Nữ', className: 'table-status info' },
                { id: 3, name: 'Cả hai', className: 'table-status' }
            ],
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html', 'angular_search_html', 'angular_list_html']
        },
        {
            type: 'Date',
            name: 'startDate',
            dbName: 'start_date',
            label: 'Ngày bắt đầu thực hiện',
            validate: ['required'],
            controlType: 'date',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html', 'angular_search_html', 'angular_list_html']
        },
        {
            type: 'Date',
            name: 'endDate',
            dbName: 'end_date',
            label: 'Hạn hoàn thành',
            controlType: 'date',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html', 'angular_list_html']
        },
        {
            type: 'Ref',
            name: 'decisionOrgId',
            dbName: 'decision_org_id',
            length: 20,
            label: 'Đơn vị quyết định',
            validate: ['required'],
            controlType: 'organization',
            refModel: new BaseRefOne({model: Organization, refId: 'organizationId', refAttrs: ['name'], refNameAlias: 'decisionOrg'}),
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html', 'angular_search_html']
        },
        // {
        //     type: "String",
        //     name: 'decisionOrgName',
        //     label: 'Đơn vị quyết định',
        //     templates: ['angular_list_html']
        // },
        {
            type: 'Date',
            name: 'createdDate',
            dbName: 'created_date',
            label: 'Ngày giờ tạo',
            controlType: 'date',
            templates: ['java_model', 'java_sql']
        },
        {
            type: 'String',
            name: 'createdBy',
            dbName: 'created_by',
            label: 'Người tạo',
            controlType: 'text',
            templates: ['java_model', 'java_sql']
        },
        {
            type: 'Date',
            name: 'updatedDate',
            dbName: 'updated_date',
            label: 'Ngày giờ cập nhật',
            controlType: 'date',
            templates: ['java_model', 'java_sql']
        },
        {
            type: 'String',
            name: 'updatedBy',
            dbName: 'updated_by',
            label: 'Người cập nhật',
            controlType: 'text',
            templates: ['java_model', 'java_sql']
        },
        {
            type: 'Ref',
            name: 'requestOrg',
            length: 20,
            label: 'Danh sách yêu cầu',
            controlType: 'refTable',
            refModel: new BaseRefMany({model: SubsidyRequestOrg, refId: 'subsidyPeriodId', refAttrs: [], refNameAlias: 'requestOrg'}),
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html']
        }
    ];

    constructor() {
        super('subsidy_period', 'SubsidyPeriod');
    }
}