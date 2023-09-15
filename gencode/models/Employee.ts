/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved. 
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";

export class Employee extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'employeeId',
            dbName: 'employee_id',
            length: 20,
            isPrimaryKey: true,
            templates: ['java_model']
        },
        {
            type: 'String',
            name: 'note',
            dbName: 'note',
            length: 1000,
            controlType: 'textarea',
            templates: ['java_model']
        },
        {
            type: 'Long',
            name: 'noteTypeId',
            dbName: 'note_type_id',
            length: 10,
            templates: ['java_model']
        },
        {
            type: 'String',
            name: 'expressionViolations',
            dbName: 'expression_violations',
            length: 100,
            controlType: 'text',
            templates: ['java_model']
        },
        {
            type: 'String',
            name: 'fullName',
            dbName: 'full_name',
            length: 200,
            controlType: 'text',
            templates: ['java_model']
        },
        {
            type: 'String',
            name: 'employeeCode',
            dbName: 'employee_code',
            length: 200,
            controlType: 'text',
            templates: ['java_model']
        },
        {
            type: 'String',
            name: 'email',
            dbName: 'email',
            length: 200,
            controlType: 'text',
            templates: ['java_model']
        },
        {
            type: 'Date',
            name: 'dateOfBirth',
            dbName: 'date_of_birth',
            length: 200,
            controlType: 'date',
            templates: ['java_model']
        },
        {
            type: 'Long',
            name: 'gender',
            dbName: 'gender',
            length: 200,
            controlType: 'radio',
            templates: ['java_model']
        },
        {
            type: 'String',
            name: 'permanentAddress',
            dbName: 'permanent_address',
            length: 500,
            controlType: 'text',
            templates: ['java_model']
        },
        {
            type: 'String',
            name: 'currentAddress',
            dbName: 'current_address',
            length: 500,
            controlType: 'text',
            templates: ['java_model']
        },
        {
            type: 'String',
            name: 'placeOfBirth',
            dbName: 'place_of_birth',
            length: 500,
            controlType: 'text',
            templates: ['java_model']
        }
    ];

    constructor() {
        super('employee', 'Employee');
    }
}