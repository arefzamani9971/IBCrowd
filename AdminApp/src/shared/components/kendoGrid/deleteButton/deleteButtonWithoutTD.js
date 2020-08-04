import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import FaIcon from 'shared/components/Icon/Icon';
import classNames from 'classnames';
import styles from 'containers/layout/panel/theme';
import { connect } from "react-redux";
import { setDelete } from 'store/actions';
import toastr from 'toastr';

class DeleteButtonComponents extends React.Component {
    state = {
        open: false,
    };
    constructor(props) {
        super(props);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.successDelete = this.successDelete.bind(this);
    }

    openDeleteModal() {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    };

    delete = () => {
        let command = {
            entity: this.props.entity
        };
        this.props.deleteService(command, this.successDelete);
        this.setState({ open: false });
    };

    successDelete(response) {
        if (response.success) {


            this.props.setDelete(this.props.entity);
            toastr.success(response.message);

        }
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Button size="small" style={{ color: 'red' }} className={classNames(classes.margin, classes.btnEdit)} onClick={this.openDeleteModal}>
                    <FaIcon name="fas fa-trash" size={15} />
                </Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <Paper className="paper-modal">

                        <h3 >
                            <FaIcon color="orange" name="fas fa-exclamation-triangle" size={20} />
                            <span style={{ marginRight: '5px' }}> حذف {this.props.title}</span>
                        </h3>
                        <hr />
                        <h3>
                            {this.props.modalBodyTitle}
                            <strong> {this.props.entity.title} </strong> مطمئن می باشید.
                        </h3>
                        <br />
                        <Button variant="contained" color="secondary" className={classes.button} style={{ backgroundColor: 'red', color: '#FFF' }} onClick={this.delete}>
                            حذف
                        </Button>
                        <Button variant="contained" color="secondary" className={classes.button} style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={this.handleClose}>
                            انصراف
                        </Button>
                    </Paper>
                </Modal>

            </React.Fragment>
        )
    }
}
DeleteButtonComponents.defaultProps = {
    title: '',
    fullName: 'مورد انتخابی',
    modalBodyTitle: "آیا از حذف"
};
const mapStateToProps = (state) => {
    return {
    }
};
/*<-------------------connect------------->*/
const mapDispatchToProps = dispatch => {
    return {
        setDelete: data => dispatch(setDelete(data)),

    };
};
const Delete = connect(mapStateToProps, mapDispatchToProps)(DeleteButtonComponents);
export default withStyles(styles)(Delete);

