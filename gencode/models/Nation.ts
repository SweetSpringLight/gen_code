/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";

export class Nation extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'nationId',
            dbName: 'nation_id',
            length: 20,
            isPrimaryKey: true,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'react_model']
        },
        {
            type: 'String',
            name: 'name',
            dbName: 'name',
            length: 200,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'react_model']
        },
        {
            type: 'Long',
            name: 'isDefault',
            dbName: 'is_default',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'react_model']
        },
        {
            type: 'String',
            name: 'description',
            dbName: 'description',
            length: 500,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'react_model']
        },
        {
            type: 'String',
            name: 'code',
            dbName: 'code',
            length: 10,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'react_model']
        },
        {
            type: 'Long',
            name: 'requirePersonalId',
            dbName: 'require_personal_id',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'react_model']
        },
        {
            type: 'String',
            name: 'nameEn',
            dbName: 'name_en',
            length: 300,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'react_model']
        },
        {
            type: 'String',
            name: 'descriptionEn',
            dbName: 'description_en',
            length: 750,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'react_model']
        },
        {
            type: 'String',
            name: 'nameFr',
            dbName: 'name_fr',
            length: 300,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'react_model']
        },
        {
            type: 'String',
            name: 'descriptionFr',
            dbName: 'description_fr',
            length: 700,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'react_model']
        },
        {
            type: 'String',
            name: 'nameSp',
            dbName: 'name_sp',
            length: 300,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'react_model']
        },
        {
            type: 'String',
            name: 'descriptionSp',
            dbName: 'description_sp',
            length: 700,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'react_model']
        },
        {
            type: 'String',
            name: 'phoneAreaCode',
            dbName: 'phone_area_code',
            length: 20,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'react_model']
        },
    ];

    constructor() {
        super('nation', 'Nation');
    }
}