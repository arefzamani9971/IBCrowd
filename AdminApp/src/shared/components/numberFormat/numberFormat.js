import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import styles from 'containers/layout/panel/theme';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ReactDOM from 'react-dom';
import InputLabel from '@material-ui/core/InputLabel';

function NumberFormatFunction(props) {
    const { inputRef, onChange, ...other } = props;
    return (

        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            format={props.format}
            thousandSeparator={props.isSeparator}
            decimalSeparator={props.isDecimalSeparator}
            mask={props.mask}
            prefix={props.prefix}
            style={{ direction: "ltr" }}
        // disabled={this.props.disabled}

        />
    )

}

NumberFormatFunction.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};


class NumberFormatComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            requiredError: false,
            isDirty: false, error: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

    }
    componentWillReceiveProps(nextProps, nextContext) {

    }

    componentDidUpdate(prevProps) {

        if (prevProps !== this.props) {

            if (prevProps.value !== this.props.value)
                this.setState({
                    value: this.props.value,

                });
            else {
                if (prevProps.value === '') {
                    this.setState({
                        requiredError: this.props.required && (this.state.value === '') && this.state.isDirty,
                        error: this.props.required && (this.state.value === '') && this.state.isDirty

                    }, () => {

                    })
                }


            }
        }
    }
    handleChange(event) {

        let requiredError = this.props.required && !event.target.value.length && this.state.isDirty;

        this.setState({
            error: requiredError,
            requiredError: requiredError,
            value: event.target.value,
            isDirty: true
        });



    }

    handleKeyPress = (event) => {
        if (this.props.keyDownPress !== undefined) {
            if (event.keyCode === 13) {
                this.props.handleChange({ value: event.target.value, error: this.state.error });
            }
            this.props.onKeyDownPress(event);

        }
    }

    handleBlur(event) {
        this.props.handleChange({ value: event.target.value, error: this.state.error });

    }
    render() {
        


        const { classes } = this.props;

        switch (this.props.type) {
            case 'number':
                return (
                    <FormControl className={classes.formControl} xs={6} variant="outlined" error={this.state.error} fullWidth>
                        <InputLabel
                            className={classes.inputLabelOutLine}
                            ref={ref => {
                                this.labelRef = ReactDOM.findDOMNode(ref);
                            }}
                            htmlFor={this.props.id}>
                            {
                                this.props.required ?
                                    <span class="required-star" >*</span> : ''
                            }
                            {this.props.label}
                        </InputLabel>
                        <OutlinedInput
                            id={this.props.id}
                            disabled={this.props.disabled}
                            className={classes.OutlineInput}
                            value={this.state.value}
                            onChange={this.handleChange}
                            onKeyDown={(e) => this.handleKeyPress(e)}
                            onBlur={this.handleBlur}
                            labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                            inputComponent={NumberFormatFunction}
                            inputProps={{
                                isSeparator: this.props.isSeparator,
                                format: this.props.format,
                                prefix: this.props.prefix,
                                mask: this.props.mask
                            }}
                        />

                        {
                            this.state.requiredError ?

                                <i className="error-validation">{this.props.label} نباید خالی باشد </i>
                                : ''
                        }
                    </FormControl>
                )
            case '':
                break;

        }
    }
};
NumberFormatComponent.defaultProps = {
    disabled: false

}
export default withStyles(styles)(NumberFormatComponent);