import React, { Component } from 'react';

import route from './agentStatusRoutes';
import RouteModule from 'core/routeModule';

class AgentStatusModule extends Component {

    render() {

        return (
            <RouteModule route={route} />
        )
    }
}

export default AgentStatusModule;


