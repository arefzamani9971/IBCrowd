import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import Header from 'shared/components/stateHeader/stateHeader'
import PropTypes from 'prop-types';
import styles from '../../../../../layout/panel/theme'
import TabList from 'shared/components/tab/tab';
import DocumentLegalCustomerComponent from './DocumentLegalCustomerComponent';
import GetServiceOfLegalCustomerComponentTab from './GetServiceOfLegalCustomerComponentTab';
import GetLegalCustomerContactComponentTab from './GetLegalCustomerContactComponentTab';
import GetLegalPartyBankAccountsComponentTab from './GetLegalPartyBankAccountsComponentTab';
import GetLegalCustomersTradingCodesComponentTab from './GetLegalCustomersTradingCodesComponentTab';
import AddManageCustomerRecordsComponent from '../../manageCustomerRecords/component/AddManageCustomerRecordsComponent';
import GetPartyByIdService from '../../../../personsAndCustomers/customers/realCustomers/services/GetPartyByIdService';



// import UpdateRealCustomer from './UpdateRealCustomerComponent';
// import DocumentRealCustomer from './DocumentRealCustomerComponent';
// import ServicesOfRealCustomer from './ServicesOfRealCustomerComponent';
// import DetailRealCustomer from './DetailRealCustomerComponent';

// import GetServiceOfRealCustomerComponentTab from './GetServiceOfRealCustomerComponentTab';
// import GetCustomerContactComponentTab from './GetCustomerContactComponentTab';
// import GetPartyBankAccountsComponentTab from './GetPartyBankAccountsComponentTab';



// const tabs = [
//     {
//         label: "اسناد و مدارک",
//         id:1,
//         component: DocumentRealCustomer,

//     },
//     {
//         label :"اطلاعات بیشتر",
//         id:2,
//         component: DetailRealCustomer
//     },
//     {
//         label: "خدمات",
//         id:3,
//         component: ServiceOfRealCustomerComponent,
//     }
//     // { label: "اطلاعات اولیه", component: <UpdateRealCustomer /> },
// ];
class CompleteFormComponentLegal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {


            tabList: [
                
                {
                    label: "اسناد و مدارک", key: 1, id: 1,
                    component: <AddManageCustomerRecordsComponent displayName="AddManageCustomerRecordsComponent"
                        {...this.props}
                        partyId={this.props.location.state && this.props.location.state.partyId ? this.props.location.state.partyId : this.props.location.state} hasHeader hasFullHeight />
                },
                {
                    label: "خدمات", key: 2, id: 2, component: <GetServiceOfLegalCustomerComponentTab displayName="GetServiceOfLegalCustomerComponentTab"
                        {...this.props}
                        partyId={this.props.location.state && this.props.location.state.partyId ? this.props.location.state.partyId : this.props.location.state} />
                },
                {
                    label: "اطلاعات تماس", key: 3, id: 3, component: <GetLegalCustomerContactComponentTab displayName="GetLegalCustomerContactComponentTab"
                        {...this.props}
                        partyId={this.props.location.state && this.props.location.state.partyId ? this.props.location.state.partyId : this.props.location.state} 
                        />
                },
                {
                    label: "مدیریت حسابهای بانکی", key: 4, id: 4, component: <GetLegalPartyBankAccountsComponentTab displayName="GetLegalPartyBankAccountsComponentTab"
                        {...this.props}
                        partyId={this.props.location.state && this.props.location.state.partyId ? this.props.location.state.partyId : this.props.location.state} />
                },
                {
                    label: "مدیریت کد های معاملاتی مشتری", key: 5, id: 5, component: <GetLegalCustomersTradingCodesComponentTab displayName="GetLegalCustomersTradingCodesComponentTab"
                        {...this.props}
                        partyId={this.props.location.state && this.props.location.state.partyId ? this.props.location.state.partyId : this.props.location.state} />
                },
            ],
            tabId: 1,
            partyId:null,
            selectedParty:{}
        };

    }

    componentDidMount() {
              if (this.props.location.state && this.props.location.state.tabId) {
            this.setState({
                tabId: this.props.location.state.tabId,
            }, () => {
                let partyId = this.props.location.state.partyId;
                if (partyId > 0) {
                    this.getPartyById(partyId);
                }
            })

        }
    }

    getPartyById = (partyId) => {
        let command = {
            entity: partyId,

        };
        GetPartyByIdService.getPartyById(command, (res) => {
            this.setState({
                selectedParty: res.result,
            });
        });
    }
    //     initialTabs() {
    //         tabList=[];
    //         tabs.map((item, id) => {
    //             tabList.push({
    //                 label: item.label,
    //                 id: item.id,
    //                 component: React.createElement(item.component, { ... this.props })
    //             })
    //         })
    //     }
    // getInitialState() {
    //     let initState = JSON.parse(JSON.stringify(initialState));
    //     return initState;
    // }

    render() {


        //   if (this.props.location.state && this.props.location.state.tabId) {
        //         tabId = this.props.location.state.tabId
        //     }
        // let tabId = this.props.location.state.tabId == undefined ? 1 : this.props.location.state.tabId
        console.log('partytype',this.state.selectedParty.partyType)
        return (
            <React.Fragment>
               <Header {...this.props} {...this.state} 
               title={this.state.selectedParty.partyType === 1 ? "تکمیل ثبت نام مشتری حقیقی" : "تکمیل ثبت نام مشتری حقوقی"}
               />
                {/* <TabList list={tabList}></TabList> */}

                <TabList
                    //updatePerChange
                    // style={{ height: 535, marginTop: -15 }} 
                    list={this.state.tabList}
                    selectedTab={this.state.tabList[this.state.tabId - 1].component}>

                </TabList>
            </React.Fragment >
        )

    }

}
CompleteFormComponentLegal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CompleteFormComponentLegal);