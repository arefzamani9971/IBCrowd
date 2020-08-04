import React from 'react';
import Grid from '@material-ui/core/Grid';
import UpdateCustomersFeeService from '../services/UpdateCustomerFeeService';
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
import GetManagerCustomerFeeService from '../services/GetManagerCustomersFeeService';
import GetGroupsService from '../../../partyGroup/groups/services/GetGroupsService';
import Fieldset from 'shared/components/fieldset/fieldset';
import Radio from '@material-ui/core/Radio';


class UpdateCustomerFeeComponent extends React.Component {
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
                label: 'گروه',
                list: []
            },
            priority: null,
            selectedTypeCustomer: 'Customer',
            selectedSymbol: 'One',
            status: true,
            partyTrade: {},
            id: this.props.history.location.state.id,
            symbols: [],
            reRender: false
        };

        this.multiSelect = null;

        this.handlePartyChange = this.handlePartyChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheck = this.handleChangeCheck.bind(this);
        this.handleChangeRadio = this.handleChangeRadio.bind(this);
        this.successGetFlatPartyTrade = this.successGetFlatPartyTrade.bind(this);
    }
    componentDidMount() {
        if (this.state.id) {
            this.getFlatPartyTradeDiscount();

        } else {
            this.props.history.push(this.props.back.path);
        }
    }

    getFlatPartyTradeDiscount() {
        var command = {
            reportFilter: {
                id: this.state.id
            },
            optionalFilter: {
                take: 0,
                skip: 0,
                page: 0
            }
        };
        GetManagerCustomerFeeService.getFlatPartyTradeDiscount(command, this.successGetFlatPartyTrade);
    }

    simpleSearchCustomers() {
        let command = {
            optionalFilter: {
                take: 100,
                page: 1,
            },
            reportFilter: {
                pharse: this.state.partyTrade.nationalId
            }
        }
        GetPartiesService.simpleSearchCustomers(command, (response) => {
            if (response.success) {
                this.setState({
                    selectedParty: response.result[0]
                })
            }
        });

    }

    getAllProductsPagingMethod(isin, index) {
        let command = {
            reportFilter: {
                phrase: isin
            },
            optionalFilter: {
                take: 25,
                page: 1,
            }
        };
        GetAllProductsPaging.getAllProductsPagingMethod(command, (response) => {
            if (response.success) {
                this.state.isins.push(response.result[0]);
                if (this.state.partyTrade.isin.split(",").length === this.state.isins.length) {
                    this.multiSelect =
                        <MultiSelectAutoCompleteComponent
                            {...this.state.isinsList}
                            handleChange={(value, name) => this.handleChange(value, name)}
                            service={GetAllProductsPaging.getAllProductsPagingMethod}
                            defaultValue={this.state.isins.map(item => {
                                return { symbol: item.symbol, isin: item.isin }
                            })}
                        />
                    this.setState({
                        isins: this.state.isins.map(item => { return item.isin }),
                        reRender: !this.state.reRender
                    })
                }
            }
        });
    }


    successGetFlatPartyTrade(response) {
        if (response.success) {
            var res = response.result[0];
            this.setState({
                partyTrade: res,
                priority: res.priority,
                status: res.status === 1 ? true : false,
                selectedSymbol: res.allSymbols ? 'All' : 'One',
                selectedTypeCustomer: res.partyId > 0 ? 'Customer' : 'Group'
            }, () => {
                this.getGroups();
                if (res.groupId == null) {
                    this.simpleSearchCustomers();
                }
                if (!res.allSymbols) {
                    let symbolIsins = this.state.partyTrade.isin.split(",");
                    symbolIsins.map((isin, index) => {
                        this.getAllProductsPagingMethod(isin, index);
                    })
                } else {
                    this.multiSelect =
                        <MultiSelectAutoCompleteComponent
                            {...this.state.isinsList}
                            handleChange={(value, name) => this.handleChange(value, name)}
                            service={GetAllProductsPaging.getAllProductsPagingMethod}
                        />
                }

            });

        }
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
    handleChangeRadio(event, name) {
        this.setState({
            [name]: event.target.value
        })
    }

    handleChangeCheck = (event) => {
        var name = event.target.name;
        this.setState({
            [name]: event.target.checked
        })
    };

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

    getGroups() {
        GetGroupsService.getAllGroupByFilter({}, (response) => {
            if (response.result) {
                this.setState({
                    selectedGroup: this.state.partyTrade.groupId != null ? response.result.filter(item => { return item.id == this.state.partyTrade.groupId })[0] : {},
                    group: {
                        name: "selectedGroup",
                        field: "title",
                        label: "گروه",
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
                        id: this.props.history.location.state.id,
                        partyId: this.state.selectedTypeCustomer == 'Customer' ? this.state.selectedParty.id : null,
                        isin: this.state.selectedSymbol === 'All' ? [] : this.state.isins,
                        groupId: this.state.selectedTypeCustomer == 'Customer' ? null : this.state.selectedGroup.id,
                        priority: this.state.priority,
                        status: this.state.status ? 1 : 2,
                        allSymbols: this.state.selectedSymbol === 'All'
                    }}
                    service={UpdateCustomersFeeService.updatePartyTradeDiscounts}
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
                                        {
                                            this.multiSelect
                                        }
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
                    {/* <Grid container spacing={8}>
                        <Grid item md={11}>
                            <AutoCompleteComponent
                                {...this.state.party}
                                handleChange={value => this.handlePartyChange(value)}
                                value={this.state.selectedParty.fullName}
                                service={GetPartiesService.simpleSearchCustomers}
                            />
                        </Grid>
                        <Grid item md={3}>
                            <DropDownComponent
                                {...this.state.group}
                                handleChange={(value, name) => this.handleChange(value, name)}
                                isFilterable={true}
                                value={this.state.selectedGroup}
                            />
                        </Grid>
                        <Grid item md={3}>
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
                        <Grid item md={3} className="d-flex align-item-center">
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
                        <Grid container spacing={8} className="m-0">
                            <Grid item md={1} className="d-flex align-item-center justify-content-center">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.allSymbols}
                                            onChange={this.handleChangeCheck}
                                            value='allSymbols'
                                            name='allSymbols'
                                            color='primary'
                                        />
                                    }
                                    label='همه نمادها'
                                />
                            </Grid>
                            <Grid item md={10}>
                                <MultiSelectAutoCompleteComponent
                                    {...this.state.isinsList}
                                   handleChange={(value , name) => this.handleChange(value, name)}
                                    service={GetAllProductsPaging.getAllProductsPagingMethod}
                                />
                            </Grid>
                        </Grid>
                    </Grid> */}
                </Form>
            </React.Fragment>
        );
    }
};


export default UpdateCustomerFeeComponent;