/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved. 
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { CONFIG } from "./config";

const modelName = process.argv[2];
const moduleName = process.argv[3];

const models = require('./models');
const targetModel = new models[modelName]();
const templates = require('./templates');

const default_flow = CONFIG.default_flow;
for (let i = 0; i < default_flow.length; i++) {
    try {
        templates[default_flow[i]].default(targetModel, moduleName);
    } catch (e) {
        console.log('error', e);
    }
}