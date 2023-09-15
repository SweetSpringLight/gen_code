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
    const contentFile = `${LICENSE_TERMS}

package com.viettel.crm.repository;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.viettel.crm.repository.model.${model.entityName};

${AUTHOR}
@Repository
public interface ${model.entityName}Repository extends CrudRepository<${model.entityName}, ${UtilsColumn.javaType(model.getPrimary())}> {
   /**
    * List all ${model.entityName}
    */
    public List<${model.entityName}> findAll();
}
`
UtilsFile.writeFile(`/com.viettel.ctct/service-political/src/main/java/com/viettel/crm/repository`, `/${model.entityName}Repository.java`, contentFile);
};
