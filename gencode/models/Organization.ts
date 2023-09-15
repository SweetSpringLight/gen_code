/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";

export class Organization extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'organizationId',
            dbName: 'organization_id',
            length: 10,
            isPrimaryKey: true,
            templates: ['java_model', 'react_model']
        },
        {
            type: 'String',
            name: 'code',
            dbName: 'code',
            length: 200,
            validate: ['required', 'maxlength'],
            templates: ['java_model', 'react_model']
        },
        {
            type: 'String',
            name: 'name',
            dbName: 'name',
            length: 200,
            validate: ['required', "maxlength"],
            templates: ['java_model', 'react_model']
        },
        {
            type: 'Date',
            name: 'effectiveStartDate',
            dbName: 'effective_start_date',
            templates: ['java_model']
        },
        {
            type: 'Date',
            name: 'effectiveEndDate',
            dbName: 'effective_end_date',
            templates: ['java_model']
        }
    ];

    constructor() {
        super('organization', 'Organization');
    }
}