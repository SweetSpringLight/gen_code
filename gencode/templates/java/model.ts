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
    const primary = model.getPrimary();
    let primaryProperty = [`
    @Id
    @Column(name = "${primary?.dbName}")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private ${primary?.type} ${primary?.name};`]
    const allColumn = model.getNonePrimaryColumnByTemplate('java_model');
    
    let allColumnProperty = allColumn?.map(e => {
    if (e.isPrimaryKey) {
    return`
    @Id
    @Column(name = "${e.dbName}")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private ${e.type} ${e.name};`;
    } else {
    return`
    @Column(name = "${e.dbName}")
    private ${UtilsColumn.javaType(e)} ${e.name};`;
    }

    });
    allColumnProperty = primaryProperty.concat(allColumnProperty);
    let allColumnStr = allColumnProperty?.join(`\n`);

    const contentFile = `${LICENSE_TERMS}
package com.viettel.crm.repository.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

${AUTHOR}
@Entity
@Table(name = "${model.tableName}")
@Data
public class ${model.entityName} {
${allColumnStr}
}
`
UtilsFile.writeFile(`/com.viettel.ctct/service-political/src/main/java/com/viettel/crm/repository/model`, `/${model.entityName}.java`, contentFile);
};
