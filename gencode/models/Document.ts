/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved. 
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";

export class Document extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'documentId',
            dbName: 'document_id',
            length: 20,
            isPrimaryKey: true,
            templates: ['java_model']

        },
        {
            type: 'String',
            name: 'documentNumber',
            dbName: 'document_number',
            length: 100,
            templates: ['java_model']
        },
        {
            type: 'String',
            name: 'name',
            dbName: 'name',
            length: 200,
            templates: ['java_model']
        },
        {
            type: 'Long',
            name: 'type',
            dbName: 'type',
            length: 20,
            templates: ['java_model']
        },
        {
            type: 'Long',
            name: 'confidentiality',
            dbName: 'confidentiality',
            length: 20,
            templates: ['java_model']
        },
        {
            type: 'Long',
            name: 'documentTypeId',
            dbName: 'document_type_id',
            length: 20,
            templates: ['java_model']
        },
        {
            type: 'Long',
            name: 'branch',
            dbName: 'branch',
            length: 4,
            templates: ['java_model']
        },
        {
            type: 'Long',
            name: 'partyOrganizationId',
            dbName: 'party_organization_id',
            length: 20,
            templates: ['java_model']
        },
        {
            type: 'Long',
            name: 'organizationId',
            dbName: 'organization_id',
            length: 20,
            templates: ['java_model']
        },
        {
            type: 'Long',
            name: 'signerId',
            dbName: 'signer_id',
            length: 20,
            templates: ['java_model']
        },
        {
            type: 'Date',
            name: 'effectiveDate',
            dbName: 'effective_date',
            templates: ['java_model']
        },
        {
            type: 'Date',
            name: 'expritedDate',
            dbName: 'exprited_date',
            templates: ['java_model']
        },
        {
            type: 'Long',
            name: 'isDeleted',
            dbName: 'is_deleted',
            length: 4,
            templates: ['java_model']
        },
        {
            type: 'String',
            name: 'signPerson',
            dbName: 'sign_person',
            length: 200,
            templates: ['java_model']
        }
    ];

    constructor() {
        super('document', 'Document');
    }
}