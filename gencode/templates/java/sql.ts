/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
 import { BaseModel } from "../../gencore/core/BaseModel";
 import { UtilsColumn } from "../../gencore/core/UtilsColumn";
 import { UtilsFile } from "../../gencore/core/UtilsFile";

// module.js
export default function(model: BaseModel) {
    const primary = model.getPrimary();
    const dbname =  '`' + primary?.dbName + '`'
    let primaryProperty = [`${dbname} ${UtilsColumn.javaTypeSql(primary)}${primary && primary?.length ? `(${primary?.length})` : ''}             NOT NULL AUTO_INCREMENT,`]
    const allColumn = model.getNonePrimarysByTemplate(['java_model']);
    const refList = model.getRef();

    let allColumnProperty = allColumn?.map(e => {
        // console.log(e);

        // if(e?.templates?.includes('java_sql')) {
            let length = e && e.length ? `(${e.length})` : ''
            const dbname =  '`' + e.dbName + '`'
            const comment = e.label ? "COMMENT '" + e.label + "'" : ''
            let type = UtilsColumn.javaTypeSql(e) || ''
            if(UtilsColumn.isRef(e)) {
                for (let i = 0; i < refList.length; i++) {
                    const column = refList[i];
                    const refModel = column.refModel;
                    // const _model = refModel?.getModel();
                    const columnRef = refModel?.getColumDb(refModel?.refId)
                    type = UtilsColumn.javaTypeSql(columnRef) || ''
                    length = (columnRef && columnRef?.length ? `(${columnRef?.length})` : '')
                }
            }
            let s = `       ${dbname}  ${type}${length != '' ? length : ''}             ${UtilsColumn.hasValidate(e, 'required') ? 'NOT' : ''} NULL ${comment} ,`;
            return s;
        // }
    });
    let otherProperty = [
        '       `created_date`   DATETIME      NULL',
        '       `updated_date`   DATETIME      NULL',
        '       `created_by`   VARCHAR(50)     NOT NULL',
        '       `updated_by`   VARCHAR(50)      NULL',
    ]
    allColumnProperty = primaryProperty.concat(allColumnProperty, otherProperty);
    let allColumnStr = allColumnProperty?.join(`\n`);
    const tableName = '`' + model.tableName + '`'
    const contentFile = `CREATE TABLE ${tableName}
    (
        ${allColumnStr}
        PRIMARY KEY (${dbname})
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`
    UtilsFile.writeFile(`/com.viettel.ctct/service-political/src/main/java/com/viettel/crm/repository/sql`, `/${model.entityName}Sql.sql`, contentFile);
}