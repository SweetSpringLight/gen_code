/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";

export class CatAllowance extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'id',
            dbName: 'id',
            isPrimaryKey: true,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'react_model']
        },
        {
            type: 'String',
            name: 'name',
            dbName: 'name',
            length: 200,
            validate: ['required'],
            label: 'Tên loại trợ cấp',
            templates: ['java_model', 'react_form']
        },
        {
            type: 'String',
            name: 'subject',
            dbName: 'subject',
            controlType: 'radio',
            label: 'Tên loại trợ cấp',
            templates: ['java_model', 'react_form']
        },
        {
            type: 'String',
            name: 'gender',
            dbName: 'gender',
            controlType: 'radio',
            label: 'Giới tính',
            templates: ['java_model', 'react_form']
        },
        {
            type: 'String',
            name: 'scope',
            dbName: 'scope',
            controlType: 'select',
            label: 'Phạm vi',
            templates: ['java_model', 'react_form']
        },
        {
            type: 'String',
            name: 'isReceiveManyTimes',
            dbName: 'is_receive_many_times',
            controlType: 'radio',
            label: 'Nhận nhiều lần',
            templates: ['java_model', 'react_form']
        },
        {
            type: 'Long',
            name: 'isActive',
            dbName: 'is_active',
            controlType: 'radio',
            label: 'Hoạt động',
            templates: ['java_model', 'react_form']
        },
    ];

    constructor() {
        super('cat_allowance', 'CatAllowance');
    }
}