/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseColumn } from "./BaseColumn";
import { ImpossibleRefType, ImpossibleTemplates } from "./Constants";
import { Utils } from "./Utils";
import { UtilsColumn } from "./UtilsColumn";

export class BaseModel {
    public tableName?: string;
    public entityName?: string;
    public entityCamelName?: string;
    public entityUCName?: string;
    public entityLCName?: string;
    public entityEntryNameHyphen?: string;
    public allColumn?: BaseColumn[];
    constructor(tableName?: string, entityName?: string) {
        this.tableName = tableName;
        this.entityName = entityName;
        this.entityCamelName = UtilsColumn.jsLCfirst(entityName || '');
        this.entityUCName = tableName?.toUpperCase();
        this.entityLCName = tableName?.toLowerCase();
        this.entityEntryNameHyphen = tableName?.replace('_', '-').toLowerCase();
    }
    public getPrimary(): BaseColumn | undefined {
        if (this.allColumn) {
            for (let i = 0; i < this.allColumn?.length; i++) {
                if (this.allColumn[i].isPrimaryKey) {
                    return this.allColumn[i];
                }
            }
        }
        return undefined;
    }
    public getRef(): BaseColumn[] {
        const refs: BaseColumn[] = [];
        if (this.allColumn) {
            for (let i = 0; i < this.allColumn?.length; i++) {
                if (this.allColumn[i].type == 'Ref') {
                    refs.push(this.allColumn[i]);
                }
            }
        }
        return refs;
    }
    /**
     * Lấy danh sách reference by refType
     * @param refType
     * @returns
     */
    private getRefList(refType: ImpossibleRefType): BaseColumn[] {
        const refs: BaseColumn[] = [];
        if (this.allColumn) {
            for (let i = 0; i < this.allColumn?.length; i++) {
                if (this.allColumn[i].type == 'Ref' && this.allColumn[i].refModel?.refType == refType) {
                    refs.push(this.allColumn[i]);
                }
            }
        }
        return refs;
    }
    public getRefOneList(): BaseColumn[] {
        return this.getRefList('1-1');
    }
    public getRefManyList(): BaseColumn[] {
        return this.getRefList('1-n');
    }
    public alias(sufix?: string | number): string {
        return Utils.alias(this.tableName, sufix);
    }
    public hasRefMany(): boolean {
        return this.getRefManyList().length > 0;
    }
    /**
     * Get all column by template
     * @param template
     * @returns
     */
    public getNonePrimaryColumnByTemplate(template: ImpossibleTemplates) {
        const all: BaseColumn[] = [];
        const primary = this.getPrimary();
        const name = primary?.name;
        if (this.allColumn) {
            for (let i = 0; i < this.allColumn?.length; i++) {
                const templates = this.allColumn[i]?.templates || [];
                if (name != this.allColumn[i]?.name && templates.includes(template)) {
                    all.push(this.allColumn[i]);
                }
            }
        }
        return all;
    }
    /**
     * Get all column list by template
     * @param template
     * @returns
     */
    public getNonePrimarysByTemplate(templates: ImpossibleTemplates[]) {
        const all: BaseColumn[] = [];
        if (this.allColumn) {
            const primary = this.getPrimary();
            const name = primary?.name;
            for (let i = 0; i < this.allColumn?.length; i++) {
                if (name == this.allColumn[i].name)  {
                    continue;
                }
                const columnTemplates = this.allColumn[i]?.templates || [];
                let found = templates.some(e => columnTemplates.includes(e))
                if (found) {
                    all.push(this.allColumn[i]);
                }

            }
        }
        return all;
    }
    /**
     * Get one column by name
     * @param template
     * @returns
     */
    public findColumnByName(name: string): BaseColumn | null {
        if (this.allColumn) {
            for (let i = 0; i < this.allColumn?.length; i++) {
                const column = this.allColumn[i];
                if (column.name == name) {
                    return column;
                }
            }
        }
        return null;
    }
    /**
     * Get all column list by template
     * @param template
     * @returns
     */
     public getColumnsByTemplate(templates: ImpossibleTemplates[]) {
        const all: BaseColumn[] = [];
        if (this.allColumn) {
            for (let i = 0; i < this.allColumn?.length; i++) {
                const columnTemplates = this.allColumn[i]?.templates || [];
                let found = templates.some(e => columnTemplates.includes(e))
                if (found) {
                    all.push(this.allColumn[i]);
                }

            }
        }
        return all;
    }
}