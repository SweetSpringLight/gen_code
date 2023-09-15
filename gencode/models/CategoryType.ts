/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";

export class CategoryType extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'categoryTypeId',
            dbName: 'category_type_id',
            length: 20,
            isPrimaryKey: true,
            templates: ['java_model', 'react_model']

        },
        {
            type: 'String',
            name: 'code',
            dbName: 'code',
            length: 50,
            templates: ['java_model', 'react_model']
        },
        {
            type: 'String',
            name: 'name',
            dbName: 'name',
            length: 200,
            templates: ['java_model', 'react_model']
        },
        {
            type: 'Long',
            name: 'status',
            dbName: 'status',
            length: 200,
            templates: ['java_model', 'react_model']
        },
        {
            type: 'Long',
            name: 'groupId',
            dbName: 'group_id',
            length: 200,
            templates: ['java_model', 'react_model']
        }
    ];

    constructor() {
        super('category_type', 'CategoryType');
    }
}