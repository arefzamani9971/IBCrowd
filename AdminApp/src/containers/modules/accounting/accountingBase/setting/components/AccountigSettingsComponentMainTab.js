import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import '@progress/kendo-ui';
import TabList from 'shared/components/tab/tab';
import AccountingSettingsComponents from './AccountingSettingsComponents';
import AccountingSettingComponentAccountingReport from './AccountingSettingComponentAccountingReport';

class AccountigSettingsComponentMainTab extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

            tabList :[
                { label: "عمومی", key: 1, id: 1, component: <AccountingSettingsComponents   displayName="AccountingSettingsComponents"    {...props}/> },
                { label: "گزارش های حسابداری", key: 2, id: 2, component: <AccountingSettingComponentAccountingReport    displayName="AccountingSettingComponentAccountingReport"    {...props}/> },
            ]
        };
    }
    render() {

        return (
            <React.Fragment>
                <Header {...this.props} />
                <br />
                <TabList updatePerChange style={{ marginTop: -15 }}  list={this.state.tabList}></TabList>
            </React.Fragment>

        )
    }
}

export default AccountigSettingsComponentMainTab;
