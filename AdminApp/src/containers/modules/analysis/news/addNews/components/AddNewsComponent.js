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
class AddNewsComponent extends React.Component {
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
          disabled={true}
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
          <Grid container spacing={8} className="pl-3 mt-3">
            <Grid item md={6}>عنوان خبر</Grid>
            <Grid item md={6}>تاریخ انتشار</Grid>
          </Grid>
          <Grid container spacing={8} className="pl-3">
            <Grid item md={6}>
              <Input label="عنوان خبر" handleChange={(e) => this.handleChange(e, 'reportName')} value={this.state.code} />
            </Grid>
            <Grid item md={6}>
              <PersianDatePicker selectedDate={this.state.fromDate} label="تاریخ انتشار" handleOnChange={(value) => this.handleDate(value, 'registerReportDate')} required />
            </Grid>
          </Grid>
          <Grid container spacing={8} className="pl-3 mt-3">
            <Grid item md={12}>خلاصه خبر</Grid>
          </Grid>
          <Grid container spacing={8} className="pl-3">
            <Grid item md={12}>
              <Input label="خلاصه خبر" handleChange={(e) => this.handleChange(e, 'comment')} value={this.state.comment} isMultiLine={true} />
            </Grid>
          </Grid>
          <Grid container spacing={8} className="pl-3 mt-3">
            <Grid item md={12}>شرح خبر</Grid>
          </Grid>
          <Grid container spacing={8} className="pl-3">
            <Grid item md={12}>
              <Input label="شرح خبر" handleChange={(e) => this.handleChange(e, 'comment')} value={this.state.comment} isMultiLine={true} />
            </Grid>
          </Grid>
        </Form>
      </React.Fragment>
    )
  }
}
AddNewsComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddNewsComponent);