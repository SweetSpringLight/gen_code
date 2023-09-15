/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { UtilsFile } from '../../gencore/core/UtilsFile';
import { BaseModel } from "../../gencore/core/BaseModel";

// module.js
export default function(model: BaseModel) {
    const contentFile = `import { CONFIG } from 'src/Config/app-config';
import { BaseService } from './base.service';
import axios from 'axios';

export class ${model.entityName}Service extends BaseService {
    constructor() {
        super(CONFIG.SERVICE_CODE.POLITICAL, '${model.entityCamelName}');
    }
}

export default new ${model.entityName}Service();
`

UtilsFile.writeFile(`/web-app-political/src/Services/API`, `/${model.entityEntryNameHyphen}.services.ts`, contentFile);
};
