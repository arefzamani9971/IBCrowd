import React from 'react';
import Grid from '@material-ui/core/Grid';
import AddCustomersFeeService from '../services/AddCustomerFeeService';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import MultiSelectAutoCompleteComponent from 'shared/components/dropDown/multiSelectAutoComplete';
import { productTemplate, productHeaderTemplate } from 'constants/autoCompleteTemplate';
import GetAllProductsPaging from '../../../../../../services/getProducts';
import Header from 'shared/components/stateHeader/stateHeader';
import Form from 'shared/components/form/form';
import GetPartiesService from '../../../customers/customersList/services/GetPartiesService';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import GetGroupsService from '../../../partyGroup/groups/services/GetGroupsService';
import Fieldset from 'shared/components/fieldset/fieldset';
import Radio from '@material-ui/core/Radio';

class AddCustomerFeeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      party: {
        name: 'selectedParty',
        field: 'fullName',
        placeholder:
          'جستجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفصیل',
        label: "نام و نام خانوادگی مشتری"
      },
      selectedParty: { fullName: '', id: 0 },
      isinsList: {
        name: 'isins',
        placeholder: 'جستجوی نماد',
        dataTextField: 'symbol',
        dataValueField: 'isin',
        fieldSearch: 'phrase',
        template: productTemplate,
        headerTemplate: productHeaderTemplate,
        label: "عنوان نماد"
      },
      isins: [],
      selectedGroup: { id: 0 },
      group: {
        name: 'selectedGroup',
        field: 'title',
        label: 'گروه مشتریان',
        list: []
      },
      priority: null,
      status: true,
      selectedTypeCustomer: 'Customer',
      selectedSymbol: 'One'
    };

    this.handlePartyChange = this.handlePartyChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDropDowm = this.handleChangeDropDowm.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
    this.handleChangeRadio = this.handleChangeRadio.bind(this);
    this.getGroups = this.getGroups.bind(this);

  }
  componentDidMount() {
    this.getGroups();
  }

  handlePartyChange(item) {
    this.setState({
      selectedParty: item.value
    });
  }

  handleChange(event, name) {
    let value = event.value;
    this.setState({
      [name]: value
    });
  }

  handleChangeDropDowm(event) {
    let value = event.value;
    this.setState({
      selectedGroup: value
    }, () => {
      if (this.state.selectedGroup.id > 0) {
        this.setState({
          selectedParty: { fullName: '' }
        })
      }
    });
  }


  handleChangeRadio(event, name) {
    this.setState({
      [name]: event.target.value
    })
  };

  handleChangeCheck(event) {
    this.setState({
      [event.target.name]: event.target.checked
    })
  }
  getGroups() {
    GetGroupsService.getAllGroupByFilter(null, (response) => {
      if (response.result) {
        this.setState({
          group: {
            name: "selectedGroup",
            field: "title",
            label: "گروه مشتریان",
            list: response.result
          }
        })
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header {...this.props} />
        <Form
          {...this.props}
          {...this.state}
          entity={{
            partyId: this.state.selectedTypeCustomer == 'Customer' ? this.state.selectedParty.id : null,
            isin: this.state.selectedSymbol === 'All' ? [] : this.state.isins,
            groupId: this.state.selectedTypeCustomer == 'Customer' ? null : this.state.selectedGroup.id,
            priority: this.state.priority,
            status: this.state.status ? 1 : 2,
            allSymbols: this.state.selectedSymbol === 'All'
          }}
          service={AddCustomersFeeService.savePartyTradeDiscount}
          disabled={
            (this.state.selectedTypeCustomer == 'Customer' ? this.state.selectedParty.id == 0 : this.state.selectedGroup.id == 0) ||
            (this.state.selectedSymbol === 'All' ? false : this.state.isins.length == 0)
          }
        >
          <Fieldset legend={'مشتری'}>
            <Grid container spacing={8} className="m-0">
              <FormControlLabel
                control={
                  <Radio
                    checked={this.state.selectedTypeCustomer == 'Customer'}
                    onChange={(e) => this.handleChangeRadio(e, 'selectedTypeCustomer')}
                    value='Customer'
                    color="primary"
                  />
                }
                label="بر اساس مشتری"
              />
              <FormControlLabel
                control={
                  <Radio
                    checked={this.state.selectedTypeCustomer == 'Group'}
                    onChange={(e) => this.handleChangeRadio(e, 'selectedTypeCustomer')}
                    value='Group'
                    color="primary"
                  />
                }
                label="بر اساس گروه"
              />
            </Grid>
            <Grid container spacing={8} className="m-0">
              {
                this.state.selectedTypeCustomer == 'Customer' ?
                  <Grid item md={7} className="mb-3">
                    <AutoCompleteComponent
                      {...this.state.party}
                      handleChange={value => this.handlePartyChange(value)}
                      value={this.state.selectedParty.fullName}
                      service={GetPartiesService.simpleSearchCustomers}
                    />
                  </Grid>
                  :
                  <Grid item md={7} className="mb-3">
                    <DropDownComponent
                      {...this.state.group}
                      handleChange={(value, name) => this.handleChangeDropDowm(value, name)}
                      isFilterable={true}
                      value={this.state.selectedGroup}
                    />
                  </Grid>
              }
            </Grid>
          </Fieldset>
          <br />
          <Fieldset legend={'نماد'}>
            <Grid container spacing={8} className="m-0">
              <FormControlLabel
                control={
                  <Radio
                    checked={this.state.selectedSymbol == 'All'}
                    onChange={(e) => this.handleChangeRadio(e, 'selectedSymbol')}
                    value='All'
                    color="primary"
                  />
                }
                label="همه نمادها"
              />

              <FormControlLabel
                control={
                  <Radio
                    checked={this.state.selectedSymbol == 'One'}
                    onChange={(e) => this.handleChangeRadio(e, 'selectedSymbol')}
                    value='One'
                    color="primary"
                  />
                }
                label="عنوان نماد"
              />
            </Grid>
            <Grid container spacing={8} className="m-0">
              {
                this.state.selectedSymbol == 'One' ?
                  <Grid item md={11} className="mb-3">
                    <MultiSelectAutoCompleteComponent
                      {...this.state.isinsList}
                      handleChange={(value, name) => this.handleChange(value, name)}
                      service={GetAllProductsPaging.getAllProductsPagingMethod}
                    />
                  </Grid>
                  :
                  ''
              }
            </Grid>
          </Fieldset>
          <br />

          <Grid container spacing={8}>
            <Grid item md={2}>
              <NumberFormatComponent
                id='priority'
                label='اولویت'
                value={this.state.priority}
                handleChange={(value) =>
                  this.handleChange(value, 'priority')
                }
                type='number'
              />
            </Grid>

            <Grid item md={2} className="d-flex align-item-center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.status}
                    onChange={this.handleChangeCheck}
                    name='status'
                    value='status'
                    color='primary'
                  />
                }
                label='فعال'
              />
            </Grid>
          </Grid>
        </Form>
      </React.Fragment>
    );
  }
}

export default AddCustomerFeeComponent;
