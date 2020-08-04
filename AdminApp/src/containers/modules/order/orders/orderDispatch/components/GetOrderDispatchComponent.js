import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum'
import './GetOrderDispatchComponent.css';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import '@progress/kendo-ui';
import TabList from 'shared/components/tab/tab';
import GetOrderWaitingList from './GetOrderWaitingListComponent';
import GetOrderOngoingList from './GetOrderOngoingListComponent';
class GetOrderDispatch extends React.Component {

  constructor(props) {
    super(props)

    this.state = {

      tabList: [
        { label: "فهرست انتظار", key: 1, id: 1, component: <GetOrderWaitingList displayName="GetOrderWaitingList"    {...props} /> },
        { label: "در دست اقدام", key: 2, id: 2, component: <GetOrderOngoingList displayName="GetOrderOngoingList"    {...props} /> },
      ]
    };
  }

  getBranchList() {
    GetBranchService.getBranchesByFilter(null, response => DropDownListDataProvider(this, "branchList", response))
  }

  getOrderType() {
    GetEnum('securityexchange', response => DropDownListDataProvider(this, "simpleSecurityExchangeList", response))

  }

  getOrderState() {
    GetEnum('vouchermasterstate', response => DropDownListDataProvider(this, "orderStateList", response))
  }

  render() {

    return (
      <React.Fragment>
        <Header {...this.props} />
        <TabList updatePerChange style={{ height: 535 }} list={this.state.tabList}></TabList>
      </React.Fragment>

    )
  }
}

export default GetOrderDispatch;
