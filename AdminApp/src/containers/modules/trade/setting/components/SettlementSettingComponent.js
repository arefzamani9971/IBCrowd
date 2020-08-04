import React from 'react';
import Form from "../../../../../shared/components/form/pureForm";
import Grid from "@material-ui/core/Grid";
import { LocalizationProvider } from '@progress/kendo-react-intl';
import Button from '@material-ui/core/Button';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import { Grid as GridKendo, GridColumn as Column } from '@progress/kendo-react-grid';
import toastr from 'toastr';
import SettlementSettingService from '../services/SettlementSettingService';
import { getFlatSearchForAccountingCodeTemplate, getFlatSearchForAccountingCodeHeaderTemplate } from '../../../../../constants/autoCompleteTemplate';
import './SettlementSettingComponent.css';

class SettlementSettingComponent extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            settlemenSetting: {},
            accountCodeSettlement: {
                name: "selectedAccountCodeSettlement",
                field: "title",
                headerTemplate: getFlatSearchForAccountingCodeHeaderTemplate,
                template: getFlatSearchForAccountingCodeTemplate,
                placeholder: "جستجوی کدهای حساب های معین",
                fieldSearch: "phrase",
                additionalFilter: { level: [2] },
                label: "کد حساب واسط تسویه و پایاپای"
            },
            selectedAccountCodeSettlement: { title: '' },
            settlemenSettingGridData: [],
            disableBtnSettlement: true,
            skip: 0,
            take: 5,
        }
        this.addToGrid = this.addToGrid.bind(this);
        this.getFlatSearchForAccountingCode = this.getFlatSearchForAccountingCode.bind(this);
        this.getCurrentClearingAndSettlement = this.getCurrentClearingAndSettlement.bind(this);
        this.deleteTableCellMethod = this.deleteTableCellMethod.bind(this);
        this.deleteRowItem = this.deleteRowItem.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(value) {
        let item = value.value;
        this.setState({
            selectedAccountCodeSettlement: item
        }, () => {
            if (this.state.selectedAccountCodeSettlement.title != '') {
                this.setState({
                    disableBtnSettlement: false
                })
            }
        });

    }


    getFlatSearchForAccountingCode(code) {
        let command = {
            optionalFilter: {
                take: 100,
                page: 1,
            },
            reportFilter: {
                level: [2],
                phrase: code
            },
        }
        SettlementSettingService.getFlatSearchForAccountingCode(command, (response) => {
            if (response.success) {
                this.setState({
                    settlemenSettingGridData: response.result
                });
            }
        });
    }

    componentDidMount() {
        this.getCurrentClearingAndSettlement();
    }

    getCurrentClearingAndSettlement() {
        SettlementSettingService.getCurrentClearingAndSettlement(null, (response) => {
            let res = response.result;
            if (response.success) {
                this.setState({
                    settlemenSetting: res,
                }, () => {
                    if (this.state.settlemenSetting.tseClearingAndSettlementInterfaceAccount != null) {
                        this.getFlatSearchForAccountingCode(this.state.settlemenSetting.tseClearingAndSettlementInterfaceAccount);
                    }
                })
            }
        })
    }

    deleteTableCellMethod = (e) => {
        return (
            <td>
                <span class="fas fa-trash delete" style={{ color: 'red', cursor: 'pointer', fontSize: '15px', margin: '5px' }}
                    onClick={() => this.deleteRowItem(e.dataItem)}></span>
            </td>
        )
    }
    deleteRowItem = (item) => {
        for (let i = 0; i < this.state.settlemenSettingGridData.length; i++) {
            if (this.state.settlemenSettingGridData[i].code == item.code) {
                let gridData = this.state.settlemenSettingGridData;
                gridData.splice(i, 1);
                this.setState({
                    settlemenSettingGridData: gridData,
                    
                })

            }
        }
    }

    addToGrid() {
        this.setState({
            disableBtnSettlement: true
        });
        if (this.state.settlemenSettingGridData.length === 0) {
            this.setState({
                settlemenSettingGridData: this.state.settlemenSettingGridData.concat(this.state.selectedAccountCodeSettlement)
            })
        } else {
            toastr.error("کد حساب واسط تسویه و پایاپای در جدول وجود دارد");
        }
        this.setState({
            disableBtnSettlement: false,
            selectedAccountCodeSettlement: { title: '' }
        })

    }

    render() {
        return (
            <React.Fragment>
                <Form
                    service={SettlementSettingService.saveClearingAndSettlementSetting}
                    {...this.props}
                    {...this.state}
                    entity={
                        {
                            tseClearingAndSettlementInterfaceAccount: this.state.settlemenSettingGridData.map(item => { return item.code })[0],
                            dateFilter: {
                                startDate: new Date()
                            }
                        }
                    }
                    className="form-height"
                >
                    <Grid container spacing={16} className="no-margin">
                        <Grid item md={8}>
                            <AutoCompleteComponent {...this.state.accountCodeSettlement}
                                handleChange={(value) => this.handleChange(value)}
                                value={this.state.selectedAccountCodeSettlement.title}
                                service={SettlementSettingService.getFlatSearchForAccountingCode} />

                        </Grid>
                        <Grid item md={4}>
                            <Button variant="contained" className="margin-top-10 successButton"
                                onClick={this.addToGrid}
                                disabled={this.state.disableBtnSettlement}>
                                <span className="fa fa-plus margin-all-5"></span>
                                افزودن
                            </Button>
                        </Grid>

                    </Grid>
                    <div className="k-rtl">
                        <LocalizationProvider language="fa-FA">
                            <GridKendo
                                data={this.state.settlemenSettingGridData.slice(this.state.skip, this.state.skip + this.state.take)}
                                skip={this.state.skip}
                                take={this.state.take}
                                total={this.state.settlemenSettingGridData.length}
                            >
                                <Column field="title" title="عنوان" />
                                <Column field="code" title="کد حساب" />
                                <Column field="levelTitle" title="سطح" />
                                <Column title="حذف" cell={this.deleteTableCellMethod} width="100px" />
                            </GridKendo>
                        </LocalizationProvider>
                    </div>
                </Form>
            </React.Fragment>
        )
    }

}
export default SettlementSettingComponent;