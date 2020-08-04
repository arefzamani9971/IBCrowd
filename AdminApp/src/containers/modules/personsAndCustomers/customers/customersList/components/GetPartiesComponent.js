import React from 'react';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import Header from 'shared/components/stateHeader/stateHeader';
import { GridServer } from '../../../../../../shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/getPartiesColumns';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../../../../layout/panel/theme';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import GetPartiesService from '../services/GetPartiesService';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import IBAN from 'shared/components/iban/textMask';
import GetAllRegion from '../../../../../../services/getRegion';
import GetAllBankNames from '../../../../../../services/getBanks';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import MultiSelectComponent from 'shared/components/dropDown/multiSelect';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import './GetPartiesComponent.css';
import GetMainMarket from '../../../../../../services/GetMainMarkets';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import { customerTemplateForRepresentativeAutoComplete, customerHeaderTemplateForRepresentativeAutoComplete } from 'constants/autoCompleteTemplate'
import GetEnum from 'services/getEnum';
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';

class GetParties extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pharse: null,
            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جستجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفصیل",
                label: "نام و نام خانوادگی مشتری"
            },
            selectedParty: { fullName: '' },
            detailLedgerCode: null,
            accountNumber: null,
            iban: null,
            bank: {
                name: "selectedBank",
                field: "title",
                label: "نام بانک",
                list: []
            },
            selectedBank: null,
            birthDatePlace: {
                name: "selectedRegion",
                field: "title",
                label: "محل تولد",
                list: []
            },
            birthDate: null,
            selectedBirthDatePlace: {},
            fatherName: '',
            branch: {
                name: "selectedBranch",
                field: "title",
                label: "شعبه ثبت کننده",
                list: []
            },
            selectedBranch: null,

            sort: [{
                field: "party.created",
                dir: "desc"
            }],
            mainMarket: {
                name: "mainMarketSelected",
                field: 'title',
                list: [],
                label: "بازار"
            },
            mainMarketSelected: [],
            representative: {
                label: "جتسجوی معرف",
                name: "selectedRepresentative",
                field: "fullName",
                placeholder: "جستجوی معرف بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر و شماره تفصیل",
                label: "نام و نام خانوادگی معرف",
                list: [],
                template: customerTemplateForRepresentativeAutoComplete,
                headerTemplate: customerHeaderTemplateForRepresentativeAutoComplete,
            },
            selectedRepresentative: {},
            marketer: {
                name: "selectedMarketer",
                field: "fullName",
                placeholder: "جستجوی بازاریاب بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر و شماره تفصیل",
                label: "نام و نام خانوادگی بازاریاب",
                list: [],
                template: customerTemplateForRepresentativeAutoComplete,
                headerTemplate: customerHeaderTemplateForRepresentativeAutoComplete,
            },
            selectedMarketer: {},
            partyType: {
                name: "selectedPartyType",
                field: "title",
                label: "نوع مشتری",
                list: []
            },
            selectedPartyType: { code: 0 },
        };
        this.handleChange = this.handleChange.bind(this);
        this.handlePartyChange = this.handlePartyChange.bind(this);
        this.handleBankNameChange = this.handleBankNameChange.bind(this);
        this.handleSelectedChange = this.handleSelectedChange.bind(this);
        this.successGetAllRegionsByFilter = this.successGetAllRegionsByFilter.bind(this);
        this.successGetAllBankNames = this.successGetAllBankNames.bind(this);
        this.successGetBranchesByFilter = this.successGetBranchesByFilter.bind(this);
        this.handleBirthDate = this.handleBirthDate.bind(this);
        this.handleChangeAutocomplete = this.handleChangeAutocomplete.bind(this);
    }
    componentDidMount() {
        this.getAllRegistry();
        GetAllBankNames(this.successGetAllBankNames);
        this.getBranchByFilter();
        GetMainMarket((response) => DropDownListDataProvider(this, "mainMarket", response));
        GetEnum("partytype", (response) => DropDownListDataProvider(this, "partyType", response));
    }
    getAllRegistry() {
        GetAllRegion(null, this.successGetAllRegionsByFilter);
    }
    successGetAllRegionsByFilter(response) {

        if (response.success) {
            this.setState({
                birthDatePlace: {
                    name: "selectedBirthDatePlace",
                    field: "title",
                    label: "محل تولد",
                    list: response.result
                }
            })

        }
    }
    successGetAllBankNames(response) {
        if (response.success) {
            this.setState({
                bank: {
                    name: "selectedBank",
                    field: "title",
                    label: "نام بانک",
                    type: "client",
                    list: response.result
                }
            });

        }
    }
    getBranchByFilter() {
        var command = {
            optionalFilter: {
                take: 500,
                page: 1

            }
        };
        GetBranchService.getBranchesByFilter(command, this.successGetBranchesByFilter)
    }
    successGetBranchesByFilter(response) {
        if (response.success) {

            this.setState({
                branch: {
                    name: "selectedBranch",
                    field: "title",
                    label: "عنوان شعبه کارگزاری",
                    list: response.result
                }
            });

        }
    }
    handleChange(value, name) {
        let item = value.value;
        this.setState({
            [name]: item
        })
    };
    handlePartyChange(item) {
        this.setState({
            selectedParty: item.value
        })
    }
    handleBankNameChange(item) {
        this.setState({
            selectedBank: item.value
        })
    }
    handleSelectedChange(item, name) {
        this.setState({
            [name]: item.value
        })
    }
    handleBirthDate(value) {
        this.setState({
            birthDate: value,
        })
    }
    handleChangeAutocomplete = (item, name) => {
        this.setState({
            [name]: item.value,
        })
    }

    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container list-parties"}>
                    <GridServer
                        reportFilter={
                            {
                                partyId: this.state.selectedParty.id,
                                namePhrase: this.state.pharse,
                                branchId: this.state.selectedBranch ? this.state.selectedBranch.id : null,
                                bankNameId: this.state.selectedBank ? this.state.selectedBank.codeId : null,
                                fatherName: this.state.fatherName,
                                regionId: this.state.selectedBirthDatePlace ? this.state.selectedBirthDatePlace.id : null,
                                birthDate: this.state.birthDate,
                                detailLedgerCode: this.state.detailLedgerCode,
                                accountNumber: this.state.accountNumber,
                                iban: this.state.iban,
                                mainMarkets: this.state.mainMarketSelected.length > 0 ? this.state.mainMarketSelected.map(s => { return s.id }) : [],
                                partyType: this.state.selectedPartyType.code,
                                representativeId: this.state.selectedRepresentative.id,
                                marketerId: this.state.selectedMarketer.partyId
                            }
                            
                        }
                        {... this.props}
                        {... this.state}
                        preSearch={this.preSearch}
                        service={GetPartiesService.getAllPartyByFilter}
                        Columns={Columns}
                        sort={this.state.sort}
                        classMainHeightOpenPanel={"main-paper-container-server-open"}
                        reRender={true}>

                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={12}>
                                    <AutoCompleteComponent {...this.state.party}
                                        handleChange={(value) => this.handlePartyChange(value)}
                                        value={this.state.selectedParty.fullName}
                                        service={GetPartiesService.simpleSearchCustomers} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={2}>
                                    <Input label="نام پدر" handleChange={(e) => this.handleChange(e, 'fatherName')} value={this.state.fatherName} required />
                                </Grid>
                                <Grid item md={2}>
                                    <ComboBoxComponent isFilterable {...this.state.birthDatePlace}
                                        handleChange={(value, name) => this.handleSelectedChange(value, name)}
                                        value={this.state.selectedBirthDatePlace} />
                                    {/* <div className="k-rtl">
                                        <DropDownComponent {...this.state.birthDatePlace}
                                            handleChange={(value, name) => this.handleSelectedChange(value, name)} isFilterable={true}
                                            value={this.state.selectedBirthDatePlace} hasAll />
                                    </div> */}
                                </Grid>
                                <Grid item md={2}>
                                    {/* <NoDataDatePicker isNull={true} selectedDate={this.state.BirthDate} label="تاریخ تولد" handleOnChange={this.handleBirthDate} /> */}
                                    <PersianDatePicker selectedDate={this.state.birthDate} label="تاریخ تولد" handleOnChange={this.handleBirthDate} />
                                </Grid>
                                <Grid item md={3}>
                                    <NumberFormatComponent id="detailLedgerCode" label="کد تفصیل"
                                        value={this.state.detailLedgerCode}
                                        handleChange={(value, error) => this.handleChange(value, 'detailLedgerCode')} type="number" />
                                </Grid>
                                <Grid item md={3}>
                                    <Input label="شماره حساب" isLeftStartText={true} handleChange={(e) => this.handleChange(e, 'accountNumber')} value={this.state.accountNumber} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={3}>
                                    <Input label="شماره شبا"
                                        value={this.state.iban}
                                        handleChange={(value) => this.handleChange(value, 'iban')} isLeftStartText={true} />
                                    {/* <IBAN handleChange={(value, isCorrect) => this.handleChangeIban(value, isCorrect)} value={this.state.iban} /> */}
                                </Grid>
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent {...this.state.bank}
                                            handleChange={(value) => this.handleBankNameChange(value)} isFilterable={true}
                                            value={this.state.selectedBank} hasAll />
                                    </div>
                                </Grid>
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent {...this.state.branch}
                                            handleChange={(value, name) => this.handleSelectedChange(value, name)} isFilterable={true}
                                            value={this.state.selectedBranch} hasAll />
                                    </div>
                                </Grid>
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent {...this.state.partyType}
                                            handleChange={(value, name) => this.handleSelectedChange(value, name)}
                                            value={this.state.selectedPartyType}
                                            hasAll />
                                    </div>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="k-rtl">
                                        <MultiSelectComponent
                                            {...this.state.mainMarket}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            isFilterable={true}
                                            value={this.state.mainMarketSelected} />
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={6}>
                                    <AutoCompleteComponent
                                        {...this.state.representative}
                                        handleChange={(value) => this.handleChangeAutocomplete(value, 'selectedRepresentative')}
                                        service={GetPartiesService.getAllRepresentativeForSearch}
                                        value={this.state.selectedRepresentative.fullName}
                                    />
                                </Grid>
                                
                                <Grid item md={6}>
                                    <AutoCompleteComponent
                                        {...this.state.marketer}
                                        handleChange={(value) => this.handleChangeAutocomplete(value, 'selectedMarketer')}
                                        service={GetPartiesService.searchMarketer}
                                        value={this.state.selectedMarketer.fullName}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </GridServer>
                </Paper>
            </React.Fragment >
        )
    }
}

export default withStyles(styles)(GetParties);