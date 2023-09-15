/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
 import { BaseColumn } from "../gencore/core/BaseColumn";
 import { BaseModel } from "../gencore/core/BaseModel";
 import { BaseRefOne } from "../gencore/core/BaseRefOne";
import { SubsidyDiseaseLevel } from "./SubsidyDiseaseLevel";

 export class SubsidyTypeLevel extends BaseModel {
     public allColumn: BaseColumn[] = [
         {
             type: 'Long',
             name: 'subsidyDecisionObjectId',
             dbName: 'subsidy_decision_object_id',
             length: 20,
             isPrimaryKey: true,
             templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
         },
         {
            type: 'Long',
            name: 'employeeId',
            dbName: 'employee_id',
            length: 20,
            label: 'ID nhân viên',
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
            label: 'Loại đối tượng: 1: Nhân viên, 2: Thân nhân',
            validate: ['required'],
           //  controlType: 'text',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Long',
            name: 'objectId',
            dbName: 'object_id',
            length: 20,
            label: 'ID nhân viên/ thân nhân',
            validate: ['required'],
           //  controlType: 'text',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
         {
             type: 'String',
             name: 'address',
             dbName: 'address',
             label: 'Địa chỉ của người hưởng',
             controlType: 'text',
             length: 2000,
             validate: ['required', 'maxlength'],
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
             label: 'Số tiền',
             length: 15,
            //  controlType: 'text',
             templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
         },
         {
            type: 'String',
            name: 'description',
            dbName: 'description',
            label: 'Lý do trợ cấp',
            length: 2000,
            validate: ['maxlength'],
           //  controlType: 'text',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        }
     ];
     constructor() {
         super('subsidy_decision_object', 'SubsidyDecisionObject');
     }
 }