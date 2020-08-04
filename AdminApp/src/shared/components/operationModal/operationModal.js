
import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import NumberFormatComponent from "shared/components/numberFormat/numberFormat";
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DropDownListDataProvider from "core/dropDownListDataProvider";
import GetEnum from 'services/getEnum';
import './operationModal.css'
import toastr from 'toastr';
class OperationModal extends Component {


    constructor(props) {
        super(props);
        this.radioList = null;
        this.state = {
            printTypeList: {
                name: "printType",
                field: "title",
                label: "نوع چاپ",
                list: []
            },

            selectedItem: '',
            open: false,
            selectedIds: this.props.selectedIds,
            radioButtonList: this.props.radioButtonList,
            reRender: false,
            fromDate: null,
            toDate: null,
            fromVoucherNumber: null,
            toVoucherNumber: null,

            voucherPrintType: {
                name: "voucherPrintTypeSelected",
                field: "title",
                label: "حالت چاپ",
                list: []
            },
            voucherPrintTypeSelected: { code: 0, title: '' },



        };
    };

    componentDidMount() {
        GetEnum("voucherPrintType", (response) => DropDownListDataProvider(this, "voucherPrintType", response));

    }

    componentDidUpdate(preProps) {
        if (this.props.openModal !== this.state.open) {
            this.setState({
                open: this.props.openModal
            });
        }
        if (preProps.openModal !== this.props.openModal && this.props.openModal) {
            this.setState({
                open: true,
                selectedItem: this.props.radioButtonList[0].title
            }, () => {
                this.createButtonRadio();
            });
        }

        if (preProps.selectedIds !== this.props.selectedIds) {
            this.setState({
                selectedIds: this.props.selectedIds
            })
        }

    }

    createButtonRadio = () => {
        this.radioList =
            this.state.radioButtonList.map(item => {
                return (
                    <React.Fragment>
                        <Grid container spacing={8}>
                            <Grid item md={4}>
                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={this.state.selectedItem == item.title}
                                            onChange={this.handleChangeRadio}
                                            value={item.title}
                                            color="primary"
                                        />
                                    }
                                    label={item.label}
                                />
                            </Grid>
                            {
                                item.detail !== null ?
                                    <React.Fragment>
                                        <Grid item md={4}>
                                            {
                                                item.detail.type === "date" ?

                                                    <PersianDatePicker selectedDate={this.state.fromDate} label={item.detail.from.label}
                                                        handleOnChange={(e) => this.handleChangeDate(e, 'fromDate')}
                                                        disabled={this.state.selectedItem !== item.title} />
                                                    :
                                                    <NumberFormatComponent
                                                        label={item.detail.from.label}
                                                        value={this.state.fromVoucherNumber}
                                                        disabled={this.state.selectedItem !== item.title}
                                                        handleChange={(e) => this.handleChange(e, 'fromVoucherNumber')}
                                                        type="number"
                                                    />
                                                // <Input label={item.detail.from.label}
                                                //     disabled={this.state.selectedItem !== item.title}
                                                //     type="number" handleChange={(e) => this.handleChange(e, item.detail.from.title)} value={item.detail.from.value} />
                                            }

                                        </Grid>
                                        <Grid item md={4}>
                                            {
                                                item.detail.type === "date"
                                                    ?
                                                    <PersianDatePicker
                                                        disabled={this.state.selectedItem !== item.title}
                                                        selectedDate={this.state.toDate} label={item.detail.to.label}
                                                        handleOnChange={(e) => this.handleChangeDate(e, 'toDate')} />
                                                    :
                                                    <NumberFormatComponent
                                                        label={item.detail.to.label}
                                                        value={this.state.toVoucherNumber}
                                                        disabled={this.state.selectedItem !== item.title}
                                                        handleChange={(e) => this.handleChange(e, 'toVoucherNumber')}
                                                        type="number"
                                                    />
                                                // <Input label={item.detail.to.label} 
                                                //     disabled={this.state.selectedItem !== item.title}
                                                //     type="number" handleChange={(e) => this.handleChange(e, item.detail.to.title)} value={item.detail.to.value} /> 
                                            }
                                        </Grid>
                                    </React.Fragment>
                                    : ''
                            }

                        </Grid>
                    </React.Fragment>
                )
            })

