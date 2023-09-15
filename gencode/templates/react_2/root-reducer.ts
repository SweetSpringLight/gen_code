/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved. 
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { UtilsFile } from '../../gencore/core/UtilsFile';
import { BaseModel } from "../../gencore/core/BaseModel";
// module.js
export default function(model: BaseModel) {
    const contentFile = `import { combineReducers } from 'redux';
import toastMsgState, { ToastMsgState } from 'src/Components/Toast/toast-msg.reducer';
import authenticationState, { AuthenticationState } from './authentication';
import locale, { LocaleState } from './locale';
import ${model.entityCamelName}State, { ${model.entityName}State } from './${model.entityEntryNameHyphen}.reducers';

export interface IRootState {
    readonly locale: LocaleState;
    readonly authenticationState: AuthenticationState;
    readonly toastMsgState: ToastMsgState;
    readonly ${model.entityCamelName}State: ${model.entityName}State;
}

const rootReducer = combineReducers<IRootState>({
    locale,
    authenticationState,
    toastMsgState,
    ${model.entityCamelName}State
});

export default rootReducer;
`;
UtilsFile.writeFile(`/web-app-political/src/Pages/${model.entityName}`, `/root-reducer.tsx`, contentFile);
};
