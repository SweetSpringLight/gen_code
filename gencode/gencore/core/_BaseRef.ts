/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { BaseColumn } from "./BaseColumn";
import { BaseModel } from "./BaseModel";
import { ImpossibleControlType, ImpossibleRefType, RefContruction } from "./Constants";
import { UtilsColumn } from "./UtilsColumn";

export class _BaseRef {
    public refType: ImpossibleRefType;
    public model?: BaseModel;
    public refId?: string;
    public refAttrs?: string[];
    public refNameAlias?: string;
    constructor(input: RefContruction, refType: ImpossibleRefType) {
        this.model = input.model;
        this.refId = input.refId;
        this.refAttrs = input.refAttrs;
        this.refNameAlias = input.refNameAlias;
        this.refType = refType;
    }
    public isRefMany(): boolean {
        return this.refType == '1-n';
    }
    public isRefOne(): boolean {
        return this.refType == '1-1';
    }
    public getModel(): BaseModel {
        return new (this.model as any)();
    }
    public getAliasRefName(refAttr: string): string {
        return `${this.refNameAlias}${UtilsColumn.jsUcfirst(refAttr || '')}`
    }
    /**
     * Lấy dbName
     * @param name
     * @returns
     */
    public getColumDbName(name?: string): string {
        if (!name) {
            return ``;
        }
        const baseModel = this.getModel();
        const col = baseModel.findColumnByName(name);
        return `${col?.dbName}`;
    }
    /**
     * Lấy column
     * @param name
     * @returns
     */
     public getColumDb(name?: string): any {
        if (!name) {
            return ``;
        }
        const baseModel = this.getModel();
        const col = baseModel.findColumnByName(name);
        return col;
    }

    public getControlTypeRefs(name: string): BaseColumn {
        const refColumn = this.getColumDb(name);
        return refColumn;
    }
}