import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import FaIcon from 'shared/components/Icon/Icon';
import classNames from 'classnames';
import styles from 'containers/layout/panel/theme';
import toastr from 'toastr';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import { setUpdateRow } from 'store/actions';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';


class PriorityButtonComponents extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                open: false,
                priority: this.props.info.priority,
        
            };
    }

    openPriorityModal = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    };

    accepted = () => {
        
        let command = {
            entity: {
                code: this.props.info.code, priority:parseInt(this.state.priority)
            }
        };
        this.props.priorityService(command, this.changePriority);
        this.setState({ open: false });
    };

    changePriority=(response)=> {
        if (response.success) {
            this.props.setUpdateRow(Date.now());
            toastr.success(response.message);
        }
    }

    handleChange = (value, name) => {
        let item = value.value;
        this.setState({
            [name]: item,
        })
    };
    
    render() {
        
        const { classes } = this.props;
        return (
            <React.Fragment>
                    <Button size="small"  style={{ color: 'rgb(33, 150, 243)' }} className={classNames(classes.margin, classes.btnEdit)} onClick={this.openPriorityModal}>
                        <FaIcon name="fa fa-exchange-alt" size={15} />
                    </Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <Paper className="paper-modal">
                        <h3 >
                            <span style={{marginRight: '5px'}}> تغییر اولویت سند
                            <b> {this.props.info.title} </b>
                            </span>
                        </h3>
                        <hr />
                        <Grid item md={12}>
                                <NumberFormatComponent label="مقدار اولویت"
                                    value={this.state.priority}
                                    handleChange={(value) => this.handleChange(value, 'priority')} type="number" />
                            </Grid>
                       
                        <br />
                        <Button variant="contained" color="primary" className={classes.button}  
                        onClick={this.accepted}>
                            تایید
                        </Button>
                        <Button variant="contained" color="secondary" 
                        className={classes.button} style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={this.handleClose}>
                            انصراف
                        </Button>
                    </Paper>
                </Modal>

            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
    }
};
/*<-------------------connect------------->*/
const mapDispatchToProps = dispatch => {
    return {
        setUpdateRow: data => dispatch(setUpdateRow(data)),

    };
};
const Priority = connect(mapStateToProps, mapDispatchToProps)(PriorityButtonComponents)
export default withStyles(styles)(Priority);

