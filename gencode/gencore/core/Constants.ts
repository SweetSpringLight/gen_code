/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
export const LICENSE_TERMS = `/*
 * Copyright (C) 2022 Viettel Telecom. All rights reserved. VIETTEL PROPRIETARY/CONFIDENTIAL. Use is
 * subject to license terms.
 */`;
export const AUTHOR = `
/**
 * @author viettel
 * @since 2022
 * @version 2.0
 */`
export const TEMPLATE_TYPE = [
  'java_dto', 'java_form', 'java_model', 'java_repository', 'java_repositoryCustom'
  , 'react_search', 'react_form', 'react-model', 'react_list' , 'angular_form_html', 'ctct_angular_search'
  ,'angular_list_html'];

// export type  ImpossibleTemplates = typeof TEMPLATE_TYPE[number];
export type  ImpossibleTemplates =
  'java_dto' | 'java_form' | 'java_model' | 'java_repository' | 'java_repositoryCustom' | 'java_service' | 'java_serviceImpl'
| 'java_export' | 'java_constants'
| 'react_search' | 'react_form' | 'react_list' | 'react_model' | 'java_controller' | 'react_index' | 'react_service'
| 'react_routes' | 'react_reducers' | 'java_sql' | 'app_config' | 'logined' | 'root_reducer' | 'vn_vi' | 'constants'
| 'ctct_java_form' | 'ctct_java_model' | 'ctct_java_dto' | 'ctct_java_repository' | 'ctct_java_service' | 'ctct_java_controller'
| 'ctct_java_repositoryCustom' | 'ctct_java_serviceImpl'
| 'angular_index_html' | 'angular_index_ts' | 'angular_search_ts' | 'angular_form_ts' | 'angular_import_form' | 'angular_service' | 'angular_routes_ts' | 'angular_module_ts'
| 'angular_content_layout_ts' | 'angular_form_html' | 'angular_constants_ts'
| 'angular_search_html' | 'angular_list_html' | 'locale_vi'
;

/** Danh sách các validate hợp lệ */
export type  ImpossibleValidate = 'required' | 'minlength' | 'maxlength' ;
/** Danh sách control type được phép dùng*/
export type  ImpossibleControlType =
  'text' | 'date' | 'dateFromTo' | 'select' | 'textarea' | 'multiSelect' | 'checkbox'
| 'datetime' | 'dataPicker' | 'radio' | 'switch' | 'number' | 'multiFile'
| 'organization' | 'partyOrganization' | 'listRefMany' | 'selectYearFromTo' | 'selectYear' | 'multiOrganization' | 'multiPartyOrganization' | 'refTable' | 'refInput'
| 'dataPicker';
/** Danh sách kiểu dữ liệu được phép dùng*/
export type  ImpossibleType = 'Long' | 'String' | 'Date' | 'Datetime' | 'Integer' | 'MultipartFile';
/** Kiểu quan hệ*/
export type  ImpossibleRefType = '1-1' | '1-n';
/** Các loại import*/
export type  ImportType = 'DTO' | 'Form' | 'model' | 'service' | 'Repository' | 'RepositoryCustom';

export const MapType = {
    'Long': 'Long   ',
    'String': 'String ',
    'Date': 'Date   ',
    'Datetime': 'Date   ',
    'Integer': 'Integer',
    'Ref': 'Long   ',
    'MultipartFile': 'MultipartFile',
}
export const MapTsType = {
  'Long': 'number',
  'String': 'string',
  'Date': 'Date',
  'Datetime': 'Date',
  'Integer': 'number',
  'Ref': 'number',
  'MultipartFile': 'MultipartFile',
}
export const MapTypeSql = {
  'Long': 'BIGINT',
  'String': 'VARCHAR',
  'Integer': 'INT',
  'Date': 'DATE',
  'Datetime': 'DATETIME',
  'Ref': 'BIGINT',
  'MultipartFile': 'BIGINT   ',
}
export const MapAlign: any = {
  'text': 'left',
  'date': 'center',
  'dateFromTo': 'center',
  'select': 'left',
  'textarea': 'left',
  'datetime': 'center',
  'dataPicker': 'left',
  'radio': 'left',
  'switch': 'left',
  'number': 'left',
  'organization': 'left',
  'partyOrganization': 'left',
  'selectYearFromTo': 'center'
}
export type RefContruction = {
  model: any, refId: string, refAttrs: string[], refNameAlias: string
}
export type ImpossibleOptions = {
  id: string | number | undefined | null,
  name: string | undefined | null,
  className?: string | undefined | null,
}