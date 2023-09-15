/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { UtilsFile } from '../../gencore/core/UtilsFile';
import { BaseModel } from "../../gencore/core/BaseModel";

// module.js
export default function(model: BaseModel) {
    const generateLocale = model?.getNonePrimarysByTemplate(['react_list', 'react_form', 'react_search'])?.map(col => {
        return `"${col.name}": "${col?.label ? col.label : col.name}"`;
    })?.join(`
        , `);
    const contentFile = `{
    "${model.entityCamelName}": {
          "titleSearch": "Tìm kiếm"
        , "titleList": "Danh sách"
        , "titleAdd": "Thêm mới"
        , "titleEdit": "Cập nhật"
        , ${generateLocale}
    }
}
`;

UtilsFile.writeFile(`/web-app-political/src/Pages/${model.entityName}`, `/${model.entityEntryNameHyphen}_vi.json`, contentFile);
};
