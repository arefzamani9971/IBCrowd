import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GetTradeNumberService from '../../services/GetTradeNumberService';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import FaIcon from 'shared/components/Icon/Icon';
import styles from 'containers/layout/panel/theme';
import UpdateValueFee from './UpdateValueFeeComponent';
import UpdatePercentFee from './UpdatePercentFeeComponent';
import { connect } from "react-redux";
import { setUpdateRow } from 'store/actions';

class UpdateTradeNumberComponent extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      date: new Date(),
      openModal: this.props.open,
      feeType: 1,
      detail: {},
    }
    this.handleChange = this.handleChange.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.successGetDetail = this.successGetDetail.bind(this);
    this.setCloseModal = this.setCloseModal.bind(this);
    this.getDetail = this.getDetail.bind(this);
    this.afterSubmit = this.afterSubmit.bind(this);
  }


  componentDidUpdate(prevProps, prevState) {
    if (this.props.open !== prevProps.open) {
      this.setState({ openModal: this.props.open })
      if (this.props.open) {
        this.getDetail();

      }
    }
  }
  openEditModal() {
    this.setState({ openModal: true }, this.getDetail)
  }

  handleChange(value, name) {
    let item = value.value;

    this.setState({

      [name]: item
    })


  }


  afterSubmit(object) {

    this.setState({ openModal: false }, function () {
      this.props.setUpdateRow(object);
      this.props.setCloseModal();
    })
  }
  setCloseModal() {

    this.props.setCloseModal();
  }

  changeFeType(feeType) {
    this.setState({ feeType })
  }

  getDetail() {

    var params = {
      transactionId: this.props.dataItem.id
    }
    GetTradeNumberService.gtTradeNumberById(params, this.successGetDetail)
  }
  successGetDetail(response) {
    if (response.success)
      this.setState({ detail: response.result });
    else {
      this.props.setCloseModal();

    }
  }
  render() {

    const { classes } = this.props
    return (
      <React.Fragment>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openModal}
          onClose={this.setCloseModal}
        >


          {/* <TabList style={{
                        width: '600px',
                        padding: '1rem .5rem ',
                        height: 'auto',
                        outline: 'none',
                        position: 'absolute',
                        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
                        backgroundColor: '#fff',
                        top: '50%',
                        left: '45%',
                        marginLeft: '-300px',
                        marginTop: '-150px',
                    }} list={this.state.tabs}></TabList> */}
          <Paper style={{
            width: '70%',
            padding: '1rem .5rem ',
            height: 'auto',
            outline: 'none',
            position: 'absolute',
            boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
            backgroundColor: '#fff',
            top: '27%',
            left: "25%",
            marginLeft: '-300px',
            marginTop: '-150px',
          }}>
            <h3 >
              <FaIcon color="gray" name="fa fa-edit" size={20} />
              <span style={{ marginRight: '5px' }}>ویرایش کارمزد</span>

            </h3>
            <hr />
            {/* <Fieldset legend="اطلاعات معامله"> */}
            <Grid container spacing={8} className="no-margin">
              <Grid item md={4}>
                <b> عنوان مشتری : </b>
                <span>{this.state.detail.partyFullName}</span>

              </Grid>

              <Grid item md={4}>
                <b>نماد : </b>
                <span>{this.state.detail.fullProductName}</span>

              </Grid>
              <Grid item md={4}>
                <b>شماره اعلامیه : </b>
                <span>{this.state.detail.ticketNumber}</span>

              </Grid>
              <Grid item md={4}>
                <b>تعداد : </b>
                <span>{this.state.detail.volume}</span>

              </Grid>
              <Grid item md={4}>
                <b>تاریخ : </b>
                <span>{this.state.detail.dateJalali}</span>

              </Grid>
              <Grid item md={4}>
                <b>قیمت : </b>
                <span>{this.state.detail.price}</span>

              </Grid>

            </Grid>
            {/* </Fieldset> */}

            <Grid container spacing={8} className="no-margin">
              <Grid item md={12}>

              </Grid>
              <Grid item md={5}></Grid>
              <Grid item md={4}>
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button type="button" onClick={() => this.changeFeType(1)} active="true" class={this.state.feeType === 1 ? " btn btn-info active" : "btn btn-info"}>کارمزد درصدی</button>
                  <button type="button" onClick={() => this.changeFeType(2)} class={this.state.feeType === 2 ? " btn btn-info active" : "btn btn-info"}>کارمزد مبلغی</button>
                </div>
              </Grid>
              <Grid item md={4}></Grid>
            </Grid>
            {this.state.feeType === 1 ? <UpdatePercentFee feeEditTypeList={this.props.feeEditTypeList} afterSubmit={this.afterSubmit} detail={this.state.detail} />
              : <UpdateValueFee feeEditTypeList={this.props.feeEditTypeList} afterSubmit={this.afterSubmit} detail={this.state.detail} />}


          </Paper>


        </Modal>

      </React.Fragment>

    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}
/*<-------------------connect------------->*/
const mapDispatchToProps = dispatch => {
  return {
    setUpdateRow: data => dispatch(setUpdateRow(data)),

  };

};
var UpdateTradeNumber = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UpdateTradeNumberComponent));
export default UpdateTradeNumber


