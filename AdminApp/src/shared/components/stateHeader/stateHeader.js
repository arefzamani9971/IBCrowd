import React from 'react';
import BackTo from 'shared/components/backButton/backButton'
import Grid from '@material-ui/core/Grid';
import AddRoute from 'shared/components/addRoute/addRoute'
import UploadRoute from 'shared/components/uploadRoute/uploadRoute'

import './header.css'
import AddRouteById from '../addRoute/addRouteById';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stateParams: null
        }
    }

    componentDidUpdate(preProps) {
        if (preProps.stateParams != this.props.stateParams) {
            this.setState({
                stateParams: this.props.stateParams
            })
        }
    }

    render() {
        return (
            <div className="header">
                <Grid container spacing={24}>
                    <Grid item md={8} >
                        <h4 className="main-header">
                            {/* <FaIcon name={this.props.icon} size={30} /> */}
                            <span className="padding-right-1">
                                {this.props.title}
                            </span>
                        </h4>
                    </Grid>
                    <Grid item md={4} className="action-header padding-left-1">
                        {this.props.back ? <BackTo  {...this.props} /> : ''}
                        {this.props.location.state && this.props.location.state.backButton ? <BackTo {...this.props} back={this.props.location.state.backButton} /> : ''}
                        {this.props.add ? <AddRoute {...this.props} /> : ''}
                        {this.props.addById ? <AddRouteById {...this.props} stateParams={this.state.stateParams} /> : ''}
                        {this.props.upload ? <UploadRoute {...this.props} stateParams={this.state.stateParams} /> : ''}
                    </Grid>
                </Grid>
            </div>

        )
    }
}

export default Header;