import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import TabList from 'shared/components/tab/tab';
import CashFlowSettingComponent from '../components/CashFlowSettingComponent';
import CashFlowSettingComponentHistory from "./CashFlowSettingComponentHistory";

class CashFlowSettingComponentMainTab extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

            tabList :[
                { label: "تنظیمات", key: 1, id: 1, component: <CashFlowSettingComponent   displayName="CashFlowSettingComponent"    {...props}/> },
                { label: "تاریخچه", key: 2, id: 2, component: <CashFlowSettingComponentHistory    displayName="CashFlowSettingComponentHistory"    {...props}/> },
            ]
        };
    }
    render() {

        return (
            <React.Fragment>
                <Header {...this.props} />
                <br />
                <TabList updatePerChange style={{ height: '500px', marginTop: -15 }}  list={this.state.tabList}></TabList>
            </React.Fragment>

        )
    }
}

export default CashFlowSettingComponentMainTab;
