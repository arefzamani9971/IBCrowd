import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { getAllPageAccessByUsername } from '../../../services/getAllPages'
import Sidebar from '../sidebar/sidebar';
import MainMdoules from '../../modules/mainModule';
import styles from './theme';
import { UserAccessPagesContext } from '../../../contextes/userAccessPagesContext';
import { setStateInfo } from '../../../store/actions';
class PanelComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: true,
      userAccessPages: []

    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.successGetUserAccessPages = this.successGetUserAccessPages.bind(this);

  }

  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      let pathName = this.props.stateInfo.pathName;
      if(pathName && pathName === "/main/accounting/report/addVoucher"){
        this.setState({
          open : true
        })
      }
      this.props.setStateInfo({
        pathName: location.pathname
      })
      if (location.pathname === "/main/accounting/report/addVoucher") {
        this.setState({
          open: false
        });
      }

    });
    // if (this.props.history.location.pathname === "/main/accounting/report/addVoucher") {
    //   this.props.changeSideBarMenu({ openSideBar: false })
    // }
    // this.unlisten = this.props.history.listen((location, action) => {
    //   if (location.pathname === "/main/accounting/report/addVoucher") {
    //     this.props.changeSideBarMenu({ openSideBar: false })
    //   }
    //   this.setState({ location: location });
    // });

  }

  componentDidMount() {

    if (this.props.history.location.pathname === "/main/accounting/report/addVoucher") {
      this.setState({
        open: false
      });
    } else {
      if (!this.state.open) {
        this.setState({
          open: true
        })
      }
    }
    this.props.setStateInfo({
      pathName: this.props.history.location.pathname,
    });
    // this.getUserAccessPages();
  }


  getUserAccessPages() {
    getAllPageAccessByUsername(this.successGetUserAccessPages);
  }
  successGetUserAccessPages(response) {
    if (response.success) {
      this.setState({ userAccessPages: response.result });
    }
  }

  render() {
    const { classes } = this.props;
    return (

      <div className={classes.root}>
        <CssBaseline />
        <Sidebar location={this.props.location} classes={classes} handleDrawerToggle={this.handleDrawerToggle} open={this.state.open} />
        <main className={classes.content} >
          <div style={{ overflow: "hidden" }} className={classes.heightMainPage + " " + (!this.state.open ? classes.backOfRouterClose : classes.noMarginLeft)}>
            <UserAccessPagesContext.Provider value={this.state.userAccessPages}>
              <MainMdoules className={classes.mainModule} />
            </UserAccessPagesContext.Provider>
          </div>
        </main>
      </div>
    );
  }
  handleDrawerToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };
}

PanelComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};


const Panel = withStyles(styles)(PanelComponent);

const mapStateToProps = state => {
  return {
    stateInfo: state.stateInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setStateInfo: data => dispatch(setStateInfo(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);