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
             name: 'subsidyDecisionDetailId',
             dbName: 'subsidy_decision_detail_id',
             length: 20,
             isPrimaryKey: true,
             templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
         },
         {
             type: 'Long',
             name: 'subsidyDecisionId',
             dbName: 'subsidy_decision_id',
             label: 'ID Quyết định đề xuất',
             validate: ['required'],
            //  controlType: 'text',
             templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
         },
         {
            type: 'Long',
            name: 'subsidyPerformOrgId',
            dbName: 'subsidy_perform_org_id',
            label: 'ID Đề xuất trợ cấp',
            validate: ['required'],
           //  controlType: 'text',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        }
     ];

     constructor() {
         super('subsidy_decision_detail', 'SubsidyDecisionDetail');
     }
 }