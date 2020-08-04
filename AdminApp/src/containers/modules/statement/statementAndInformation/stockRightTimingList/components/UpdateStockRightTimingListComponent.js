import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from 'shared/components/formInput/inputForm'
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import Fieldset from 'shared/components/fieldset/fieldset';
import Header from 'shared/components/stateHeader/stateHeader';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import styles from 'containers/layout/panel/theme';
import Form from 'shared/components/form/form';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import moment from 'moment';
import GetEnum from 'services/getEnum';
import GetStockRightTimingListService from "../services/GetStockRightTimingListService";
import DropDownListDataProvider from "../../../../../../core/dropDownListDataProvider";
import ComboBoxServerSideBest from "../../../../../../shared/components/dropDown/comboBox/serverSideComboBox";
import UpdateStockRightTimingListService from "../services/UpdateStockRightTimingListService";

class UpdateStockRightTimingListComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stockRightTimingInfo: {},
            reviewStatusType: {
                name: "selectedReviewStatusType",
                field: "title",
                label: "وضعیت مجمع",
                list: []
            },
            selectedReviewStatusType: { code: 0, title: '' },
            accountNumber: '',
            fromDate: null,
            toDate: null
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        var tracingNo = this.props.location.state.tracingNo;
        GetStockRightTimingListService.getStockRightTiming(tracingNo, (res) => {
            this.setValueForUpdate(res);
        })
    }
    setValueForUpdate(res) {
        this.setState({
            stockRightTimingInfo: res,
            accountNumber: res.accountNumber,
            fromDate: res.fromDate,
            toDate: res.toDate
        }, () => {
            let { reviewStatusType } = this.state;
            GetEnum('ReviewStatusType', response => {
                reviewStatusType.list = response
                this.setState({
                    selectedReviewStatusType: response.filter(item => item.code == res.state)[0],
                    reviewStatusType
                })
            });
        });
    }
    handleDate(value, name) {
        this.setState({
            [name]: value
        })
    }
    handleChange(value, name) {
        let item = value.value;
        this.setState({
            [name]: item
        })
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
                            id: this.state.stockRightTimingInfo.id,
                            tracingNo: this.state.stockRightTimingInfo.tracingNo,
                            isin: this.state.stockRightTimingInfo.isin,
                            statementDate: this.state.stockRightTimingInfo.statementDate,
                            ////////////////////////////////////////////////////////////////////////
                            state: this.state.selectedReviewStatusType.code ? this.state.selectedReviewStatusType.code : null,
                            accountNumber: this.state.accountNumber,
                            fromDate: this.state.fromDate,
                            toDate: this.state.toDate,
                        }
                    }
                    service={GetStockRightTimingListService.editStockRightTiming}
                    disabled={
                        (this.state.selectedReviewStatusType.code == null || this.state.selectedReviewStatusType.code == undefined) ||
                        (this.state.fromDate == null || this.state.fromDate == undefined) ||
                        (this.state.toDate == null || this.state.toDate == undefined)
                    }
                    className="form-height pb-4">
                    <Fieldset style={{ paddingRight: 15, paddingLeft: 15, paddingBottom: 15, marginBottom: 15 }} legend={'زمان‌بندی شرکت در حق تقدم'}>
                        <Grid className="mb-3" style={{ marginTop: -20 }} container spacing={8}>
                            <Grid item md={2}>نماد</Grid>
                            <Grid item md={4} className="text-center">{this.state.stockRightTimingInfo.symbolTitle} - {this.state.stockRightTimingInfo.isin}</Grid>
                            <Grid item md={2}>شماره پیگیری</Grid>
                            <Grid item md={4} className="text-center">{this.state.stockRightTimingInfo.tracingNo}</Grid>
                        </Grid>
                        <Grid container spacing={8} className="pl-3">
                            <Grid item md={2}>نام بانک</Grid>
                            <Grid item md={4} className="text-center">{this.state.stockRightTimingInfo.bankName}</Grid>
                            <Grid item md={2}>نام شعبه</Grid>
                            <Grid item md={4} className="text-center">{this.state.stockRightTimingInfo.branchName}</Grid>
                        </Grid>
                    </Fieldset>
                    <Grid container spacing={8} className="pl-3 mt-4">
                        <Grid item md={3}>
                            <div className="k-rtl">
                                <DropDownComponent
                                    {...this.state.reviewStatusType} required
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedReviewStatusType}
                                />
                            </div>
                        </Grid>
                        <Grid item md={3}>
                            <NumberFormatComponent
                                id="" label="شماره حساب"
                                value={this.state.accountNumber}
                                handleChange={(value, error) => this.handleChange(value, 'accountNumber')}
                                type="number" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-4">
                        <Grid item md={3}>
                            <PersianDatePicker label="تاریخ شروع حق تقدم" handleOnChange={(value) => this.handleDate(value, 'fromDate')} selectedDate={this.state.fromDate} required />
                        </Grid>
                        <Grid item md={3}>
                            <PersianDatePicker label="تا تاریخ پایان حق تقدم" handleOnChange={(value) => this.handleDate(value, 'toDate')} selectedDate={this.state.toDate} required />
                        </Grid>
                    </Grid>
                </Form>
            </React.Fragment>
        )
    }
}
UpdateStockRightTimingListComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateStockRightTimingListComponent);