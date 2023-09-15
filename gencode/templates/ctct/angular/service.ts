/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
*/

import { BaseModel } from "../../../gencore/core/BaseModel";
import { UtilsFile } from "../../../gencore/core/UtilsFile";
import { CONFIG } from "../../../config";
// module.js
export default function(model: BaseModel, moduleName?: string) {
    const isGenImport = CONFIG.default_flow.includes('angular_import_form');
    const hasAttachment = model?.allColumn?.some(col => col?.controlType === "multiFile");
    const dynamicFunction: string[] = [];
    if (isGenImport) {
        dynamicFunction.push('public downloadTemplateImport(data): Observable<any> {');
        dynamicFunction.push('       const url = `${this.serviceUrl}/export-template`;');
        dynamicFunction.push('       return this.getRequest(url, { params: data, responseType: "blob" });');
        dynamicFunction.push('    }');
        dynamicFunction.push('    public processImport(data): Observable<any> {');
        dynamicFunction.push('        const url = `${this.serviceUrl}/import`;');
        dynamicFunction.push('        const formdata = CommonUtils.convertFormFile(data);');
        dynamicFunction.push('        return this.postRequest(url, formdata);');
        dynamicFunction.push('    }');
    }
    if (hasAttachment) {
        dynamicFunction.push('\n    public saveOrUpdate(formData): Observable<any> {');
        dynamicFunction.push('        formData = CommonUtils.convertFormFile(formData);');
        dynamicFunction.push('        return this.postRequest(this.serviceUrl, formData);');
        dynamicFunction.push('    }');
    }
    const contentFile = `
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonUtils } from '@app/shared/services';
import { HelperService } from '@app/shared/services/helper.service';
import { Observable } from 'rxjs';
import { BasicService } from '../basic.service';
@Injectable({
    providedIn: 'root'
})
export class ${model.entityName}Service extends BasicService {
    constructor(public httpClient: HttpClient, public helperService: HelperService) {
        super('political', '${model.entityCamelName}', httpClient, helperService);
    }
${dynamicFunction.join(`\n`)}
}
`
    moduleName = moduleName || model.entityEntryNameHyphen;
    UtilsFile.writeFile(`/com.viettel.erp/political-web-app/src/app/core/services/${moduleName}`, `/${model.entityEntryNameHyphen}.service.ts`, contentFile);
};
