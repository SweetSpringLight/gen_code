/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved. 
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { CONFIG } from "../../config";

const fs = require('fs');

export class UtilsFile {
    /**
     * thực hiện ghi file
     * @param exportFile
     * @param contentFile 
     */
    public static writeFile(packageName: string, exportFile: string, contentFile: string) {
        fs.mkdir(CONFIG.export_dir + packageName, { recursive: true }, (err: any) => {
            if (err) throw err;
            fs.writeFileSync(CONFIG.export_dir + packageName + exportFile, contentFile);
        });
    }
}