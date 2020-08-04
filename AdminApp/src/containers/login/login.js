import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import { setToken, setUserInfo } from '../../store/actions';
import toastr from 'toastr';
import AuthenticationService from './loginService';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import CachedIcon from '@material-ui/icons/Cached';
import errors from 'constants/errors'
import clientSettings from 'constants/loginSetting'
import LoadingAllPage from '../../core/LocadingAllPage';
import styles from './loginTheme';
import "./login.css";
import Grid from '@material-ui/core/Grid';
import GetCaptchaService from '../../services/getCaptcha';

class Loginpage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            redirect: false,
            isLoading: false,
            urls: null
        };

        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.login = this.login.bind(this);
        this.successLogin = this.successLogin.bind(this);
    }


    componentDidMount() {
        var auth = JSON.parse(localStorage.getItem("authentication"));
        if (auth && auth != '') {
            this.setState({ redirect: true });
        } else {
            this.getCaptcha();
        }

    }


    handleUserNameChange(event) {
        this.setState({ userName: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }
    refreshCaptcha = () => {
        this.getCaptcha();
    }
    handleCaptchaChange = (event) => {
        this.setState({ captcha: event.target.value });
    }
    getCaptcha() {
        GetCaptchaService(res => {
            this.setState({
                captchaImage: res.data.image
            })
        })
    }
    login(event) {
        if (event.which === 1 || event.which === 13) {
            localStorage.removeItem("authentication");
            // if (this.state.userName === '' || this.state.password === '') {
            //     toastr.error(errors.userPassEmpty);
            //     return;
            // }
            this.setState({
                isLoading: true
            });
            let command = {
                entity: {
                    userName: this.state.userName.toString(),
                    password: this.state.password.toString(),
                    clientId: clientSettings.clientId,
                }
            };
            // AuthenticationService.login(command, this.successLogin);
            this.successLogin({
                result:{
                    accessToken:"123456789" 
                },
               
                success:true
            });
        }
    };

    successLogin = (response) => {
       
        response.success = true;
        if (response.success) {
            localStorage.setItem("authentication", JSON.stringify(response.result.accessToken));
            this.props.setUserInfo(response.result);
            this.setState({
                redirect: true
            });
        }
        this.setState({
            isLoading: false
        })

    };



    render() {
        const { classes } = this.props;
        if (this.state.redirect) {
            return <Redirect to='/main' />;
        }
        if (this.state.isLoading) {
            return (<LoadingAllPage />)
        } else {
            return (
                <div className="loginTheme">
                    <main className={classes.main}>
                        <CssBaseline />
                        <Grid container spacing={8} className="justify-content-center" style={{ marginLeft: "2% !important" }} >
                            {/* <Grid item md={9}>
                                <Grid container spacing={8}  >
                                    <Grid item md={3}>
                                        <b>111</b>
                                    </Grid>
                                    <Grid item md={9}>
                                        <Paper className={classes.paper}>
                                            <h3>
                                                <FaIcon color="gray" name="fa fa-trash" size={20} />
                                                <span style={{ marginRight: '5px' }}>جستجوی پیشرفته</span> */}
                            {/*<b>*/}
                            {/*حذف {this.props.deleteHeader}*/}
                            {/*</b>*/}
                            {/* </h3>
                                            <hr />
                                        </Paper>

                                    </Grid>
                                </Grid>
                            </Grid> */}
                            <Grid item md={3}>
                                <Paper className={classes.paper}>
                                    {/* <Avatar className={classes.avatar}>
                                        <LockIcon />

                                    </Avatar> */}
                                    <div class="icon-object border-slate-300 text-slate-300">
                                        <img src={require('utils/images/MDP.jpg')} style={{ maxHeight: "75px", maxWidth: "75px" }} />


                                    </div>
                                    <Typography className={classes.rtl} component="h1" variant="h5">
                                    سامانه مدیریت داده‌های بازار

                                 </Typography>
                                    <form className={classes.form}>
                                        <div>
                                            <FormControl className={classes.formControl} variant="outlined" fullWidth>
                                                <InputLabel
                                                    ref={ref => {
                                                        this.labelRef = ReactDOM.findDOMNode(ref);
                                                    }}
                                                    className={classes.inputLabelOutLine}

                                                    htmlFor="userName"
                                                >
                                                    نام کاربری
                                          </InputLabel>
                                                <OutlinedInput
                                                    id="userName"
                                                    className={classes.OutlineInput + " custom-dir"}
                                                    value={this.state.userName}
                                                    onChange={this.handleUserNameChange}
                                                    onKeyPress={this.login}
                                                    dir="rtl"
                                                    labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                                                />
                                            </FormControl>

                                            <FormControl className={classes.formControl} variant="outlined" fullWidth>
                                                <InputLabel
                                                    ref={ref => {
                                                        this.labelRef = ReactDOM.findDOMNode(ref);
                                                    }}
                                                    className={classes.inputLabelOutLine}
                                                    type="password"
                                                    htmlFor="userName"
                                                >
                                                    رمز عبور
                                         </InputLabel>
                                                <OutlinedInput
                                                    id="password"
                                                    className={classes.OutlineInput + " custom-dir"}
                                                    value={this.state.password}
                                                    onChange={this.handlePasswordChange}
                                                    onKeyPress={this.login}
                                                    label="Password"
                                                    type="password"
                                                    dir="rtl"
                                                    labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                                                />
                                            </FormControl>

                                            <FormControl className={classes.formControl} variant="outlined" fullWidth>
                                                <InputLabel
                                                    ref={ref => {
                                                        this.labelRef = ReactDOM.findDOMNode(ref);
                                                    }}
                                                    className={classes.inputLabelOutLine}
                                                    type="text"
                                                    htmlFor="captcha"
                                                >
                                                    کد امنیتی
                                                </InputLabel>
                                                <OutlinedInput
                                                    id="captcha"
                                                    dir='rtl'
                                                    className={classes.OutlineInput + " custom-dir"}
                                                    value={this.state.captcha}
                                                    onChange={this.handleCaptchaChange}
                                                    onKeyPress={this.login}
                                                    label="captcha"
                                                    type="text"
                                                    labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                                                    endAdornment={
                                                        <React.Fragment>
                                                            <CachedIcon onClick={this.refreshCaptcha} className="check-icon" />
                                                            <img src={`data:image/png;base64, ${this.state.captchaImage}`} className={'img-captcha'} />
                                                        </React.Fragment>
                                                    }
                                                />
                                            </FormControl>

                                            <span className="font-size-13" href="">فراموشی رمز عبور</span>
                                            <Button
                                                type="button"
                                                fullWidth
                                                onClick={() => this.login({ which: 1 })}
                                                variant="contained"
                                                color="primary"
                                                className={classes.submit}>
                                                ورود کاربران
                                            </Button>
                                        </div>
                                    </form>
                                </Paper>

                            </Grid>
                        </Grid>

                    </main>
                </div>
            );
        }
    }

}

const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setToken: data => dispatch(setToken(data)),
        setUserInfo: data => dispatch(setUserInfo(data))
    };
};
const Login = connect(mapStateToProps, mapDispatchToProps)(Loginpage);
export default withStyles(styles)(Login);
