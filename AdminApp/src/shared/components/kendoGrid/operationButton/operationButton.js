import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from 'containers/layout/panel/theme';
import MenuPopupState from '../../../menuePropsState/menuePropsState';
class OperationButton extends React.Component {
    state = {

    };
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <React.Fragment>
                <td>
                    <MenuPopupState name="more" icon="fas fa-ellipsis-h">*/}
                   {this.props.children}
                    </MenuPopupState>
                </td>


            </React.Fragment>
        )
    }
}


export default withStyles(styles)(OperationButton);

