import React from 'react';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../../../../layout/panel/theme';
import AutoCompleteComplete from 'shared/components/dropDown/autocomplete';
import Columns from '../constants/GetManagedCustomerContactColumn';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetPartiesService from "../../customersList/services/GetPartiesService";
import WrapperPaper from "../../../../../../shared/components/mainPaper/wrapperPaper";
import GetManagedCustomerContactServices from "../services/getManagedCustomerContactService";
import Email from 'shared/components/email/email';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import GetAllRegion from "../../../../../../services/getRegion";
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';

// import './GetCustomerTradingComponent.css'
class GetManagedCustomerContactComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جستجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفصیل",
                label: 'نام و نام خانوادگی مشتری',
                list: []
            },
            sort: [{
                field: "created",
                dir: "desc"
            }],
            selectedParty: { fullName: '' },
            province: {
                name: "selectedProvince",
                field: "title",
                label: "استان",
                list: []
            },
            selectedProvince: {},
            region: {
                name: "selectedRegion",
                field: "title",
                label: "شهر",
                list: []
            },
            selectedRegion: {},
            phone: '',
            email: '',
            address: '',
            postalCode: '',
            isChangeParty: true
        };

        this.handleChange = this.handleChange.bind(this);
    }


    handleChange = (event, name) => {
        this.setState({
            [name]: event.value,
        })
    };

    componentDidMount() {
        
        this.getAllRegistry();
    }

    handlePartyChange = (item) => {
        this.setState({
            selectedParty: item.value,
        })
    };


    getAllRegistry() {
        GetAllRegion(null, (response) => {
            DropDownListDataProvider(this, "province", response);
            DropDownListDataProvider(this, "region", response);
        });
    };

    render() {

        return (

            <React.Fragment>
            <Header {...this.props} stateParams={this.state.selectedParty ? { partyId: this.state.selectedParty.id } : null} />
            <Paper className={"main-paper-container managed-customer-contact"}>

                    <GridServer
                        {...this.props}
                        {...this.state}
                        reportFilter={
                            {
                                partyId: this.state.selectedParty ? this.state.selectedParty.id : 0,
                                // partyId: this.props.partyId,
                                phone: this.state.phone,
                                email: this.state.email,
                                address: this.state.address,
                                upRegionId: this.state.selectedProvince.id ? this.state.selectedProvince.id : null,
                                regionId: this.state.selectedRegion.id ? this.state.selectedRegion.id : null,
                                postalCode: this.state.postalCode
                            }
                        }
                        service={GetManagedCustomerContactServices.getAllContactByFilterMethod}
                        Columns={Columns}
                        sort={this.state.sort}
                        classMainHeightOpenPanel={"main-paper-container-server-open"}
                        reRender={true}
                        callServiceAgain={true}>

                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={12}>
                                    <AutoCompleteComplete
                                        {...this.state.party}
                                        handleChange={(value) => this.handlePartyChange(value)}
                                        value={this.state.selectedParty.fullName}
                                        service={GetPartiesService.simpleSearchCustomers} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={3}>
                                    <Email label="ایمیل" handleChange={(e) => this.handleChange(e, 'email')} value={this.state.email} isLeftStartText={true} />
                                </Grid>
                                <Grid item md={2}>
                                    <NumberFormatComponent id="phone" label="تلفن"
                                        value={this.state.phone}
                                        handleChange={(value, error) => this.handleChange(value, 'phone')} type="number" />
                                </Grid>
                                <Grid item md={3}>
                                    <NumberFormatComponent id="postalCode" label="کد پستی"
                                        value={this.state.postalCode}
                                        handleChange={(value, error) => this.handleChange(value, 'postalCode')} type="number" />
                                </Grid>
                                <Grid item md={4}>
                                    <Input label="نشانی" handleChange={(e) => this.handleChange(e, 'address')} value={this.state.address} />
                                </Grid>
                                <Grid item md={2}>
                                    <ComboBoxComponent isFilterable {...this.state.province}
                                        handleChange={(value, name) => this.handleChange(value, name)}
                                        value={this.state.selectedProvince} />
                                    {/* <div className="k-rtl">
                                        <DropDownComponent {...this.state.province}
                                            handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                                            value={this.state.selectedProvince} />
                                    </div> */}
                                </Grid>
                                <Grid item md={2}>
                                    <ComboBoxComponent isFilterable {...this.state.region}
                                        handleChange={(value, name) => this.handleChange(value, name)}
                                        value={this.state.selectedRegion} />
                                    {/* <div className="k-rtl">
                                        <DropDownComponent {...this.state.region}
                                            handleChange={(value, name) => this.handleChange(value, name)} isFilterable={true}
                                            value={this.state.selectedRegion} />
                                    </div> */}
                                </Grid>
                            </Grid>
                        </div>
                        
                    </GridServer>

                </Paper>
            </React.Fragment>
        )
    }


}


export default withStyles(styles)(GetManagedCustomerContactComponent);