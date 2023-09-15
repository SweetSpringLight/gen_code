/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved. 
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { UtilsFile } from '../../gencore/core/UtilsFile';
import { BaseModel } from "../../gencore/core/BaseModel";
// module.js
export default function(model: BaseModel) {
    const url = '`${match?.url}`'
    const contentFile = `import React, { Suspense } from 'react';
import { Switch, match } from 'react-router-dom';
import MenuPrivateRoute from 'src/Layouts/MenuPrivateRoute';
import ErrorBoundaryRoute from 'src/Components/Error/ErrorBoundaryRoute';
import PageNotFound from 'src/Components/Error/PageNotFound';
const ${model.entityName}Index = React.lazy(() => import('./${model.entityName}Index'));
type IProps = {
    match?: match
}
const ${model.entityName}Routes = ({ match }: IProps) => (
    <>
        <Switch>
            <Suspense fallback={<div>Loading...</div>}>
                <MenuPrivateRoute path={${url}} component={${model.entityName}Index} />
            </Suspense>
            <ErrorBoundaryRoute component={PageNotFound} />
        </Switch>
    </>
);

export default ${model.entityName}Routes;

`
UtilsFile.writeFile(`/web-app-political/src/Pages/${model.entityName}`, `/${model.entityName}Routes.tsx`, contentFile);
};
