import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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
import GetEnum from 'services/getEnum';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import DropDownListDataProvider from "core/dropDownListDataProvider";


class UpdateAdjustedPriceList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            assemblyStatus: {
                name: "selectedAssemblyStatus",
                field: "title",
                label: "وضعیت مجمع",
                list: []
            },
            selectedAssemblyStatus: { code: 0, title: '' },



        };
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        GetEnum('AssemblyStatus', response => DropDownListDataProvider(this, "assemblyStatus", response));

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
                            assemblyStatus: this.state.selectedAssemblyStatus.code,
                        }
                    }

                    className="form-height">
                    <Fieldset style={{ paddingRight: 15, paddingLeft: 15, paddingBottom: 15, marginBottom: 15 }} legend={'مجمع عمومی'}>
                        <Grid className="mb-3" style={{ marginTop: -20 }} container spacing={8}>
                            <Grid item md={2}>نماد</Grid>
                            <Grid item md={4}>11111</Grid>
                            <Grid item md={2}>شناسه</Grid>
                            <Grid item md={4}>22222</Grid>
                        </Grid>
                        <Grid container spacing={8} className="pl-3">
                            <Grid item md={2}>شماره پیگیری</Grid>
                            <Grid item md={4}>33333</Grid>
                            <Grid item md={2}>کد اطلاعیه</Grid>
                            <Grid item md={4}>44444</Grid>
                        </Grid>
                    </Fieldset>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>نوع مجمع</Grid>
                        <Grid item md={6}>وضعیت مجمع</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <div className="k-rtl">
                                <DropDownComponent
                                    isFilterable
                                    hasAll
                                
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    />
                            </div>
                        </Grid>
                        <Grid item md={6}>
                            <div className="k-rtl">
                                <DropDownComponent
                                    {...this.state.assemblyStatus}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedAssemblyStatus} />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>نوع افزایش سرمایه</Grid>
                        <Grid item md={6}>درصد افزایش سرمایه</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <div className="k-rtl">
                                <DropDownComponent
                                    isFilterable
                                    hasAll
                                    
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    />
                            </div>
                        </Grid>
                        <Grid item md={6}>
                            <NumberFormatComponent
                                id="" label="مبلغ سند"
                                value={this.state.amountOfTheDocument}
                                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>سود هر سهم</Grid>
                        <Grid item md={6}>ارزش اسمی هر سهم</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <NumberFormatComponent
                                id="" label="مبلغ سند"
                                value={this.state.amountOfTheDocument}
                                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                        <Grid item md={6}>
                            <NumberFormatComponent
                                id="" label="ارزش اسمی هر سهم"
                                value={this.state.amountOfTheDocument}
                                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>تاریخ</Grid>
                        <Grid item md={6}>تاریخ جلسه</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <PersianDatePicker label="از تاریخ" handleOnChange={(value) => this.handleDate(value, 'fromDate')} selectedDate={this.state.fromDate} />
                        </Grid>
                        <Grid item md={6}>
                            <PersianDatePicker label="تا تاریخ" handleOnChange={(value) => this.handleDate(value, 'ToDate')} selectedDate={this.state.ToDate} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>آخرین تعداد سهام</Grid>
                        <Grid item md={6}>تعداد سهام جدید</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <NumberFormatComponent
                                id="" label="آخرین تعداد سهام"
                                value={this.state.amountOfTheDocument}
                                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                                type="number"
                                isSeparator={true} />
                        </Grid><Grid item md={6}>
                            <NumberFormatComponent
                                id="" label="ارزش اسمی هر سهم"
                                value={this.state.amountOfTheDocument}
                                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>ارزش اسمی جدید</Grid>
                        <Grid item md={6}>شماره پیگیری قبلی</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <NumberFormatComponent
                                id="" label="آخرین تعداد سهام"
                                value={this.state.amountOfTheDocument}
                                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                        <Grid item md={6}>
                            <div className="k-rtl">
                                <DropDownComponent
                                    isFilterable
                                    hasAll
                                    {...this.state.chequeType}
                                    handleChange={(value, name) => this.handleChange(value, name)}
                                    value={this.state.selectedChequeType} />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>آورده نقدی</Grid>
                        <Grid item md={6}>درصد آورده نقدی</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <NumberFormatComponent
                                id="" label="مبلغ سند"
                                value={this.state.amountOfTheDocument}
                                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                        <Grid item md={6}>
                            <NumberFormatComponent
                                id="" label="مبلغ سند"
                                value={this.state.amountOfTheDocument}
                                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>سود انباشته</Grid>
                        <Grid item md={6}>درصد سود انباشته</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <NumberFormatComponent
                                id="" label="سود انباشته"
                                value={this.state.amountOfTheDocument}
                                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                        <Grid item md={6}>
                            <NumberFormatComponent
                                id="" label="درصد سود انباشته"
                                value={this.state.amountOfTheDocument}
                                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>سود اندوخته</Grid>
                        <Grid item md={6}>درصد سود اندوخته</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <NumberFormatComponent
                                id="" label="سود اندوخته"
                                value={this.state.amountOfTheDocument}
                                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                        <Grid item md={6}>
                            <NumberFormatComponent
                                id="" label="درصد سود اندوخته"
                                value={this.state.amountOfTheDocument}
                                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>مازاد تجدید ارزیابی دارایی‌ها</Grid>
                        <Grid item md={6}>درصد مازاد تجدید ارزیابی دارایی‌ها</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <NumberFormatComponent
                                id="" label="مازاد تجدید ارزیابی دارایی‌ها"
                                value={this.state.amountOfTheDocument}
                                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                        <Grid item md={6}>
                            <NumberFormatComponent
                                id="" label="درصد مازاد تجدید ارزیابی دارایی‌ها"
                                value={this.state.amountOfTheDocument}
                                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>صرف سهام</Grid>
                        <Grid item md={6}>درصد صرف سهام</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <NumberFormatComponent
                                id="" label="صرف سهام"
                                value={this.state.amountOfTheDocument}
                                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                        <Grid item md={6}>
                            <NumberFormatComponent
                                id="" label="درصد صرف سهام"
                                value={this.state.amountOfTheDocument}
                                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={6}>سهام قبلی</Grid>
                        <Grid item md={6}>سرمایه فعلی</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3">
                        <Grid item md={6}>
                            <NumberFormatComponent
                                id="" label="سهام قبلی"
                                value={this.state.amountOfTheDocument}
                                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                        <Grid item md={6}>
                            <NumberFormatComponent
                                id="" label="سرمایه فعلی"
                                value={this.state.amountOfTheDocument}
                                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                                type="number"
                                isSeparator={true} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mt-3">
                        <Grid item md={3}>ثبت شده؟</Grid>
                        <Grid item md={3}>پذیرفته شده؟</Grid>
                    </Grid>
                    <Grid container spacing={8} className="pl-3 mb-3">
                        <Grid item md={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.isActive}
                                        onChange={(value) => this.handleCheckChange(value, 'isActive')}
                                        value="purchaseFromBank"
                                        color="primary" />
                                }
                            />
                        </Grid>
                        <Grid item md={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.isActive}
                                        onChange={(value) => this.handleCheckChange(value, 'isActive')}
                                        value="purchaseFromBank"
                                        color="primary" />
                                }
                            />
                        </Grid>
                    </Grid>
                </Form>

            </React.Fragment>
        )
    }
}
UpdateAdjustedPriceList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateAdjustedPriceList);