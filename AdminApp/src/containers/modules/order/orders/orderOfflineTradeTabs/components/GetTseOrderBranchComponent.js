import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum'
import './GetTseOrderBranchComponent.css';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import '@progress/kendo-ui';
import TabList from 'shared/components/tab/tab';
import GetNotEnteredOrderList from './GetNotEnteredOrderListComponent';
import GetOrderDoneList from './GetOrderDoneListComponent';
import GetOrderActiveList from './GetOrderActiveListComponent';

class GetTseOrderBranch extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      /* #region filter state */
   
      tabList :[
        { label: "سفارش وارد نشده", key: 1, id: 1, component: <GetNotEnteredOrderList   displayName="GetNotEnteredOrderList"    {...props}/> },
        { label: "سفارش های فعال", key: 2, id: 2, component: <GetOrderActiveList    displayName="GetOrderActiveList"    {...props}/> },
        { label: "سفارش های انجام شده", key: 3, id: 3, component: <GetOrderDoneList    displayName="GetOrderDoneList"    {...props}/> },
    ]
      /* #region list state */

  
     

      
      /* #endregion */

      /* #endregion */
    };
    /* #region bind */

    

    /* #endregion */



  }

  componentDidMount() {

    this.getDropDownData();

  }
  /* #region get drop-Downs */

  getDropDownData() {

  }


  



  

  getBranchList() {
    GetBranchService.getBranchesByFilter(null, response => DropDownListDataProvider(this, "branchList", response))
  }

  getOrderType() {
    GetEnum('securityexchange', response => DropDownListDataProvider(this, "simpleSecurityExchangeList", response))

  }

  getOrderState(){
    GetEnum('vouchermasterstate', response => DropDownListDataProvider(this, "orderStateList", response))

    
     
  }

 


  /* #endregion */


  /* #region handle change filters */




  render() {

    return (
      <React.Fragment>
        <Header {...this.props} />
        <TabList updatePerChange style={{ height: 535 }}  list={this.state.tabList}></TabList>
      </React.Fragment>

    )
  }
}

export default GetTseOrderBranch;
