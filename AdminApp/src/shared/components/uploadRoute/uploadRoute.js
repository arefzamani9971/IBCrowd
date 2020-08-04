import React from 'react';
import LinkTo from '../topLinkTo/topLinkTo'
import styles from 'containers/layout/panel/theme';
import { withStyles } from '@material-ui/core/styles';

class UploadRoute extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            !this.props.upload.length ?
                <LinkTo to={this.props.upload.path} routeStateParams={this.props.routeStateParams} className="successButton margin-left-5" icon="fa fa-upload"
                    title={this.props.upload.title} />
                :
                this.props.upload.map((upload) =>
                    <LinkTo to={upload.path} className="successButton margin-right-5" icon="fa fa-upload" title={upload.title} />
                )
        )
    }

}

UploadRoute.defaultProps = {
    routeStateParams: null,
}

export default withStyles(styles)(UploadRoute);