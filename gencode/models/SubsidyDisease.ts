/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";
import { BaseRefMany } from "../gencore/core/BaseRefMany";
import { SubsidyDiseaseLevel } from "./SubsidyDiseaseLevel";

export class SubsidyDisease extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'subsidyDiseaseId',
            dbName: 'subsidy_disease_id',
            length: 20,
            isPrimaryKey: true,
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql']
        },
        {
            type: 'String',
            name: 'code',
            dbName: 'code',
            length: 200,
            validate: ['required'],
            label: 'Mã bệnh',
            controlType: 'text',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html', 'angular_search_html', 'angular_list_html']
        },
        {
            type: 'String',
            name: 'name',
            dbName: 'name',
            length: 200,
            validate: ['required'],
            label: 'Tên bệnh',
            controlType: 'text',
            templates: ['java_model', 'java_dto', 'java_form', 'java_sql', 'angular_form_html', 'angular_search_html', 'angular_list_html']
        },
        {
            type: 'Ref',
            name: 'listSubsidyDiseaseLevel',
            controlType: 'refInput',
            label: 'Mức độ bệnh',
            validate: ['required'],
            refModel: new BaseRefMany({model: SubsidyDiseaseLevel, refId: 'subsidyDiseaseId', refAttrs: ['subsidyDiseaseId', 'name'], refNameAlias: ''}),
            templates: ['java_dto', 'java_form', 'angular_form_html'],
        },
        {
            type: 'Date',
            name: 'createdDate',
            dbName: 'created_date',
            label: 'Ngày giờ tạo',
            controlType: 'date',
            templates: ['java_model', 'java_sql']
        },
        {
            type: 'String',
            name: 'createdBy',
            dbName: 'created_by',
            label: 'Người tạo',
            controlType: 'text',
            templates: ['java_model', 'java_sql']
        },
        {
            type: 'Date',
            name: 'updatedDate',
            dbName: 'updated_date',
            label: 'Ngày giờ cập nhật',
            controlType: 'date',
            templates: ['java_model', 'java_sql']
        },
        {
            type: 'String',
            name: 'updatedBy',
            dbName: 'updated_by',
            label: 'Người cập nhật',
            controlType: 'text',
            templates: ['java_model', 'java_sql']
        },
    ];

    constructor() {
        super('subsidy_disease', 'SubsidyDisease');
    }
}