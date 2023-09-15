/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { _BaseRef } from "./_BaseRef";
import { ImpossibleControlType, ImpossibleOptions, ImpossibleRefType, ImpossibleTemplates, ImpossibleType, ImpossibleValidate } from "./Constants";

type RefOptional = {
    type?: 'Ref';
    refModel: _BaseRef;
};

type NoneRefOptional = {
    type?: ImpossibleType;
    refModel?: _BaseRef;
};
type Column = {
    controlType?: ImpossibleControlType;
    name?: string;
    label?: string;
    dbName?: string;
    length?: number;
    isPrimaryKey?: boolean;
    validate?:  ImpossibleValidate[];
    templates?: ImpossibleTemplates[];
    options?: ImpossibleOptions[];
    disabled?: boolean;
    optionValue?: string;
    optionLabel?: string;
    objectBO?: string,
    codeField?: string,
    nameField?: string,
    emailField?: string,
    selectField?: string,
    operationKey?: string,
    adResourceKey?: string
};

export type BaseColumn = (Column & RefOptional) | (Column & NoneRefOptional);