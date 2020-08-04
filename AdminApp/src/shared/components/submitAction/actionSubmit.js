import React, { Component } from 'react';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import toastr from 'toastr';
import styles from 'containers/layout/panel/theme';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './action.css';

class SubmitComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: moment(),
        };

        this.cancel = this.cancel.bind(this);
        this.doAction = this.doAction.bind(this);

    }


    preSubmit() {
        return new Promise((resolve, reject) => {
            if (this.props.preSubmit)
                resolve(this.props.preSubmit())
            else
                resolve(this.props.entity)
        })
    }

    cancel() {
        if (this.props.cancelModal && this.props.afterSubmit)
            this.props.afterSubmit();
        else if (this.props.redirectPage) {
            this.props.history.push({
                pathname: this.props.redirectPage,
                stateParams: this.props.backParams,
                // state: {
                //     tabId: this.props.stateInfo.tabId,
                //     partyId: this.props.stateInfo.partyId
                // }
            })


        } else {
            this.props.history.push({
                pathname: this.props.back.path, stateParams: this.props.backParams,

            });

        }
    }

    async doAction(redirect, isRedirect = true, method = undefined) {
        if (!this.state.disable) {
            this.setState({
                disable: true
            });
            this.preSubmit().then(result => {
              
                var command = result;

                var self = this.props;
                var that = this;
                this.props.service(command, function (response) {

                    that.setState({
                        disable: false,
                    })
                    // if (response.success) {

                        // toastr.success(response.message);

                        if (self.afterSubmit) {

                            self.afterSubmit(true);
                        }



                        else {



                            if (isRedirect && !self.notRedirect) {
                                let redirectTo = redirect ? redirect : self.back.path
                                self.history.push({
                                    pathname: redirectTo,
                                    state: response
                                })
                            }
                            else {
                                method();
                            }
                        }


                    // }

                });
            })
        }


    }

    otherAction(action) {

        if (action.isSubmit) {
            if (action.redirect)
                this.doAction(action.redirect);
            else {

                this.doAction(null, false, action.method);
            }
        }
        else {

            action.method();
        }

    }
    render() {

        const { classes } = this.props;
        return (
            <div className={"action-base"}>
                {!this.props.dontShowPrimaryButton ? <Button
                    type="button"
                    disabled={this.props.disabled}
                    onClick={() => this.doAction(this.props.redirect)}
                    variant="contained"
                    color="primary"
                    className={classes.submit + (this.props.disabled ? ' disable-btn' : '')}>
                    {!this.state.disable ? this.props.SubmitTitle : <CircularProgress style={{ color: 'white', align: 'center', marginBottom: 7, marginRight: 2, marginLeft: 2, width: 20, height: 20 }} disableShrink />}

                </Button>
                    : ''}

                {this.props.otherAction.map(action =>
                    <Button
                        type="button"

                        onClick={() => this.otherAction(action.action)}
                        variant="contained"
                        style={{ backgroundColor: action.color, color: action.fontColor ? action.fontColor : 'white', disabled: { backgroundColor: action.color } }}
                        className={classes.submit + (this.props.disabled ? ' disable-btn' : '')}
                        disabled={this.props.disabled}

                    >
                        {!this.state.disable ? action.title : <CircularProgress style={{ color: 'white', align: 'center', marginBottom: 7, marginRight: 2, marginLeft: 2, width: 20, height: 20 }} disableShrink />}


                    </Button>
                )}
                {
                    !this.props.hideCancel ?
                        <Button
                            type="button"
                            onClick={this.cancel}
                            variant="contained"
                            color="white"
                            className={classes.submit}>
                            انصراف
                        </Button>
                        :
                        ''
                }




            </div>


        );
    }
}
SubmitComponent.defaultProps = {
    otherAction: [],
    SubmitTitle: "ثبت",
    dontShowPrimaryButton: false,
    backParams: {},
    notRedirect: false
}
const Submit = withStyles(styles)(SubmitComponent)
export default Submit;