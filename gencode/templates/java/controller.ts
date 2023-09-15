/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseModel } from "../../gencore/core/BaseModel";
import { AUTHOR, LICENSE_TERMS } from "../../gencore/core/Constants";
import { UtilsColumn } from "../../gencore/core/UtilsColumn";
import { UtilsFile } from "../../gencore/core/UtilsFile";

// module.js
export default function(model: BaseModel) {
    const primaryColumn = model.getPrimary();
    const contentFile = `${LICENSE_TERMS}
package com.viettel.crm.rest;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.viettel.crm.repository.dto.${model.entityName}DTO;
import com.viettel.crm.rest.vm.${model.entityName}Form;
import com.viettel.crm.service.${model.entityName}Service;
import com.viettel.data.BaseController;
import com.viettel.data.Constants;
import com.viettel.data.Response;
import com.viettel.domain.PermissionChecker;
import com.viettel.exception.PermissionException;
import com.viettel.exception.SysException;
import com.viettel.utils.CommonUtils;
import com.viettel.utils.ObjectMapperUtils;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import java.io.File;
import java.io.FileInputStream;
${AUTHOR}
@Controller
@RequestMapping("/v2/${model.entityEntryNameHyphen}s")
public class ${model.entityName}Controller extends BaseController {
    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
    final String adResouceKey = "resouceCode.${model.entityCamelName}";
    @Autowired
    ${model.entityName}Service ${model.entityCamelName}Service;
    @Autowired
    PermissionChecker permissionChecker;

    /**
    * Search ${model.entityCamelName}s by conditions
    *
    * @param form
    * @return DataTableResults
    * @throws PermissionException
    */
    @GetMapping(path = "/search")
    public @ResponseBody Response search${model.entityName}s(HttpServletRequest req, ${model.entityName}Form form) throws PermissionException {
        if (!permissionChecker.hasPermission("action.view", adResouceKey, req)) {
            LOGGER.warn("PermissionInvalid");
            throw new PermissionException();
        }
        return Response.success().withData(${model.entityCamelName}Service.search${model.entityName}s(form, req, false));
    }

    /**
    * Get one ${model.entityCamelName} by primary Id detail
    *
    * @param ${UtilsColumn.javaType(primaryColumn).trim()} ${primaryColumn?.name}
    * @return Response<${model.entityName}DTO>
    * @throws PermissionException
    */
    @GetMapping(path = "/{${primaryColumn?.name}}")
    private @ResponseBody Response findDetail(HttpServletRequest req, @PathVariable ${UtilsColumn.javaType(primaryColumn).trim()} ${primaryColumn?.name}) throws PermissionException {
        if (!permissionChecker.hasPermission("action.view", adResouceKey, req)) {
            LOGGER.warn("PermissionInvalid");
            throw new PermissionException();
        }
        ${model.entityName}DTO ${model.entityCamelName}DTO = ${model.entityCamelName}Service.findDetail(${primaryColumn?.name});
        if (${model.entityCamelName}DTO == null) {
            return Response.warning(Constants.RESPONSE_CODE.RECORD_DELETED);
        }
        return Response.success().withData(${model.entityCamelName}DTO);
    }

    /**
    * Save or update one ${model.entityCamelName}
    *
    * @param ${model.entityName}Form form
    * @return Response<${model.entityName}DTO>
    */
    @PostMapping
    private @ResponseBody Response saveOrUpdate(HttpServletRequest req, ${model.entityName}Form form) throws PermissionException {
        if (!permissionChecker.hasPermission("action.insert", adResouceKey, req)) {
            LOGGER.warn("PermissionInvalid");
            throw new PermissionException();
        }
        ${model.entityName}DTO ${model.entityCamelName}DTO = ObjectMapperUtils.map(form, ${model.entityName}DTO.class);
        if (CommonUtils.isValidId(${model.entityCamelName}DTO.${UtilsColumn.getter(primaryColumn?.name)}())) {
            //TODO: set updatedDate, updatedBy
        } else {
            //TODO: set createdDate, createdBy
        }
        ${model.entityCamelName}DTO = ${model.entityCamelName}Service.save(${model.entityCamelName}DTO);
        return Response.success(form.${UtilsColumn.getter(primaryColumn?.name)}() != null ? "common.updated": "common.created").withData(${model.entityCamelName}DTO);
    }

    /**
     * Delete one subsidizedPeriod
     *
     * @param Long ${primaryColumn?.name}
     * @return Response
     */
     @DeleteMapping(path = "/{${primaryColumn?.name}}")
     private @ResponseBody Response delete(HttpServletRequest req, @PathVariable Long ${primaryColumn?.name}) throws PermissionException {
         if (!permissionChecker.hasPermission("action.delete", adResouceKey, req)) {
             LOGGER.warn("PermissionInvalid");
             throw new PermissionException();
         }
         ${model.entityName}DTO ${model.entityCamelName}DTO = ${model.entityCamelName}Service.findById(${primaryColumn?.name});
         if (${model.entityCamelName}DTO == null) {
             return Response.warning(Constants.RESPONSE_CODE.RECORD_DELETED);
         }
         ${model.entityCamelName}Service.delete(${model.entityCamelName}DTO);
         return Response.success(Constants.RESPONSE_CODE.DELETE_SUCCESS);
    }

    /**
    * Export ${model.entityCamelName}s by conditions
    * @param req
    * @param form
    * @return InputStreamResource
    * @throws SysException, Exception
    */
    @GetMapping(path = "/export")
    public @ResponseBody ResponseEntity<InputStreamResource> export${model.entityName}sData(HttpServletRequest req, ${model.entityName}Form form) throws SysException, Exception {
        if (!permissionChecker.hasPermission("action.export", adResouceKey, req)) {
            LOGGER.warn("PermissionInvalid");
            throw new PermissionException();
        }
        File fileExport = ${model.entityCamelName}Service.export${model.entityName}DataTable(req, form);
        InputStreamResource resource = new InputStreamResource(new FileInputStream(fileExport));
        return ResponseEntity.ok()
            // Content-Disposition
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + fileExport.getName())
            // Content-Type
            .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
            // Contet-Length
            .contentLength(fileExport.length()) //
            .body(resource);
    }
}

`
UtilsFile.writeFile(`/com.viettel.ctct/service-political/src/main/java/com/viettel/crm/rest`, `/${model.entityName}Controller.java`, contentFile);
};
