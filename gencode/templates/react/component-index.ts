/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { UtilsFile } from '../../gencore/core/UtilsFile';
import { BaseModel } from "../../gencore/core/BaseModel";
import { UtilsColumn } from '../../gencore/core/UtilsColumn';
// module.js
export default function(model: BaseModel) {
    const columnPrimary = model?.getPrimary()?.name;
    const columnPrimaryFirstUC = UtilsColumn.jsUcfirst(columnPrimary || "");
    const contentFile = `import { connect } from 'react-redux';
import { IRootState } from 'src/Services/Reducers';
import ${model.entityName}Search from './${model.entityName}Search';
import ${model.entityName}List from './${model.entityName}List';
import ${model.entityName}Form from './${model.entityName}Form';
import { handleSearch${model.entityName}, handleUpdateFormSearch } from 'src/Services/Reducers/${model.entityEntryNameHyphen}.reducers';
import ${model.entityName}Service from 'src/Services/API/${model.entityEntryNameHyphen}.services';
import { Utils } from 'src/Utils/Utils';
import { useState } from 'react';
import _ from 'lodash';
type I${model.entityName}IndexProps = StateProps & DispatchProps & {
}
const ${model.entityName}Index = (props: I${model.entityName}IndexProps) => {
    const [show${model.entityName}Form, setShow${model.entityName}Form] = useState(false);
    const [${columnPrimary}, set${columnPrimaryFirstUC}] = useState(undefined);

    const onAdd = () => {
        setShow${model.entityName}Form(true);
    }

    const onEdit = (rowData: any) => {
        set${columnPrimaryFirstUC}(rowData.${model?.getPrimary()?.name});
        setShow${model.entityName}Form(true);
    }

    const onDelete = async (rowData: any) => {
        await Utils.confirmDelete(async () => {
            await ${model.entityName}Service.deleteOne(rowData.${columnPrimary}).then(async () => {
                await props.handleSearch${model.entityName}(props.formSearch);
            });
        })
    }

    const onHide = () => {
        setShow${model.entityName}Form(false);
        set${columnPrimaryFirstUC}(undefined);
    }

    const afterSaveSuccess =  async () => {
        setShow${model.entityName}Form(false);
        set${columnPrimaryFirstUC}(undefined);
        await props.handleSearch${model.entityName}(props.formSearch);
    }

    return (
        <>
            <div className='row wrap-${model.entityEntryNameHyphen}'>
                <div className='col-12 col-md-12 col-sm-12'>
                    <${model.entityName}Search
                        onAdd={onAdd}
                    />
                </div>
                <div className='col-12 col-md-12 col-sm-12'>
                    <${model.entityName}List
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </div>
            </div>
            { show${model.entityName}Form &&
                <${model.entityName}Form
                    ${columnPrimary}={${columnPrimary}}
                    onHide={onHide}
                    afterSaveSuccess={afterSaveSuccess}
                />
            }
        </>
    );
}

const mapStateToProps = ({ ${model.entityCamelName}State, locale }: IRootState) => ({
    currentLocale: locale.currentLocale,
    formSearch: ${model.entityCamelName}State.formSearch,
});

const mapDispatchToProps = {
    handleSearch${model.entityName},
    handleUpdateFormSearch
};

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    // @ts-ignore
)(${model.entityName}Index);
`
UtilsFile.writeFile(`/web-app-political/src/Pages/${model.entityName}`, `/${model.entityName}Index.tsx`, contentFile);
};
