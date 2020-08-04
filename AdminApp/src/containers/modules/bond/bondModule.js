import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import BondsModule from './bonds/bondsModule';

class BondModule extends Component {

    render() {
        return (
            <div className="height-page">
                <Switch>
                    <Route path="/main/bond/bonds" component={BondsModule} />
                </Switch>
            </div>
        )
    }
}

export default BondModule;


