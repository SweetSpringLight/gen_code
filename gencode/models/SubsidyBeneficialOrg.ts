/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";
import { BaseRefMany } from "../gencore/core/BaseRefMany";
import { SubsidyDisease } from "./SubsidyDisease";

export class SubsidyBeneficialOrg extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'subsidyBeneficialOrgId',
            dbName: 'subsidy_beneficial_org_id',
            length: 20,
            isPrimaryKey: true,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Long',
            name: 'subsidyPeriodId',
            dbName: 'subsidy_period_id',
            label: 'Id đợt trợ cấp',
            validate: ['required'],
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Long',
            name: 'beneficialOrgId',
            dbName: 'beneficial_org_id',
            label: 'Đơn vị hưởng',
            length: 20,
            validate: ['required', 'maxlength'],
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
    ];

    constructor() {
        super('subsidy_beneficial_org', 'SubsidyBeneficialOrg');
    }
}