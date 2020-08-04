import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridServer } from 'shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetCustomerRelationColumn'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../../../../layout/panel/theme'
import GetPartyRelationService from '../services/GetCustomersRelationService';
import GetEnum from 'services/getEnum';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetPartiesService from '../../customersList/services/GetPartiesService';
import './GetCustomersRelationComponent.css'
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}


class GetCustomersRelationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            partyParent: {
                name: "selectedParentParty",
                field: "fullName",
                placeholder: "جستجوی مشتری اصلی بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفصیل",
                 label:"نام و نام خانوادگی مشتری",
                list: []
            },
            selectedParentParty: { fullName: '' },
            partyChild: {
                name: "selectedChildParty",
                field: "fullName",
                placeholder: "جستجوی مشتری وابسته بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفصیل",
                 label:"نام و نام خانوادگی مشتری",
                list: []
            },
            selectedChildParty: { fullName: '' },
            //Arin add
            relation: {
                name: "customerRelation",
                field: "title",
                label: "نوع ارتباط",
                list: []
            },
            //Arin add

            sort: [{
                field: "created",
                dir: "desc"
            }],
          
           
            customerRelation: null,
            // this.successRelationType = this.successRelationType.bind(this);
            // this.getDropDownLists = this.getDropDownLists.bind(this);
        }
    }
    componentDidMount() {
        this.getDropDownLists();
    }
    getDropDownLists = () => {
        GetEnum("relationshiptype", (response) => { DropDownListDataProvider(this, "relation", response) })
    };
    componentDidUpdate() { }
    handleParentChange = (item) => {
        this.setState({
            selectedParentParty: item.value,
        })
    };
    handleChildChange = (item) => {
        this.setState({
            selectedChildParty: item.value,
        })
    };
    handleDropDownChange = (item) => {
        this.setState({
            customerRelation: item.value,
        })
    };
    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container customer-relation"}>
                        <GridServer
                            {...this.state}
                            reportFilter={
                                {
                                    parentPartyId: this.state.selectedParentParty ? this.state.selectedParentParty.id : null,
                                    childPartyId: this.state.selectedChildParty ? this.state.selectedChildParty.id : null,
                                    id: null,
                                    relationshipType: this.state.customerRelation ? this.state.customerRelation.code : null,
                                    startDate: null,
                                    endDate: null
                                }
                            }
                            
                            callServiceAgain={true}
                            service={GetPartyRelationService.getAllCustomersRelationByFilter}
                            Columns={Columns}
                            sort={this.state.sort}
                            classMainHeightOpenPanel={"main-paper-container-server-open"}
                            reRender={true}>
                            <div classPage={"height-search"}>
                                <Grid container spacing={8} className="no-margin">
                                    <Grid item md={6}>
                                        <AutoCompleteComponent
                                            {...this.state.partyParent}
                                            handleChange={(value) => this.handleParentChange(value)}
                                            service={GetPartiesService.simpleSearchCustomers}
                                            value={this.state.selectedParentParty.fullName}
                                        />
                                    </Grid>
                                    <Grid item md={6}>
                                        <AutoCompleteComponent
                                            {...this.state.partyChild}
                                            handleChange={(value) => this.handleChildChange(value)}
                                            service={GetPartiesService.simpleSearchCustomers}
                                            value={this.state.selectedChildParty.fullName}
                                        />
                                    </Grid>
                                    <Grid item md={3}>
                                        <div className="k-rtl">
                                            <DropDownComponent
                                                {...this.state.relation}
                                                handleChange={(value) => this.handleDropDownChange(value)}
                                                value={this.state.customerRelation}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </GridServer>

                </Paper>
           

            </React.Fragment>
        )
    }


}

export default withStyles(styles)(GetCustomersRelationComponent);