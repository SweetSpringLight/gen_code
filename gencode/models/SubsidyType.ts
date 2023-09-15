/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";
import { BaseRefMany } from "../gencore/core/BaseRefMany";
import { SubsidyTypeLevel } from "./SubsidyTypeLevel";

export class SubsidyType extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'subsidyTypeId',
            dbName: 'subsidy_type_id',
            length: 20,
            isPrimaryKey: true,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Long',
            name: 'bussinessType',
            dbName: 'bussiness_type',
            length: 1,
            label: 'Lĩnh vực trợ cấp',
            validate: ['required'],
            controlType: 'select',
            options: [
                { id: 1, name: 'Trợ cấp công đoàn', className: 'table-status primary' },
                { id: 2, name: 'Trợ cấp phụ nữ', className: 'table-status info' },
            ],
            optionValue: 'id',
            optionLabel: 'name',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html', 'angular_search_html', 'angular_list_html']
        },
        {
            type: 'String',
            name: 'name',
            dbName: 'name',
            label: 'Tên loại trợ cấp',
            validate: ['required'],
            controlType: 'text',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html', 'angular_search_html', 'angular_list_html']
        },
        {
            type: 'Long',
            name: 'objectType',
            dbName: 'object_type',
            length: 2,
            label: 'Đối tượng hưởng',
            validate: ['required'],
            controlType: 'select',
            options: [
                { id: 1, name: 'Bản thân', className: 'table-status primary' },
                { id: 2, name: 'Thân nhân', className: 'table-status info' },
                { id: 3, name: 'Cả hai', className: 'table-status' }
            ],
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html', 'angular_search_html', 'angular_list_html']
        },
        {
            type: 'Long',
            name: 'scope',
            dbName: 'scope',
            label: 'Phạm vi hưởng',
            controlType: 'select',
            validate: ['required'],
            options: [
                { id: 1, name: 'Tất cả', className: 'table-status primary' },
                { id: 2, name: 'Hợp đồng lao động', className: 'table-status info' }
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
            type: 'Long',
            name: 'maximumLimit',
            dbName: 'maximum_limit',
            label: 'Số lần hưởng tối đa/ người',
            controlType: 'text',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html', 'angular_list_html']
        },
        {
            type: 'Long',
            name: 'maximumMoney',
            dbName: 'maximum_money',
            label: 'Hạn mức tối đa/ người',
            controlType: 'text',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html', 'angular_list_html']
        },
        {
            type: 'Ref',
            name: 'listSubsidyTypeLevel',
            controlType: 'refTable',
            label: 'Các mức trợ cấp',
            validate: ['required'],
            refModel: new BaseRefMany({model: SubsidyTypeLevel, refId: 'subsidyTypeId', refAttrs: ['subsidyTypeId', 'code', 'name', 'money'], refNameAlias: ''}),
            templates: ['java_dto', 'java_form', 'angular_form_html'],
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
        super('subsidy_type', 'SubsidyType');
    }
}