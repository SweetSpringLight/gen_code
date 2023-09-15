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
import ${model.entityName}Service from 'src/Services/API/${model.entityEntryNameHyphen}.services';
import { Utils } from 'src/Utils/Utils';
import { useState, useEffect, useRef } from 'react';
import { DataTableResults } from 'src/Services/Models/DataTableResults';
import { ${model.entityName}Model } from 'src/Services/Models/${model.entityName}Model';
import LocalStorage from 'src/Utils/LocalStoragePublic';
import _ from 'lodash';
type I${model.entityName}IndexProps = StateProps & DispatchProps & {
}
const ${model.entityName}Index = (props: I${model.entityName}IndexProps) => {
    const ${model.entityCamelName}ListRef = useRef<any>(null);
    const [formSearch, setFormSearch] = useState({});
    const [configTable, setConfigTable] = useState({});
    const [list${model.entityName}, setList${model.entityName}] = useState<DataTableResults<${model.entityName}Model>>();
    const [show${model.entityName}Form, setShow${model.entityName}Form] = useState(false);
    const [${columnPrimary}, set${columnPrimaryFirstUC}] = useState(undefined);

    const handleUpdateFormSearch = (data: any) => {
        setFormSearch({...formSearch, ...data});
    }

    const handleUpdateConfigTable = (data: any) => {
        if (!data || !Object.keys(data).length) {
            ${model.entityCamelName}ListRef.current && ${model.entityCamelName}ListRef.current.clearTable();
        }
        setConfigTable(data);
    }

    const doSearch = async (formSearch?: any, event?: any) => {
        const resultSearch = await ${model.entityName}Service.search(formSearch, event);
        if (resultSearch.isSuccess() && resultSearch.hasData()) {
            setList${model.entityName}(resultSearch.getData());
        }
    }

    const onAdd = () => {
        setShow${model.entityName}Form(true);
    }

    const onEdit = (rowData: any) => {
        set${columnPrimaryFirstUC}(rowData.${model?.getPrimary()?.name});
        setShow${model.entityName}Form(true);
    }

    const onDelete = async (rowData: any) => {
        await Utils.confirmDelete(async () => {
            const resultDelete = await ${model.entityName}Service.deleteOne(rowData.${columnPrimary});
            if (resultDelete.isSuccess()) {
                await doSearch(formSearch, configTable);
            }
        })
    }

    const onSaveFilter = () => {
        LocalStorage.set(LocalStorage.CONFIG_FILTER, "${model.entityCamelName}", formSearch);
    }

    const onHide = () => {
        setShow${model.entityName}Form(false);
        set${columnPrimaryFirstUC}(undefined);
    }

    const afterSaveSuccess =  async () => {
        setShow${model.entityName}Form(false);
        set${columnPrimaryFirstUC}(undefined);
        await doSearch(formSearch, configTable);
    }

    useEffect(() => {
        const dataConfig = LocalStorage.get(LocalStorage.CONFIG_FILTER, "${model.entityCamelName}");
        if(dataConfig) {
            const _temp = _.cloneDeep(dataConfig) as any;
            handleUpdateFormSearch(_temp);
            doSearch(_temp);
        } else {
            doSearch();
        }
    }, []);

    return (
        <>
            <div className='row wrap-${model.entityEntryNameHyphen}'>
                <div className='col-12 col-md-12 col-sm-12'>
                    <${model.entityName}Search
                        formSearch={formSearch}
                        onSaveFilter={onSaveFilter}
                        doSearch={doSearch}
                        handleUpdateFormSearch={handleUpdateFormSearch}
                        handleUpdateConfigTable={handleUpdateConfigTable}
                    />
                </div>
                <div className='col-12 col-md-12 col-sm-12'>
                    <${model.entityName}List
                        ref={${model.entityCamelName}ListRef}
                        list${model.entityName}={list${model.entityName}}
                        onAdd={onAdd}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        doSearch={doSearch}
                        formSearch={formSearch}
                        configTable={configTable}
                        handleUpdateConfigTable={handleUpdateConfigTable}
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

const mapStateToProps = ({ locale }: IRootState) => ({
    currentLocale: locale.currentLocale
});

const mapDispatchToProps = {
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
