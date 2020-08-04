import React, { Component } from 'react';

import route from './optionDetailsRoutes'
import RouteModule from 'core/routeModule';

class OptionDetailsModule extends Component {

    render() {

        return (
            <RouteModule route={route} />
        )
    }
}

export default OptionDetailsModule;


