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
      mask={['(', 'I', 'R', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/]}
      // placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};



class IBANInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      isCorrect: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        value: this.props.value
      })
    }
  }

  validIban(iban) {
    return iban.replace(/[{()}]/g, '').replace(/ /g, '').split("_").length === 1;
  }

  handleChange(event) {
    this.setState({ value: event.target.value });

  }
  handleBlur(event) {
    let value = event.target.value.replace(/[{()}]/g, '').replace(/ /g, '').replace(/IR/g, '').replace(/_/g, "");
    let iban = null;
    if (value.length > 0) {
      iban = event.target.value.replace(/[{()}]/g, '').replace(/ /g, '');
      this.setState({
        isCorrect: this.validIban(event.target.value)
      } , () => {
        this.props.handleChange({ value: iban } , this.state.isCorrect);
      });
    }else{
      iban = null;
      this.setState({
        isCorrect: true,
      }, () => {
        this.props.handleChange({ value: iban } , this.state.isCorrect);
      });
    }
    
  }
  render() {
    const { classes } = this.props;
    return (

      <FormControl className={classes.formControl} variant="outlined" fullWidth error={!this.state.isCorrect}>
        <InputLabel
          className={classes.inputLabelOutLine}
          ref={ref => {
            this.labelRef = ReactDOM.findDOMNode(ref);
          }} htmlFor="formatted-text-mask-input"
          className={this.state.isCorrect ? classes.inputLabelOutLine : classes.inputLabelOutLineError}
          >{this.props.label}


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
          !this.state.isCorrect ?

            <i className="error-validation">شماره شبا نامعتبر است</i>
            : ''


        }
      </FormControl>

    )
  }

}
IBANInput.defaultProps = {
  type: "text",
  label: "شماره شبا",
  disabled: false
}
const IBAN = withStyles(styles)(IBANInput)
export default IBAN;