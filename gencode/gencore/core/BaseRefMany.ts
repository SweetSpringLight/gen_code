/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved. 
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { _BaseRef } from "./_BaseRef";
import { RefContruction } from "./Constants";
export class BaseRefMany extends _BaseRef {
    constructor(input: RefContruction) {
        super(input, '1-n');
    }
}