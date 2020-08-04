import React from 'react';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import { withStyles } from '@material-ui/core/styles';
import styles from 'containers/layout/panel/theme';
import Form from 'shared/components/form/pureForm'
import UpdateTradeNumberService from '../../services/UpdateTradeNumberService';
class UpdatePercentFee extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      openModal: false,
      feeEditType:{code:0,title:''},
      detail:{
        brokerFeePercentage:this.props.detail.brokerFeePercentage ? this.props.detail.brokerFeePercentage :0,
        csdFeePercentage:this.props.detail.csdFeePercentage ? this.props.detail.csdFeePercentage :0,
        rayanBourseFeePercentage:this.props.detail.rayanBourseFeePercentage ? this.props.detail.rayanBourseFeePercentage :0,
        seoFeePercentage:this.props.detail.seoFeePercentage ? this.props.detail.seoFeePercentage :0,
        rightToAccessFeePercentage:this.props.detail.rightToAccessFeePercentage ? this.props.detail.rightToAccessFeePercentage :0,
        taxPercentage:this.props.detail.taxPercentage ? this.props.detail.taxPercentage :0,
        securityTransactionId:this.props.detail.securityTransactionId ? this.props.detail.securityTransactionId :0,
        tseTmcFeePercentage:this.props.detail.tseTmcFeePercentage ? this.props.detail.tseTmcFeePercentage :0,
        tseFeePercentage:this.props.detail.tseFeePercentage ? this.props.detail.tseFeePercentage :0,
      }
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps.detail !== this.props.detail){
      this.setState({detail:JSON.parse(JSON.stringify(this.props.detail))});
    }
  }

  handleChange(value, name,isFromDetail=true) {
    let item = value.value;
    if(isFromDetail){
      let detail=this.state.detail;
      detail[name]=item;
      this.setState({
        detail:detail
      })
    }
    else{
      this.setState({[name]:item});
    }
    
    


  }

  render() {
     
    const { classes } = this.props
    return (
      <React.Fragment>

        <Form
          service={UpdateTradeNumberService.update}
          {...this.props}
          {...this.state}
          cancelModal
          afterSubmit={()=>this.props.afterSubmit(this.state.detail)}

          entity={
            {
              brokerFee: {
                feePercent: Number(this.state.detail.brokerFeePercentage),
                changed: this.state.detail.brokerFeePercentage != this.props.detail.brokerFeePercentage
              },
              csdFee: {
                feePercent: Number(this.state.detail.csdFeePercentage),
                changed: this.state.detail.csdFeePercentage != this.props.detail.csdFeePercentage
              },
              rayanBourseFee: {
                feePercent: Number(this.state.detail.rayanBourseFeePercentage),
                changed: this.state.detail.rayanBourseFeePercentage != this.props.detail.rayanBourseFeePercentage
              },
              tseFee: {
                feePercent: this.state.detail.tseFeePercentage,
                changed: this.state.detail.tseFeePercentage != this.props.detail.tseFeePercentage,
              },
              tseTmcFee: {
                feePercent: Number(this.state.detail.tseTmcFeePercentage),
                changed: this.state.detail.tseTmcFeePercentage != this.props.detail.tseTmcFeePercentage,
              },
              seoFee: {
                feePercent: Number(this.state.detail.seoFeePercentage),
                changed: this.state.detail.seoFeePercentage != this.props.detail.seoFeePercentage,
              },
              rightToAccessFee: {
                feePercent: Number(this.state.detail.rightToAccessFeePercentage),
                changed: this.state.detail.rightToAccessFeePercentage != this.props.detail.rightToAccessFeePercentage,
              },
              tax: {
                feePercent: Number(this.state.detail.taxPercentage),
                changed: this.state.detail.taxPercentage != this.props.detail.taxPercentage,
              },
              securityTransactionId: this.props.detail.id,
              feeType: 1,
              feeEditType: this.state.feeEditType.code
            }}

        >
          <Grid container spacing={8} className="no-margin">

            <Grid item md={4}>
              <Input   type="number"  label="بورس اوراق" handleChange={(e) => this.handleChange(e, 'tseFeePercentage')} value={this.state.detail.tseFeePercentage}  />
            </Grid>
            <Grid item md={4}>
              <Input type="number" label="کارگزاری" handleChange={(e) => this.handleChange(e, 'brokerFeePercentage')} value={this.state.detail.brokerFeePercentage} />
            </Grid>
            <Grid item md={4}>
              <Input type="number" label="سپرده گذاری" handleChange={(e) => this.handleChange(e, 'csdFeePercentage')} value={this.state.detail.csdFeePercentage}  />
            </Grid>
            <Grid item md={4}>
              <Input type="number" label="رایان بورس" handleChange={(e) => this.handleChange(e, 'rayanBourseFeePercentage')} value={this.state.detail.rayanBourseFeePercentage}  />
            </Grid>
            <Grid item md={4}>
              <Input type="number" label="حق نظارت سازمان" handleChange={(e) => this.handleChange(e, 'seoFeePercentage')} value={this.state.detail.seoFeePercentage}  />
            </Grid>
            <Grid item md={4}>
              <Input type="number" label="مدیریت فناوری" handleChange={(e) => this.handleChange(e, 'tseTmcFeePercentage')} value={this.state.detail.tseTmcFeePercentage}  />
            </Grid>
            <Grid item md={4}>
              <Input  label="خدمات دسترسی" handleChange={(e) => this.handleChange(e, 'rightToAccessFeePercentage')} value={this.state.detail.rightToAccessFeePercentage}  />
            </Grid>
            <Grid item md={2}>
                  <div className="k-rtl">
                    <DropDownComponent isFilterable {...this.props.feeEditTypeList}
                      handleChange={(value, name) => this.handleChange(value, name,false)}
                      value={this.state.feeEditType} />

                  </div>
                </Grid>
          </Grid>
        </Form>



      </React.Fragment>

    )
  }
}

export default withStyles(styles)(UpdatePercentFee);
