/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

 import { BaseModel } from "../../../gencore/core/BaseModel";
 import { AUTHOR, LICENSE_TERMS } from "../../../gencore/core/Constants";
 import { UtilsColumn } from "../../../gencore/core/UtilsColumn";
 import { UtilsFile } from "../../../gencore/core/UtilsFile";
 import { ImportUtils } from "../../../gencore/core/ImportUtils";
 
 // module.js
 export default function(model: BaseModel, moduleName?: string) {
     const importUtils = new ImportUtils();
     const primary = model.getPrimary();
     const allColumns: string[] = [];
     let primaryProperty = [`
     @Id
     @Column(name = "${primary?.dbName}")
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private ${primary?.type} ${primary?.name};`
     ];
     allColumns.push(`private ${primary?.type} ${primary?.name};`);
     const allColumn = model.getNonePrimaryColumnByTemplate('java_model');
 
     let allColumnProperty = allColumn?.map(e => {
     if (e.isPrimaryKey) {
         allColumns.push(`private ${e.type} ${e.name};`);
         return`
     @Id
     @Column(name = "${e.dbName}")
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private ${e.type} ${e.name};`;
     } else {
         allColumns.push(`private ${UtilsColumn.javaType(e)} ${e.name};`);
         return`
     @Column(name = "${e.dbName}")
     private ${UtilsColumn.javaType(e)} ${e.name};`;
     }
 
     });
     allColumnProperty = primaryProperty.concat(allColumnProperty);
     let allColumnStr = allColumnProperty?.join(`\n`);
 
     const contentFile = `${LICENSE_TERMS}
 ${importUtils.createPackage('com/viettel/politicalv2/repository/model')}
 
 import java.util.Date;
 import javax.persistence.Column;
 import javax.persistence.Entity;
 import javax.persistence.GeneratedValue;
 import javax.persistence.GenerationType;
 import javax.persistence.Id;
 import javax.persistence.Table;
 
 ${AUTHOR}
 @Entity
 @Table(name = "${model.tableName}")
 public class ${model.entityName} {
 ${allColumnStr}
 
 ${importUtils.generateGetterAndSetter(allColumns)}
 }
 `
 UtilsFile.writeFile(`/com.viettel.erp/political-service/src/main/java/com/viettel/politicalv2/repository/model`, `/${model.entityName}.java`, contentFile);
 };
 