import React from 'react';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import { withStyles } from '@material-ui/core/styles';
import styles from 'containers/layout/panel/theme';
import Form from 'shared/components/form/pureForm'
import UpdateTradeNumberService from '../../services/UpdateTradeNumberService';

class UpdateValueFee extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      openModal: false,
      feeEditType:{code:0,title:''},
      detail:{
        brokerFee:this.props.detail.brokerFee ? this.props.detail.brokerFee :0,
        csdFee:this.props.detail.csdFee ? this.props.detail.csdFee :0,
        rayanBourseFee:this.props.detail.rayanBourseFee ? this.props.detail.rayanBourseFee :0,
        seoFee:this.props.detail.seoFee ? this.props.detail.seoFee :0,
        rightToAccessFee:this.props.detail.rightToAccessFee ? this.props.detail.rightToAccessFee :0,
        tax:this.props.detail.tax ? this.props.detail.tax :0,
        securityTransactionId:this.props.detail.securityTransactionId ? this.props.detail.securityTransactionId :0,
        tseTmcFee:this.props.detail.tseTmcFee ? this.props.detail.tseTmcFee :0,
        tseFee:this.props.detail.tseFee ? this.props.detail.tseFee :0,
      }
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps.detail !== this.props.detail){
      this.setState({detail:JSON.parse(JSON.stringify(this.props.detail))});
    }
  }
  openEditModal() {
    this.setState({ openModal: true })
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
                feeValue: Number(this.state.detail.brokerFee),
                changed: this.state.detail.brokerFee != this.props.detail.brokerFee
              },
              csdFee: {
                feeValue: Number(this.state.detail.csdFee),
                changed: this.state.detail.csdFee != this.props.detail.csdFee
              },
              rayanBourseFee: {
                feeValue: Number(this.state.detail.rayanBourseFee),
                changed: this.state.detail.rayanBourseFee != this.props.detail.rayanBourseFee
              },
              tseFee: {
                feeValue: Number(this.state.detail.tseFee),
                changed: this.state.detail.tseFee != this.props.detail.tseFee,
              },
              tseTmcFee: {
                feeValue: Number(this.state.detail.tseTmcFee),
                changed: this.state.detail.tseTmcFee != this.props.detail.tseTmcFee,
              },
              seoFee: {
                feeValue: Number(this.state.detail.seoFee),
                changed: this.state.detail.seoFee != this.props.detail.seoFee,
              },
              rightToAccessFee: {
                feeValue: Number(this.state.detail.rightToAccessFee),
                changed: this.state.detail.rightToAccessFee != this.props.detail.rightToAccessFee,
              },
              tax: {
                feeValue: Number(this.state.detail.tax),
                changed: this.state.detail.tax != this.props.detail.tax,
              },
              securityTransactionId: this.props.detail.id,
              feeType: 2,
              feeEditType: this.state.feeEditType.code
            }}

        >
          <Grid container spacing={8} className="no-margin">

            <Grid item md={4}>
              <Input type="number"  label="بورس اوراق" handleChange={(e) => this.handleChange(e, 'tseFee')} value={this.state.detail.tseFee}  />
            </Grid>
            <Grid item md={4}>
              <Input type="number" label="کارگزاری" handleChange={(e) => this.handleChange(e, 'brokerFee')} value={this.state.detail.brokerFee} />
            </Grid>
            <Grid item md={4}>
              <Input type="number" label="سپرده گذاری" handleChange={(e) => this.handleChange(e, 'csdFee')} value={this.state.detail.csdFee}  />
            </Grid>
            <Grid item md={4}>
              <Input type="number" label="رایان بورس" handleChange={(e) => this.handleChange(e, 'rayanBourseFee')} value={this.state.detail.rayanBourseFee}  />
            </Grid>
            <Grid item md={4}>
              <Input type="number" label="حق نظارت سازمان" handleChange={(e) => this.handleChange(e, 'seoFee')} value={this.state.detail.seoFee}  />
            </Grid>
            <Grid item md={4}>
              <Input type="number" label="مدیریت فناوری" handleChange={(e) => this.handleChange(e, 'tseTmcFee')} value={this.state.detail.tseTmcFee}  />
            </Grid>
            <Grid item md={4}>
              <Input  label="خدمات دسترسی" handleChange={(e) => this.handleChange(e, 'rightToAccessFee')} value={this.state.detail.rightToAccessFee}  />
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

export default  withStyles(styles)(UpdateValueFee);;
