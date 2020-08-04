import React from 'react';
import Paper from '@material-ui/core/Paper';
import Header from 'shared/components/stateHeader/stateHeader'
import Uploader from 'shared/components/uploader/uploaderArea';
import toastr from 'toastr';
import { deletePartyUploadedDocument } from '../../realCustomers/services/DocumentRealCustomerService';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import Fieldset from 'shared/components/fieldset/fieldset';
import { Grid } from '@material-ui/core';
import GetPartiesService from '../../customersList/services/GetPartiesService';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FaIcon from 'shared/components/Icon/Icon';
import urlSettings from '../../../../../../constants/urlSettings';
import GetManageCustomerRecordsServices from '../services/GetManageCustomerRecordsServices';
import CardContent from '@material-ui/core/CardContent';


class AddManageCustomerRecordsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            party: {
                name: "selectedParty",
                field: "fullName",
                placeholder: "جستجوی مشتری اصلی بر اساس نام و نام خانوادگی/نام شرکت، کدملی، نام پدر، شماره حساب و شماره تفصیل",
                label: "نام و نام خانوادگی مشتری",
            },
            selectedParty: {},
            getAllAttachmentCategory: [],
            uploaderItem: {},
            open: false,
            selectedDocummet: {
                captionFA: ''
            },
            isChangeParty : true

        }

    }

    componentDidMount() {
      
        if (this.props.history.location.state) {

            let partyId = !this.props.partyId ? 
            this.props.history.location.state : this.props.partyId;
            this.getPartyById(partyId)
        }
    }

    getPartyById(partyId) {
        let command = {
            entity: partyId
        };
        GetPartiesService.getpartybyid(command, (res) => {
            this.setState({
                selectedParty: res.result,
                isChangeParty : false
            }, () => {
                this.getAllAttachment();
            });
        });
    }


    openModalDelete(value) {
        this.setState({
            selectedDocummet: value,
            open: true
        })
    }

    getAllAttachment = () => {
        GetManageCustomerRecordsServices.getAllAttachmentCategoryMethod({ partyId: this.state.selectedParty.id }, (res) => {
            this.state.selectedParty.partyType == 1 ?
                this.setState({
                    getAllAttachmentCategory: res.result.filter(item => item.partyType == 1),
                    uploaderItem: {}

                })
                :
                this.setState({
                    getAllAttachmentCategory: res.result.filter(item => item.partyType == 2),
                    uploaderItem: {}

                })
        })

    }

    handleChange = (item, name) => {

        if (item.value == '') {
            this.setState({
                [name]: item.value,
                getAllAttachmentCategory: [],
                uploaderItem: {}
            })
        } else {
            this.setState({
                [name]: item.value,
            }, () => {
                GetManageCustomerRecordsServices.getAllAttachmentCategoryMethod({ partyId: this.state.selectedParty.id }, (res) => {
                    this.state.selectedParty.partyType == 1 ?
                        this.setState({
                            getAllAttachmentCategory: res.result.filter(item => item.partyType == 1),
                        })
                        :
                        this.setState({
                            getAllAttachmentCategory: res.result.filter(item => item.partyType == 2),
                        })
                })
            })
        }

    };

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

    delete = () => {
        let command = {
            entity: {
                partyId: this.state.selectedParty.id,
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
        return (
            <React.Fragment>
                {/*<WrapperPaper />*/}
                {
                    this.props.hasHeader ? '' :
                        <Header {...this.props} />

                }

                <Paper className={`padding-top-20 ${this.props.hasFullHeight ? 'main-height' : 'paper-height'}`}>

                    <Fieldset legend={'اطلاعات مشتری'} marginRight  >
                        <Grid container spacing={8} className="padding-10">

                            {
                                this.state.selectedParty.id && !this.state.isChangeParty ?

                                    <React.Fragment>
                                        <Grid item md={3}>
                                            <h3><span>نام و نام خانوادگی: </span><strong>{this.state.selectedParty.fullName}</strong></h3>
                                        </Grid>
                                        {

                                            < Grid item md={3}>
                                                <h3><span>
                                                    {
                                                        this.state.selectedParty.partyType === 1 ? "کد ملی: " : "شناسه ملی: "
                                                    }

                                                </span><strong>{this.state.selectedParty.nationalId}</strong></h3>
                                            </Grid>

                                        }
                                    </React.Fragment>

                                    :

                                    <Grid item md={8}>
                                        <AutoCompleteComponent
                                            {...this.state.party}
                                            handleChange={(value) => this.handleChange(value, 'selectedParty')}
                                            value={this.state.selectedParty.fullName}
                                            service={GetPartiesService.simpleSearchCustomers} />
                                    </Grid>
                            }

                        </Grid>
                    </Fieldset>
                    <br />
                    <CardContent>

                        <Fieldset legend={'مدارک مشتری'}>
                            <Grid container spacing={8} className="padding-20" >
                                <Grid item md={8}>

                                    <Table>
                                        <TableHead className="margin-bottom-10">
                                            <TableRow>
                                                <TableCell align="left">عنوان مدرک</TableCell>
                                                <TableCell align="center" >آپلود مدرک</TableCell>
                                                <TableCell align="center">وضعیت</TableCell>
                                                <TableCell align="center">دانلود</TableCell>
                                                <TableCell align="center">حذف</TableCell>

                                            </TableRow>
                                        </TableHead>


                                        <TableBody>


                                            {this.state.getAllAttachmentCategory.map(

                                                (selectedParty) => {

                                                    return (
                                                        <TableRow key={selectedParty.id}>
                                                            <TableCell component="th" scope="row">
                                                                {selectedParty.captionFA}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <Button variant="outlined" size="small" onClick={() => this.upload(selectedParty)} color="primary">
                                                                    <FaIcon name="fa fa-upload" size={13} />
                                                                </Button>
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                {
                                                                    selectedParty.isUploaded ?
                                                                        <FaIcon name="fas fa-check green-page-color" size={13} />
                                                                        :
                                                                        <FaIcon name="fa fa-times red-page-color" size={13} />
                                                                }

                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <Button variant="outlined" size="small" href={`${urlSettings.downloadUrl}${selectedParty.link}`} target="_blank"
                                                                    className={(selectedParty.isUploaded ? 'green-text' : '')}
                                                                    disabled={!selectedParty.isUploaded}>
                                                                    <FaIcon name="fas fa-download" size={13} />
                                                                </Button>
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <Button variant="outlined" size="small" onClick={() => this.openModalDelete(selectedParty)}
                                                                    className={(selectedParty.isUploaded ? 'red-text' : '')}
                                                                    disabled={!selectedParty.isUploaded}>
                                                                    <FaIcon name="fas fa-trash" size={13} />
                                                                </Button>
                                                            </TableCell>
                                                            <TableCell align="center">

                                                            </TableCell>
                                                        </TableRow>

                                                    )
                                                }
                                            )

                                            }
                                        </TableBody>

                                    </Table>
                                    {deleteModal(this)}

                                </Grid>
                                <Grid item md={4}>

                                    {
                                        this.state.uploaderItem.codeId
                                            ?
                                            <Uploader style={{ width: "fit-content" }} data={{ partyId: this.state.selectedParty.id, categoryId: this.state.uploaderItem.codeId }} rerenderComponent={this.getAllAttachment} uploadItem={this.state.uploaderItem} accepted={[".png", ".jpg",]} uploadUrl={urlSettings.PartyManagementUrl} uploadApi={'attachment/upload'} />
                                            :
                                            null
                                    }
                                </Grid>
                            </Grid>



                        </Fieldset>
                    </CardContent>
                </Paper>             </React.Fragment >

        )

    }

}
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
                <Button variant="contained" color="secondary" style={{ backgroundColor: 'red', color: '#FFF' }} onClick={that.delete}>
                    حذف
                                </Button>
                <Button variant="contained" color="secondary" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }}
                    onClick={that.handleClose}>
                    انصراف
                                </Button>
            </Paper>
        </Modal>
    )
}
AddManageCustomerRecordsComponent.defaultProps = {
    hasFullHeight: false,
    hasHeader: false

}
export default AddManageCustomerRecordsComponent;

