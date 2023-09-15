import { BaseColumn } from './../../gencore/core/BaseColumn';
/**
 * Copyright (C) 2022 D2TSoftware. All rights reserved.
 * D2TSoftware PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
import { UtilsFile } from '../../gencore/core/UtilsFile';
import { BaseModel } from "../../gencore/core/BaseModel";

// module.js
export default function(model: BaseModel) {
    const renderColumns = model?.getNonePrimaryColumnByTemplate('react_search') || [];
    const lstConstantExport = renderColumns?.filter(col => col.options && col.options.length);

    const renderOptionControl = (col: BaseColumn) => {
        if (col?.options?.length) {
            return `${col?.dbName?.toString().toUpperCase()}_OPTION`;
        }
        return JSON.stringify([]);
    }

    const renderLstConstantExport = lstConstantExport?.map(col => {
        return `${col?.dbName?.toString().toUpperCase()}_OPTION`;
    }).join(`, `);

    const formControls = renderColumns?.map(col => {
        if (col?.controlType == 'partyOrganization') {
            return `
                <div className="col-12 col-md-6 col-lg-3 col-sm-12">
                    <ControlPartyOrganization
                        labelKey='partyOrg.parentParty'
                        property='${col.name}'
                        codeField='code'
                        nameField='name'
                        selectField='${col?.refModel?.refId}'
                        initialValue={_.get(values, '${col.name}')}
                        callbackValueChange={onChange}
                    />
                </div>
            `;
        } else if (col?.controlType == 'organization') {
            return `
                <div className="col-12 col-md-6 col-lg-3 col-sm-12">
                    <ControlOrg
                        labelKey="partyOrg.parentParty"
                        property='${col.name}'
                        codeField="code"
                        nameField='name'
                        selectField='${col?.refModel?.refId}'
                        filterCondition="curdate() BETWEEN effective_start_date and IFNULL(effective_end_date, curdate())"
                        initialValue={_.get(values, '${col.name}')}
                        callbackValueChange={onChange}
                    />
                </div>
            `;
        } else if (col?.controlType == 'multiOrganization') {
            return `
                <div className="col-12 col-md-6 col-lg-3 col-sm-12">
                    <ControlMultiOrg
                        labelKey="partyOrg.parentParty"
                        property='${col.name}'
                        codeField="code"
                        nameField='name'
                        selectField='${col?.refModel?.refId}'
                        filterCondition="curdate() BETWEEN effective_start_date and IFNULL(effective_end_date, curdate())"
                        initialValue={_.get(values, '${col.name}')}
                        callbackValueChange={onChange}
                    />
                </div>
            `;
        } else if (col?.controlType == 'select') {
            return `
                <div className="col-12 col-md-6 col-lg-3 col-sm-12">
                    <ControlDropdown
                        labelKey='${model.entityCamelName}.${col.name}'
                        property='${col.name}'
                        options={${renderOptionControl(col)}}
                        optionLabel='${col?.refModel?.refAttrs ? col?.refModel?.refAttrs[0]: 'name'}'
                        optionValue='${col?.refModel?.refId || 'id'}'
                        initialValue={_.get(values, '${col.name}')}
                        callbackValueChange={onChange}
                    />
                </div>
            `;
        } else if (col?.controlType == 'selectYearFromTo') {
            return `
                <div className="col-12 col-md-6 col-lg-3 col-sm-12">
                    <ControlDropdown
                        labelKey='${model.entityCamelName}.${col.name}From'
                        property='${col.name}From'
                        options={Utils.getYearList()}
                        optionLabel='year'
                        optionValue='year'
                        initialValue={_.get(values, '${col.name}From')}
                        callbackValueChange={onChange}
                    />
                </div>
                <div className="col-12 col-md-6 col-lg-3 col-sm-12">
                    <ControlDropdown
                        labelKey='${model.entityCamelName}.${col.name}To'
                        property='${col.name}To'
                        options={Utils.getYearList()}
                        optionLabel='year'
                        optionValue='year'
                        initialValue={_.get(values, '${col.name}To')}
                        callbackValueChange={onChange}
                    />
                </div>
            `;
        } else if (col?.controlType == 'dataPicker') {
            return `
                <div className="col-12 col-md-6 col-lg-3 col-sm-12">
                    <ControlDataPicker
                        labelKey='${model.entityCamelName}.${col.name}'
                        property='${col.name}'
                        codeField='${col?.refModel?.getModel()?.entityCamelName}Code'
                        nameField='${col?.refModel?.refAttrs ? col?.refModel?.refAttrs[0] : 'name'}'
                        selectField='${col?.refModel?.refId}'
                        placeholder="Nhập..."
                        codeLabel="codeLabel"
                        nameLabel="nameLabel"
                        initialValue={_.get(values, '${col.name}')}
                        callbackValueChange={onChange}
                    />
                </div>
            `;
        } else if (col?.controlType == 'dateFromTo') {
            return `
                <div className="col-12 col-md-6 col-lg-3 col-sm-12">
                    <ControlDate
                        labelKey='${model.entityCamelName}.${col.name}To'
                        property='${col.name}To'
                        dateFormat='dd/mm/yy'
                        initialValue={_.get(values, '${col.name}To')}
                        callbackValueChange={onChange}
                    />
                </div>
                <div className="col-12 col-md-6 col-lg-3 col-sm-12">
                    <ControlDate
                        labelKey='${model.entityCamelName}.${col.name}From'
                        property='${col.name}From'
                        dateFormat='dd/mm/yy'
                        initialValue={_.get(values, '${col.name}From')}
                        callbackValueChange={onChange}
                    />
                </div>
            `;
        } else if (col?.controlType == 'date' || col?.controlType == 'datetime') {
            return `
                <div className="col-12 col-md-6 col-lg-3 col-sm-12">
                    <ControlDate
                        labelKey='${model.entityCamelName}.${col.name}'
                        property='${col.name}'
                        dateFormat='dd/mm/yy'
                        initialValue={_.get(values, '${col.name}')}
                        callbackValueChange={onChange}
                    />
                </div>
            `;
        } else if (col?.controlType == 'number') {
            return `
                <div className="col-12 col-md-6 col-lg-3 col-sm-12">
                    <ControlNumber
                        labelKey='${model.entityCamelName}.${col.name}'
                        property='${col.name}'
                        initialValue={_.get(values, '${col.name}')}
                        callbackValueChange={onChange}
                    />
                </div>
            `;
        } else if (col?.controlType == 'radio') {
            return `
                <div className="col-12 col-md-6 col-lg-3 col-sm-12">
                    <ControlRadio
                        labelKey='${model.entityCamelName}.${col.name}'
                        property='${col.name}'
                        optionlabel='name'
                        optionvalue='id'
                        datasource={[
                            {
                                id: 1,
                                name: "Male"
                            },
                            {
                                id: 2,
                                name: "Female"
                            },
                            {
                                id: 3,
                                name: "Other"
                            }
                        ]}
                        initialValue={_.get(values, '${col.name}')}
                        callbackValueChange={onChange}
                    />
                </div>
            `;
        } else if (col?.controlType == 'switch') {
            return `
                <div className="col-12 col-md-6 col-lg-3 col-sm-12">
                    <ControlSwitch
                        labelKey='${model.entityCamelName}.${col.name}'
                        property='${col.name}'
                        initialValue={_.get(values, '${col.name}')}
                        callbackValueChange={onChange}
                    />
                </div>
            `;
        } else {
            return `
                <div className="col-12 col-md-6 col-lg-3 col-sm-12">
                    <ControlText
                        labelKey='${model.entityCamelName}.${col.name}'
                        property='${col.name}'
                        initialValue={_.get(values, '${col.name}')}
                        callbackValueChange={onChange}
                    />
                </div>
            `;
        }
    }).join(``);

    const initialValues = () => {
        const values = {} as any;
        renderColumns.forEach(col => {
            const _prefix = col.name as any
            if (col?.controlType == 'switch') {
                values[_prefix] = false;
            } else if (col?.controlType == 'listRefMany' && col?.templates?.includes('react_search')) {
                values[_prefix] = [{}];
            } else if (col?.controlType == 'text') {
                values[_prefix] = '';
            } else if (col?.controlType == 'dateFromTo' || col?.controlType == 'selectYearFromTo') {
                const fromToValue = [] as any;
                fromToValue.push[`${_prefix}From`];
                fromToValue.push[`${_prefix}To`];
                return fromToValue.map((item: any) => `${item}: null`);
            } else {
                values[_prefix] = null;
            }
        });
        return values;
    };

    const contentFile = `import { useEffect } from 'react';
import { ControlDataPicker, ControlMultiOrg, ControlOrg, ControlPartyOrganization,
ControlButton, ControlDate, ControlDialog, ControlDropdown, ControlFile, ControlMultiSelect, ControlNumber,
ControlRadio, ControlText, ControlTextarea, OrgSelector, MultiOrgSelector, PartyOrgSelector, MultiPartyOrgSelector } from 'src/Components/Controls';
import { IRootState } from 'src/Services/Reducers';
import { connect } from 'react-redux';
import { Utils } from 'src/Utils/Utils';
import { Panel } from 'primereact/panel';
import { useFormik } from 'formik';
import {
    handleSearch${model.entityName},
    handleUpdateFormSearch
} from 'src/Services/Reducers/${model.entityEntryNameHyphen}.reducers';
import { translate } from 'react-jhipster';
import * as yup from 'yup';
import _ from 'lodash';
${lstConstantExport?.length ? `import { ${renderLstConstantExport} } from './constants'` : ''}
type I${model.entityName}SearchProps = StateProps & DispatchProps & {
    onAdd?: Function;
}

const ${model.entityName}Search = (props: I${model.entityName}SearchProps) => {

    /**
     * Action tìm kiếm
     */
    const doSearch = async (data?: any) => {
        await props.handleSearch${model.entityName}(data);
    }

    const {values, setFieldValue, handleChange, handleSubmit,} = useFormik({
        initialValues: {
            ${
            renderColumns.map(col => {
                const _prefix = col.name as any;
                if (col?.controlType == 'switch') {
                    return `${_prefix}: false`;
                } else if (col?.controlType == 'listRefMany' && col?.templates?.includes('react_search')) {
                    return `${_prefix}: [{}]`;
                } else if (col?.controlType == 'text') {
                    return `${_prefix}: ''`;
                } else if (col?.controlType == 'dateFromTo' || col?.controlType == 'selectYearFromTo') {
                    const fromToValue = [`${_prefix}From`, `${_prefix}To`] as Array<string>;
                    return fromToValue.map((item: string) => `${item as string}: null`).join(`,
            `);
                } else {
                    return `${_prefix}: null`;
                }
            }).join(`,
            `)
            }
        },
        onSubmit: async (data: any) => {
            await doSearch(data);
        }
    });

    const onChange = async (fieldName: string, evt: any, value: any) => {
        const _temp = _.cloneDeep(values) as any;
        _temp[fieldName] = value;
        props.handleUpdateFormSearch(_temp);
        await setFieldValue(fieldName, value ?? null);
        if (evt) {
            handleChange(evt);
        }
    };

    const footer = (
        <div className='w-100 vt-area-button'>
            <ControlButton
                type='submit'
                form='${model.entityCamelName}-search'
                size='small'
                label={translate('common.searchLabel')}
                property='search'
                icon='pi pi-search'
                autoFocus
            />
            <ControlButton
                size='small'
                label='Thêm mới'
                icon='pi pi-plus'
                onClick={() => props.onAdd && props.onAdd()}
                outline={true}
            />
            <ControlButton
                type='button'
                size='small'
                label='Lưu bộ lọc'
                property='search'
                icon='pi pi-briefcase'
                outline={true}
            />
        </div>
    );

    useEffect(() => {
        doSearch();
    }, []);



    return (
        <>
            <Panel header={translate('partyOrg.titleSearch')}>
                <form id='${model.entityCamelName}-search' onSubmit={(e) => Utils.focusOnSubmitError(e, handleSubmit)}>
                    <div className='row'>
                        ${formControls}
                    </div>
                </form>
            { footer }
        </Panel>
        </>
    )
}

const mapStateToProps = ({ locale }: IRootState) => ({
    currentLocale: locale.currentLocale,
});

const mapDispatchToProps = {
    handleSearch${model.entityName},
    handleUpdateFormSearch
};


type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    // @ts-ignore
)(${model.entityName}Search);
`

UtilsFile.writeFile(`/web-app-political/src/Pages/${model.entityName}`, `/${model.entityName}Search.tsx`, contentFile);
};
