import React, { Component } from 'react';
import './UpdateDividendTimingListComponent.css';
import Header from 'shared/components/stateHeader/stateHeader';
import Fieldset from 'shared/components/fieldset/fieldset';
import Grid from '@material-ui/core/Grid';
import Form from 'shared/components/form/form';

import DividendTimingListService from '../services/DividendTimingListService';
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Paper from '@material-ui/core/Paper';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import Button from '@material-ui/core/Button';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import Columns from '../constants/UpdateDividendTimingListColumn';
import Input from 'shared/components/formInput/inputForm';


class EditDividendTimingList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statusGroup: {
                name: "selectedStatusGroup",
                field: "title",
                label: "وضعیت مجمع",
                list: []
            },
            selectedStatusGroup: {},

            customerGroup: {
                name: "selectedCustomerGroup",
                field: "title",
                label: "نوع مشتری ",
                list: []
            },
 
            selectedCustomerGroup: {},
    
            customerTypeGroup: {
                name: "selectedCustomerTypeGroup",
                field: "title",
                label: "نوع مشتری ",
                list: []
            },
  
            selectedCustomerGroup: {},
  
            bank: {
                name: "selectedBank",
                field: "title",
                label: " بانک ",
                list: []
            },
   
            selectedBank: {},
            
            symbolGroup: {
                name: "selectedSymbolGroup",
                field: "title",
                label: "نماد",
                list: []
            },
            selectedSymbolGroup: {},
            customerType: {
                name: "selectedCustomerType",
                field: "title",
                label: "نوع مشتری",
                list: []
            },
            selectedCustomerType: {},
     
            statusType: {
                name: "selectedStatusType",
                field: "title",
                label: " وضعیت بررسی",
                list: []
            },
       
            selectedStatusType: {},
            open: false,
        };
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleChangeCustomer = this.handleChangeCustomer.bind(this);
        this.handleChangeCustomerType = this.handleChangeCustomerType.bind(this);
        this.handleChangeBank = this.handleChangeBank.bind(this);


    }


    handleChangeStatus(value, name) {
        let item = value.value
        this.setState({
            [name]: item
        })
    };
    handleChangeCustomer(value, name) {
        let item = value.value
        this.setState({
            [name]: item
        })
    };
    handleChangeCustomerType(value, name) {
        let item = value.value
        this.setState({
            [name]: item
        })
    };
    handleChangeBank(value, name) {
        let item = value.value
        this.setState({
            [name]: item
        })
    };

    handleDate = (value, name) => {
        this.setState({
            [name]: value
        })
    };


    handleChange = (value, name) => {
        let item = value.value;
        this.setState({
            [name]: item
        });
    };

    excelReportHandler = () => {
        var command = {
            reportFilter: {

                id: null,
                symbol: this.state.selectedSymbolGroup,
                fromDate: this.state.fromDate,
                toDate: this.state.toDate

            },
            sort: [
                {
                    field: "created",
                    dir: "desc"
                }
            ]
        };
        DividendTimingListService.getExcelExport(command, 'تعدیلات قیمت');

    }

    changeStatus() {
        console.log("is done :  : : ");

    }
    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    entity={
                        {

                        }
                    }

                    className="form-height"
                >


                    <Fieldset legend={'مجمع عمومی'}>




                        <Grid container spacing={12}>
                            <Grid item md={2}>نماد</Grid>
                            <Grid item md={4}>11111</Grid>
                            <Grid item md={2}>شناسه</Grid>
                            <Grid item md={4}>22222</Grid>
                        </Grid>
                        <Grid container spacing={12}>
                            <Grid item md={2}>شماره پیگیری</Grid>
                            <Grid item md={4}>33333</Grid>
                            <Grid item md={2}>کد اطلاعیه</Grid>
                            <Grid item md={4}>44444</Grid>
                        </Grid>
                    </Fieldset>

                    <Fieldset legend={'وضعیت مجمع '}>
                        <Grid container spacing={12} justify="space-between">
                            <Grid item md={4}>
                                <div className="k-rtl">
                                    <DropDownComponent {...this.state.statusGroup}
                                        handleChange={(value, name) => this.handleChangeStatus(value, name)} isFilterable={true}
                                        value={this.state.selectedStatusGroup} required />
                                </div>
                            </Grid>

                            <Button
                                type="button"

                                onClick={() => this.changeStatus()}
                                variant="contained"
                                color="primary"
                                className="float-left">
                                تغییر وضعیت مجمع
                                            </Button>

                        </Grid>
                    </Fieldset>
                    <Grid container className="mt-2" spacing={3} justify="space-between">
                        <Grid item md={3}>
                            <div className="k-rtl">
                                <DropDownComponent {...this.state.customerGroup}
                                    handleChange={(value, name) => this.handleChangeCustomer(value, name)} isFilterable={true}
                                    value={this.state.selectedCustomerGroup} required />
                            </div>
                        </Grid>

                        <Grid item md={3}>
                            <PersianDatePicker selectedDate={this.state.fromDate} label=" تاریخ شروع دریافت سود" handleOnChange={(value) => this.handleDate(value, 'fromDate')} />
                        </Grid>
                        <Grid item md={3}>
                            <PersianDatePicker selectedDate={this.state.toDate} label="تاریخ پایان دریافت سود " handleOnChange={(value) => this.handleDate(value, 'toDate')} />
                        </Grid>
                    </Grid>


                    <Grid container className="mt-2" spacing={3} justify="space-between">
                        <Grid item md={3}>
                            <NumberFormatComponent id="groupLength" label=" تعداد سهام از
 "

                                handleChange={(value, error) => this.handleChange(value, 'groupLength')} type="number" format={'##'} />
                        </Grid>
                        <Grid item md={3}>
                            <NumberFormatComponent id="generalLedgerCodeLength" label="  تعداد سهام تا"
                                handleChange={(value, error) => this.handleChange(value, 'generalLedgerCodeLength')} type="number" format={'##'} />
                        </Grid>

                        <Grid item md={3}>
                            <div className="k-rtl">
                                <DropDownComponent {...this.state.customerTypeGroup}
                                    handleChange={(value, name) => this.handleChangeCustomerType(value, name)} isFilterable={true}
                                    value={this.state.selectedCustomerTypeGroup} required />
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container className="mt-2" spacing={3} justify="space-between">
                        <Grid item md={3}>
                            <div className="k-rtl">
                                <DropDownComponent {...this.state.bank}
                                    handleChange={(value, name) => this.handleChangeBank(value, name)} isFilterable={true}
                                    value={this.state.selectedBank} required />
                            </div>
                        </Grid>
                    </Grid>



                    <div className="mt-4">

                        <GridServer
                            {...this.props}
                            {...this.state}
                            sort={[
                                {
                                    field: "created",
                                    dir: "desc"
                                }
                            ]}
                            reloadColumnAfterGet
                            service={DividendTimingListService.getAllDividendTimingList}
                            Columns={Columns}
                            reportFilter={
                                {
                                    id: null,
                                    symbol: this.state.selectedSymbolGroup,
                                    fromDate: this.state.fromDate,
                                    toDate: this.state.toDate
                                }
                            }
                            callServiceAgain
                            requestToService={false}
            noSearch={true}
                            reRender
                            classMainHeightOpenPanel={"main-paper-container-server-open"}
                            hasToolbar={{ haveExcelPfdReport: { excelReportHandler: this.excelReportHandler } }}
                            className="mt-5"
                        >
                        </GridServer>
                    </div>





                </Form>




















            </React.Fragment>);
    }
}

export default EditDividendTimingList;