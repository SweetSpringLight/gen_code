import { UtilsColumn } from "./UtilsColumn";

/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
export class ImportUtils {
    createPackage(path: string) {
        return 'package ' + path.replace(/\//g, '.') + ';';
    }
    private lines: any = {};
    /**
     * addImport
     * @param newLine
     * @returns
     */
    addImport(newLine: string): void {
        if (!this.lines[newLine]) {
            this.lines[newLine] = true;
        }
    }
    /**
     * toString
     * @returns
     */
    toString(): string {
        const l: string[] = []
        for (let i in this.lines) {
            l.push(i);
        }
        return l.join('\n');
    }
    /**
     * generateGetterAndSetter
     * @param columns
     * @returns
     */
    generateGetterAndSetter(columns: string[]) {
        const template: string[] = [];
        columns.forEach(column => {
            const trimColumnStr = column.toString().replace(/;/g, '').trim();
            const startAt = trimColumnStr.indexOf(' ');
            const lastAt = trimColumnStr.lastIndexOf(' ');
            const nameColumn = trimColumnStr.substring(lastAt + 1);
            const typeColumn = trimColumnStr.substring(startAt + 1, lastAt).replace(/\s/g, "");
            // generate getter
            template.push(`    public ${typeColumn} get${UtilsColumn.jsUcfirst(nameColumn)}() {`);
            template.push(`        return this.${nameColumn};`);
            template.push(`    }\n`);
            // generate setter
            template.push(`    public void set${UtilsColumn.jsUcfirst(nameColumn)}(${typeColumn} ${nameColumn}) {`);
            template.push(`        this.${nameColumn} = ${nameColumn};`);
            template.push(`    }\n`);
        });
        return template.join('\n');
    }
}