/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";

export class SubsidizedBeneficiary extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'subsidizedBeneficiaryId',
            dbName: 'subsidized_beneficiary_id',
            length: 20,
            isPrimaryKey: true,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Long',
            name: 'subsidizedInfoId',
            dbName: 'subsidized_info_id',
            length: 20,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Long',
            name: 'objectId',
            dbName: 'object_id',
            length: 20,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Long',
            name: 'objectType',
            dbName: 'object_type',
            length: 1,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Long',
            name: 'subsidizedMoney',
            dbName: 'subsidized_money',
            length: 20,
            controlType: 'textarea',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Long',
            name: 'status',
            dbName: 'status',
            length: 1,
            controlType: 'textarea',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'String',
            name: 'reason',
            dbName: 'reason',
            length: 1000,
            controlType: 'textarea',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'String',
            name: 'refuseReason',
            dbName: 'refuse_reason',
            length: 500,
            controlType: 'textarea',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Date',
            name: 'approvedDate',
            dbName: 'approved_date',
            controlType: 'date',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        }
    ];

    constructor() {
        super('subsidized_beneficiary', 'SubsidizedBeneficiary');
    }
}