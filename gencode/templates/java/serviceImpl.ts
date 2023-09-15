/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseColumn } from "../../gencore/core/BaseColumn";
import { BaseModel } from "../../gencore/core/BaseModel";
import { AUTHOR, LICENSE_TERMS } from "../../gencore/core/Constants";
import { ImportUtils } from "../../gencore/core/ImportUtils";
import { UtilsColumn } from "../../gencore/core/UtilsColumn";
import { UtilsFile } from "../../gencore/core/UtilsFile";

// module.js
export default function(model: BaseModel) {
    const importUtils = new ImportUtils();
    const columnExport = model.getNonePrimaryColumnByTemplate('java_export');
    const repositoryList = [`${model.entityName}`];
    const serviceList: string[] = [];

    const primary = model.getPrimary();
    const refOneList = model.getRefOneList();
    const refManyList = model.getRefManyList();
    const getsetReference11 = function() {
        const lines: string[] = [];
        const variables = [`${primary?.name}`];
        for  (let i = 0; i < refOneList.length; i++) {
            const col = refOneList[i];
            const refModel = col.refModel?.getModel();
            if (!col.name || !refModel || variables.includes(col.name)) {
                continue;
            } else {
                lines.push(`        ${UtilsColumn.javaType(col).trim()} ${col.name} = ${model.entityCamelName}DTO.${UtilsColumn.getter(col.name)}();`);
                variables.push(col.name);
            }
            if (refModel.entityName && !repositoryList.includes(refModel?.entityName)) {
                repositoryList.push(refModel.entityName);
            }
            const camelEntityName = UtilsColumn.jsLCfirst(refModel.entityName || '');
            const entityElement = `${camelEntityName}${UtilsColumn.jsUcfirst(col.refModel?.refNameAlias || '')}`;
            lines.push(`        if (CommonUtils.isValidId(${col.name})) {`);
            lines.push(`            ${refModel.entityName} ${entityElement} = ${camelEntityName}Repository.findById(${col.name}).orElse(null);`);
            lines.push(`            if(${entityElement} != null) {`);
            col.refModel?.refAttrs?.forEach(refAttr => {
                lines.push(`                ${model.entityCamelName}DTO.${UtilsColumn.setter(col.refModel?.getAliasRefName(refAttr) || '')}(${entityElement}.${UtilsColumn.getter(refAttr)}());`);
            })
            lines.push(`            }`);
            lines.push(`        }`);
            lines.push(``);
        }
        return lines.join('\n');
    }
    const getsetReference11Str = getsetReference11();
    const autowiredRepository = function() {
        const lines : string[] = [];
        repositoryList.forEach(entityName => {
            lines.push(`    @Autowired`);
            lines.push(`    private ${entityName}Repository ${UtilsColumn.jsLCfirst(entityName)}Repository;`);
        })
        return lines.join('\n');
    }
    const autowiredService = function() {
        const lines : string[] = [];
        serviceList.forEach(entityName => {
            lines.push(`    @Autowired`);
            lines.push(`    private ${entityName}Service ${UtilsColumn.jsLCfirst(entityName)}Service;`);
        })
        return lines.join('\n');
    }
    const importRepository = function() {
        const lines : string[] = [];
        repositoryList.forEach(entityName => {
            lines.push(`import com.viettel.crm.repository.${entityName}Repository;`);
        })
        return lines.join('\n');
    }
    const importService = function() {
        const lines : string[] = [];
        serviceList.forEach(entityName => {
            lines.push(`import com.viettel.crm.service.${entityName}Service;`);
        })
        return lines.join('\n');
    }
    const importEntity = function() {
        const lines : string[] = [];
        repositoryList.forEach(entityName => {
            lines.push(`import com.viettel.crm.repository.model.${entityName};`);
        })
        return lines.join('\n');
    }


    const mapMultiControlType = ['multiOrganization', 'multiPartyOrganization']
    const getsetReference1n = function() {
        const lines: string[] = [];
        for  (let i = 0; i < refManyList.length; i++) {
            const col = refManyList[i];
            const refModel = col.refModel?.getModel();
            if (refModel?.entityName && !repositoryList.includes(refModel?.entityName)) {
                serviceList.push(refModel.entityName);
            }

            if (col.controlType && mapMultiControlType.includes(col.controlType)) {

                const nameReferenceId = col.refModel && col.refModel.refAttrs ? col.refModel.refAttrs[0] : 'id';
                lines.push(`        List<${refModel?.entityName}DTO> ${col.name} = ${refModel?.entityCamelName}Service.findBy${UtilsColumn.jsUcfirst(col.refModel?.refId || '')}(${primary?.name});`)
                lines.push(`        if (!CommonUtils.isNullOrEmpty(${col.name})) {`)
                lines.push(`            List<Long> listIds = new ArrayList<>();`)
                lines.push(`            ${col.name}.forEach(e -> listIds.add(e.${UtilsColumn.getter(nameReferenceId)}()));`)
                lines.push(`            ${model.entityCamelName}DTO.${UtilsColumn.setter(col?.name  || '')}(listIds);`)
                lines.push(`        }`)
            } else {
                lines.push(`        ${model.entityCamelName}DTO.${UtilsColumn.setter(col?.name  || '')}(${refModel?.entityCamelName}Service.findBy${UtilsColumn.jsUcfirst(col.refModel?.refId || '')}(${primary?.name}));`)
            }
        }
        return lines.join('\n');
    }
    const getsetReference1nStr = getsetReference1n();

    const importDto: string[] = []
    const saveManyList = function() {
        const lines: string[] = [];
        for  (let i = 0; i < refManyList.length; i++) {
            const col = refManyList[i];
            const refModel = col.refModel?.getModel();
            if (col.controlType && mapMultiControlType.includes(col.controlType)) {
                importDto.push(`import java.util.ArrayList;`);
                const nameReferenceId = col.refModel && col.refModel.refAttrs ? col.refModel.refAttrs[0] : 'id';
                lines.push(`        // save relation ${col.name}`);
                lines.push(`        List<${UtilsColumn.javaType(col)}> ${col.name} = ${model.entityCamelName}DTO.${UtilsColumn.getter(col?.name  || '')}();`);
                lines.push(`        if (!CommonUtils.isNullOrEmpty(${col.name})) {`);
                lines.push(`            List<${refModel?.entityName}DTO> listDTO = new ArrayList<>();`);
                importDto.push(`import com.viettel.crm.repository.dto.${refModel?.entityName}DTO;`);
                lines.push(`            for (${UtilsColumn.javaType(col)} ${nameReferenceId}: ${col.name}) {`);
                lines.push(`                ${refModel?.entityName}DTO dto = new ${refModel?.entityName}DTO();`);
                lines.push(`                dto.${UtilsColumn.setter(primary?.name  || '')}(${model.entityCamelName}.${UtilsColumn.getter(primary?.name  || '')}());`);
                lines.push(`                dto.${UtilsColumn.setter(nameReferenceId)}(${nameReferenceId});`);
                lines.push(`                listDTO.add(dto);`);
                lines.push(`            }`);
                repositoryList.push(`${refModel?.entityName}`);
                lines.push(`            ${refModel?.entityCamelName}Repository.deleteBy${UtilsColumn.jsUcfirst(primary?.name  || '')}(${model.entityCamelName}.${UtilsColumn.getter(primary?.name  || '')}());`);
                lines.push(`            ${refModel?.entityCamelName}Service.saveAll(listDTO);`);
                importDto.push(`import com.viettel.crm.service.${refModel?.entityName}Service;`);

            } else {
                lines.push(`        // save relation ${col.name}`);
                lines.push(`        List<${refModel?.entityName}DTO> ${col.name} = ${model.entityCamelName}DTO.${UtilsColumn.getter(col?.name  || '')}();`);
                importDto.push(`import com.viettel.crm.repository.dto.${refModel?.entityName}DTO;`)
                lines.push(`        if (!CommonUtils.isNullOrEmpty(${col.name})) {`);
                lines.push(`            for (${refModel?.entityName}DTO dto: ${col.name}) {`);
                lines.push(`                dto.set${UtilsColumn.jsUcfirst(col.refModel?.refId || '')}(${model.entityCamelName}.get${UtilsColumn.jsUcfirst(col.refModel?.refId || '')}());`);
                lines.push(`            }`);
                lines.push(`            ${col.name} = ${refModel?.entityCamelName}Service.saveAll(${col.name});`);
            }
            lines.push(`        }`);
        }
        lines.push(`        ${model.entityCamelName}DTO = ObjectMapperUtils.map(${model.entityCamelName}, ${model.entityName}DTO.class);`);

        for  (let i = 0; i < refManyList.length; i++) {
            const col = refManyList[i];
            lines.push(`        ${model.entityCamelName}DTO.${UtilsColumn.setter(col?.name  || '')}(${col.name});`);
        }
        lines.push(`        return ${model.entityCamelName}DTO;`);
        return lines.join('\n');
    }
    const saveManyListStr = saveManyList();

    const importConstants = () => {
        columnExport?.forEach(column => {
            const hasOption = column?.controlType == 'select' && column?.options?.length;
            if (hasOption) {
                const costName = model.entityName?.concat(`${UtilsColumn.jsUcfirst(column?.name || '')}`);
                importUtils.addImport(`import com.viettel.data.Constants.${costName};`);
            }
        });
        return importUtils.toString();
    }

    const exactExportColumn = (column: BaseColumn, index: number) => {
        let str = "";
        const costName = model.entityName?.concat(`${UtilsColumn.jsUcfirst(column?.name || '')}`);

        str += `String ${column?.name} = ${costName}.findByValue(CommonUtils.NVL(dto.${UtilsColumn.getter(column.name)}()));\n`;
        str += `                if (${column?.name} != null) {\n`;
        str += `                    dynamicExport.setEntry(${column?.name}, ${++index}, rowNumber); //${column?.label}\n`;
        str += `                }`;
        return str;
    }
    const contentFile = `${LICENSE_TERMS}
package com.viettel.crm.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

${importRepository()}
import com.viettel.crm.repository.dto.${model.entityName}DTO;
${importDto.join('\n')}
import com.viettel.crm.repository.impl.${model.entityName}RepositoryCustom;
${importEntity()}
import com.viettel.crm.rest.vm.${model.entityName}Form;
import com.viettel.crm.service.${model.entityName}Service;
${importService()}
import com.viettel.data.DataTableResults;
import com.viettel.utils.CommonUtils;
import com.viettel.utils.ObjectMapperUtils;
import java.io.File;
import com.viettel.data.common.DynamicExport;
import com.viettel.config.TemplateResouces;
import com.viettel.utils.ExportUtils;
import org.apache.commons.collections4.CollectionUtils;
import com.viettel.exception.SysException;
${importConstants()}
${AUTHOR}
@Service
public class ${model.entityName}ServiceImpl implements ${model.entityName}Service {
    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
${autowiredRepository()}
    @Autowired
    private ${model.entityName}RepositoryCustom ${model.entityCamelName}RepositoryCustom;
${autowiredService()}

    /**
     * @see com.viettel.crm.service.${model.entityName}Service#findAll
     */
    @Override
    public List<${model.entityName}DTO> findAll() {
        List<${model.entityName}> list = ${model.entityCamelName}Repository.findAll();
        return ObjectMapperUtils.mapAll(list, ${model.entityName}DTO.class);
    }

    /**
     * @see com.viettel.crm.service.${model.entityName}Service#findDetail
     */
    @Override
    public ${model.entityName}DTO findDetail(Long ${primary?.name}) {
        ${model.entityName} ${model.entityCamelName} = ${model.entityCamelName}Repository.findById(${primary?.name}).orElse(null);
        if (${model.entityCamelName} == null) {
            return null;
        }
        ${model.entityName}DTO ${model.entityCamelName}DTO = ObjectMapperUtils.map(${model.entityCamelName}, ${model.entityName}DTO.class);
${getsetReference11Str}
${getsetReference1nStr}
        return ${model.entityCamelName}DTO;
    }
    /**
     * @see com.viettel.crm.service.${model.entityName}Service#findById
     */
    @Override
    public ${model.entityName}DTO findById(Long ${primary?.name}) {
        ${model.entityName} ${model.entityCamelName} = ${model.entityCamelName}Repository.findById(${primary?.name}).orElse(null);
        if (${model.entityCamelName} != null) {
            ${model.entityName}DTO ${model.entityCamelName}DTO = ObjectMapperUtils.map(${model.entityCamelName}, ${model.entityName}DTO.class);
            return ${model.entityCamelName}DTO;
        }
        return null;
    }

    /**
     * @see com.viettel.crm.service.${model.entityName}Service#save
     */
    @Override
    @Transactional
    public ${model.entityName}DTO save(${model.entityName}DTO ${model.entityCamelName}DTO) {
        ${model.entityName} ${model.entityCamelName} = ObjectMapperUtils.map(${model.entityCamelName}DTO, ${model.entityName}.class);
        ${model.entityCamelName} = ${model.entityCamelName}Repository.save(${model.entityCamelName});
${saveManyListStr}
    }

    /**
     * @see com.viettel.crm.service.${model.entityName}Service#saveAll
     */
    @Override
    @Transactional
    public List<${model.entityName}DTO> saveAll(List<${model.entityName}DTO> list${model.entityName}DTO) {
        List<${model.entityName}DTO> returnList = new ArrayList<>();
        if (CommonUtils.isNullOrEmpty(list${model.entityName}DTO)) {
            return returnList;
        }
        list${model.entityName}DTO.forEach(dto -> {
            returnList.add(save(dto));
        });
        return returnList;
    }

    /**
     * @see com.viettel.crm.service.${model.entityName}Service#delete
     */
    @Override
    @Transactional
    public void delete(${model.entityName}DTO ${model.entityCamelName}DTO) {
        ${model.entityName} ${model.entityCamelName} = ObjectMapperUtils.map(${model.entityCamelName}DTO, ${model.entityName}.class);
        ${model.entityCamelName}Repository.delete(${model.entityCamelName});
    }

    /**
     * @see com.viettel.crm.service.${model.entityName}Service#search${model.entityName}s
     */
    @Override
    public DataTableResults<${model.entityName}DTO> search${model.entityName}s(${model.entityName}Form form,
            HttpServletRequest req, boolean isExport) {
        return ${model.entityCamelName}RepositoryCustom.search${model.entityName}s(form, req, isExport);
    }

    /**
     * @see com.viettel.crm.service.${model.entityName}Service#export${model.entityName}DataTable
     */
    @Override
    public File export${model.entityName}DataTable(HttpServletRequest req, ${model.entityName}Form form) throws Exception, SysException {
        final String PATH_FILE_REPORT = "${model.entityCamelName}/template_${model.tableName}.xlsx";
        DynamicExport dynamicExport = new DynamicExport(TemplateResouces.getReportFile(PATH_FILE_REPORT), 0, true);
        DataTableResults<${model.entityName}DTO> resultList = search${model.entityName}s(form, req, true);

        int startRow = 3;
        int rowNumber = startRow;
        int numberOrColumn = 9;
        int stt = 0;

        ExportUtils exportUtils = new ExportUtils(dynamicExport, startRow, numberOrColumn);
        exportUtils.removeConfigRow(dynamicExport);
        List<${model.entityName}DTO> list${model.entityName} = resultList.getData();
        if (!CollectionUtils.isEmpty(list${model.entityName})) {
            for (${model.entityName}DTO dto : list${model.entityName}) {
                dynamicExport.setEntry(String.valueOf(++stt), 0, rowNumber); // STT
                ${ columnExport?.map((column, index) => {
                    const hasOption = column?.controlType == 'select' && column?.options?.length;
                    if (hasOption) {
                        return exactExportColumn(column, index);
                    }
                    return `dynamicExport.setEntry(${UtilsColumn.javaType(column).trim() != 'String' ? `String.valueOf(dto.${UtilsColumn.getter(column.name)}())`: `dto.${UtilsColumn.getter(column.name)}()`}, ${++index}, rowNumber); //${column?.label}`;
                }).join(`
                `)}
                rowNumber++;
            }
            dynamicExport.setCellFormat(startRow - 1, 0, dynamicExport.getLastRow() + rowNumber, numberOrColumn, DynamicExport.BLACK_BORDER_FORMAT);
        }
        String fileName = dynamicExport.exportFile("ctct_export_${model.tableName}", req);
        File file = new File(fileName);
        return file;
    }

    /*****************************************************************************/
    /*****************************************************************************/

}
`
UtilsFile.writeFile(`/com.viettel.ctct/service-political/src/main/java/com/viettel/crm/service/impl`, `/${model.entityName}ServiceImpl.java`, contentFile);
};
