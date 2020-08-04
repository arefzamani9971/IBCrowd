import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import Header from 'shared/components/stateHeader/stateHeader'
import PropTypes from 'prop-types';
import styles from '../../../../../layout/panel/theme'
import TabList from 'shared/components/tab/tab';
import DocumentRealCustomer from './DocumentRealCustomerComponent';
import GetServiceOfRealCustomerComponentTab from './GetServiceOfRealCustomerComponentTab';
import GetCustomerContactComponentTab from './GetCustomerContactComponentTab';
import GetPartyBankAccountsComponentTab from './GetPartyBankAccountsComponentTab';
import GetCustomersTradingCodesComponentTab from './GetCustomersTradingCodesComponentTab';
import AddManageCustomerRecordsComponent from '../../manageCustomerRecords/component/AddManageCustomerRecordsComponent'

let tabId = 1;
class CompleteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabList: [
                { label: "اسناد و مدارک", key: 1, id: 1, component: <AddManageCustomerRecordsComponent {...this.props} hasHeader hasFullHeight /> },
                { label: "خدمات", key: 2, id: 2, component: <GetServiceOfRealCustomerComponentTab displayName="ServiceOfRealCustomerComponent"  {...this.props}/> },
                { label: "اطلاعات تماس", key: 3, id: 3, component: <GetCustomerContactComponentTab displayName="GetCustomerContactComponentTab"  {...this.props}/> },
                { label: "مدیریت حسابهای بانکی", key: 4, id: 4, component: <GetPartyBankAccountsComponentTab displayName="GetPartyBankAccountsComponentTab"  {...this.props}/> },
                { label: "مدیریت کدهای معاملاتی مشتری", key: 5, id: 5, component: <GetCustomersTradingCodesComponentTab displayName="GetCustomersTradingCodesComponentTab"  {...this.props}/> },
            ]
        };

        
        
    }


   componentDidMount(){

   


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

     
       // let tabId = this.props.location.state.tabId == undefined ? 1 : this.props.location.state.tabId
        if(typeof this.props.location.state  !== 'number'){
        tabId =  this.props.location.state.tabId
        }

        return (
            <React.Fragment>
                <WrapperPaper />
                <Header {...this.props} />
                {/* <TabList list={tabList}></TabList> */}
                <TabList 
                updatePerChange 
                // style={{ height: 535, marginTop: -15 }} 
                list={this.state.tabList}
                selectedTab={this.state.tabList[tabId-1].component}
                ></TabList>
            </React.Fragment >
        )

    }

}
CompleteForm.propTypes = {
    classes: PropTypes.object.isRequired,
   

};

export default withStyles(styles)(CompleteForm);