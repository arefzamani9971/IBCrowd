import React from 'react';
import MaskedInput from 'react-text-mask';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import styles from 'containers/layout/panel/theme';
import OutlinedInput from '@material-ui/core/OutlinedInput';



function TextMaskCustom(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={['0', '9', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

class PhoneNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      requiredError: false,
      correct: true,
      error: false
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        value: this.props.value
      })
    }
  }

  validMobile = (mobile) => {
    return mobile.replace(/[{()}]/g, '').replace(/ /g, '').split("_").length === 1;
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });

  }

  handleBlur = (event) => {
    let mobile = event.target.value.replace(/[{()}]/g, '').replace(/ /g, '').replace(/09/g, '').replace(/_/g, "");
    if (this.props.require && (mobile.length < 1 || mobile === undefined))
      this.setState({ requiredError: true, error: true, correct: true });
    else {
      this.setState({ correct: this.validMobile(mobile), error: !this.validMobile(mobile), requiredError: false })
      this.props.handleChange({ value: mobile });
    }
  }
  render() {
    const { classes } = this.props;
    return (

      <FormControl error={this.state.error} className={classes.formControl} variant="outlined" fullWidth>
        <InputLabel
          className={classes.inputLabelOutLine + ' rightAlign'}
          ref={ref => {
            this.labelRef = ReactDOM.findDOMNode(ref);
          }} htmlFor="formatted-text-mask-input">
          {this.props.require ?
            <span class="required-star" >*</span> : ''
          }

          {this.props.label}


        </InputLabel>
        <OutlinedInput
          value={this.state.value}
          className={classes.OutlineInput}
          style={{ direction: "ltr" }}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
          inputComponent={TextMaskCustom}
          disabled={this.props.disabled}
        />
        {
          this.state.requiredError ?

            <i className="error-validation">{this.props.label} نباید خالی باشد </i>
            : ''


        }

      </FormControl>

    )
  }

}
PhoneNumber.defaultProps = {
  type: "number",
  label: "شماره همراه",
  disabled: false,
  require: true,
}

export default withStyles(styles)(PhoneNumber)