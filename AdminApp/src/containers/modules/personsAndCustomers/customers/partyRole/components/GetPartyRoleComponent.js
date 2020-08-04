import React from 'react';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridClient, GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetPartyRoleColumn'
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import FaIcon from 'shared/components/Icon/Icon';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../../../../layout/panel/theme'
import GetEnum from 'services/getEnum';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import './GetPartyRoleComponent.css'
import GetPartyRoleService from "../services/GetPartyRoleService";
// import GetPartiesService from '../../customersList/services/GetPartiesService';
import Fieldset from 'shared/components/fieldset/fieldset';
import NoDataDatePicker from 'shared/components/persianDatePicker/noDataDatePicker';

import { customerTemplateForRepresentativeAutoComplete, customerHeaderTemplateForRepresentativeAutoComplete } from 'constants/autoCompleteTemplate';
import GetPartiesService from '../../customersList/services/GetPartiesService';
const $ = require("jquery");
class GetPartyRoleComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // party: {
            //     name: "selectedParty",
            //     field: "fullName",
            //     placeholder: "جستجوی شخص  بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر،  شماره حساب و شماره تفصیل",
            //     label: "نام و نام خانوادگی شخص",
            //     list: []
            // },
            // selectedParty: { fullName: '', id: 0 },

            getAllPersonWithRole: {
                name: "selectedPerson",
                field: "fullName",
                placeholder: "جستجوی شخص بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره تفصیل",
                label: "نام و نام خانوادگی شخص",
                list: [],
                template: customerTemplateForRepresentativeAutoComplete,
                headerTemplate: customerHeaderTemplateForRepresentativeAutoComplete,
            },
            selectedPerson: { fullName: '', id: 0 },
            sort: [{
                field: "created",
                dir: "desc"
            }],
            startRoleFrom: null,
            startRoleTo: null,
            validRoleFrom: null,
            validRoleTo: null,


            relation: {
                name: "customerRelation",
                field: "captionFA",
                label: "نقش",
                list: []
            },
            customerRelation: {codeId : -1},
            roleCode: 0,
            getAllPersonWithRoleForAutocompleteStatus: false,
            // getAllPartyForAutocompleteStatus: true,
        }
    }

    componentDidMount() {
        this.getDropDownLists();

    }
    getDropDownLists = () => {
        GetPartyRoleService.getAllPersonalityRolesMethod(null, (response) => {
            if (response.success) {
                response.result.unshift({
                    codeId: -1,
                    captionFA: "همه"
                })
                this.setState({
                    customerRelation: response.result[0],
                    relation: {
                        name: "customerRelation",
                        field: "captionFA",
                        label: "نقش",
                        list: response.result.filter(item => { return item.codeId !== 1 }),
                    },
                })
            }
        });
    };
    handleDropDownChange = (item) => {
        // if (item.value.codeId == '-1') {
        //     // alert(11);
        //     this.setState({
        //         customerRelation: item.value,
        //         roleCode: item.value.codeId,
        //         getAllPersonWithRoleForAutocompleteStatus: false,
        //         // getAllPartyForAutocompleteStatus: true
        //         selectedParty: { fullName: '', id: 0 },

        //     })
        // } else {
        this.setState({

            customerRelation: item.value,
            roleCode: item.value.codeId,
            getAllPersonWithRoleForAutocompleteStatus: true,
            // getAllPartyForAutocompleteStatus: false
            selectedPerson: { fullName: '', id: 0 },

        })
        // }

    };
    handleChange(value, name) {
        let item = value.value;
        this.setState({
            [name]: item
        })
    }
    DatePickerChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }
    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container customer-role"}>
                    <GridServer
                        {...this.state}
                        {...this.props}
                        reportFilter={
                            {
                                partyId: this.state.selectedPerson ? this.state.selectedPerson.id : 0,
                                startValidFrom: this.state.startRoleFrom,
                                endValidFrom: this.state.startRoleTo,
                                startValidUntil: this.state.validRoleFrom,
                                endValidUntil: this.state.validRoleTo,
                                personalityRoleType: this.state.customerRelation.codeId,

                            }
                        }
                        service={GetPartyRoleService.getAllPartyRoleService}
                        Columns={Columns}
                        sort={this.state.sort}
                        classMainHeightOpenPanel={"main-paper-container-server-open"}
                        reRender={true}
                        callServiceAgain={true}

                    >
                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={2}>
                                    <div className="k-rtl">
                                        <DropDownComponent
                                            {...this.state.relation}
                                            handleChange={(value) => this.handleDropDownChange(value)}
                                            value={this.state.customerRelation}
                                        />
                                    </div>
                                </Grid>
                                <Grid item md={10}>
                                    {/* {
                                        this.state.getAllPersonWithRoleForAutocompleteStatus
                                            ? */}
                                    <AutoCompleteComponent
                                        {...this.state.getAllPersonWithRole}
                                        additionalFilter={{ roleCode: this.state.roleCode }}
                                        handleChange={(value) => this.handleChange(value, "selectedPerson")}
                                        service={GetPartyRoleService.getAllPersonWithRoleForSearch}
                                        value={this.state.selectedPerson.fullName}
                                    />
                                    {/* :
                                            null
                                    } */}
                                    {/* {
                                        !this.state.getAllPersonWithRoleForAutocompleteStatus
                                            ?
                                            <AutoCompleteComponent
                                                {...this.state.party}
                                                handleChange={(value) => this.handleChange(value, "selectedParty")}
                                                service={GetPartiesService.simpleSearchCustomers}
                                                value={this.state.selectedParty.fullName}
                                            />
                                            :
                                            null
                                    } */}
                                </Grid>
                            </Grid>
                            <br />

                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={4}>
                                    <NoDataDatePicker isNull={true} selectedDate={this.state.startRoleFrom} label="تاریخ شروع نقش (از)" handleOnChange={(value) => this.DatePickerChange('startRoleFrom', value)} />
                                </Grid>
                                <Grid item md={4}>
                                    <NoDataDatePicker isNull={true} selectedDate={this.state.startRoleTo} label="تاریخ شروع نقش (تا)" handleOnChange={(value) => this.DatePickerChange('startRoleTo', value)} />
                                </Grid>
                            </Grid>

                            <br />

                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={4}>
                                    <NoDataDatePicker isNull={true} selectedDate={this.state.validRoleFrom} label="تاریخ اعتبار نقش (از)" handleOnChange={(value) => this.DatePickerChange('validRoleFrom', value)} />
                                </Grid>
                                <Grid item md={4}>
                                    <NoDataDatePicker isNull={true} selectedDate={this.state.validRoleTo} label="تاریخ اعتبار نقش (تا)" handleOnChange={(value) => this.DatePickerChange('validRoleTo', value)} />
                                </Grid>
                            </Grid>

                        </div>
                    </GridServer>
                </Paper>


            </React.Fragment>
        )
    }


}

export default withStyles(styles)(GetPartyRoleComponent);