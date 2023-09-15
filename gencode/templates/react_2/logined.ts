/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved. 
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { UtilsFile } from '../../gencore/core/UtilsFile';
import { BaseModel } from "../../gencore/core/BaseModel";
// module.js
export default function(model: BaseModel) {
    const contentFile = `import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import ErrorBoundaryRoute from 'src/Components/Error/ErrorBoundaryRoute';
import MenuPrivateRoute from './MenuPrivateRoute';
const ${model.entityName}Routes = React.lazy(() => import('src/Pages/${model.entityName}/${model.entityName}Routes'));
const PageNotFound = React.lazy(() => import('src/Components/Error/PageNotFound'));
const ExceptionPage = React.lazy(() => import('src/Components/Error/ExceptionPage'));
import { IRootState } from 'src/Services/Reducers';
import Header from './Header/Header';
import SidebarMenuLeft from './SidebarMenuLeft/SidebarMenuLeft';
const LoginedComponent = ({ }) => {
    const renderComponent = () => {
        return (
            <>
                <Header></Header>
                <div className="app-content">
                    <SidebarMenuLeft />
                    <div className="app-box-content">
                        <Switch>
                            <Suspense fallback={<div>Loading...</div>}>
                                <ErrorBoundaryRoute path="/${model.entityEntryNameHyphen}" component={${model.entityName}Routes} />
                            </Suspense>
                            <ErrorBoundaryRoute component={PageNotFound} />
                            <ErrorBoundaryRoute component={ExceptionPage} />
                        </Switch>
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            {renderComponent()}
        </>
    );
};

const mapStateToProps = (
    { }: IRootState) => ({

    });

// type StateProps = ReturnType<typeof mapStateToProps>;

export const Logined = connect(
    mapStateToProps
)(LoginedComponent);

export default Logined;`;
UtilsFile.writeFile(`/web-app-political/src/Pages/${model.entityName}`, `/Logined.tsx`, contentFile);
};
