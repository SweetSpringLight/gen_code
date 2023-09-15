/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";

export class MassOrganization extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'massOrganizationId',
            dbName: 'mass_organization_id',
            length: 20,
            isPrimaryKey: true,
            templates: ['java_model', 'react_model']
        },
        {
            type: 'Long',
            name: 'parentId',
            dbName: 'parent_id',
            length: 20,
            label: 'Tổ chức cấp cha',
            templates: ['java_model', 'react_model']
        },
        {
            type: 'Long',
            name: 'branch',
            dbName: 'branch',
            length: 4,
            validate: ['required'],
            templates: ['java_model', 'react_model']
        },
        {
            type: 'String',
            name: 'code',
            dbName: 'code',
            length: 200,
            label: 'Mã tổ chức',
            validate: ['required', 'maxlength'],
            templates: ['java_model', 'react_model']
        },
        {
            type: 'String',
            name: 'name',
            dbName: 'name',
            length: 200,
            label: 'Tên tổ chức',
            validate: ['required', "maxlength"],
            templates: ['java_model', 'react_model']
        },
        {
            type: 'Long',
            name: 'type',
            dbName: 'type',
            length: 20,
            label: 'Loại hình tổ chức',
            templates: ['java_model', 'react_model']
        },
        {
            type: 'String',
            name: 'orgPath',
            dbName: 'org_path',
            length: 500,
            label: 'Loại hình tổ chức',
            templates: ['java_model', 'react_model']
        },
        {
            type: 'String',
            name: 'orgCodePath',
            dbName: 'org_code_path',
            length: 500,
            label: 'Loại hình tổ chức',
            templates: ['java_model', 'react_model']
        },
        {
            type: 'Long',
            name: 'employeeId',
            dbName: 'employee_id',
            length: 20,
            label: 'Người phụ trách',
            templates: ['java_model', 'react_model']
        },
        {
            type: 'Date',
            name: 'effectiveDate',
            dbName: 'effective_date',
            validate: ['required'],
            label: 'Ngày hiệu lực',
            templates: ['java_model', 'react_model']
        },
        {
            type: 'Date',
            name: 'expiredDate',
            dbName: 'expired_date',
            templates: ['java_model', 'react_model']
        },
        {
            type: 'String',
            name: 'description',
            dbName: 'description',
            length: 1000,
            templates: ['java_model', 'react_model']
        },
    ];

    constructor() {
        super('massOrganization', 'MassOrganization');
    }
 }