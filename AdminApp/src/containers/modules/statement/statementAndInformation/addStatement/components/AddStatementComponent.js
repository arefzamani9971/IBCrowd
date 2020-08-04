import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from 'shared/components/formInput/inputForm'
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import PropTypes from 'prop-types';
import Header from 'shared/components/stateHeader/stateHeader';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import styles from 'containers/layout/panel/theme';
import Form from 'shared/components/form/form';
import GetEnum from 'services/getEnum';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import Checkbox from '@material-ui/core/Checkbox';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import SymbolAutoCompleteComponent from '../../../../../../shared/components/symbolAutoComplete/symbolAutoCompleteComponent';
class AddStatement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSymbol: {},

      statementType: {
        name: "selectedStatementType",
        field: "title",
        label: "نوع مجمع",
        list: []
      },
      selectedStatementType: { code: 0, title: '' },
      codalReportPeriod: {
        name: "selectedCodalReportPeriod",
        field: "title",
        label: "دوره ",
        list: []
      },
      selectedCodalReportPeriod: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBankDepositChange = this.handleBankDepositChange.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
    this.getSymbolValue = this.getSymbolValue.bind(this);



  }

  componentWillMount() {
    GetEnum('StatementType', response => DropDownListDataProvider(this, "statementType", response));
    GetEnum('CodalReportPeriod', response => DropDownListDataProvider(this, "codalReportPeriod", response));

  }

  handleChange(value, name) {
    let item = value.value;
    this.setState({
      [name]: item
    })
  }
  ComboBoxServerSideHandler = (event) => {
    if (event === null) {
      this.setState({
        selectedSearchBankDeposit: {}
      })
    } else {
      // let {id, accountTypeTitle} = event;
      this.setState({
        selectedSearchBankDeposit: event
      })
    }
  };
  handleBankDepositChange(item) {
    this.setState({
      selectedSearchBankDeposit: item.value,
    })
  }
  handleCheckChange(event, name) {
    this.setState({
      [name]: event.target.checked,
    })
  };


  handleDate = (value, name) => {
    this.setState({
      [name]: value
    })
  };
  handleChangeCheck = name => (event) => {
    this.setState({
      isLastLevel: event.target.checked,
      [name]: event.target.checked
    })

  };
  getSymbolValue(value) {
    this.setState({
      selectedSymbol: value
    });
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
              assemblyType: this.state.selectedStatementType.code,
              isin: this.state.selectedSymbol.isin,
              codalReportPeriod: this.state.selectedCodalReportPeriod.code,


            }
          }
          // service={AddStatementService.updatecashflowchequemasterMethod}
          className="form-height"
        >

          <Grid container spacing={8}>
            <Grid item md={4} className="mt-3">
              <div className="k-rtl">
                <SymbolAutoCompleteComponent handleSymbolChange={(value) => this.getSymbolValue(value)} value={this.state.selectedSymbol}/>
              </div>
            </Grid>

            <Grid item md={4} className="mt-3">
              <NumberFormatComponent
                id="" label="شماره پیگیری"
                value={this.state.amountOfTheDocument}
                handleChange={(value, error) => this.handleChange(value, 'amountOfTheDocument')}
                type="number"
                required
              />
            </Grid>

            <Grid item md={4} className="mt-3">
              <div className="k-rtl">
                <DropDownComponent
                  isFilterable
                  hasAll
                  {...this.state.statementType}
                  handleChange={(value, name) => this.handleChange(value, name)}
                  value={this.state.selectedStatementType}
                  required />
              </div>
            </Grid>

            <Grid item md={9} className="mt-3">
              <Input label="نام گزارش" handleChange={(e) => this.handleChange(e, 'reportName')} value={this.state.code} />
            </Grid>
            <Grid item md={9} className="mt-3">
              <Input label="نام شرکت " handleChange={(e) => this.handleChange(e, 'comapnyName')} value={this.state.title} />
            </Grid>
            <Grid item md={9} className="mt-3">
              <Input label=" عنوان گزارش " handleChange={(e) => this.handleChange(e, 'reportTitle')} value={this.state.title} />
            </Grid>
          </Grid>
          <Grid container spacing={8}>
            <Grid item md={3} className="mt-3">
              <PersianDatePicker selectedDate={this.state.fromDate} label=" تاریخ ثبت گزارش" handleOnChange={(value) => this.handleDate(value, 'registerReportDate')} required />
            </Grid>
            <Grid item md={3} className="mt-3">
              <PersianDatePicker selectedDate={this.state.toDate} label=" تاریخ ارسال گزارش" handleOnChange={(value) => this.handleDate(value, 'sendinReportDate')} required />
            </Grid>
            <Grid item md={3} className="mt-3">
              <PersianDatePicker selectedDate={this.state.toDate} label=" تاریخ انتشار گزارش" handleOnChange={(value) => this.handleDate(value, 'releaseReportDate')} required />
            </Grid>


            <Grid item md={4} className="mt-3">
              <div className="k-rtl">
                <DropDownComponent {...this.state.codalReportPeriod}
                  handleChange={(value, name) => this.handleChange(value, name)}
                  value={this.state.selectedCodalReportPeriod} required />
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={8}>

            <Grid item md={8} className="mt-3">
              <Input label=" شماره پیگیری اطلاعیه پدر" handleChange={(e) => this.handleChange(e, 'reportName')} value={this.state.code} />
            </Grid>
            <Grid item md={8} className="mt-3">
              <Input label=" XBRL آدرس " handleChange={(e) => this.handleChange(e, 'comapnyName')} value={this.state.title} />
            </Grid>
            <Grid item md={8} className="mt-3">
              <Input label="  ضمیمه آدرس " handleChange={(e) => this.handleChange(e, 'reportTitle')} value={this.state.title} />
            </Grid>
            <Grid item md={8} className="mt-3">
              <Input label=" اکسل آدرس  " handleChange={(e) => this.handleChange(e, 'comapnyName')} value={this.state.title} />
            </Grid>
            <Grid item md={8} className="mt-3">
              <Input label="   اکسل فایل " handleChange={(e) => this.handleChange(e, 'reportTitle')} value={this.state.title} />
            </Grid>
            <Grid item md={8} className="mt-3">
              <Input label="    اکسل Html " handleChange={(e) => this.handleChange(e, 'reportTitle')} value={this.state.title} />
            </Grid>


          </Grid>

          <Grid container spacing={2} className="mt-3">
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.isNotConsiderSettlementDays}
                  onChange={this.handleChangeCheck('isNotConsiderSettlementDays')}
                  value="isLastLevel"
                  color="primary"
                />
              }
              label={<span className={"font-size-13"}>  آیا برای این اطلاعیه ، تصمیمات مجمع ذخیره شود؟</span>}
            />
          </Grid>
        </Form>
      </React.Fragment>
    )
  }
}
AddStatement.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddStatement);