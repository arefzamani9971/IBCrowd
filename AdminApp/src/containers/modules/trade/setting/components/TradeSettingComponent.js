import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import TabList from 'shared/components/tab/tab';
import SettlementSettingComponent from './SettlementSettingComponent';
import EditWageFinancialTools from './EditWageFinancialToolsComponent';
import EditManagementSymbolTrade from './EditManagementSymbolTradeComponent';
import EditExceptionTradeSettingComponent from './EditExceptionTradeSettingComponent';

class TradeSettingComponent extends React.Component{
    constructor(props) {
        super(props)
        
        this.state = {
            

            tabList :[
                { label: "تسویه پایاپای", key: 1, id: 1, component: <SettlementSettingComponent  {...props} id={1}/> },
                { label: "ویرایش کارمزد ابزار های مالی", key: 2, id: 2, component: <EditWageFinancialTools  {...props} id={2}/> },
                // { label: "   استثنائات معاملات", key: 3, id: 3, component: <EditExceptionTradeSettingComponent  {...props} id={3}/> },
                // { label: "    مدیریت نماد های معاملاتی", key: 4, id: 4, component: <EditManagementSymbolTrade  {...props} id={4}/> },


                

            ]
        };
    }
    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <br />
                <TabList updatePerChange style={{height: "65px !important", marginTop: -15 }}  list={this.state.tabList}></TabList>
            </React.Fragment>



        )
    }

}
export default TradeSettingComponent;