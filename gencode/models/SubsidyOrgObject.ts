/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
 import { BaseColumn } from "../gencore/core/BaseColumn";
 import { BaseModel } from "../gencore/core/BaseModel";
 import { BaseRefOne } from "../gencore/core/BaseRefOne";
import { SubsidyDiseaseLevel } from "./SubsidyDiseaseLevel";
 import { SubsidyType } from "./SubsidyType";
import { SubsidyTypeLevel } from "./SubsidyTypeLevel";

 export class SubsidyOrgObject extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'subsidyOrgObjectId',
            dbName: 'subsidy_org_object_id',
            length: 20,
            isPrimaryKey: true,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Long',
            name: 'employeeId',
            dbName: 'employee_id',
            length: 20,
            label: 'Mã nhân viên',
            validate: ['required'],
            controlType: 'dataPicker',
            objectBO: 'EmployeeBO',
            codeField: 'employeeCode',
            nameField: 'fullName',
            emailField: 'email',
            adResourceKey: 'resource.subsidyOrgObject',
            operationKey: 'action.view',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html']
        },
        {
            type: 'Long',
            name: 'objectType',
            dbName: 'object_type',
            length: 20,
            label: 'Loại đối tượng',
            controlType: 'select',
            options: [
                { id: 1, name: 'Nhân viên', className: 'table-status' },
                { id: 2, name: 'Thân nhân', className: 'table-status' },
            ],
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html']
        },
        {
            type: 'Long',
            name: 'objectId',
            dbName: 'object_id',
            length: 20,
            label: 'Mối quan hệ (Bản thân,Bố/mẹ đẻ, Bố/mẹ chồng, con,...)',
            validate: ['required'],
            controlType: 'select',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html']
        },
        {
            type: 'String',
            name: 'address',
            dbName: 'address',
            length: 2000,
            label: 'Địa chỉ của người hưởng',
            controlType: 'textarea',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html']
        },
        {
            type: 'Ref',
            name: 'subsidyDiseaseLevelId',
            dbName: 'subsidy_disease_level_id',
            length: 20,
            label: 'Mức độ bệnh',
            controlType: 'select',
            optionLabel: 'name',
            optionValue: 'subsidyDiseaseLevelId',
            refModel: new BaseRefOne({model: SubsidyDiseaseLevel, refId: 'subsidyDiseaseLevelId', refAttrs: ['name'], refNameAlias: 'subsidyDiseaseLevel'}),
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html']
        },
        {
            type: 'Long',
            name: 'subsidyTypeLevelId',
            dbName: 'subsidy_type_level_id',
            length: 20,
            label: 'Mức trợ cấp',
            controlType: 'select',
            optionLabel: 'name',
            optionValue: 'subsidyTypeLevelId',
            refModel: new BaseRefOne({model: SubsidyTypeLevel, refId: 'subsidyTypeLevelId', refAttrs: ['name'], refNameAlias: 'subsidyTypeLevel'}),
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html']
        },
        {
            type: 'Long',
            name: 'money',
            dbName: 'money',
            length: 15,
            label: 'Số tiền',
            controlType: 'text',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html']
        },
        {
            type: 'String',
            name: 'description',
            dbName: 'description',
            length: 2000,
            label: 'Lý do trợ cấp',
            controlType: 'textarea',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html']
        },
        {
            type: 'Ref',
            name: 'subsidyDiseaseLevelId2',
            dbName: 'subsidy_disease_level_id2',
            length: 20,
            label: 'Mức độ bệnh (xét chọn)',
            controlType: 'select',
            optionLabel: 'name',
            optionValue: 'subsidyDiseaseLevelId',
            refModel: new BaseRefOne({model: SubsidyDiseaseLevel, refId: 'subsidyDiseaseLevelId', refAttrs: ['name'], refNameAlias: 'subsidyDiseaseLevel'}),
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html']
        },
        {
            type: 'Ref',
            name: 'subsidyTypeLevelId2',
            dbName: 'subsidy_type_level_id2',
            length: 20,
            label: 'Mức trợ cấp (xét chọn)',
            controlType: 'select',
            optionLabel: 'name',
            optionValue: 'subsidyTypeLevelId',
            refModel: new BaseRefOne({model: SubsidyTypeLevel, refId: 'subsidyTypeLevelId', refAttrs: ['name'], refNameAlias: 'subsidyTypeLevel'}),
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html']
        },
        {
            type: 'Long',
            name: 'money2',
            dbName: 'money2',
            length: 15,
            label: 'Số tiền (xét chọn)',
            controlType: 'text',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html']
        },
        {
            type: 'String',
            name: 'description2',
            dbName: 'description2',
            length: 2000,
            label: 'Lý do trợ cấp (xét chọn)',
            controlType: 'textarea',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html']
        },
        {
            type: 'String',
            name: 'rejectReason',
            dbName: 'reject_reason',
            length: 2000,
            label: 'Lý do từ chối ( xét chọn )',
            controlType: 'textarea',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html']
        },
        {
            type: 'Long',
            name: 'approveStatus',
            dbName: 'approve_status',
            length: 4,
            label: 'Xét duyệt',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'MultipartFile',
            name: 'attachedFiles',
            label: 'File đính kèm',
            validate: ['required'],
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
        super('subsidy_org_object', 'SubsidyOrgObject');
    }
 }