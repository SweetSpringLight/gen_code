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
     ;
 let allColumnProperty = model.allColumn?.map(e => {
     return`    private ${UtilsColumn.javaType(e)} ${e.name};`;
 });
 let allColumnStr = allColumnProperty?.join(`
 `);
 
     const contentFile = `${LICENSE_TERMS}
 package com.viettel.politicalv2.service;
 
 import java.util.List;
 
 import javax.servlet.http.HttpServletRequest;
 
 import com.viettel.politicalv2.repository.dto.${model.entityName}DTO;
 import com.viettel.politicalv2.rest.vm.${model.entityName}Form;
 import com.viettel.data.domain.DataTableResults;
 import java.io.File;
 
 ${AUTHOR}
 public interface ${model.entityName}Service {
 
     /**
      * find all ${model.entityName}
      *
      * @return list persisted entity.
      */
     List<${model.entityName}DTO> findAll();
 
     /**
      * Save a ${model.entityName}.
      *
      * @param ${model.entityName}DTO the entity to save.
      * @return the persisted entity.
      */
      ${model.entityName}DTO save(${model.entityName}DTO ${model.entityCamelName}DTO);
 
     /**
      * Save all ${model.entityName}DTO.
      * @param list${model.entityName}DTO
      * @return
      */
     List<${model.entityName}DTO> saveAll(List<${model.entityName}DTO> list${model.entityName}DTO);
 
     /**
      * find one ${model.entityName} detail by id
      * @param ${model.entityCamelName}Id
      * @return
      */
      ${model.entityName}DTO findDetail(Long ${model.entityCamelName}Id);
     /**
      * find one ${model.entityName} by id
      * @param ${model.entityCamelName}Id
      * @return
      */
      ${model.entityName}DTO findById(Long ${model.entityCamelName}Id);
 
     /**
      * Delete a ${model.entityName}.
      *
      * @param ${model.entityCamelName}DTO the entity to delete.
      */
     void delete(${model.entityName}DTO ${model.entityCamelName}DTO);
 
     /**
      * Search ${model.entityName} list pagination
      * @param form
      * @param req
      * @param isExport
      * @return
      */
     DataTableResults<${model.entityName}DTO> search${model.entityName}s(${model.entityName}Form form, HttpServletRequest req,
             boolean isExport);
 
     /**
      * Export data ${model.entityName}
      * @param req
      * @param form
      * @return
      */
     File export${model.entityName}DataTable(HttpServletRequest req, ${model.entityName}Form form) throws Exception;
 
 
     /*************************************/
     /*************************************/
 
 }
 `
 UtilsFile.writeFile(`/com.viettel.erp/political-service/src/main/java/com/viettel/politicalv2/service`, `/${model.entityName}Service.java`, contentFile);
 };
 