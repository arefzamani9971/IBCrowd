import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import moment from 'moment';
import PropTypes from 'prop-types';
///////////////////////////////////////////////////////////////////////////////////
import Fieldset from 'shared/components/fieldset/fieldset';
import Header from 'shared/components/stateHeader/stateHeader';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import styles from 'containers/layout/panel/theme';
import Form from 'shared/components/form/form';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import GetEnum from 'services/getEnum';
import AdjustedPriceListService from '../../adjustedPriceList/services/AdjustedPriceListService';
///////////////////////////////////////////////////////////////////////////////////
import GetIndexService from "../services/GetIndexService";
import UpdateIndexService from "../services/UpdateIndexService";

class UpdateIndexComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            generalAssemblyInfo: {},
            confirmModal: false,
            adjustedPriceValue: 0,
            adjustedLastPriceValue: 0,
            assemblyStatus: {
                name: "selectedAssemblyStatus",
                field: "title",
                label: "وضعیت مجمع",
                list: []
            },
            selectedAssemblyStatus: { title: null, code: null },
            assemblyType: {
                name: "selectedAssemblyType",
                field: "title",
                label: "نوع مجمع",
                list: []
            },
            selectedAssemblyType: { title: null, code: null },
            capitalChangeType: {
                name: "selectedCapitalChangeType",
                field: "title",
                label: "نوع افزایش سرمایه",
                list: []
            },
            selectedCapitalChangeType: { title: null, code: null },
            capitalChangePercent: 0,
            dividendPerShare: 0,
            lastShareValue: 0,
            date: null,
            sessionDate: null,
            lastShareCount: 0,
            newShareCount: 0,
            newShareValue: 0,
            preTracingNo: {
                name: "selectedPreTracingNo",
                field: "title",
                label: "شماره پیگیری قبلی",
                list: []
            },
            selectedPreTracingNo: { title: null, code: null },
            cashIncoming: 0,
            cashIncomingPercent: 0,
            retaindedEarning: 0,
            retaindedEarningPercent: 0,
            reserves: 0,
            reservesPercent: 0,
            revaluationSurplus: 0,
            revaluationSurplusPercent: 0,
            spendStock: 0,
            spendStockPercent: 0,
            previousCapital: 0,
            newCapital: 0,
            isRegistered: false,
            isAccept: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
    }

    componentDidMount() {
        var tracingNo = this.props.location.state.tracingNo;
        GetIndexService.getStatement(tracingNo, (res) => {
            this.setValueForUpdate(res);
        })
    }

    setValueForUpdate(res) {
        this.setState({
            generalAssemblyInfo: res,
            capitalChangePercent: res.capitalChangePercent,
            dividendPerShare: res.dividendPerShare,
            lastShareValue: res.lastShareValue,
            date: res.date,
            sessionDate: res.sessionDate,
            lastShareCount: res.lastShareCount,
            newShareCount: res.newShareCount,
            newShareValue: res.newShareValue,
            cashIncoming: res.cashIncoming,
            cashIncomingPercent: res.cashIncomingPercent,
            retaindedEarning: res.retaindedEarning,
            retaindedEarningPercent: res.retaindedEarningPercent,
            reserves: res.reserves,
            reservesPercent: res.reservesPercent,
            revaluationSurplus: res.revaluationSurplus,
            revaluationSurplusPercent: res.revaluationSurplusPercent,
            spendStock: res.spendStock,
            spendStockPercent: res.spendStockPercent,
            previousCapital: res.previousCapital,
            newCapital: res.newCapital,
            isRegistered: res.isRegistered,
            isAccept: res.isAccept
        }, () => {
            let { assemblyType, assemblyStatus, capitalChangeType } = this.state;
            GetEnum('AssemblyType', response => {
                assemblyType.list = response
                this.setState({
                    selectedAssemblyType: response.filter(item => item.code == res.assemblyType)[0],
                    assemblyType
                })
            });
            GetEnum('AssemblyStatus', response => {
                assemblyStatus.list = response
                this.setState({
                    selectedAssemblyStatus: response.filter(item => item.code == res.status)[0],
                    assemblyStatus
                })
            });
            GetEnum('CapitalChangeType', response => {
                capitalChangeType.list = response
                this.setState({
                    selectedCapitalChangeType: response.filter(item => item.code == res.capitalChangeType)[0],
                    capitalChangeType
                })
            });
        });
    }
    handleChange(value, name) {
        let item = value.value;
        this.setState({
            [name]: item
        })
    }
    handleDate(value, name) {
        this.setState({
            [name]: value
        })
    }
    handleCheckChange(event, name) {
        this.setState({
            [name]: event.target.checked,
        })
    }
    submitAdjustedPrice = () => {
        // GetIndexService.updateStatement();

        // var command = {
        //     entity:
        //         this.findItem()
        // }
        // GetSettlementVoucherService.submitAdjustedPrice(command, this.successConfirm)
    }
    handleCloseConfirmModal = () => {
        this.setState({
            confirmModal: false
        });
    }
    openModal = () => {
        var that = this;
        var then = function (res) {
            that.setState({
                adjustedPriceValue: res.adjustedPriceValue,
                adjustedLastPriceValue: res.adjustedLastPriceValue,
            }, () => {
                that.openConfirmModal();
            });
        };
        AdjustedPriceListService.calculateAdjustedPrice(this.state.generalAssemblyInfo.tracingNo, then);
    }
    openConfirmModal() {
        this.setState({ confirmModal: true });
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Form
                    {...this.props}
                    {...this.state}
                    entity={
                        {
                            tracingNo: this.state.generalAssemblyInfo.tracingNo,
                            ////////////////////////////////////////////////////////////////////////
                            assemblyType: this.state.selectedAssemblyType.code ? this.state.selectedAssemblyType.code : null,
                            status: this.state.selectedAssemblyStatus.code ? this.state.selectedAssemblyStatus.code : null,
                            capitalChangeType: (this.state.selectedCapitalChangeType.code || this.state.selectedCapitalChangeType.code == 0) ? this.state.selectedCapitalChangeType.code : null,
                            capitalChangePercent: parseFloat(this.state.capitalChangePercent),
                            dividendPerShare: parseFloat(this.state.dividendPerShare),
                            lastShareValue: parseFloat(this.state.lastShareValue),
                            date: this.state.date,
                            sessionDate: this.state.sessionDate,
                            lastShareCount: parseFloat(this.state.lastShareCount),
                            newShareCount: parseFloat(this.state.newShareCount),
                            newShareValue: parseFloat(this.state.newShareValue),
                            preTracingNo: this.state.selectedPreTracingNo.code ? this.state.selectedPreTracingNo.code : null,
                            cashIncoming: parseFloat(this.state.cashIncoming),
                            cashIncomingPercent: parseFloat(this.state.cashIncomingPercent),
                            retaindedEarning: parseFloat(this.state.retaindedEarning),
                            retaindedEarningPercent: parseFloat(this.state.retaindedEarningPercent),
                            reserves: parseFloat(this.state.reserves),
                            reservesPercent: parseFloat(this.state.reservesPercent),
                            revaluationSurplus: parseFloat(this.state.revaluationSurplus),
                            revaluationSurplusPercent: parseFloat(this.state.revaluationSurplusPercent),
                            spendStock: parseFloat(this.state.spendStock),
                            spendStockPercent: parseFloat(this.state.spendStockPercent),
                            previousCapital: parseFloat(this.state.previousCapital),
                            newCapital: parseFloat(this.state.newCapital),
                            isRegistered: this.state.isRegistered,
                            isAccept: this.state.isAccept
                        }
                    }
                    service={GetIndexService.updateStatement}
                    disabled={
                        (this.state.selectedAssemblyType.code == null || this.state.selectedAssemblyType.code == undefined) ||
                        (this.state.selectedAssemblyStatus.code == null || this.state.selectedAssemblyStatus.code == undefined) ||
                        (this.state.selectedCapitalChangeType.code == null || this.state.selectedCapitalChangeType.code == undefined) ||
                        (this.state.capitalChangePercent == '' || this.state.capitalChangePercent == null || this.state.capitalChangePercent == undefined) ||
                        (this.state.dividendPerShare == '' || this.state.dividendPerShare == null || this.state.dividendPerShare == undefined) ||
                        (this.state.lastShareValue == '' || this.state.lastShareValue == null || this.state.lastShareValue == undefined) ||
                        (this.state.lastShareCount == '' || this.state.lastShareCount == null || this.state.lastShareCount == undefined) ||
                        (this.state.newShareValue == '' || this.state.newShareValue == null || this.state.newShareValue == undefined) ||
                        (this.state.cashIncoming == '' || this.state.cashIncoming == null || this.state.cashIncoming == undefined) ||
                        (this.state.cashIncomingPercent == '' || this.state.cashIncomingPercent == null || this.state.cashIncomingPercent == undefined) ||
                        (this.state.retaindedEarning == '' || this.state.retaindedEarning == null || this.state.retaindedEarning == undefined) ||
                        (this.state.retaindedEarningPercent == '' || this.state.retaindedEarningPercent == null || this.state.retaindedEarningPercent == undefined) ||
                        (this.state.reserves == '' || this.state.reserves == null || this.state.reserves == undefined) ||
                        (this.state.reservesPercent == '' || this.state.reservesPercent == null || this.state.reservesPercent == undefined) ||
                        (this.state.spendStock == '' || this.state.spendStock == null || this.state.spendStock == undefined) ||
                        (this.state.spendStockPercent == '' || this.state.spendStockPercent == null || this.state.spendStockPercent == undefined) ||
                        (this.state.previousCapital == '' || this.state.previousCapital == null || this.state.previousCapital == undefined) ||
                        (this.state.newCapital == '' || this.state.newCapital == null || this.state.newCapital == undefined)
                    }
                    // dontShowPrimaryButton={true}
                    // otherAction={[
                    //     {
                    //         color: "#43a047",
                    //         title: 'ثبت',
                    //         action: {
                    //             isSubmit: false,
                    //             method: this.openModal
                    //         }
                    //     }
                    // ]}
                    className="form-height pb-4">
                    <Fieldset style={{ paddingRight: 15, paddingLeft: 15, paddingBottom: 15, marginBottom: 15 }} legend={'مجمع عمومی'}>
                        <Grid className="mb-3" style={{ marginTop: -20 }} container spacing={8}>
                            <Grid item md={2}>نماد</Grid>
                            <Grid item md={4} className="text-center">{this.state.generalAssemblyInfo.symbolTitle} - {this.state.generalAssemblyInfo.symbol}</Grid>
                            <Grid item md={2}>شناسه</Grid>
                            <Grid item md={4} className="text-center">{this.state.generalAssemblyInfo.isin}</Grid>
                        </Grid>
                        <Grid container spacing={8} className="pl-3">
                            <Grid item md={2}>شماره پیگیری</Grid>
                            <Grid item md={4} className="text-center">{this.state.generalAssemblyInfo.tracingNo}</Grid>
                            <Grid item md={2}>کد اطلاعیه</Grid>
                            <Grid item md={4} className="text-center">{this.state.generalAssemblyInfo.statementId}</Grid>
                        </Grid>
                    </Fieldset>
                    <Grid container spacing={8} className="pl-3 mt-4">
                        <Grid item md={3}>
                            <div className="k-rtl">
                                <DropDownComponent
                                    {...this.state.assemblyType} required
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedAssemblyType} />
                            </div>
                        </Grid>
                        <Grid item md={3}>
                            <div className="k-rtl">
                                <DropDownComponent
                                    {...this.state.assemblyStatus} required
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedAssemblyStatus} />
                            </div>
                        </Grid>
                        <Grid item md={3}>
                            <div className="k-rtl">
                                <DropDownComponent
                                    {...this.state.capitalChangeType} required
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedCapitalChangeType} />
                            </div>
                        </Grid>
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="" label="درصد افزایش سرمایه"
                                value={this.state.capitalChangePercent}
                                handleChange={(value, error) => this.handleChange(value, 'capitalChangePercent')}
                                type="number" required
                                isSeparator={true} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-4">
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="" label="سود هر سهم"
                                value={this.state.dividendPerShare}
                                handleChange={(value, error) => this.handleChange(value, 'dividendPerShare')}
                                type="number" required
                                isSeparator={true} />
                        </Grid>
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="" label="ارزش اسمی هر سهم"
                                value={this.state.lastShareValue}
                                handleChange={(value, error) => this.handleChange(value, 'lastShareValue')}
                                type="number" required
                                isSeparator={true} />
                        </Grid>
                        <Grid item md={3}>
                            <PersianDatePicker label="تاریخ" handleOnChange={(value) => this.handleDate(value, 'date')} selectedDate={this.state.date} />
                        </Grid>
                        <Grid item md={3}>
                            <PersianDatePicker label="تاریخ جلسه" handleOnChange={(value) => this.handleDate(value, 'sessionDate')} selectedDate={this.state.sessionDate} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-4">
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="" label="آخرین تعداد سهام"
                                value={this.state.lastShareCount}
                                handleChange={(value, error) => this.handleChange(value, 'lastShareCount')}
                                type="number" required
                                isSeparator={true} />
                        </Grid>
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="" label="تعداد سهام جدید"
                                value={this.state.newShareCount}
                                handleChange={(value, error) => this.handleChange(value, 'newShareCount')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="" label="ارزش اسمی جدید"
                                value={this.state.newShareValue}
                                handleChange={(value, error) => this.handleChange(value, 'newShareValue')}
                                type="number" required
                                isSeparator={true} />
                        </Grid>
                        <Grid item md={3}>
                            <div className="k-rtl">
                                <DropDownComponent
                                    {...this.state.preTracingNo}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedPreTracingNo} />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-4">
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="" label="آورده نقدی"
                                value={this.state.cashIncoming}
                                handleChange={(value, error) => this.handleChange(value, 'cashIncoming')}
                                type="number" required
                                isSeparator={true} />
                        </Grid>
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="" label="درصد آورده نقدی"
                                value={this.state.cashIncomingPercent}
                                handleChange={(value, error) => this.handleChange(value, 'cashIncomingPercent')}
                                type="number" required
                                isSeparator={true} />
                        </Grid>
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="" label="سود انباشته"
                                value={this.state.retaindedEarning}
                                handleChange={(value, error) => this.handleChange(value, 'retaindedEarning')}
                                type="number" required
                                isSeparator={true} />
                        </Grid>
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="" label="درصد سود انباشته"
                                value={this.state.retaindedEarningPercent}
                                handleChange={(value, error) => this.handleChange(value, 'retaindedEarningPercent')}
                                type="number" required
                                isSeparator={true} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-4">
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="" label="سود اندوخته"
                                value={this.state.reserves}
                                handleChange={(value, error) => this.handleChange(value, 'reserves')}
                                type="number" required
                                isSeparator={true} />
                        </Grid>
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="" label="درصد سود اندوخته"
                                value={this.state.reservesPercent}
                                handleChange={(value, error) => this.handleChange(value, 'reservesPercent')}
                                type="number" required
                                isSeparator={true} />
                        </Grid>
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="" label="مازاد تجدید ارزیابی دارایی‌ها"
                                value={this.state.revaluationSurplus}
                                handleChange={(value, error) => this.handleChange(value, 'revaluationSurplus')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="" label="درصد مازاد تجدید ارزیابی دارایی‌ها"
                                value={this.state.revaluationSurplusPercent}
                                handleChange={(value, error) => this.handleChange(value, 'revaluationSurplusPercent')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-4">
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="" label="صرف سهام"
                                value={this.state.spendStock}
                                handleChange={(value, error) => this.handleChange(value, 'spendStock')}
                                type="number" required
                                isSeparator={true} />
                        </Grid>
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="" label="درصد صرف سهام"
                                value={this.state.spendStockPercent}
                                handleChange={(value, error) => this.handleChange(value, 'spendStockPercent')}
                                type="number" required
                                isSeparator={true} />
                        </Grid>
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="" label="سهام قبلی"
                                value={this.state.previousCapital}
                                handleChange={(value, error) => this.handleChange(value, 'previousCapital')}
                                type="number" required
                                isSeparator={true} />
                        </Grid>
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="" label="سرمایه فعلی"
                                value={this.state.newCapital}
                                handleChange={(value, error) => this.handleChange(value, 'newCapital')}
                                type="number" required
                                isSeparator={true} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-4">
                        <Grid item md={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox className="ml-1"
                                        checked={this.state.isRegistered}
                                        onChange={(value) => this.handleCheckChange(value, 'isRegistered')}
                                        color="primary" />
                                }
                                label="ثبت شده؟" />
                        </Grid>
                        <Grid item md={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox className="ml-1"
                                        checked={this.state.isAccept}
                                        onChange={(value) => this.handleCheckChange(value, 'isAccept')}
                                        color="primary" />
                                }
                                label="پذیرفته شده؟" />
                        </Grid>
                    </Grid>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.confirmModal}
                        onClose={(e) => this.handleCloseConfirmModal(e)}>
                        <Paper className="paper-modal">
                            <h3>
                                <span style={{ marginRight: '5px' }}>محاسبه تعدیل قیمت</span>
                            </h3>
                            <hr />
                            <Grid container spacing={8} className="pl-3 mt-3">
                                <Grid item md={6}>قیمت تعدیل شده</Grid>
                                <Grid item md={6}>آخرین قیمت تعدیل شده</Grid>
                            </Grid>
                            <Grid container spacing={8} className="pl-3 mb-3">
                                <Grid item md={6}>
                                    <NumberFormatComponent
                                        id="" label="قیمت تعدیل شده"
                                        value={this.state.adjustedPriceValue}
                                        handleChange={(value, error) => this.handleChange(value, 'adjustedPriceValue')}
                                        type="number"
                                        isSeparator={true} />
                                </Grid>
                                <Grid item md={6}>
                                    <NumberFormatComponent
                                        id="" label="آخرین قیمت تعدیل شده"
                                        value={this.state.adjustedLastPriceValue}
                                        handleChange={(value, error) => this.handleChange(value, 'adjustedLastPriceValue')}
                                        type="number"
                                        isSeparator={true} />
                                </Grid>
                            </Grid>
                            <hr />
                            <Button variant="contained" color="secondary" style={{ backgroundColor: 'green', color: '#FFF' }} onClick={this.submitAdjustedPrice}>
                                ثبت
                        </Button>
                            <Button variant="contained" color="secondary" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={(e) => this.handleCloseConfirmModal(e)}>
                                انصراف
                        </Button>
                        </Paper>
                    </Modal>
                </Form>
            </React.Fragment>
        )
    }

}

UpdateIndexComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateIndexComponent);