import React, { Component } from 'react';

import  route from './settlementRoutes'
import RouteModule from 'core/routeModule';

class TradesModule extends Component {

    render() {
       
        return (
             <RouteModule route={route} />
        )
    }
}

export default TradesModule;


    