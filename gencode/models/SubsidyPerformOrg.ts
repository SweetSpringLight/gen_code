/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
 import { BaseColumn } from "../gencore/core/BaseColumn";
 import { BaseModel } from "../gencore/core/BaseModel";
 import { BaseRefOne } from "../gencore/core/BaseRefOne";
import { Organization } from "./Organization";
import { SubsidyRequestOrg } from "./SubsidyRequestOrg";

 export class SubsidyPerformOrg extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'subsidyPerformOrgId',
            dbName: 'subsidy_perform_org_id',
            length: 20,
            isPrimaryKey: true,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Ref',
            name: 'subsidyRequestOrgId',
            dbName: 'subsidy_request_org_id',
            length: 20,
            label: 'Đơn vị yêu cầu',
            validate: ['required'],
            refModel: new BaseRefOne({model: SubsidyRequestOrg, refId: 'subsidyRequestOrgId', refAttrs: [], refNameAlias: 'requestOrg'}),
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Ref',
            name: 'performOrgId',
            dbName: 'perform_org_id',
            length: 20,
            label: 'Đơn vị thực hiện',
            validate: ['required'],
            controlType: 'multiOrganization',
            refModel: new BaseRefOne({model: SubsidyRequestOrg, refId: 'requestOrgId', refAttrs: [], refNameAlias: 'performOrg'}),
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Long',
            name: 'status',
            dbName: 'status',
            label: 'Trạng thái',
            controlType: 'select',
            options: [
                { id: 1, name: 'Dự thảo', className: 'table-status' },
                { id: 2, name: 'Chờ xét chọn', className: 'table-status' },
                { id: 3, name: 'Đã xét chọn', className: 'table-status' },
                { id: 4, name: 'Từ chối đề xuất', className: 'table-status' },
            ],
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_list_html']
        },
        {
            type: 'Long',
            name: 'signDocumentId',
            dbName: 'sign_document_id',
            label: 'ID ký sign_document',
            validate: ['required'],
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
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
        super('subsidy_perform_org', 'SubsidyPerformOrg');
    }
 }