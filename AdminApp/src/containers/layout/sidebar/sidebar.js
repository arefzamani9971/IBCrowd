import React from 'react';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import { loggedOut } from 'store/actions'
import NestedList from './sidebarList/nestedList';
import { Divider } from '@material-ui/core';
// import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import ExitToAppOutlined from '@material-ui/icons/ExitToAppOutlined';
import LockOpen from '@material-ui/icons/LockOpen';
// import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined'
import { changePassword } from '../../../constants/navbarAdress';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
const $ = require("jquery");
const isFirefox = typeof InstallTrigger !== 'undefined';
const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

class Drower extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            userInfo: {},
            openMenuBar: false,
            open: false,
        }

    }

    componentDidUpdate(preProps, prevState) {
        if (preProps.userInfo != this.props.userInfo) {
            this.setState({
                userInfo: this.props.userInfo
            });
        }
        this.setScrollbar();
    }

    componentDidMount() {
        this.setScrollbar();
    }

    setScrollbar() {
        $("#main-scroll").mCustomScrollbar({
            axis: "y",
            theme: "my-theme",
            scrollInertia: isChrome ? 700 : (isFirefox ? 100 : 100)
        });
    }

    handleMenu = () => {
        this.setState(prevState => ({
            openMenuBar: !prevState.openMenuBar
        }))
    };

    handleClose = () => {
        this.setState({ openMenuBar: !this.state.openMenuBar });
    };

    goToChangePass() {
        this.props.history.push(changePassword);
        this.handleClose();
    }
    exit() {
        localStorage.removeItem('authentication');
        window.location.href = '/login';
    }

    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleCloseDropDwonList = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }
        this.setState({ open: false });
    };




    render() {
        const { classes } = this.props;
        const { open } = this.state;
        return (
            <Drawer
                variant="permanent"
                onMouseEnter={this.hoverIn}
                onMouseLeave={this.hoverOut}
                classes={{
                    paper: classNames(classes.drawerPaper, !this.props.open && classes.drawerPaperClose),
                }}
                className={classes.bgThemeDarker}
                open={this.props.open}>


                <div className={classes.toolbarIcon}>

                    <Avatar alt="Remy Sharp" src={require('utils/images/Pikad-Logo.jfif')} className={classes.logo}
                    />
                    <h4 className={classes.sidebarHeaderText}>سامانه مدیریت داده‌ها</h4>

                    {
                        this.props.location.pathname === "/main/accounting/report/addVoucher" ? '' :
                            <IconButton inset className={classes.iconSlide} onClick={this.props.handleDrawerToggle}>
                                <MenuIcon />
                            </IconButton>
                    }


                </div>
                <div id="main-scroll" className={classNames(classes.sidebarMenueItem, "sidebarMenueItem")}
                >
                    <div className={classes.sidebarHeader}
                        position="static"
                        color="primary"
                        elevation={0}
                        className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0 bg-theme-light"
                        onClick={this.handleClose}>
                        {/* material UI DropDown */}

                        <div className={classes.root} id="dropdown-mainPage-button">

                            <div>
                                <Button
                                    id="dropdown-button-main-page"
                                    buttonRef={node => {
                                        this.anchorEl = node;
                                    }}
                                    aria-owns={open ? 'menu-list-grow' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleToggle}
                                    className={classes.whitecolor + " " + classes.rtl + " username text-16 whitespace-no-wrap cursor-pointer"} color="#3C4252"
                                >
                                    {/* {this.props.userInfo.partyName} */}
                                    کاربر مهمان
                                </Button>
                                <Popper className="main-menu-dropdown" open={open} anchorEl={this.anchorEl} transition disablePortal>
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            id="menu-list-grow"
                                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                        >
                                            <Paper>
                                                <ClickAwayListener onClickAway={this.handleCloseDropDwonList}>
                                                    <MenuList>
                                                        {/* <MenuItem onClick={this.handleCloseDropDwonList}> <AccountCircleOutlined /> اطلاعات کاربر</MenuItem>
                                                        <MenuItem onClick={this.goToChangePass}>
                                                            <LockOpen />
                                                             تغییر رمز
                                                        </MenuItem> */}
                                                        <MenuItem className={classes.menuNavbar} onClick={this.exit}>
                                                            <ExitToAppOutlined />
                                                             خروج
                                                        </MenuItem>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </div>
                        </div>

                        {/* <Button
                            aria-owns={openProfileSettingMenue ? 'menu-appbar' : undefined}
                            aria-haspopup='true'
                            onClick={this.handleMenu}
                            color='inherit'
                            className={classes.navbarIcon}
                        >
                            <Typography className={classes.rtl}>
                                {this.state.userInfo.partyName}
                            </Typography>
                            <Avatar
                                alt='Remy Sharp'
                                src={require('utils/images/logo.png')}
                                className={classes.avatar}
                            />
                        </Button> */}


                        {/* <Typography className={classes.whitecolor + " " + classes.rtl + " username text-16 whitespace-no-wrap cursor-pointer"} color="white"
                            onClick={this.handleMenu}
                        >
                            {this.props.userInfo.partyName}
                        </Typography> */}
                        <Typography className={classes.whitecolor + " " + classes.rtl + " email text-13 mt-8 opacity-50 whitespace-no-wrap"} color="white">
                            {/* شعبه {this.state.userInfo.branchName} */}
                            {/* {this.state.userInfo.userName} */}
                            guest
                        </Typography>
                        <Avatar
                            className={classNames(classes.avatarSidebar, "avatarSidebar")}
                            alt="user photo"
                            src={require('utils/images/MDP.jpg')}
                        />

                        {/* <ul className={(this.state.openMenuBar ? 'show-item ' : '') + "p-0 m-0 show-menubar"}>
                            <MenuItem className={classes.menuNavbar} onClick={this.handleClose}>

                                <AccountCircleOutlined /> اطلاعات کاربر
                            </MenuItem>
                            <MenuItem
                                className={classes.menuNavbar}
                                onClick={this.goToChangePass}
                            >

                                <LockOpen /> تغییر رمز
                            </MenuItem>
                            <MenuItem className={classes.menuNavbar} onClick={this.exit}>

                                <ExitToAppOutlined /> خروج
                            </MenuItem>
                        </ul> */}
                        {/* <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        {/* <Menu
                            id='menu-appbar'
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            open={openProfileSettingMenue}
                            onClose={this.handleClose}
                        >
                            <MenuItem className={classes.menuNavbar} onClick={this.handleClose}>
                                {' '}
                                <AccountCircleOutlined /> اطلاعات کاربر{' '}
                            </MenuItem>
                            <MenuItem
                                className={classes.menuNavbar}
                                onClick={this.goToChangePass}
                            >
                                {' '}
                                <LockOpen /> تغییر رمز{' '}
                            </MenuItem>
                            <MenuItem className={classes.menuNavbar} onClick={this.exit}>
                                {' '}
                                <ExitToAppOutlined /> خروج{' '}
                            </MenuItem>
                        </Menu> */}

                    </div>
                    <Divider className={classes.divider} />

                    <div className={classes.NestedList}>

                        <NestedList open={this.props.open} />

                    </div>

                </div>

            </Drawer>
        )
    }

}
const mapStateToProps = state => {
    return {
        userInfo: state.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loggedOut: () => dispatch(loggedOut())
    };
};


const Sidebar = connect(mapStateToProps, mapDispatchToProps)(Drower);

export default Sidebar;