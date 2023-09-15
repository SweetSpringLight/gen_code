/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseModel } from "../../../gencore/core/BaseModel";
import { AUTHOR, LICENSE_TERMS } from "../../../gencore/core/Constants";
import { UtilsColumn } from "../../../gencore/core/UtilsColumn";
import { UtilsFile } from "../../../gencore/core/UtilsFile";

// module.js
export default function(model: BaseModel, moduleName?: string) {
    const primary = model.getPrimary();
    const allColumnSearchConditions = model.getNonePrimarysByTemplate(['angular_search_html']);
    const allColumn = model.getNonePrimarysByTemplate(['angular_search_html', 'angular_list_html']);

    let selects = allColumn?.map(e => {
        const s =  `        sql += "        ,${model.alias()}.${e.dbName} As ${e.name} ";`;
        return s;
    });
    selects = [`        sql += "         ${model.alias()}.${primary?.dbName} As ${primary?.name} ";`].concat(selects);
    const refOneList = model.getRefOneList();
    for (let i = 0; i < refOneList.length; i++) {
        const column = refOneList[i];
        const refModel = column.refModel;
        const _model = refModel?.getModel();
        const refAttrs = refModel?.refAttrs;
        if (!refAttrs) {
            continue;
        }
        refAttrs.forEach(refAttr =>
            selects?.push(`        sql += "        ,${_model?.alias(i+1)}.${refModel.getColumDbName(refAttr)} As ${refModel?.getAliasRefName(refAttr)} ";`)
        )
    }
    const selectStr = selects?.join('\n');

    const froms: string[] = [];
    froms.push(`        sql += "       FROM ${model.tableName} ${model.alias()} ";`);
    for (let i = 0; i < refOneList.length; i++) {
        const column = refOneList[i];
        const refModel = column.refModel;
        const _model = refModel?.getModel();
        const s =  `        sql += "       ${UtilsColumn.hasValidate(column, 'required') ? 'INNER': 'LEFT'} JOIN ${_model?.tableName} ${_model?.alias(i+1)} ON ${_model?.alias(i+1)}.${refModel?.getColumDbName(refModel?.refId)} = ${model.alias()}.${column.dbName} ";`;
        froms?.push(s);
    }
    const fromStr = froms?.join('\n');

    const filter1Controls = ['text', 'radio', 'switch', 'textarea', 'select', 'dataPicker'];
    const filter2Controls = ['date', 'datetime'];
    const filter3Controls = ['dateFromTo'];
    const conditions = allColumnSearchConditions.map(e => {
        let s = '';
        if (!e.controlType) {
            return s;
        }
        if (filter1Controls.includes(e.controlType)) {
            s = `
        // search by ${e.name}
        CommonUtil.filter(form.${UtilsColumn.getter(e.name)}(), strCondition, paramList, "${model.alias()}.${e.dbName}");`;
        } else if (filter3Controls.includes(e.controlType)) {
            s = `
        // search by ${e.name}From and ${e.name}To
        CommonUtil.filterFromTo(form.${UtilsColumn.getter(e.name)}From(), form.${UtilsColumn.getter(e.name)}To(), strCondition, paramList, "${model.alias()}.${e.dbName}");`

        }
        return s;
    });

    const conditionStr = conditions.join('\n');

    const contentFile = `${LICENSE_TERMS}

package com.viettel.politicalv2.repository.impl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.viettel.politicalv2.repository.dto.${model.entityName}DTO;
import com.viettel.politicalv2.rest.vm.${model.entityName}Form;
import com.viettel.data.domain.DataTableResults;
import com.viettel.data.domain.RepositoryCustomUtils;
import com.viettel.data.common.CommonUtil;

${AUTHOR}
@Repository
public class ${model.entityName}RepositoryCustom extends RepositoryCustomUtils {
    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
    /**
    * search${model.entityName}s
    *
    * @param form
    * @param req
    * @param isExport
    * @return
    */
    public DataTableResults<${model.entityName}DTO> search${model.entityName}s(${model.entityName}Form form, HttpServletRequest req, boolean isExport) {
        List<Object> paramList = new ArrayList<>();

        String sql = " SELECT ";
${selectStr}
${fromStr}
        StringBuilder strCondition = new StringBuilder(" WHERE 1 = 1  ");
${conditionStr}
        String orderBy = " ORDER BY ${model.alias()}.${primary?.dbName} DESC";
        if (!isExport) {
            return findPaginationQuery(req, sql + strCondition.toString(), orderBy, paramList, ${model.entityName}DTO.class);
        }
        return findPaginationQuery(req, sql + strCondition.toString(), orderBy, paramList, ${model.entityName}DTO.class,
                Integer.MAX_VALUE);
    }
}

`
UtilsFile.writeFile(`/com.viettel.erp/political-service/src/main/java/com/viettel/politicalv2/repository/impl`, `/${model.entityName}RepositoryCustom.java`, contentFile);
};
