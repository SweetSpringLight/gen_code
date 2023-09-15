/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";
import { BaseRefMany } from "../gencore/core/BaseRefMany";

export class SubsidyDiseaseLevel extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'subsidyDiseaseLevelId',
            dbName: 'subsidy_disease_level_id',
            length: 20,
            isPrimaryKey: true,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Long',
            name: 'subsidyDiseaseId',
            dbName: 'subsidy_disease_id',
            length: 20,
            validate: ['required'],
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'String',
            name: 'name',
            dbName: 'name',
            length: 200,
            validate: ['required'],
            label: 'Tên bệnh',
            controlType: 'text',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html', 'angular_search_html', 'angular_list_html']
        }
    ];

    constructor() {
        super('subsidy_disease_level', 'SubsidyDiseaseLevel');
    }
}