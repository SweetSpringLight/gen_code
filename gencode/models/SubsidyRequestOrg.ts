/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";
import { BaseRefMany } from "../gencore/core/BaseRefMany";
import { BaseRefOne } from "../gencore/core/BaseRefOne";
import { Organization } from "./Organization";
import { SubsidyPerformOrg } from "./SubsidyPerformOrg";
import { SubsidyPeriod } from "./SubsidyPeriod";

export class SubsidyRequestOrg extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'subsidyRequestOrgId',
            dbName: 'subsidy_request_org_id',
            length: 20,
            isPrimaryKey: true,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Ref',
            name: 'subsidyPeriodId',
            dbName: 'subsidy_period_id',
            length: 20,
            validate: ['required'],
            controlType: 'select',
            optionValue: 'subsidyPeriodId',
            optionLabel: 'Tên đợt trợ cấp',
            refModel: new BaseRefOne({model: SubsidyPeriod, refId: 'subsidyPeriodId', refAttrs: [], refNameAlias: 'subsidyPeriod'}),
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_search_html', 'angular_list_html']
        },
        {
            type: 'Ref',
            name: 'requestOrgId',
            dbName: 'request_org_id',
            length: 20,
            validate: ['required'],
            label: 'Đơn vị yêu cầu',
            controlType: 'organization',
            refModel: new BaseRefOne({model: Organization, refId: 'organizationId', refAttrs: [], refNameAlias: 'organization'}),
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html', 'angular_search_html', 'angular_list_html']
        },
        {
            type: 'Date',
            name: 'startDate',
            dbName: 'start_date',
            label: 'Ngày bắt đầu',
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
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html', 'angular_search_html', 'angular_list_html']
        },
        {
            type: 'Long',
            name: 'isRequireApprove',
            dbName: 'is_require_approve',
            label: 'Trình ký lãnh đạo đơn vị',
            controlType: 'checkbox',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Long',
            name: 'isRoot',
            dbName: 'is_root',
            label: 'Yêu cầu gốc',
            length: 4,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'String',
            name: 'comment',
            dbName: 'comment',
            label: 'Ghi chú',
            length: 2000,
            controlType: 'textarea',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Ref',
            name: 'listPerformOrg',
            length: 20,
            validate: ['required'],
            label: 'Đơn vị thực hiện',
            controlType: 'multiOrganization',
            refModel: new BaseRefMany({model: SubsidyPerformOrg, refId: 'subsidyRequestOrgId', refAttrs: ['performOrgId'], refNameAlias: 'performOrg'}),
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html']
        },
        {
            type: 'MultipartFile',
            name: 'attachedFiles',
            label: 'File đính kèm',
            validate: ['required'],
            controlType: 'multiFile',
            templates: ['java_dto', 'java_form', 'angular_form_html']
        },
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
    ];

    constructor() {
        super('subsidy_request_org', 'SubsidyRequestOrg');
    }
}