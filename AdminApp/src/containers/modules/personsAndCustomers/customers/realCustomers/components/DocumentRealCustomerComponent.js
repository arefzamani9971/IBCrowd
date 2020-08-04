import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import classNames from 'classnames';
import Input from 'shared/components/formInput/inputForm'
import Email from 'shared/components/email/email'
import Header from 'shared/components/stateHeader/stateHeader'
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes, { func } from 'prop-types';
import styles from '../../../../../layout/panel/theme'
import DropDownComponent from 'shared/components/dropDown/dropDown';
import toastr from 'toastr';
import Form from 'shared/components/form/pureForm';
import AddRealCustomerService from '../services/CrateRealCustomerService';
import IBAN from 'shared/components/iban/textMask';
import Typography from '@material-ui/core/Typography';
import NationalCode from 'shared/components/nationalCode/nationalCode';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import serials from 'constants/serial';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import GetBranchService from '../../../../basicInformation/branch/services/GetBranchService';
import Fieldset from 'shared/components/fieldset/fieldset';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Uploader from 'shared/components/uploader/uploaderArea';
import FaIcon from 'shared/components/Icon/Icon';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import { CheckColumn } from 'shared/components/kendoGrid/kendoGrid';
import GetManageCustomerRecordsServices from "../../manageCustomerRecords/services/GetManageCustomerRecordsServices";
import { deletePartyUploadedDocument } from '../services/DocumentRealCustomerService';
import urlSettings from '../../../../../../constants/urlSettings';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
class DocumentRealCustomer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      submittedFiles: [],
      rows: {
        nationalCode: { title: "کارت ملی", name: "nationalCode", file: [], code: 1, preview: '', fileName: '' },
        bithCertificate: { title: "شناسنامه", file: [], name: "bithCertificate", code: 2, preview: '', fileName: '' },
      },
      getAllAttachmentCategory: [],
      uploaderItem: {},
      partyId: 0,
      open: false,
      selectedDocummet: {
        captionFA: ''
      }
    };
    this.handleUpload = this.handleUpload.bind(this);
    this.upload = this.upload.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.delete = this.delete.bind(this);
  }

    componentDidMount() {

    if (this.props.location.state && !this.props.location.state.customeBackInfo) {
      this.setState({
        partyId: this.props.location.state
      }, () => {
        GetManageCustomerRecordsServices.getAllAttachmentCategoryMethod({ partyId: this.state.partyId }, (res) => {
                this.setState({
            getAllAttachmentCategory: res.result.filter(res => res.partyType==1)
          })
        })
      })
    } else if (this.props.location.state && this.props.location.state.customeBackInfo) {
      this.setState({
        partyId: this.props.location.state.partyId
      }, () => {
        GetManageCustomerRecordsServices.getAllAttachmentCategoryMethod({ partyId: this.state.partyId }, (res) => {
          this.setState({
            getAllAttachmentCategory: res.result.filter(res => res.partyType==1)
          })
        })
      })
    }
    else {
      this.props.history.push("/main/persons/customers/getParties");
    }
  }

  getAllAttachment = () => {
    GetManageCustomerRecordsServices.getAllAttachmentCategoryMethod({ partyId: this.state.partyId }, (res) => {
      this.setState({
        getAllAttachmentCategory: res.result.filter(res => res.partyType==1),
        uploaderItem: {}
      })
    })
  }
  
    handleUpload(file) {
    let rows = Object.assign({}, this.state.rows);
    rows[file.name].preview = file.files.preview;
    rows[file.name].fileName = file.files.name;
    this.setState({ rows })
  }

  upload(uploaderItem) {
    this.setState({ uploaderItem });
  }

  openModalDelete(value) {
    this.setState({
      selectedDocummet: value,
      open: true
    })
  }
  handleClose = () => {
    this.setState({ open: false });
  };
  delete() {
    let command = {
      entity: {
        partyId: this.state.partyId,
        attachmentId: this.state.selectedDocummet.attachmentId
      }
    }
    deletePartyUploadedDocument(command, (response) => {
      if (response.success) {
        toastr.success("فایل با موفقیت حذف شد");
        this.getAllAttachment();
        this.handleClose();
      }
    })

  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <br />
        <Grid container spacing={16}>

          <Grid item md={8}>
            <Card >
              <div class="cardHeader">
                <h3> مدارک مشتری</h3>
                <hr />
              </div>
              <CardContent>
                <div className="uploadFileScroll">
                  <Table style={{ width: "95%", marginRight: "2.5%" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">عنوان مدرک</TableCell>
                        <TableCell align="center" >آپلود مدرک</TableCell>
                        <TableCell align="center">وضعیت</TableCell>
                        <TableCell align="center">دانلود</TableCell>
                        <TableCell align="center">حذف</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        this.state.getAllAttachmentCategory.map(
                          (value, index) => {
                            return (

                              <TableRow key={value.id}>
                                <TableCell component="th" scope="row">
                                  {value.captionFA}
                                </TableCell>
                                <TableCell align="center">
                                  <Button variant="outlined" size="small" onClick={() => this.upload(value)} color="primary">
                                    <FaIcon name="fa fa-upload" size={13} />
                                  </Button>
                                </TableCell>
                                <TableCell align="center">
                                  {
                                    value.isUploaded ?
                                      <FaIcon name="fas fa-check green-page-color" size={13} />
                                      :
                                      <FaIcon name="fa fa-times red-page-color" size={13} />
                                  }
                                </TableCell>
                                <TableCell align="center">
                                  <Button variant="outlined" size="small" href={`${urlSettings.downloadUrl}${value.link}`} target="_blank"
                                    className={(value.isUploaded ? 'green-text' : '')}
                                    disabled={!value.isUploaded}>
                                    <FaIcon name="fas fa-download" size={13} />
                                  </Button>
                                </TableCell>
                                <TableCell align="center">
                                  <Button variant="outlined" size="small" onClick={() => this.openModalDelete(value)}
                                    className={(value.isUploaded ? 'red-text' : '')}
                                    disabled={!value.isUploaded}>
                                    <FaIcon name="fas fa-trash" size={13} />
                                  </Button>
                                </TableCell>
                              </TableRow>

                            )
                          }
                        )
                      }
                    </TableBody>
                  </Table>
                </div>
                <br />
              </CardContent>
            </Card>
            {deleteModal(this)}
          </Grid>
          <Grid item md={4}>
            {this.state.uploaderItem.codeId ?
              <Uploader data={{ partyId: this.state.partyId, categoryId: this.state.uploaderItem.codeId }} rerenderComponent={this.getAllAttachment} uploadItem={this.state.uploaderItem} accepted={[".png", ".jpg",]} uploadUrl={urlSettings.PartyManagementUrl} uploadApi={'attachment/upload'} />
              // <Uploader rerenderComponent={this.rerenderComponent} partyId={this.state.partyId} uploadItem={this.state.uploaderItem} accepted={[".png", ".jpg"]} /> :
              :
              ''
            }
          </Grid>
        </Grid>

      </React.Fragment >
    )
  }
};
function deleteModal(that) {
  const { classes } = that.props;
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={that.state.open}
      onClose={that.handleClose}
    >
      <Paper style={{
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
      }}>
        <h3 >
          <FaIcon color="orange" name="fas fa-exclamation-triangle" size={20} />
          <span style={{ marginRight: '5px' }}> حذف {that.state.selectedDocummet.captionFA}</span>
        </h3>
        <hr />
        <h3>آیا از حذف مورد انتخابی مطمئن می باشید.</h3>
        <br />
        <Button variant="contained" color="secondary" className={classes.button} style={{ backgroundColor: 'red', color: '#FFF' }} onClick={that.delete}>
          حذف
                        </Button>
        <Button variant="contained" color="secondary" className={classes.button} style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }}
          onClick={that.handleClose}>
          انصراف
                        </Button>
      </Paper>
    </Modal>
  )
}

DocumentRealCustomer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DocumentRealCustomer);