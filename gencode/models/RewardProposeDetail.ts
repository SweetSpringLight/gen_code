import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";
export class RewardProposeDetail extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'rewardProposeDetailId',
            dbName: 'reward_propose_detail_id',
            isPrimaryKey: true,
            length: 20,
            templates: ['java_model', 'react_model']
        },
        {
            type: 'Long',
            name: 'rewardProposeDetailType',
            dbName: 'reward_propose_detail_type',
            controlType: 'text',
            label: 'Loại khen thưởng chi tiết',
            templates: ['java_model', 'react_form', 'react_search', 'react_model']
        },
        {
            type: 'Long',
            name: 'rewardProposeId',
            dbName: 'reward_propose_id',
            length: 20,
            validate: ['required'],
            controlType: 'organization',
            label: 'Đề xuất khen thưởng',
            templates: ['java_model', 'react_form', 'react_search', 'react_model']
        },
        {
            type: 'Long',
            name: 'objectIdViettelMember',
            dbName: 'object_id_viettel_member',
            templates: ['java_model', 'react_model', 'react_form']
        },
        {
            type: 'String',
            name: 'objectNameGuest',
            dbName: 'object_name_guest',
            controlType: 'text',
            length: 255,
            label: 'Tên nhân viên/tổ chức',
            templates: ['java_model', 'react_form', 'react_model']
        },
        {
            type: 'Long',
            name: 'rewardTitleId',
            dbName: 'reward_title_id',
            controlType: 'select',
            label: 'Danh hiệu khen thưởng',
            templates: ['java_model', 'react_form', 'react_model'],
        },
        {
            type: 'String',
            name: 'amountOfMoney',
            dbName: 'amount_of_money',
            controlType: 'text',
            length: 50,
            label: 'Tiền thưởng',
            templates: ['java_model', 'react_list', 'react_model', 'react_form'],
        },
        {
            type: 'String',
            name: 'description',
            dbName: 'description',
            controlType: 'text',
            label: 'Nội dung khen thưởng',
            templates: ['java_model', 'react_list', 'react_model', 'react_form'],
        },
        {
            type: 'String',
            name: 'accountNumber',
            dbName: 'account_number',
            controlType: 'text',
            length: 20,
            label: 'Số tài khoản',
            templates: ['java_model', 'react_list', 'react_model', 'react_form'],
        },
        {
            type: 'String',
            name: 'bank',
            dbName: 'bank',
            controlType: 'text',
            length: 255,
            label: 'Tên ngân hàng',
            templates: ['java_model', 'react_list', 'react_model', 'react_form'],
        },
        {
            type: 'String',
            name: 'personalIdNumber',
            dbName: 'personal_id_number',
            controlType: 'text',
            length: 50,
            label: 'Số cmt/cccd',
            templates: ['java_model', 'react_list', 'react_model', 'react_form'],
        },
        {
            type: 'Date',
            name: 'personalIdIssuedDate',
            dbName: 'personal_id_issued_date',
            controlType: 'date',
            label: 'Ngày cấp',
            templates: ['java_model', 'react_list', 'react_model', 'react_form'],
        },
        {
            type: 'String',
            name: 'personalIdIssuedPlace',
            dbName: 'personal_id_issued_place',
            controlType: 'text',
            length: 200,
            label: 'Nơi cấp',
            templates: ['java_model', 'react_list', 'react_model', 'react_form'],
        },
        {
            type: 'Long',
            name: 'nationId',
            dbName: 'nation_id',
            controlType: 'select',
            length: 20,
            label: 'Quốc tịch',
            templates: ['java_model', 'react_list', 'react_model', 'react_form'],
        },
        {
            type: 'Long',
            name: 'residencyStatus',
            dbName: 'residency_status',
            controlType: 'select',
            label: 'Tình trạng cư trú',
            templates: ['java_model', 'react_list', 'react_model', 'react_form'],
        },
        {
            type: 'Long',
            name: 'addressOrPhone',
            dbName: 'address_or_phone',
            controlType: 'number',
            length: 255,
            label: 'Địa chỉ/ SĐT',
            templates: ['java_model', 'react_list', 'react_model', 'react_form'],
        }
    ];

    constructor() {
        super('reward_propose_detail', 'RewardProposeDetail');
    }
}