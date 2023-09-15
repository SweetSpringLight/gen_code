/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { UtilsFile } from '../../gencore/core/UtilsFile';
import { BaseModel } from "../../gencore/core/BaseModel";
import { BaseColumn } from '../../gencore/core/BaseColumn';
import { ImportUtils } from '../../gencore/core/ImportUtils';
// module.js
export default function(model: BaseModel) {
    const importUtils = new ImportUtils();
    const renderColumns = model?.getNonePrimaryColumnByTemplate('react_form') || [];
    const columnPrimary = model?.getPrimary()?.name;
    const validationSchema = model.allColumn?.filter(col => col.validate)?.map(col => {
        if (col.validate?.includes('required')) {
            if (col.controlType == 'text') {
                return `${col.name}: yup.string().max(${col.length}).required()`;
            } else if (col.type == 'Long') {
                return `${col.name}: yup.number().required()`;
            } else {
                return `${col.name}: yup.mixed().required()`;
            }
        } else if (col.validate?.includes('maxlength')) {
            return `${col.name}: yup.string().max(${col.length}).nullable()`;
        } else {
            return `${col.name}: yup.string().nullable()`;
        }
    })?.join(`
            , `);
    const lstConstantExport = renderColumns?.filter(col => col.options && col.options.length);
    const renderOptionControl = (col: BaseColumn) => {
        if (col?.options?.length) {
            return `${col?.dbName?.toString().toUpperCase()}_OPTION`;
        }
        return JSON.stringify([]);
    }

    const renderColumnsByType = (col: BaseColumn): string => {
        if (col?.controlType == 'partyOrganization') {
            return `
                        <div className="col-12 col-md-6 col-lg-6 col-sm-12">
                            <PartyOrgSelector
                                labelKey='${model.entityCamelName}.${col.name}'
                                property='${col.name}'
                                disabled={${col?.disabled || false}}
                                errors={errors}
                                touched={touched}
                                filterCondition="curdate() BETWEEN effective_date and IFNULL(exprited_date, curdate())"
                                required={${col?.validate?.includes('required') || false}}
                                initialValue={_.get(values, '${col.name}')}
                                callbackValueChange={onChange}
                            />
                        </div>
            `;
        } else if (col?.controlType == 'multiPartyOrganization') {
            return `
                        <div className="col-12 col-md-6 col-lg-6 col-sm-12">
                            <MultiPartyOrgSelector
                                labelKey="${model.entityCamelName}.${col.name}"
                                property='${col.name}'
                                disabled={${col?.disabled || false}}
                                errors={errors}
                                touched={touched}
                                required={${col?.validate?.includes('required') || false}}
                                filterCondition="curdate() BETWEEN effective_date and IFNULL(exprited_date, curdate())"
                                initialValue={_.get(values, '${col.name}')}
                                callbackValueChange={onChange}
                            />
                        </div>
            `;
        } else if (col?.controlType == 'organization') {
            return `
                        <div className="col-12 col-md-6 col-lg-6 col-sm-12">
                            <OrgSelector
                                labelKey="${model.entityCamelName}.${col.name}"
                                property='${col.name}'
                                disabled={${col?.disabled || false}}
                                errors={errors}
                                touched={touched}
                                required={${col?.validate?.includes('required') || false}}
                                filterCondition="curdate() BETWEEN effective_start_date and IFNULL(effective_end_date, curdate())"
                                initialValue={_.get(values, '${col.name}')}
                                callbackValueChange={onChange}
                            />
                        </div>
            `;
        } else if (col?.controlType == 'multiOrganization') {
            return `
                        <div className="col-12 col-md-6 col-lg-6 col-sm-12">
                            <MultiOrgSelector
                                labelKey="${model.entityCamelName}.${col.name}"
                                property='${col.name}'
                                disabled={${col?.disabled || false}}
                                filterCondition="curdate() BETWEEN effective_start_date and IFNULL(effective_end_date, curdate())"
                                initialValue={_.get(values, '${col.name}')}
                                callbackValueChange={onChange}
                            />
                        </div>
            `;
        } else if (col?.controlType == 'select' && col?.type == 'Ref') {
            const baseService = `${col.refModel.getModel().entityCamelName}Service`;
            const _model = col?.refModel?.getModel();
            importUtils.addImport(`import ${baseService} from 'src/Services/API/${_model.entityEntryNameHyphen}.services';`);
            return `
                        <div className="col-12 col-md-6 col-lg-6 col-sm-12">
                            <ControlDropdown
                                labelKey='${model.entityCamelName}.${col.name}'
                                property='${col.name}'
                                disabled={${col?.disabled || false}}
                                required={${col?.validate?.includes('required') || false}}
                                errors={errors}
                                touched={touched}
                                baseService={${baseService}}
                                optionLabel='${col?.optionLabel || 'name'}'
                                optionValue='${col?.optionValue || 'id'}'
                                initialValue={_.get(values, '${col.name}')}
                                callbackValueChange={onChange}
                            />
                        </div>
            `;
        } else if (col?.controlType == 'select') {
            return `
                        <div className="col-12 col-md-6 col-lg-6 col-sm-12">
                            <ControlDropdown
                                labelKey='${model.entityCamelName}.${col.name}'
                                property='${col.name}'
                                disabled={${col?.disabled || false}}
                                required={${col?.validate?.includes('required') || false}}
                                errors={errors}
                                touched={touched}
                                options={${renderOptionControl(col)}}
                                optionLabel='${col?.refModel?.refAttrs ? col?.refModel?.refAttrs[0]: 'name'}'
                                optionValue='${col?.refModel?.refId || 'id'}'
                                initialValue={_.get(values, '${col.name}')}
                                callbackValueChange={onChange}
                            />
                        </div>
            `;
        } else if (col?.controlType == 'selectYear') {
            return `
                        <div className="col-12 col-md-6 col-lg-6 col-sm-12">
                            <ControlDropdown
                                labelKey='${model.entityCamelName}.${col.name}'
                                property='${col.name}'
                                disabled={${col?.disabled || false}}
                                required={${col?.validate?.includes('required') || false}}
                                errors={errors}
                                touched={touched}
                                options={Utils.getYearList()}
                                optionLabel='year'
                                optionValue='year'
                                initialValue={_.get(values, '${col.name}')}
                                callbackValueChange={onChange}
                            />
                        </div>
            `;
        } else if (col?.controlType == 'selectYearFromTo') {
            return `
                        <div className="col-12 col-md-6 col-lg-6 col-sm-12">
                            <ControlDropdown
                                labelKey='${model.entityCamelName}.${col.name}'
                                property='${col.name}'
                                disabled={${col?.disabled || false}}
                                required={${col?.validate?.includes('required') || false}}
                                errors={errors}
                                touched={touched}
                                options={Utils.getYearList()}
                                optionLabel='year'
                                optionValue='year'
                                initialValue={_.get(values, '${col.name}')}
                                callbackValueChange={onChange}
                            />
                        </div>
            `;
        } else if (col?.controlType == 'dataPicker') {
            return `
                        <div className="col-12 col-md-6 col-lg-6 col-sm-12">
                            <ControlDataPicker
                                labelKey='${model.entityCamelName}.${col.name}'
                                property='${col.name}'
                                disabled={${col?.disabled || false}}
                                required={${col?.validate?.includes('required') || false}}
                                errors={errors}
                                touched={touched}
                                objectBO='${col?.objectBO || `${col?.refModel?.getModel()?.entityName}BO`}'
                                codeField='${col?.codeField || `${col?.refModel?.getModel()?.entityCamelName}Code`}'
                                nameField='${col?.nameField || `${col?.refModel?.refAttrs ? col?.refModel?.refAttrs[0] : 'name'}`}'
                                selectField='${col?.selectField || col?.refModel?.refId}'
                                placeholder="Nhập..."
                                codeLabel="codeLabel"
                                nameLabel="nameLabel"
                                initialValue={_.get(values, '${col.name}')}
                                callbackValueChange={onChange}
                            />
                        </div>
            `;
        } else if (col?.controlType == 'date' || col?.controlType == 'datetime') {
            return `
                        <div className="col-12 col-md-6 col-lg-6 col-sm-12">
                            <ControlDate
                                labelKey='${model.entityCamelName}.${col.name}'
                                property='${col.name}'
                                disabled={${col?.disabled || false}}
                                required={${col?.validate?.includes('required') || false}}
                                errors={errors}
                                touched={touched}
                                dateFormat='dd/mm/yy'
                                initialValue={_.get(values, '${col.name}')}
                                callbackValueChange={onChange}
                            />
                        </div>
            `;
        } else if (col?.controlType == 'number') {
            return `
                        <div className="col-12 col-md-6 col-lg-6 col-lg-6 col-sm-12">
                            <ControlNumber
                                labelKey='${model.entityCamelName}.${col.name}'
                                property='${col.name}'
                                disabled={${col?.disabled || false}}
                                required={${col?.validate?.includes('required') || false}}
                                errors={errors}
                                touched={touched}
                                initialValue={_.get(values, '${col.name}')}
                                callbackValueChange={onChange}
                            />
                        </div>
            `;
        } else if (col?.controlType == 'radio') {
            return `
                        <div className="col-12 col-md-6 col-lg-6 col-sm-12">
                            <ControlRadio
                                labelKey='${model.entityCamelName}.${col.name}'
                                property='${col.name}'
                                disabled={${col?.disabled || false}}
                                required={${col?.validate?.includes('required') || false}}
                                errors={errors}
                                touched={touched}
                                optionlabel='name'
                                optionvalue='id'
                                datasource={${col?.dbName?.toString().toUpperCase()}_OPTION}
                                initialValue={_.get(values, '${col.name}')}
                                callbackValueChange={onChange}
                            />
                        </div>
            `;
        } else if (col?.controlType == 'switch') {
            return `
                        <div className="col-12 col-md-6 col-lg-6 col-sm-12">
                            <ControlSwitch
                                labelKey='${model.entityCamelName}.${col.name}'
                                property='${col.name}'
                                disabled={${col?.disabled || false}}
                                required={${col?.validate?.includes('required') || false}}
                                errors={errors}
                                touched={touched}
                                initialValue={_.get(values, '${col.name}')}
                                callbackValueChange={onChange}
                            />
                        </div>
            `;
        } else if (col?.controlType == 'listRefMany') {
            const renderRefColumn = (col: BaseColumn) => {
                return `<Column header={translate("${model.entityCamelName}.${col.name}")}
                                    body={(rowData: any, extValue: any) => (
                                        ${renderTableColumn(col)}                       )}
                                ></Column>`;
            }
            return `
                        <Panel style={{ width: '100%' }} header="${col?.label || ''}" className="mt-2">
                            <DataTable value={(values as any)?.${col.name}} responsiveLayout="scroll" stripedRows showGridlines
                            emptyMessage={translate('common.dataNotFound')}>
                                <Column header={translate('common.rowNum')} body={renderSTT} style={{ minWidth: '300px' }} bodyClassName="text-center"></Column>
                                ${renderRefColumn(col)}
                                <Column header={translate('common.actionLabel')} body={renderActionColumn} style={{ minWidth: '100px' }}></Column>
                            </DataTable>
                        </Panel>
            `;
        } else if (col?.controlType == 'textarea') {
            return `
                        <div className="col-12 col-md-6 col-lg-6 col-sm-12">
                            <ControlTextarea
                                labelKey='${model.entityCamelName}.${col.name}'
                                property='${col.name}'
                                disabled={${col?.disabled || false}}
                                required={${col?.validate?.includes('required') || false}}
                                errors={errors}
                                touched={touched}
                                initialValue={_.get(values, '${col.name}')}
                                callbackValueChange={onChange}
                            />
                        </div>
            `;
        } else {
            return `
                        <div className="col-12 col-md-6 col-lg-6 col-sm-12">
                            <ControlText
                                labelKey='${model.entityCamelName}.${col.name}'
                                property='${col.name}'
                                disabled={${col?.disabled || false}}
                                required={${col?.validate?.includes('required') || false}}
                                errors={errors}
                                touched={touched}
                                initialValue={_.get(values, '${col.name}')}
                                callbackValueChange={onChange}
                            />
                        </div>
            `;
        }
    }

    const renderTableColumn = (col: BaseColumn): string => {
        const _refModel = col.refModel;
        if (!_refModel) return ``;
        const _tagetColumn = _refModel.refAttrs ? _refModel.refAttrs[0] : '';
        const controlTypeRef = _refModel.getControlTypeRefs(_tagetColumn);
        const required = col?.validate?.includes('required') || false;
        const rowIndexStr = "${extValue.rowIndex}";
        if (controlTypeRef?.controlType == 'organization') {
            importUtils.addImport(`import organizationService from 'src/Services/API/organization.services';`);
            const rowParent = '`' + `${col.name}[${rowIndexStr}]` + '`';
            const property = '`' + `${col.name}[${rowIndexStr}].${controlTypeRef?.name || ''}` + '`';
                return `<OrgSelector
                                            errors={errors}
                                            touched={touched}
                                            required={${required}}
                                            property={${property}}
                                            fieldPath={${property}}
                                            initialValue={_.get(values, ${property})}
                                            filterCondition="curdate() BETWEEN effective_start_date and IFNULL(effective_end_date, curdate())"
                                            callbackValueChange={
                                                async (fieldName: string, evt: any, value: any) => {
                                                    if (value) {
                                                        await onChange(fieldName, evt, value);
                                                        const organizationResp = await organizationService.findById(value);
                                                        if (organizationResp.isSuccess() && organizationResp.hasData()) {
                                                            const restData = organizationResp.getData();
                                                            await setFieldValue(${property}, restData.organizationId);
                                                        }
                                                    } else {
                                                        await setFieldValue(${rowParent}, {});
                                                    }
                                                }
                                            }
                                        />
            `;
        }
        return ``;
    }

    const formControls = renderColumns?.map(col => {
        return renderColumnsByType(col);
    })?.join(``);

    const renderActionRefs = () => {
        const relationConfig = renderColumns?.find(col => col?.controlType == 'listRefMany' && col?.templates?.includes('react_form'));
        if (relationConfig) {
            return `
                /**
                 * Render cột STT
                 * @param {*} rowData
                 * @param {*} x
                 * @return {*}
                 */
                const renderSTT = (rowData: any, x: any) => {
                    return <>{x.rowIndex + 1}</>;
                };

                /**
                 * Thêm dòng
                 */
                const onAddRow = () => {
                    let { ${relationConfig.name} } = values;
                    ${relationConfig.name} = ${relationConfig.name} || [];
                    ${relationConfig.name}.push({
                    });
                    setFieldValue('${relationConfig.name}', ${relationConfig.name});
                };

                /**
                 * Xóa dòng
                 * @param {*} rowData
                 * @param {*} extValue
                 */
                const onDeleteRow = (rowData: any, extValue: any) => {
                    let { ${relationConfig.name} } = values;
                    ${relationConfig.name} = ${relationConfig.name} || [];
                    ${relationConfig.name}.splice(extValue.rowIndex, 1);
                    if (${relationConfig.name}.length == 0) {
                        ${relationConfig.name}.push({
                        });
                    }
                    setFieldValue('${relationConfig.name}', _.cloneDeep(${relationConfig.name}));
                };

                /**
                 * Render cột action
                 * @param {*} rowData
                 * @param {*} extValue
                 * @return {*}
                 */
                const renderActionColumn = (rowData: any, extValue: any) => {
                    return (<div className="d-flex text-center">
                        <ControlButton
                            mode={BUTTON_TYPE.PRIMARY}
                            icon="pi pi-plus"
                            className="p-button-rounded p-button-text p-button-info p-button-plain"
                            onClick={onAddRow}
                            outline={true}
                        />
                        <ControlButton
                            mode={BUTTON_TYPE.DANGER}
                            icon="pi pi-trash"
                            className="p-button-rounded p-button-text p-button-danger p-button-plain"
                            onClick={() => onDeleteRow(rowData, extValue)}
                            outline={true}
                        />
                    </div>);
                };
            `;
        }
        return ``;
    }
    const initialValues = (
        function () {
            const values = {} as any;
            renderColumns.forEach(col => {
                if (col?.controlType == 'switch') {
                    values[col.name as any] = false;
                } else if (col?.controlType == 'listRefMany' && col?.templates?.includes('react_form')) {
                    values[col.name as any] = [{}];
                } else if (col?.controlType == 'text') {
                    values[col.name as any] = '';
                } else {
                    values[col.name as any] = null;
                }
            });
            return values;
        }
    )();

    const renderLstConstantExport = lstConstantExport?.map(col => {
        return `${col?.dbName?.toString().toUpperCase()}_OPTION`;
    }).join(`, `);

    const contentFile = `import { ControlDataPicker, ControlButton, ControlDate, ControlDialog, ControlDropdown, ControlFile, ControlMultiSelect, ControlNumber,
ControlRadio, ControlSwitch, ControlText, ControlTextarea, OrgSelector, MultiOrgSelector, PartyOrgSelector, MultiPartyOrgSelector } from 'src/Components/Controls';
import { Panel } from 'primereact/panel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState, useRef } from 'react';
import { translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { IRootState } from 'src/Services/Reducers';
import { Utils } from 'src/Utils/Utils';
import { useFormik } from 'formik';
import * as yup from 'yup';
import _ from 'lodash';
import { BUTTON_SIZE, BUTTON_TYPE } from 'src/Enum/enums';
import { ${model.entityName}Model } from 'src/Services/Models/${model.entityName}Model';
import ${model.entityName}Service from 'src/Services/API/${model.entityEntryNameHyphen}.services';
${importUtils.toString()}
${lstConstantExport?.length ? `import { ${renderLstConstantExport} } from './constants'` : ''}
type I${model.entityName}FormProps = StateProps & DispatchProps & {
    afterSaveSuccess?: (resp?: any) => void,
    onHide?: () => void,
    ${columnPrimary}?: number
}

const ${model.entityName}Form = (props: I${model.entityName}FormProps) => {
    const ${model.entityName}FormRef = useRef<any>(null);
    const [title, setTitle] = useState(translate('${model.entityCamelName}.titleAdd'));
    const {
        values,
        setValues,
        errors,
        touched,
        setFieldValue,
        handleChange,
        handleSubmit
    } = useFormik({
        initialValues: {
            ${
            renderColumns.map(col => {
                const _prefix = col.name as any;
                if (col?.controlType == 'switch') {
                    return `${_prefix}: ${ col?.type == 'Long' ? undefined : false}`;
                } else if (col?.controlType == 'listRefMany' && col?.templates?.includes('react_form')) {
                    return `${_prefix}: [{}]`;
                } else if (col?.controlType == 'text') {
                    return `${_prefix}: ''`;
                } else {
                    return `${_prefix}: undefined`;
                }
            }).join(`,
            `)
            }
        } as ${model.entityName}Model,
        onSubmit: async (data: any) => {
            // somethings handle submit
            await onSubmit(data);
        },
        validationSchema: yup.object().shape({
            ${validationSchema}
        })
    });

    const onChange = async (fieldName: string, event: any, value: any) => {
        await setFieldValue(fieldName, value ?? null);
        if (event) {
            handleChange(event);
        }
    };

    const onSubmit = async (data: any) => {
        await Utils.confirmSaveOrUpdate(async () => {
            const resultSave = await ${model.entityName}Service.saveOrUpdate(data, props.${columnPrimary});
            if (resultSave.isSuccess()) {
                props.afterSaveSuccess && props.afterSaveSuccess(resultSave);
            }
        });
    }

    useEffect(() => {
        const loadData = async () => {
            if (props.${columnPrimary}) {
                const itemDetail = await ${model.entityName}Service.findById(props.${columnPrimary});
                if (itemDetail.isSuccess() && itemDetail.hasData()) {
                    setValues(itemDetail.getData());
                    setTitle(translate('${model.entityCamelName}.titleEdit'));
                } else {
                    props.onHide && props.onHide();
                }
            } else {
                setTitle(translate('${model.entityCamelName}.titleAdd'));
            }
            ${model.entityName}FormRef && ${model.entityName}FormRef.current.show();
        }
        loadData();
    }, []);

    const footer = () => {
        return (
            <>
                <div className="btn-group d-flex justify-content-center align-items-center">
                    <ControlButton
                        type="submit"
                        mode={BUTTON_TYPE.PRIMARY}
                        size={BUTTON_SIZE.MEDIUM}
                        label={translate("common.saveLabel")}
                        property="search"
                        icon="pi pi-save"
                        form="${model.entityName}Form"
                    />
                    <ControlButton
                        mode={BUTTON_TYPE.PRIMARY}
                        size={BUTTON_SIZE.MEDIUM}
                        label={translate("common.closeLabel")}
                        property="search"
                        icon="pi pi-times"
                        onClick={() => props.onHide && props.onHide()}
                        outline={true}
                    />
                </div>
            </>
        )
    }

    ${renderActionRefs()}

    return (
        <>
            <ControlDialog style={{ width: '70vw' }} ref={${model.entityName}FormRef} header={title} footer={footer} onHide={() => props.onHide && props.onHide()}>
                <form id='${model.entityName}Form' onSubmit={(event) => Utils.focusOnSubmitError(event, handleSubmit)}>
                    <div className="row">
                        ${formControls}
                    </div>
                </form>
            </ControlDialog>
        </>
    )
}

const mapStateToProps = ({ locale }: IRootState) => ({
    currentLocale: locale.currentLocale,
});

const mapDispatchToProps = {

};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    // @ts-ignore
)(${model.entityName}Form);
`;
UtilsFile.writeFile(`/web-app-political/src/Pages/${model.entityName}`, `/${model.entityName}Form.tsx`, contentFile);
};
