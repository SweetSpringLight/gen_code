/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved. 
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";
import { BaseRefOne } from "../gencore/core/BaseRefOne";
import { CategoryType } from "./CategoryType";

export class Category extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'categoryId',
            dbName: 'category_id',
            isPrimaryKey: true,
            templates: ['java_controller', 'java_form', 'java_dto', 'java_model', 'java_repository', 'java_repositoryCustom', 'java_service', 'java_serviceImpl']
        },
        {
            type: 'Ref',
            name: 'categoryTypeId',
            dbName: 'category_type_id',
            label: 'Nhóm danh mục',
            refModel: new BaseRefOne({model: CategoryType, refId: 'categoryTypeId', refAttrs: ['name'], refNameAlias: 'categoryType'}),
            templates: ['java_controller', 'java_form', 'java_dto', 'java_model', 'java_repository', 'java_repositoryCustom', 'java_service', 'java_serviceImpl',
            'react_search', 'react_form', 'react_model', 'react_form'],
            controlType: 'select',
            validate:['required']
        },
        {
            type: 'String',
            name: 'code',
            dbName: 'code',
            label: 'Mã danh mục',
            length: 50,
            templates: ['java_controller', 'java_form', 'java_dto', 'java_model', 'java_repository', 'java_repositoryCustom', 'java_service', 'java_serviceImpl',
            'react_search', 'react_form', 'react_list', 'react_model'],
            controlType: 'text',
            validate:['required', 'maxlength']
        },
        {
            type: 'String',
            name: 'name',
            dbName: 'name',
            label: 'Tên danh mục',
            length: 200,
            templates: ['java_controller', 'java_form', 'java_dto', 'java_model', 'java_repository', 'java_repositoryCustom', 'java_service', 'java_serviceImpl',
            'react_search', 'react_form', 'react_list', 'react_model'],
            controlType: 'text',
            validate:['required', 'maxlength']
        },
        {
            type: 'String',
            name: 'categoryTypeName',
            label: 'Nhóm danh mục',
            templates: ['react_list'],
        },
        {
            type: 'Long',
            name: 'sortOrder',
            label: 'Số thứ tự',
            dbName: 'sort_order',
            templates: ['java_controller', 'java_form', 'java_dto', 'java_model', 'java_repository', 'java_repositoryCustom', 'java_service', 'java_serviceImpl',
            'react_form', 'react_list', 'react_model'],
            controlType: 'number'
        },
        {
            type: 'String',
            name: 'description',
            dbName: 'description',
            label: 'Mô tả',
            length: 4000,
            templates: ['java_controller', 'java_form', 'java_dto', 'java_model', 'java_repository', 'java_repositoryCustom', 'java_service', 'java_serviceImpl',
            'react_form', 'react_list', 'react_model'],
            controlType: 'textarea'
        },
        {
            type: 'Date',
            name: 'createdDate',
            dbName: 'created_date',
            templates: ['java_controller', 'java_dto', 'java_model', 'java_repository', 'java_repositoryCustom', 'java_service', 'java_serviceImpl', 'react_model']
        },
        {
            type: 'String',
            name: 'createdBy',
            dbName: 'created_by',
            templates: ['java_controller', 'java_dto', 'java_model', 'java_repository', 'java_repositoryCustom', 'java_service', 'java_serviceImpl']
        }
    ];

    constructor() {
        super('category', 'Category');
    }
}