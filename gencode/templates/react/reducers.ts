/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved. 
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { UtilsFile } from './../../gencore/core/UtilsFile';
import { BaseModel } from "../../gencore/core/BaseModel";
// module.js
export default function(model: BaseModel) {
    const contentFile = `import { ${model.entityName}Model } from 'src/Services/Models/${model.entityName}Model';
import { DataTableResults } from 'src/Services/Models/DataTableResults';
import { ActionType } from './../../Enum/enums';
import { ActionEntity } from 'src/Services/Models/ActionEntity';
import { Utils } from 'src/Utils/Utils';
import ${model.entityName}Service from 'src/Services/API/${model.entityEntryNameHyphen}.services';

/**
 * initial state
 */
const initialState = {
    list${model.entityName}: new DataTableResults<${model.entityName}Model>(),
    formSearch: {},
    configTable: {} as any
};


export const ACTION_TYPES = {
    ${model.entityUCName}_SEARCH: '${model.entityLCName}/${model.entityUCName}_SEARCH',
    ${model.entityUCName}_UPDATE_FORM_SEARCH: '${model.entityLCName}/${model.entityUCName}_FORM_SEARCH',
    ${model.entityUCName}_UPDATE_CONFIG_TABLE: '${model.entityLCName}/${model.entityUCName}_CONFIG_TABLE'
};

export type ${model.entityName}State = Readonly<typeof initialState>;

const handleAction = (state: any, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.${model.entityUCName}_UPDATE_FORM_SEARCH:
            Utils.assignState(state, {
                action: ActionType.Success,
                formSearch: action.payload
            });
            return { ...state };

        case ACTION_TYPES.${model.entityUCName}_UPDATE_CONFIG_TABLE:
            Utils.assignState(state, {
                action: ActionType.Success,
                configTable: action.payload
            });
            return { ...state };
        default:
            return state;
    }
}

// Reducer
export default (state: ${model.entityName}State = initialState, action: ActionEntity): ${model.entityName}State => {
    let result;
    result = Utils.excuteFunction(
        ACTION_TYPES.${model.entityUCName}_SEARCH,
        state,
        action,
        null,
        () => {
            Utils.assignState(state, {
                action: ActionType.Success,
                list${model.entityName}: action.payload?.data?.data
            });
            return { ...state };
        }
    );

    if (result) return result;

    /** handle synchronized action */
    return handleAction(state, action);
};

export const handleSearch${model.entityName} = (formData?: any, event?: any) => {
    return ({
        type: ACTION_TYPES.${model.entityUCName}_SEARCH,
        payload: ${model.entityName}Service.search(formData, event)
    });
};

export const handleUpdateFormSearch = (data?: any) => {
    return ({
        type: ACTION_TYPES.${model.entityUCName}_UPDATE_FORM_SEARCH,
        payload: data
    });
};

export const handleUpdateConfigTable = (data?: any) => {
    return ({
        type: ACTION_TYPES.${model.entityUCName}_UPDATE_CONFIG_TABLE,
        payload: data
    });
};

`
UtilsFile.writeFile(`/web-app-political/src/Services/Reducers`, `/${model.entityEntryNameHyphen}.reducers.ts`, contentFile);
};
