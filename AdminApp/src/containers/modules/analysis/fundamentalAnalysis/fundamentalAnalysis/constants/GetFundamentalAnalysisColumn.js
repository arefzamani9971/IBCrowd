import React from 'react';
import { CheckColumn } from 'shared/components/kendoGrid/kendoGrid';
import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';
import { Link } from 'react-router-dom';

const Columns = function (prop, state, classes) {

    return [
        {
            title: "نماد",
            field: "accountNumber",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },
        {
            title: "عنوان شرکت",
            field: "title",
            show: true,
            isFixed: false,
            dynamicColumn: false
        },

        {
            title: "ویرایش",
            isFixed: true,
            dynamicColumn: true,
            width: "100px",
            cell: (event) => {
                return (
                    <td>
                        <Edit {...prop} stateParams={{ partyId: event.dataItem.partyId, id: event.dataItem.id, nationalId: event.dataItem.nationalId }} />
                    </td>
                )
            }
        },
        {
            title: "فهرست اخبار",
            isFixed: true,
            dynamicColumn: true,
            width: "100px",
            cell: (event) => {
                return (
                    <td>
                        {/* <button className="btn btn-primary btn-sm"> */}

                            <Link to="/main/analysis/news/news" >

                                {/* <a href={event.dataItem.attachmentUrl} target="_blank"> */}
                                    <i class="fas fa-list text-info" style={{ fontSize: "23px", marginRight: "15px", cursor: "pointer" }}></i>
                                {/* </a> */}
                            </Link>
                        {/* </button> */}
                    </td>
                )
            }
        }
    ];

};

export default Columns;