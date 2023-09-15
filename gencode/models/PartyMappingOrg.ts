/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved. 
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";
import { BaseRefOne } from "../gencore/core/BaseRefOne";
import { Organization } from "./Organization";
export class PartyMappingOrg extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'partyMappingOrgId',
            dbName: 'party_mapping_org_id',
            isPrimaryKey: true,
            templates: ['java_model', 'java_form', 'java_dto'],
        },
        {
            type: 'Long',
            name: 'partyOrganizationId',
            dbName: 'party_organization_id',
            templates: ['java_model', 'java_form', 'java_dto'],
        },
        {
            type: 'Ref',
            name: 'organizationId',
            dbName: 'organization_id',
            templates: ['java_model', 'java_form', 'react_form', 'java_dto'],
            controlType: 'organization',
            refModel: new BaseRefOne({model: Organization, refId: 'organizationId', refAttrs: ['effectiveStartDate', 'effectiveEndDate'], refNameAlias: 'org'}),
        }
    ];
    constructor() {
        super('party_mapping_org', 'PartyMappingOrg');
    }
}