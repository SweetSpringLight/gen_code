import { BaseColumn } from "../gencore/core/BaseColumn";
import { BaseModel } from "../gencore/core/BaseModel";
import { BaseRefOne } from "../gencore/core/BaseRefOne";
import { Category } from "./Category";
import { Document } from "./Document";
import { Employee } from './Employee';
import { PartyMappingOrg } from './PartyMappingOrg';
import { BaseRefMany } from '../gencore/core/BaseRefMany';
export class Party extends BaseModel {
    public allColumn: BaseColumn[] = [
        {
            type: 'Long',
            name: 'partyOrganizationId',
            dbName: 'party_organization_id',
            length: 10,
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
            label: 'Mã',
            templates: ['java_model', 'react_form', 'react_search', 'react_list']
        },
        {
            type: 'String',
            name: 'name',
            dbName: 'name',
            length: 250,
            validate: ['required'],
            controlType: 'text',
            label: 'Tên',
            templates: ['java_model', 'react_form', 'react_search', 'react_list']
        },
        {
            type: 'Date',
            name: 'effectiveDate',
            dbName: 'effective_date',
            validate: ['required'],
            controlType: 'date',
            label: 'Ngày hiệu lực',
            templates: ['java_model', 'react_form', 'react_list']
        },
        {
            type: 'Date',
            name: 'expritedDate',
            dbName: 'exprited_date',
            controlType: 'date',
            label: 'Ngày hết hiệu lực',
            templates: ['java_model', 'react_list']
        },
        {
            type: 'Ref',
            name: 'parentId',
            dbName: 'parent_id',
            refModel: new BaseRefOne({model: Party, refId: 'partyOrganizationId', refAttrs: ['name'], refNameAlias: 'parent'}),
            controlType: 'partyOrganization',
            label: 'Đảng bộ cấp trên',
            templates: ['java_model', 'react_form'],
        },
        {
            type: 'Ref',
            name: 'type',
            dbName: 'type',
            validate: ['required'],
            refModel: new BaseRefOne({model: Category, refId: 'categoryId', refAttrs: ['name'], refNameAlias: 'type'}),
            controlType: 'select',
            optionLabel: 'name',
            optionValue: 'categoryId',

            label: 'Loại hình tổ chức đảng',
            templates: ['java_model', 'react_form'],
        },
        {
            type: 'Ref',
            name: 'documentId',
            dbName: 'document_id',
            refModel: new BaseRefOne({model: Document, refId: 'documentId', refAttrs: ['name'], refNameAlias: 'document'}),
            controlType: 'dataPicker',
            objectBO: "DocumentBO",
            codeField: "documentNumber",
            nameField: "documentName",
            selectField: "documentId",
            label: 'Số quyết định thành lập Đảng',
            templates: ['java_model', 'react_form'],
        },
        {
            type: 'Date',
            name: 'foundingDate',
            dbName: 'founding_date',
            controlType: 'dateFromTo',
            label: 'Ngày thành lập',
            templates: ['java_model', 'react_search', 'react_list']
        },
        {
            type: 'String',
            name: 'orgCodePath',
            dbName: 'org_code_path',
            length: 250,
            controlType: 'text',
            label: 'Mã code',
            templates: ['java_model']
        },
        {
            type: 'String',
            name: 'orgPath',
            dbName: 'org_path',
            length: 500,
            controlType: 'text',
            label: 'path',
            templates: ['java_model']
        },
        {
            type: 'Ref',
            name: 'coordinatorId',
            dbName: 'coordinator_id',
            label: 'Đầu mối hỗ trợ',
            refModel: new BaseRefOne({model: Employee, refId: 'employeeId', refAttrs: ['fullName', 'email'], refNameAlias: 'coordinator'}),
            controlType: 'dataPicker',
            templates: ['java_model', 'react_form']
        },
        {
            type: 'String',
            name: 'coordinatorEmail',
            label: 'Đầu mối hỗ trợ',
            templates: ['react_model', 'react_list']
        },
        {
            type: 'String',
            name: 'authorizationEmail',
            label: 'Đầu mối nghị quyết',
            templates: ['react_model', 'react_list']
        },
        {
            type: 'String',
            name: 'deputySecretaryEmail',
            label: 'Đầu mối Phó bí thư',
            templates: ['react_model', 'react_list']
        },
        {
            type: 'String',
            name: 'secretaryEmail',
            label: 'Đầu mối Bí thư',
            templates: ['react_model', 'react_list']
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
            label: 'Đầu mối Bí thư',
            templates: ['java_model', 'react_form'],
        },
        {
            type: 'Ref',
            name: 'authorizationId',
            dbName: 'authorization_id',
            refModel: new BaseRefOne({model: Employee, refId: 'employeeId', refAttrs: ['fullName', 'email'], refNameAlias: 'authorization'}),
            controlType: 'dataPicker',
            label: 'Đầu mối nghị quyết',
            templates: ['java_model', 'react_form'],
        },
        {
            type: 'Long',
            name: 'isSignOutVoffice',
            dbName: 'is_sign_out_voffice',
            controlType: 'switch',
            length: 10,
            label: 'Ban hành (Ngoài Voffice)',
            templates: ['java_model', 'react_form', 'react_list']
        },
        {
            type: 'Ref',
            name: 'deputySecretaryId',
            dbName: 'deputy_secretary_id',
            refModel: new BaseRefOne({model: Employee, refId: 'employeeId', refAttrs: ['fullName', 'email'], refNameAlias: 'deputySecretary'}),
            controlType: 'dataPicker',
            label: 'Đầu mối Phó bí thư',
            templates: ['java_model', 'react_form'],
        },
        {
            type: 'String',
            name: 'deputySecretaryCode',
            dbName: 'deputy_secretary_code',
            length: 250,
            controlType: 'text',
            templates: ['java_model']
        },
        {
            type: 'Long',
            name: 'deputySecretaryShowSignImage',
            dbName: 'deputy_secretary_show_sign_image',
            controlType: 'number',
            length: 10,
            label: 'Hiển thị ảnh ký phó bí thư: 0 - Không hiển thị, 1 - Hiển thị',
            templates: ['java_model']
        },
        {
            type: 'Long',
            name: 'coChiUy',
            dbName: 'co_chi_uy',
            controlType: 'number',
            length: 10,
            label: 'Đánh dấu chi bộ cơ sở hoặc chi bộ trực thuộc Có chi ủy',
            templates: ['java_model']
        },
        {
            type: 'Long',
            name: 'partyOrgOrder',
            dbName: 'party_org_order',
            controlType: 'number',
            length: 10,
            label: 'Dùng để fix, sắp xếp thứ tự các tổ chức Đảng bộ/Chi bộ hiển thị trên cây Tổ chức Đảng ',
            templates: ['java_model']
        },
        {
            type: 'Ref',
            name: 'listMappingOrg',
            controlType: 'listRefMany',
            label: 'Danh sách đơn vị trực thuộc',
            validate: ['required'],
            refModel: new BaseRefMany({model: PartyMappingOrg, refId: 'partyOrganizationId', refAttrs: ['organizationId'], refNameAlias: ''}),
            templates: ['java_dto', 'java_form', 'react_form'],
        }
    ];

    constructor() {
        super('party', 'Party');
    }
}