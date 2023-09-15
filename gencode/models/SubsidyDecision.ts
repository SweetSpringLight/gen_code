/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
 import { BaseColumn } from "../gencore/core/BaseColumn";
 import { BaseModel } from "../gencore/core/BaseModel";
 import { BaseRefMany } from "../gencore/core/BaseRefMany";
 import { SubsidyDisease } from "./SubsidyDisease";
 import { SubsidyLevelMappingDisease } from "./SubsidyLevelMappingDisease";

 export class SubsidyTypeLevel extends BaseModel {
     public allColumn: BaseColumn[] = [
         {
             type: 'Long',
             name: 'subsidyDecisionId',
             dbName: 'subsidy_decision_id',
             length: 20,
             isPrimaryKey: true,
             templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
         },
         {
             type: 'Long',
             name: 'decisionOrgId',
             dbName: 'decision_org_id',
             label: 'Đơn vị quyết định',
             validate: ['required'],
            //  controlType: 'text',
             templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
         },
         {
            type: 'Long',
            name: 'signOrgId',
            dbName: 'sign_org_id',
            label: 'Đơn vị trình ký',
            validate: ['required'],
           //  controlType: 'text',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
         {
             type: 'String',
             name: 'decision_name',
             dbName: 'decision_name',
             label: 'Tên quyết định',
             controlType: 'text',
             length: 200,
             validate: ['required', 'maxlength'],
             templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html']
         },
         {
             type: 'Long',
             name: 'subsidy_period_id',
             dbName: 'subsidy_period_id',
             label: 'ID đợt trợ cấp',
             length: 20,
            //  controlType: 'text',
             validate: ['required'],
             templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html']
         },
         {
             type: 'Long',
             name: 'status',
             dbName: 'status',
             label: 'Trạng thái: 1: Dự thảo, 2: Đang trình ký, 3: Đã ký duyệt, 4: Từ chối duyệt',
             length: 4,
            //  controlType: 'text',
             validate: ['required'],
             templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html']
         },
         {
             type: 'Long',
             name: 'signDocumentId',
             dbName: 'sign_document_id',
             label: 'Id văn bản ký',
             length: 20,
            //  controlType: 'text',
             templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
         },
         {
            type: 'String',
            name: 'decisionNumber',
            dbName: 'decision_number',
            label: 'Số quyết định',
            length: 200,
           //  controlType: 'text',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'String',
            name: 'promulgateBy',
            dbName: 'promulgate_by',
            label: 'Người ký ban hành',
            length: 200,
           //  controlType: 'text',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Date',
            name: 'promulgateDate',
            dbName: 'promulgate_date',
            label: 'Ngày ban hành',
           //  controlType: 'text',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Integer',
            name: 'fromSource',
            dbName: 'from_source',
            label: '1: Quyết định tổng hợp, 2: Quyết định nhập ngoài',
            length: 4,
           //  controlType: 'text',
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
         super('subsidy_decision', 'SubsidyDecision');
     }
 }