import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import FaIcon from 'shared/components/Icon/Icon';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import AdjustedPriceListService from 'containers/modules/statement/statementAndInformation/adjustedPriceList/services/AdjustedPriceListService';

class AdjustedPriceCalculateComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmModal: false,
            adjustedPriceValue: 0,
            adjustedLastPriceValue: 0,
        };
    }

    confirmSettlementVoucher = () => {
        var command = {
            tacingNo: this.props.info.tacingNo,
            isin: this.props.info.isin,
            adjustedPriceValue: this.state.adjustedPriceValue,
            adjustedLastPriceValue: this.state.adjustedLastPriceValue
        };
        var then = function () { }
        AdjustedPriceListService.addCalculatedAdjustedPrice(command, then)
    }
    handleCloseConfirmModal = () => {
        this.setState({
            confirmModal: false
        });
    }
    handleChange(value, name) {
        let item = value.value;
        this.setState({
          [name]: item
        })
      }
    openConfirmModal() {
        this.setState({ confirmModal: true });
    }
    openModal = () => {
        var that = this;
        var then = function (response) {
            that.setState({
                adjustedPriceValue: response.adjustedPriceValue,
                adjustedLastPriceValue: response.adjustedLastPriceValue
            }, () => {
                that.openConfirmModal();
            });
        }
        AdjustedPriceListService.calculateAdjustedPrice(this.props.info.tracingNo, then);
    }

    render() {
        return (
            <React.Fragment>
                <Button size="small" color="primary" onClick={this.openModal}>
                    <i class="fas fa-calculator" style={{ fontSize: "20px", color: "#2196f3", cursor: "pointer" }}></i>
                </Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.confirmModal}
                    onClose={(e) => this.handleCloseConfirmModal(e)}>
                    <Paper className="paper-modal">
                        <h3>
                            <span style={{ marginRight: '5px' }}>محاسبه تعدیل قیمت</span>
                        </h3>
                        <hr />
                        <Grid container spacing={8} className="pl-3 mt-3">
                            <Grid item md={6}>قیمت تعدیل شده</Grid>
                            <Grid item md={6}>آخرین قیمت تعدیل شده</Grid>
                        </Grid>
                        <Grid container spacing={8} className="pl-3 mb-3">
                            <Grid item md={6}>
                                <NumberFormatComponent
                                    id="" label="قیمت تعدیل شده"
                                    value={this.state.adjustedPriceValue}
                                    handleChange={(value, error) => this.handleChange(value, 'adjustedPriceValue')}
                                    type="number"
                                    isSeparator={true} />
                            </Grid>
                            <Grid item md={6}>
                                <NumberFormatComponent
                                    id="" label="آخرین قیمت تعدیل شده"
                                    value={this.state.adjustedLastPriceValue}
                                    handleChange={(value, error) => this.handleChange(value, 'adjustedLastPriceValue')}
                                    type="number"
                                    isSeparator={true} />
                            </Grid>
                        </Grid>
                        <hr />
                        <Button variant="contained" color="secondary" style={{ backgroundColor: 'green', color: '#FFF' }} onClick={this.confirmSettlementVoucher}>
                            ثبت
                        </Button>
                        <Button variant="contained" color="secondary" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={(e) => this.handleCloseConfirmModal(e)}>
                            انصراف
                        </Button>
                    </Paper>
                </Modal>
            </React.Fragment>
        );
    }
}

export default AdjustedPriceCalculateComponent;