/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";
import { BaseRefMany } from "../gencore/core/BaseRefMany";
import { SubsidyDisease } from "./SubsidyDisease";

export class SubsidyLevelMappingDisease extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'subsidyLevelMappingDiseaseId',
            dbName: 'subsidy_level_mapping_disease_id',
            length: 20,
            isPrimaryKey: true,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Long',
            name: 'subsidyTypeLevelId',
            dbName: 'subsidy_type_level_id',
            validate: ['required'],
            length: 20,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Long',
            name: 'subsidyDiseaseLevelId',
            dbName: 'subsidy_disease_level_id',
            length: 20,
            validate: ['required'],
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html']
        }
    ];

    constructor() {
        super('subsidy_level_mapping_disease', 'SubsidyLevelMappingDisease');
    }
}