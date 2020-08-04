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
import Columns from '../constants/GetLegalCustomerContactColumnsTab';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
// import GetPartiesService from "../../customersList/services/GetPartiesService";
import WrapperPaper from "shared/components/mainPaper/wrapperPaper";
// import GetManagedCustomerContactServices from "../services/getManagedCustomerContactService";
import './GetLegalCustomerContactComponentTab.css'
// import GetManagedCustomerContactServices from '../../managedCustomerContact/services/getManagedCustomerContactService';
import { element } from 'prop-types';
import GetManagedCustomerContactServices from '../../managedCustomerContact/services/getManagedCustomerContactService';
// import GetManagedCustomerContactServices from '../../managedCustomerContact/services/getManagedCustomerContactService';
// import DeleteManagedCustomerContactServices from '../../managedCustomerContact/services/deleteManagedCustomerContactService';
class GetLegalCustomerContactComponentTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: [{
                field: "created",
                dir: "desc"
            }],

        };


    }




    add = () => {

        this.props.history.push(
            {
                pathname: this.props.addInGridCustomerContact.path,
                state: JSON.stringify({
                    backButton: { path: "/main/persons/customers/completeRegisterLegalCustomer", title: "تکمیل فرم ثبت نام مشتریان " },
                    tabId: 3,
                    partyId: this.props.partyId
                })
            }
        )
    }

    // remove = () => {
    //     alert('remove')
    // }
    edit = (v) => {
        // alert(v);
       
        this.props.history.push(
            {
                pathname: this.props.editInGridCustomerContact.path,
                state: JSON.stringify({
                    id: v,
                    backButton: { path: "/main/persons/customers/completeRegisterLegalCustomer", title: "تکمیل فرم ثبت نام مشتریان " },
                    tabId: 3,
                    partyId: this.props.partyId,
                })

            }
        );
    }

    // delete = (value) => {
    //     DeleteManagedCustomerContactServices.deleteContactByIdMethod({entity: value}, () => {
    //                 this.setState({})
    //     });
    //     // alert(value)
    // }



    render() {
        const { classes } = this.props;
        return (
            <React.Fragment
            >
                {/* <WrapperPaper /> */}

                <Paper className={"main-paper-container main-height managed-legal-customer-contact-tab add-grid"}>

                    <GridServer 

                        {...this.props}
                        {...this.state}
                        reportFilter={
                            {
                                partyId: this.props.partyId
                            }
                        }
                        service={GetManagedCustomerContactServices.getAllContactByFilterMethod}
                        Columns={Columns}
                        sort={this.state.sort}
                        // classHeightOpenPanel={"height-open-grid"}
                        reRender={true}
                        callServiceAgain={true}
                        hasToolbar={{ elemnts: [{ id: 'add', title: 'افزودن تماس با مشتری', method: this.add }] }}
                        EditCustomerContactTab={this.edit}
                    // DeleteCustomerContactTab={this.delete}
                    >


                    </GridServer>

                </Paper>
            </React.Fragment>
        )
    }


}

export default withStyles(styles)(GetLegalCustomerContactComponentTab);