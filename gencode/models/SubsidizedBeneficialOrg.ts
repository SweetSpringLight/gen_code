import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";
export class SubsidizedBeneficialOrg extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'subsidizedBeneficialOrgId',
            dbName: 'subsidized_beneficial_org_id',
            length: 20,
            isPrimaryKey: true,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Long',
            name: 'subsidizedPeriodId',
            dbName: 'subsidized_period_id',
            length: 20,
            validate: ['required'],
            label: 'Đợt trợ cấp',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Long',
            name: 'beneficialOrgId',
            dbName: 'beneficial_org_id',
            length: 20,
            validate: ['required'],
            label: 'Đơn vị thụ hưởng',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'Long',
            name: 'status',
            dbName: 'status',
            validate: ['required'],
            controlType: 'date',
            label: 'Đã đồng bộ dữ liệu',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        }
    ];

    constructor() {
        super('subsidized_beneficial_org', 'SubsidizedBeneficialOrg');
    }
}