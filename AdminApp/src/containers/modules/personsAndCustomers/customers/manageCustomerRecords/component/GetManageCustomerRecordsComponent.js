import React from 'react';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridClient, GridServer } from 'shared/components/kendoGrid/kendoGrid';
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
import styles from '../../../../../layout/panel/theme';
import AutoCompleteComplete from 'shared/components/dropDown/autocomplete';
import GetEnum from 'services/getEnum';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetPartiesService from "../../customersList/services/GetPartiesService";
import WrapperPaper from "../../../../../../shared/components/mainPaper/wrapperPaper";
import GetManagedCustomerContactServices from "../../managedCustomerContact/services/getManagedCustomerContactService";
import Columns from "../constants/ManageCustomerRecordsConstant";
import GetManageCustomerRecordsServices from "../services/GetManageCustomerRecordsServices";
import PropTypes from "prop-types";
import urlSettings from "../../../../../../constants/urlSettings";
import './ManageCustomerDocumnets.css';
// import './GetCustomerTradingComponent.css'
class GetManageCustomerRecordsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جستجوی مشتری بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفصیل",
                 label:"نام و نام خانوادگی مشتری",
                list: []
            },
            sort: [{
                field: "created",
                dir: "desc"
            }],
            selectedParty: {},
            
        };
    }

    handlePartyChange = (item) => {
        this.setState({
            selectedParty : item.value
        })
    };
    render() {
        console.log('partyIDstate',this.state.partyId)
        console.log('partyIDprops',this.props.partyId)

        const { classes } = this.props;
        return (
            <React.Fragment>
                <Header {...this.props} stateParams={this.state.selectedParty ?  {partyId: this.state.selectedParty.id } : null} />
                <Paper className={"main-paper-container managed-customer-document"}>

                    <GridServer
                        {...this.props}
                        {...this.state}
                        reportFilter={
                            {
                                partyId: this.state.selectedParty ? this.state.selectedParty.id : 0
                            }
                        }
                        service={GetManageCustomerRecordsServices.getPartyAttachmentByFilterMethod}
                        Columns={Columns}
                        sort={this.state.sort}
                        classMainHeightOpenPanel={"main-paper-container-server-open"}
                        reRender={true}
                        callServiceAgain={true}
                    >
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
                        </div>
                    </GridServer>

                </Paper>
            </React.Fragment>
            
        )
    }



}
GetManageCustomerRecordsComponent.defaultProps= {
    downloadURL: urlSettings.downloadUrl,
};
export default withStyles(styles)(GetManageCustomerRecordsComponent);