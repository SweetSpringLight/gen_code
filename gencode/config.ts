/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { ImpossibleTemplates } from "./gencore/core/Constants";
type ImpossibleConfig = {
    export_dir: string,
    default_flow: ImpossibleTemplates[]
}
export const CONFIG : ImpossibleConfig = {
    export_dir: 'D:\\CTCT\\pro-vt-ctct',
    // export_dir: 'd:\\d2t.soft1\\pro-vt-ctct2',
    // default_flow: ['java_dto', 'java_form', 'java_model', 'java_repository', 'java_repositoryCustom', 'java_controller', 'java_service', 'java_serviceImpl'],
    // default_flow: ['ctct_java_dto', 'ctct_java_form', 'ctct_java_model', 'ctct_java_repository', 'ctct_java_repositoryCustom', 'ctct_java_controller', 'ctct_java_service', 'ctct_java_serviceImpl'],

    default_flow: [
      'angular_index_html', 'angular_index_ts'
    , 'angular_search_html', 'angular_search_ts'
    , 'angular_form_html', 'angular_form_ts'
    , 'angular_import_form'
    , 'angular_service', 'angular_routes_ts' , 'angular_module_ts', 'angular_content_layout_ts' , 'locale_vi', 'angular_constants_ts'],
    // default_flow: ['java_dto', 'java_form', 'java_model', 'java_repository', 'java_repositoryCustom', 'java_controller', 'java_service', 'java_serviceImpl', 'java_sql'],
}