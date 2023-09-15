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
    const contentFile = `${LICENSE_TERMS}

package com.viettel.politicalv2.repository;


import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.viettel.politicalv2.repository.model.${model.entityName};

${AUTHOR}
@Repository
public interface ${model.entityName}Repository extends CrudRepository<${model.entityName}, ${UtilsColumn.javaType(model.getPrimary()).trim()}> {
   /**
    * List all ${model.entityName}
    */
    public List<${model.entityName}> findAll();
}
`
UtilsFile.writeFile(`/com.viettel.erp/political-service/src/main/java/com/viettel/politicalv2/repository`, `/${model.entityName}Repository.java`, contentFile);
};
