/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseModel } from "../../gencore/core/BaseModel";
import { AUTHOR, LICENSE_TERMS } from "../../gencore/core/Constants";
import { ImportUtils } from "../../gencore/core/ImportUtils";
import { UtilsColumn } from "../../gencore/core/UtilsColumn";
import { UtilsFile } from "../../gencore/core/UtilsFile";

// module.js
export default function(model: BaseModel) {
    const importUtils = new ImportUtils();
    const primary = model.getPrimary();
    let primaryProperty = [`    private ${UtilsColumn.javaType(primary)} ${primary?.name};`]
    const allColumn = model.getNonePrimarysByTemplate(['react_list', 'react_form', 'java_dto']);
    let allColumnProperty: string[] = [];
    allColumn?.forEach(e => {
        if (UtilsColumn.isRef(e)) {
            const refModel = e.refModel;
            const _model = refModel?.getModel();
            const refAttrs = refModel?.refAttrs;
            if (refModel?.isRefOne()) {
                allColumnProperty.push(`    private ${UtilsColumn.javaType(e)} ${e.name};`);
                if (refAttrs && _model && !refModel.isRefMany()) {
                    refAttrs.forEach(refAttr =>
                        allColumnProperty.push(`    private ${UtilsColumn.javaType2(_model, refAttr)} ${refModel?.getAliasRefName(refAttr)};`)
                    )
                }
            } else {
                const mapControlType = ['multiOrganization', 'multiPartyOrganization']
                if (e.controlType && mapControlType.includes(e.controlType)) {
                    allColumnProperty.push(`    private List<${UtilsColumn.javaType(e).trim()}> ${e.name};`);
                } else {
                    allColumnProperty.push(`    private List<${UtilsColumn.javaRefEntity(e)}DTO> ${e.name};`);
                }
                importUtils.addImport('import java.util.List;');
            }
        } else {
            allColumnProperty.push(`    private ${UtilsColumn.javaType(e)} ${e.name};`);
        }
    });
    allColumnProperty = primaryProperty.concat(allColumnProperty);
let allColumnStr = allColumnProperty?.join(`\n`);

    const contentFile = `${LICENSE_TERMS}

package com.viettel.crm.repository.dto;

import java.util.Date;
${importUtils.toString()}
import lombok.Data;

${AUTHOR}
@Data
public class ${model.entityName}DTO {
${allColumnStr}
}

`
UtilsFile.writeFile(`/com.viettel.ctct/service-political/src/main/java/com/viettel/crm/repository/dto`, `/${model.entityName}DTO.java`, contentFile);
};
