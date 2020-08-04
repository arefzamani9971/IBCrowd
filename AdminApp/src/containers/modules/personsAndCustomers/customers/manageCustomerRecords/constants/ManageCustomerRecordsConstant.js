import React from 'react';
import Delete from 'shared/components/kendoGrid/deleteButton/deleteButtonWithoutTD';
import Button from '@material-ui/core/Button';
import FaIcon from 'shared/components/Icon/Icon';
import DeleteManageCustomerServices from "../services/DeleteManageCustomerServices";
const Columns = function (props) {
    return [
        {
            title: "نام/ نام خانوادگی",
            field: "fullName",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "کد ملی",
            field: "nationalId",
            show: true,
            isFixed: false,
            dynamicColumn: false,
        },

        {
            title: "نوع مدرک",
            field: "captionFa",
            show: true,
            isFixed: false,
            dynamicColumn: false,
        },

        {
            title: "لینک دانلود",
            // field: "link",
            show: true,
            width: "160px",
            isFixed: true,
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <td>
                        <Button variant="outlined" size="small" href={`${props.downloadURL}${event.dataItem.link}`} target="_blank" color="primary">
                            <FaIcon name="fas fa-download text-green" size={15} />
                        </Button>
                    </td>
                )
            }
        },

        {
            title: "عملیات",
            isFixed: true,
            width: "150px",
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <td>
                        <Delete deleteService={DeleteManageCustomerServices.deleteAttachmentMethod} info={event.dataItem} entity={event.dataItem.id}  {...props} 
                        modalBodyTitle ="آیا از حذف مدارک مشتری"
                        fullName={event.dataItem.fullName} title={event.dataItem.captionFa} />
                        {/*<Edit {...props} stateParams={{partyId: event.dataItem.partyId, id:event.dataItem.id, fullName: event.dataItem.fullName, nationalId: event.dataItem.nationalId}}/>*/}
                    </td>
                )
            }
        }

    ];

};
// Columns.propTypes = {
//     classes: PropTypes.object.isRequired,
//
// };

export default Columns;