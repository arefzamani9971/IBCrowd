import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import LinkTo from '../topLinkTo/topLinkTo'
import styles from 'containers/layout/panel/theme';
import { withStyles } from '@material-ui/core/styles';
import FaIcon from "../Icon/Icon";
class AddRouteById extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stateParams: { params: {} }
        }
        this.go = this.go.bind(this);

    }

    componentDidUpdate(preProps) {
        if (preProps.stateParams != this.props.stateParams) {
            this.setState({
                stateParams: this.props.stateParams
            })
        }

    }
    go() {

        this.props.history.push(
            {
                pathname: this.props.addById.path,
                state: JSON.stringify(this.state.stateParams)
            }
        )
    }

    render() {
        const {classes} = this.props;
        return (

            <Button color="secondary" onClick={this.go}
                className={'successButton push-left ' + classes.submit + (this.props.hasParameter && Object.keys(this.state.stateParams.params).length == 0 ? ' disable-btn' : '')}
                disabled={this.props.disabled || this.props.hasParameter ? Object.keys(this.state.stateParams.params).length == 0 : false}>
                <FaIcon name="fa fa-plus" size={14} />
                <span className="margin-right-4">
                    {this.props.addById.title}
                </span>
            </Button>



        )
    }

}
AddRouteById.defaultProps = {
    disabled: false,
}
export default withStyles(styles)(AddRouteById);

