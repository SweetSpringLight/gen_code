import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";
import { BaseRefMany } from "../gencore/core/BaseRefMany";
import { BaseRefOne } from "../gencore/core/BaseRefOne";
import { Organization } from "./Organization";
import { RewardProposeDetail } from "./RewardProposeDetail";
export class RewardPropose extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'rewardProposeId',
            dbName: 'reward_propose_id',
            isPrimaryKey: true,
            length: 20,
            templates: ['java_model', 'react_model']
        },
        {
            type: 'String',
            name: 'name',
            dbName: 'name',
            length: 200,
            controlType: 'text',
            validate: ['required'],
            label: 'Tên đề xuất khen thưởng',
            templates: ['java_model', 'react_form', 'react_search', 'react_model', 'react_list', 'java_export', 'angular_form_html']
        },
        {
            type: 'Ref',
            name: 'proposeOrgId',
            dbName: 'propose_org_id',
            length: 20,
            validate: ['required'],
            controlType: 'organization',
            refModel: new BaseRefOne({model: Organization, refId: 'organizationId', refAttrs: ['name'], refNameAlias: 'proposeOrg'}),
            label: 'Đơn vị đề xuất',
            templates: ['java_model', 'react_form', 'react_search', 'react_model', 'angular_form_html']
        },
        {
            type: 'String',
            name: 'proposeOrgName',
            label: 'Đơn vị đề xuất',
            templates: ['react_list', 'java_export']
        },
        {
            type: 'Long',
            name: 'rewardType',
            dbName: 'reward_type',
            controlType: 'select',
            validate: ['required'],
            label: 'Phân loại khen thưởng',
            options: [
                { id: 1, name: "Khen thưởng tổ chức Đảng" },
                { id: 2, name: "Khen thưởng tổ chức Công đoàn" },
                { id: 3, name: "Khen thưởng tổ chức Phụ nữ" },
                { id: 4, name: "Khen thưởng tổ chức Thanh niên" },
                { id: 5, name: "Khen thưởng chính quyền" },
            ],
            templates: ['java_model', 'react_model', 'react_form', 'react_list', 'java_export', 'angular_form_html']
        },
        {
            type: 'Long',
            name: 'periodType',
            dbName: 'period_type',
            controlType: 'select',
            label: 'Kỳ khen thưởng',
            validate: ['required'],
            options: [
                { id: 1, name: "Định kỳ" },
                { id: 2, name: "Đột xuất" },
            ],
            templates: ['java_model', 'react_form', 'react_model', 'react_list', 'java_export', 'angular_form_html']
        },
        {
            type: 'Ref',
            name: 'approvalOrgId',
            dbName: 'approval_org_id',
            controlType: 'organization',
            validate: ['required'],
            refModel: new BaseRefOne({model: Organization, refId: 'organizationId', refAttrs: ['name'], refNameAlias: 'approvalOrg'}),
            label: 'Đơn vị xét duyệt',
            templates: ['java_model', 'react_form', 'react_model', 'react_search', 'angular_form_html'],
        },
        {
            type: 'String',
            name: 'approvalOrgName',
            label: 'Cấp xét duyệt',
            templates: ['react_list', 'java_export']
        },
        {
            type: 'Ref',
            name: 'signOrgId',
            dbName: 'sign_org_id',
            controlType: 'organization',
            validate: ['required'],
            refModel: new BaseRefOne({model: Organization, refId: 'organizationId', refAttrs: ['name'], refNameAlias: 'signOrg'}),
            label: 'Đơn vị trình ký quyết định',
            templates: ['java_model', 'react_form', 'react_model', 'react_search', 'angular_form_html'],
        },
        {
            type: 'String',
            name: 'signOrgName',
            label: 'Đơn vị trình ký quyết định',
            templates: ['react_list', 'java_export']
        },
        {
            type: 'Long',
            name: 'proposeYear',
            dbName: 'propose_year',
            controlType: 'selectYear',
            validate: ['required'],
            label: 'Năm đề xuất',
            templates: ['java_model', 'react_form', 'react_search', 'react_model', 'react_list', 'java_export', 'angular_form_html'],
        },
        {
            type: 'Long',
            name: 'status',
            dbName: 'status',
            controlType: 'select',
            label: 'Trạng thái đề xuất',
            options: [
                { id: 1, name: "Soạn đề xuất", className: 'table-status primary' },
                { id: 2, name: "Chờ xét duyệt", className: 'table-status info'},
                { id: 3, name: "Từ chối xét duyệt" , className: 'table-status info'},
                { id: 4, name: "Đã duyệt xét duyệt", className: 'table-status primary' },
                { id: 5, name: "Soạn trình ký", className: 'table-status primary' },
                { id: 6, name: "Đang trình ký" , className: 'table-status info'},
                { id: 7, name: "Đã duyệt trình ký", className: 'table-status primary' },
                { id: 8, name: "Từ chối trình ký", className: 'table-status primary' }
            ],
            templates: ['java_model', 'react_list', 'react_model', 'java_export'],
        },
        {
            type: 'Date',
            name: 'decisionDate',
            dbName: 'decision_date',
            controlType: 'date',
            label: 'Ngày quyết định',
            templates: ['java_model', 'react_model'],
        },
        {
            type: 'String',
            name: 'note',
            dbName: 'note',
            controlType: 'textarea',
            length: 1000,
            label: 'Ngày quyết định',
            templates: ['java_model', 'react_model'],
        },
        {
            type: 'Ref',
            name: 'lstRewardProposeDetail',
            controlType: 'listRefMany',
            label: 'Danh sach khen thưởng chi tiết',
            validate: ['required'],
            refModel: new BaseRefMany({model: RewardProposeDetail, refId: 'rewardProposeId', refAttrs: ['rewardProposeId'], refNameAlias: ''}),
            templates: ['java_dto', 'java_form', 'react_form', 'react_model', 'angular_form_html'],
        },

    ];

    constructor() {
        super('reward_propose', 'RewardPropose');
    }
}