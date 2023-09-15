import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";
export class RewardCategory extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'rewardCategoryId',
            dbName: 'reward_category_id',
            isPrimaryKey: true,
            length: 20,
            templates: ['java_model', 'java_dto', 'java_form', 'react_model']
        },
        {
            type: 'Long',
            name: 'rewardCategoryType',
            dbName: 'reward_category_type',
            validate: ['required'],
            label: 'Loại danh mục',
            templates: ['java_model', 'java_dto', 'java_form', 'react_model']
        },
        {
            type: 'String',
            name: 'code',
            dbName: 'code',
            length: 50,
            label: 'Mã danh mục',
            templates: ['java_model', 'react_form', 'react_search', 'react_model']
        },
        {
            type: 'String',
            name: 'name',
            dbName: 'name',
            length: 200,
            validate: ['required'],
            label: 'Tên danh mục',
            templates: ['java_model', 'react_form', 'react_search', 'react_model']
        },
        {
            type: 'Long',
            name: 'rewardObjectType',
            dbName: 'reward_object_type',
            label: 'Phân loại Đối tượng khen thưởng',
            templates: ['java_model', 'react_form', 'react_search', 'react_model']
        },
        {
            type: 'Long',
            name: 'rewardType',
            dbName: 'reward_type',
            label: 'Phân loại khen thưởng',
            templates: ['java_model', 'react_form', 'react_model', 'react_list']
        },
        {
            type: 'Long',
            name: 'rewardCategory',
            dbName: 'reward_category',
            label: 'Loại khen thưởng',
            templates: ['java_model', 'react_form', 'react_model', 'react_list']
        },
    ];
    constructor() {
        super('reward_category', 'RewardCategory');
    }
}