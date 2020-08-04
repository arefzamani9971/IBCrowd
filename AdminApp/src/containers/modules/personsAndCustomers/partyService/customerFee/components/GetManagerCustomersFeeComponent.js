import React from 'react';
import GetManagerCustomersFeeService from '../services/GetManagerCustomersFeeService';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import Header from 'shared/components/stateHeader/stateHeader'
import { GridServer } from '../../../../../../shared/components/kendoGrid/kendoGrid';
import Columns from '../constants/GetManagerCustomersFeeColumns'
import Paper from '@material-ui/core/Paper';
import { productTemplate, productHeaderTemplate } from '../../../../../../constants/autoCompleteTemplate';
import MultiSelectAutoCompleteComponent from '../../../../../../shared/components/dropDown/multiSelectAutoComplete'
import MultiSelectComponent from '../../../../../../shared/components/dropDown/multiSelect';
import GetPartiesService from '../../../../personsAndCustomers/customers/customersList/services/GetPartiesService';
import GetAllProductsPaging from "../../../../../../services/getProducts";
import './CustomerFee.css';
import GetGroupsService from '../../../partyGroup/groups/services/GetGroupsService';
class GetManagerCustomersFeeComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customerList: {
                name: "customers",
                dataTextField: 'fullName',
                dataValueField: 'id',
                placeholder: 'نام نام خانوادگی مشتری کد ملی شماره شناسنامه یا نام پدر مشتری را وارد کنید',
                label: "نام و نام خانوادگی مشتری"
            },
            isinsList: {
                name: "isins",
                placeholder: 'جستجوی نماد',
                dataTextField: 'symbol',
                dataValueField: 'isin',
                fieldSearch: 'phrase',
                template: productTemplate,
                headerTemplate: productHeaderTemplate,
                label: "عنوان نماد"
            },
            groupList: {
                name: "groups",
                field: "title",
                label: "گروه ها",
                list: []
            },
            groups: [],
            isins: [],
            customers: [],
            sort: [
                {
                    field: "created",
                    dir: "desc"
                }
            ]
        }
        this.handleChange = this.handleChange.bind(this);
        // this.removeMultiSelectHandles = this.removeMultiSelectHandles.bind(this);
        // this.addMultiSelectHandles = this.addMultiSelectHandles.bind(this);
    };

    componentDidMount() {
        this.getGroups();
    }


    getGroups() {
        GetGroupsService.getAllGroupByFilter({}, (response) => {
            if (response.result) {
                this.setState({
                    groupList: {
                        name: "groups",
                        field: "title",
                        label: "گروه ها",
                        list: response.result
                    }
                })
            }
        });
    }

    handleChange = (value, name) => {
        let item = value.value;
        this.setState({
            [name]: item
        })
    };

    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container customer-fee"}>
                    <GridServer
                        reportFilter={
                            {
                                partyIds: this.state.customers,
                                isins: this.state.isins,
                                groupIds: this.state.groups.map(item => {return item.id})
                            }
                        }
                        {...this.props}
                        {...this.state}
                        service={GetManagerCustomersFeeService.getFlatPartyTradeDiscount}
                        Columns={Columns}
                        classMainHeightOpenPanel={"main-paper-container-server-open"}
                        sort={this.state.sort}
                        hasToolbar={{ haveExcelPfdReport: { excelReportHandler: this.excelReportHandler, pdfReportHandler: this.pdfReportHandler } }}>
                        <div classPage={"height-search"}>
                            <Grid container spacing={8} className="no-margin">
                                <Grid item md={12}>
                                    <MultiSelectAutoCompleteComponent
                                        {...this.state.customerList}
                                        handleChange={(value , name) => this.handleChange(value, name)}
                                        service={GetPartiesService.simpleSearchCustomers}
                                    />
                                </Grid>
                                <Grid item md={12}>
                                    <MultiSelectAutoCompleteComponent
                                        {...this.state.isinsList}
                                        handleChange={(value , name) => this.handleChange(value, name)}
                                        service={GetAllProductsPaging.getAllProductsPagingMethod}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <div className="k-rtl">
                                        <MultiSelectComponent isFilterable {...this.state.groupList}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            value={this.state.groups} />
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

export default GetManagerCustomersFeeComponent;