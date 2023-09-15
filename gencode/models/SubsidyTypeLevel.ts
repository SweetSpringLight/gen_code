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
            name: 'subsidyTypeLevelId',
            dbName: 'subsidy_type_level_id',
            length: 20,
            isPrimaryKey: true,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Long',
            name: 'subsidyTypeId',
            dbName: 'subsidy_type_id',
            label: 'Id loại trợ cấp',
            validate: ['required'],
            controlType: 'text',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'String',
            name: 'name',
            dbName: 'name',
            label: 'Mức mức cấp',
            controlType: 'text',
            length: 200,
            validate: ['required', 'maxlength'],
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html']
        },
        {
            type: 'Long',
            name: 'money',
            dbName: 'money',
            label: 'Số tiền',
            length: 15,
            controlType: 'text',
            validate: ['required', 'maxlength'],
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html']
        },
        {
            type: 'Long',
            name: 'limit',
            dbName: 'limit',
            label: 'Số lần hưởng tối đa/ người',
            length: 4,
            controlType: 'text',
            validate: ['required', 'maxlength'],
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html']
        },
        {
            type: 'Ref',
            name: 'listSubsidyDisease',
            controlType: 'multiSelect',
            label: 'Bệnh được hưởng',
            validate: ['required'],
            options: [],
            optionValue: 'subsidyDiseaseLevelId',
            optionLabel: 'name',
            refModel: new BaseRefMany({model: SubsidyLevelMappingDisease, refId: 'subsidyTypeLevelId', refAttrs: ['subsidyDiseaseLevelId'], refNameAlias: ''}),
            templates: ['java_dto', 'java_form', 'angular_form_html'],
        },
    ];

    constructor() {
        super('subsidy_type_level', 'SubsidyTypeLevel');
    }
}