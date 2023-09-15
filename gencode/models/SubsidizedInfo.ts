/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";

export class SubsidizedInfo extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'subsidizedInfoId',
            dbName: 'subsidized_info_id',
            length: 20,
            isPrimaryKey: true,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Long',
            name: 'signDocumentId',
            dbName: 'sign_document_id',
            length: 20,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Long',
            name: 'proposeOrgId',
            dbName: 'propose_org_id',
            length: 20,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Long',
            name: 'subsidizedPeriodId',
            dbName: 'subsidized_period_id',
            length: 20,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'String',
            name: 'subsidizedPeriodId',
            dbName: 'subsidized_period_id',
            length: 1000,
            controlType: 'textarea',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
    ];

    constructor() {
        super('subsidized_info', 'SubsidizedInfo');
    }
}