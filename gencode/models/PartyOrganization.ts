/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved. 
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { Organization } from './Organization';
import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";
import { BaseRefOne } from "../gencore/core/BaseRefOne";
import { CategoryType } from "./CategoryType";
import { Document } from "./Document";
import { Employee } from './Employee';
export class PartyOrganization extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'partyOrganizationId',
            dbName: 'party_organization_id',
            isPrimaryKey: true,
            templates: ['java_model']
        },
        {
            type: 'String',
            name: 'code',
            dbName: 'code',
            length: 100,
            validate: ['required'],
            controlType: 'text',
            templates: ['java_model', 'react_form', 'react_search']
        },
        {
            type: 'String',
            name: 'name',
            dbName: 'name',
            length: 250,
            validate: ['required'],
            controlType: 'text',
            templates: ['java_model', 'react_form', 'react_search']
        },
        {
            type: 'Date',
            name: 'effectiveDate',
            dbName: 'effective_date',
            validate: ['required'],
            controlType: 'date',
            templates: ['java_model', 'react_form']
        },
        {
            type: 'Date',
            name: 'expritedDate',
            dbName: 'exprited_date',
            controlType: 'date',
            templates: ['java_model']
        },
        {
            type: 'Ref',
            name: 'parentId',
            dbName: 'parent_id',
            refModel: new BaseRefOne({model: PartyOrganization, refId: 'partyOrganizationId', refAttrs: ['name'], refNameAlias: 'parent'}),
            controlType: 'partyOrganization',
            templates: ['java_model', 'react_form'],
        },
        {
            type: 'Ref',
            name: 'type',
            dbName: 'type',
            validate: ['required'],
            refModel: new BaseRefOne({model: CategoryType, refId: 'categoryTypeId', refAttrs: ['name'], refNameAlias: 'type'}),
            controlType: 'select',
            templates: ['java_model', 'react_form'],
        },
        {
            type: 'Ref',
            name: 'documentId',
            dbName: 'documentId',
            refModel: new BaseRefOne({model: Document, refId: 'documentId', refAttrs: ['name'], refNameAlias: 'document'}),
            controlType: 'dataPicker',
            templates: ['java_model', 'react_form'],
        },
        {
            type: 'Date',
            name: 'foundingDate',
            dbName: 'founding_date',
            controlType: 'dateFromTo',
            templates: ['java_model', 'react_search']
        },
        {
            type: 'String',
            name: 'orgCodePath',
            dbName: 'org_code_path',
            controlType: 'text',
            templates: ['java_model']
        },
        {
            type: 'String',
            name: 'orgPath',
            dbName: 'org_path',
            length: 500,
            controlType: 'text',
            templates: ['java_model']
        },
        {
            type: 'Ref',
            name: 'coordinatorId',
            dbName: 'coordinator_id',
            refModel: new BaseRefOne({model: Employee, refId: 'employeeId', refAttrs: ['fullName', 'email'], refNameAlias: 'coordinator'}),
            controlType: 'dataPicker',
            templates: ['java_model', 'react_form'],
        },
        {
            type: 'String',
            name: 'generateOrder',
            dbName: 'generate_order',
            controlType: 'text',
            length: 100,
            templates: ['java_model']
        },
        {
            type: 'Ref',
            name: 'secretaryId',
            dbName: 'secretary_id',
            refModel: new BaseRefOne({model: Employee, refId: 'employeeId', refAttrs: ['fullName', 'email'], refNameAlias: 'secretary'}),
            controlType: 'dataPicker',
            templates: ['java_model', 'react_form'],
        },
        {
            type: 'Ref',
            name: 'authorizationId',
            dbName: 'authorization_id',
            refModel: new BaseRefOne({model: Employee, refId: 'employeeId', refAttrs: ['fullName', 'email'], refNameAlias: 'authorization'}),
            controlType: 'dataPicker',
            templates: ['java_model', 'react_form'],
        },
        {
            type: 'Long',
            name: 'isSignOutVoffice',
            dbName: 'is_sign_out_voffice',
            controlType: 'switch',
            templates: ['java_model', 'react_form']
        },
        {
            type: 'Ref',
            name: 'deputySecretaryId',
            dbName: 'deputy_secretary_id',
            refModel: new BaseRefOne({model: Employee, refId: 'employeeId', refAttrs: ['fullName', 'email'], refNameAlias: 'deputySecretary'}),
            controlType: 'dataPicker',
            templates: ['java_model', 'react_form'],
        },
        {
            type: 'String',
            name: 'deputySecretaryCode',
            dbName: 'deputy_secretary_code',
            controlType: 'text',
            templates: ['java_model']
        },
        {
            type: 'Long',
            name: 'deputySecretaryShowSignImage',
            dbName: 'deputy_secretary_show_sign_image',
            controlType: 'number',
            templates: ['java_model']
        },
        {
            type: 'Long',
            name: 'coChiUy',
            dbName: 'co_chi_uy',
            controlType: 'number',
            templates: ['java_model']
        },
        {
            type: 'Long',
            name: 'partyOrgOrder',
            dbName: 'party_org_order',
            controlType: 'number',
            templates: ['java_model']
        },
        {
            type: 'Ref',
            name: 'organizationId',
            dbName: 'organization_id',
            controlType: 'organization',
            refModel: new BaseRefOne({model: Organization, refId: 'organizationId', refAttrs: ['name'], refNameAlias: 'org'}),
            templates: ['react_search'],
        }
    ];

    constructor() {
        super('party_organization', 'PartyOrganization');
    }
}