        this.setState({
            reRender: !this.state.reRender
        })
    }

    handleClose = () => {
        this.setState({
            open: false,
            fromDate: null,
            toDate: null,
            fromVoucherNumber: '',
            toVoucherNumber: '',
            voucherPrintTypeSelected: { code: 0, title: '' },
        });

        this.props.handleClose(this.props.name);
    }
    handleChangeRadio = (e) => {
        this.setState({
            selectedItem: e.target.value,
            fromDate: null,
            toDate: null,
            fromVoucherNumber: '',
            toVoucherNumber: ''
            // radioButtonList: this.props.radioButtonList,
        }, () => {
            this.createButtonRadio();

        })
    }
    handleChangeDate = (value, name) => {
        this.setState({
            [name]: value
        }, () => {
            this.createButtonRadio();
        })
    }
    handleChange(e, name) {
        this.setState({
            [name]: e.value
        }, () => {
            this.createButtonRadio();
        })
    }


    confirmOperation = () => {

        if (this.state.selectedIds.length === 0 && this.state.selectedItem == this.props.radioButtonList[0].title) {
            toastr.error("هیچ موردی انتخاب نشده است");
        }
        else if (this.state.selectedItem == this.props.radioButtonList[1].title && this.state.fromVoucherNumber === '' && this.state.toVoucherNumber === '') {

            toastr.error("هیچ شماره سندی انتخاب نشده است");

        }
        else if (this.state.selectedItem == this.props.radioButtonList[2].title && this.state.fromDate == null && this.state.toDate == null) {

            toastr.error("هیچ تاریخی  انتخاب نشده است");

        }

        else {

            var command = {
                fromDate: this.state.fromDate,
                toDate: this.state.toDate,
                fromVoucherNumber: this.state.fromVoucherNumber,
                toVoucherNumber: this.state.toVoucherNumber,
            }

            if (this.props.hasPrintType) {
                if (this.state.voucherPrintTypeSelected.code === 0) {
                    toastr.error("هیچ حالتی برای چاپ سند انتخاب نشده است");

                }
                command.voucherPrintTypeSelected = this.state.voucherPrintTypeSelected ? this.state.voucherPrintTypeSelected.code : null;
            }
            this.props.confirmOpertion(this.props.name, command);
            // this.setState({
            //     open:false
            // });
       
        }
        this.handleClose();

    }
    render() {

        return (
            <React.Fragment>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                >
                    <Paper className="operation-modal">
                        <h3>
                            <span className="margin-right-5">{this.props.title}</span>
                        </h3>
                        <hr />
                        {
                            this.props.hasPrintType
                                ?
                                <Grid container spacing={8} className="m-0">
                                    <Grid item md={12} className="mb-1">
                                        <DropDownComponent
                                            {...this.state.voucherPrintType}
                                            handleChange={(value, name) => this.handleChange(value, name)}
                                            value={this.state.voucherPrintTypeSelected}

                                        />
                                    </Grid>



                                </Grid>
                                :
                                ''
                        }

                        {this.radioList}
                        <hr />
                        <Button variant="contained" color="primary" style={{ marginRight: '5px' }}
                            onClick={this.confirmOperation}>
                            <span style={{ margin: '0 5px' }}>
                                {this.props.actionTitle}
                            </span>
                        </Button>
                        <Button variant="contained" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }}
                            onClick={this.handleClose}>
                            <span style={{ margin: '0 5px' }}>
                                انصراف
                        </span>
                        </Button>
                    </Paper>
                </Modal>
            </React.Fragment>

        );
    }
}

OperationModal.defaultProps = {
    operationModalInfo: {
        radioButtonList: []
    },
    selectedIds: []
};

export default OperationModal;
