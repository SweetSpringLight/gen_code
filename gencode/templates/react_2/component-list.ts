/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { UtilsFile } from '../../gencore/core/UtilsFile';
import { BaseModel } from "../../gencore/core/BaseModel";
import { BaseColumn } from '../../gencore/core/BaseColumn';
import { UtilsColumn } from '../../gencore/core/UtilsColumn';

// module.js
export default function(model: BaseModel) {
    const renderColumns = model?.getNonePrimaryColumnByTemplate('react_list') || [];
    const lstConstantExport = renderColumns?.filter(col => col.options && col.options.length);
    const renderLstConstantExport = lstConstantExport?.map(col => {
        return `${col?.dbName?.toString().toUpperCase()}_OPTION`;
    }).join(`, `);

    const datasourceColumn = (col: BaseColumn) => {
        if (!col) {
            return null;
        }
        const constantType = `${col?.dbName?.toString().toUpperCase()}_OPTION`;
        if (renderLstConstantExport.includes(constantType)) {
            return constantType;
        }
        return null;
    }

    const columnsTable = renderColumns?.map(col => {
        if (col?.controlType == 'date' || col?.controlType == 'datetime' || col?.controlType == 'dateFromTo') {
            return `DynamicDataTableUtils.dateFormat({field: '${col.name}', header: translate('${model.entityCamelName}.${col.name}'), className: 'size-4 mxw-4 required-show'})`;
        } else if ((col?.controlType == 'select' || col?.controlType == 'radio' || col?.controlType == 'switch') && col?.options?.length) {
            return `DynamicDataTableUtils.statusFormat(${datasourceColumn(col)}, {field: '${col.name}', header: translate('${model.entityCamelName}.${col.name}'), className: 'size-4 mxw-4 required-show', align: 'left'})`;
        }
        return `{field: '${col.name}', header: translate('${model.entityCamelName}.${col.name}'), sortable: true, align: '${UtilsColumn.listAlign(col)}'}`;
    }).join(`
        , `);
    const contentFile = `import { connect, Options } from 'react-redux';
import { IRootState } from 'src/Services/Reducers';
import { Panel } from 'primereact/panel';
import { translate } from 'react-jhipster';
import DynamicDataTable from 'src/Components/DynamicDataTable/DynamicDataTable';
import { Column, ColumnProps } from 'primereact/column';
import { DynamicDataTableUtils } from 'src/Components/DynamicDataTable/DynamicDataTableUtils';
import { DataTablePFSEvent } from 'primereact/datatable';
import { DataTableResults } from 'src/Services/Models/DataTableResults';
import { ${model.entityName}Model } from 'src/Services/Models/${model.entityName}Model';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { ControlButton } from 'src/Components/Controls';
${lstConstantExport?.length ? `import { ${renderLstConstantExport} } from './constants'` : ''}

type I${model.entityName}ListProps = StateProps & DispatchProps & {
    list${model.entityName}?: DataTableResults<${model.entityName}Model>,
    onAdd?: Function;
    onView?: (rowData?: any) => void, // Xem
    onEdit?: (rowData?: any) => void, // Cập nhật
    onDelete?: Function;
    doSearch: Function;
    formSearch: any;
    configTable: any;
    handleUpdateConfigTable?: Function;
}

const ${model.entityName}List = forwardRef((props: I${model.entityName}ListProps, ref: any) => {
    const dynamicTableRef = useRef<any>(null);
    /**
     * Chuyển trang
     * @param event
    */
    const onPage = async (event: DataTablePFSEvent) => {
        props.handleUpdateConfigTable && props.handleUpdateConfigTable(event);
        await props.doSearch(props.formSearch, event);
    }

    /**
     * Sort
     * @param event
    */
    const onSort = async (event: DataTablePFSEvent) => {
        props.handleUpdateConfigTable && props.handleUpdateConfigTable(event);
        await props.doSearch(props.formSearch, event);
    }


    /**
     * Cập nhật
     * @param rowData
     */
    const onEdit = (rowData: any) => {
        props.onEdit && props.onEdit(rowData);
    }

    /**
     * Xóa
     * @param rowData
     */
    const onDelete = (rowData: any) => {
        props.onDelete && props.onDelete(rowData);
    }

    /**
     * kết xuất ra action edit
     * @param rowData
     */
    const renderActionEditColumn = (rowData: any) => {
        return (
            <>
                <div onClick={() => onEdit(rowData)} style={{ cursor: 'pointer' }} className='at-edit d-flex justify-content-center'>
                    <i className="fa-solid fa-pen-to-square"></i>
                </div>
            </>
        )
    }

    /**
     * kết xuất ra action delete
     * @param rowData
     */
    const renderActionDeleteColumn = (rowData: any) => {
        return (
            <>
                <div onClick={() => onDelete(rowData)} style={{ cursor: 'pointer' }} className='at-edit d-flex justify-content-center'>
                    <i className="icon-action pi pi-trash text-danger"></i>
                </div>
            </>
        )
    }

	let columns: ColumnProps[] = [
        DynamicDataTableUtils.renderRowIndex(false)
        , {header: translate('common.editLabel'), body: renderActionEditColumn, align: 'center', className: 'mxw-2'}
        , {header: translate('common.deleteLabel'), body: renderActionDeleteColumn, align: 'center', className: 'mxw-2'}
        , ${columnsTable}
    ];

    useImperativeHandle(ref, () => ({
        clearTable() {
            dynamicTableRef.current && dynamicTableRef.current.resetTable();
        }
    }))

    const templateHeader = (
        <div className="p-panel-header">
            <h3 className="heading-title">{ translate('${model.entityCamelName}.titleList') }</h3>
            <div className="action-group">
                <ControlButton
                    size="small"
                    label="Thêm mới"
                    icon="pi pi-plus"
                    onClick={() => props.onAdd && props.onAdd()}
                    outline={true}
                />
            </div>
        </div>
    );

    return (
        <>
            <Panel headerTemplate={templateHeader} className="wrap-list">
                <DynamicDataTable
                    ref={dynamicTableRef}
                    tableid="${model.entityEntryNameHyphen}-table"
                    selectionMode="single"
                    columns={columns}
                    dataTable={props.list${model.entityName}}
                    onSort={onSort}
                    onPage={onPage}
                    sortField={props.configTable?.sortField}
                    sortOrder={props.configTable?.sortOrder}
                >
                </DynamicDataTable>
            </Panel>
        </>
    )
})

const mapStateToProps = ({ locale }: IRootState) => ({
    currentLocale: locale.currentLocale,
});

const mapDispatchToProps = {

};
const options = { forwardRef: true };
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    options as Options,
    // @ts-ignore
)(${model.entityName}List);
`

UtilsFile.writeFile(`/web-app-political/src/Pages/${model.entityName}`, `/${model.entityName}List.tsx`, contentFile);
}
