import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";
export class PartyTermination extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'partyTerminationId',
            dbName: 'party_termination_id',
            isPrimaryKey: true,
            templates: ['java_model', 'react_model']
        },
        {
            type: 'Long',
            name: 'party_organization_Id',
            dbName: 'party_organization_Id',
            length: 100,
            controlType: 'text',
            templates: ['java_model', 'react_form', 'react_search', 'react_model']
        },
        {
            type: 'Long',
            name: 'document_Id',
            dbName: 'document_Id',
            length: 250,
            validate: ['required'],
            controlType: 'text',
            templates: ['java_model', 'react_form', 'react_search', 'react_model']
        },
        {
            type: 'Long',
            name: 'reason',
            dbName: 'reason',
            controlType: 'select',
            templates: ['java_model', 'react_form', 'react_model']
        },
        {
            type: 'Date',
            name: 'effective_date',
            dbName: 'effective_date',
            controlType: 'date',
            templates: ['java_model', 'react_model']
        },
        {
            type: 'Date',
            name: 'expired_date',
            dbName: 'expired_date',
            controlType: 'date',
            templates: ['java_model', 'react_form', 'react_model'],
        }
    ];

    constructor() {
        super('party_termination', 'PartyTermination');
    }
}