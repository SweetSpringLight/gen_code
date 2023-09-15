/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseModel } from "../../../gencore/core/BaseModel";
import { AUTHOR, LICENSE_TERMS } from "../../../gencore/core/Constants";
import { ImportUtils } from "../../../gencore/core/ImportUtils";
import { UtilsColumn } from "../../../gencore/core/UtilsColumn";
import { UtilsFile } from "../../../gencore/core/UtilsFile";

export default function(model: BaseModel, moduleName?: string) {
    const importUtils = new ImportUtils();
    const primary = model.getPrimary();
    const allColumn = model.getNonePrimarysByTemplate(['angular_search_html', 'angular_form_html', 'java_form']);
    let primaryProperty = [`    private ${UtilsColumn.javaType(primary)} ${primary?.name};`]
    let allColumnProperty: string[] = [];
    allColumn?.forEach(e => {
        if (!UtilsColumn.isRef(e)) {
            if (e.controlType === "multiFile") {
                allColumnProperty.push(`    private List<${UtilsColumn.javaType(e)}> ${e.name};`);
                importUtils.addImport('import org.springframework.web.multipart.MultipartFile;');
            } else {
                allColumnProperty.push(`    private ${UtilsColumn.javaType(e)} ${e.name};`);
                if (e.controlType == 'dateFromTo') {
                    allColumnProperty.push(`    private ${UtilsColumn.javaType(e)} ${e.name}From;`);
                    allColumnProperty.push(`    private ${UtilsColumn.javaType(e)} ${e.name}To;`);
                }
            }
        } else {
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
                    allColumnProperty.push(`    private List<${UtilsColumn.javaRefEntity(e)}Form> ${e.name};`);
                }
                importUtils.addImport('import java.util.List;');
            }
        }
    });
    allColumnProperty = primaryProperty.concat(allColumnProperty);
    let allColumnStr = allColumnProperty?.join(`\n`);

    const contentFile =  `${LICENSE_TERMS}
${importUtils.createPackage('com/viettel/politicalv2/rest/vm')}

import java.util.Date;
${importUtils.toString()}
${AUTHOR}
public class ${model.entityName}Form {
${allColumnStr}

${importUtils.generateGetterAndSetter(allColumnProperty)}
}
`
UtilsFile.writeFile(`/com.viettel.erp/political-service/src/main/java/com/viettel/politicalv2/rest/vm`, `/${model.entityName}Form.java`, contentFile);
};
