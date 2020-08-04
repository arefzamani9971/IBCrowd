import React from 'react';
import { Grid as KendoUiGrid, GridToolbar } from '@progress/kendo-react-grid';
import { GridColumn as Column } from '@progress/kendo-react-grid';
import { LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import { withStyles } from '@material-ui/core/styles';
import faMessages from 'constants/fa.json';
import { CustomColumnMenu } from 'shared/components/kendoGrid/kendoGrid';
import Loading from 'core/Loading';
import Paper from '@material-ui/core/Paper';
import Filter from './filterPanel/filterPanel'
import styles from 'containers/layout/panel/theme';
import { filterBy } from '@progress/kendo-data-query';
import './kendoServer.css'
import Detail from './detailPanel/detailPanel';
import { connect } from "react-redux";

loadMessages(faMessages, 'fa-FA');

class GridServerSideComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: !this.props.dynamicServiceColumns ? this.props.Columns(this.props, this.state) : [],
            isLoading: true,
            items: [],
            totalRecords: 0,
            skip: 0,
            take: 50,
            open: false,
            sort: this.props.sort,
            res: [],
            reRender: false
        };
        this.onPageChange = this.onPageChange.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.getFromServer = this.getFromServer.bind(this);
        this.successAfterGet = this.successAfterGet.bind(this);
        this.handleExpandSearchPanel = this.handleExpandSearchPanel.bind(this);
        this.handleExpandDetailPanel = this.handleExpandDetailPanel.bind(this);
        this.search = this.search.bind(this);

    }

    getFromServer(command) {
        this.props.service(command, this.successAfterGet);
    }

    handleDelete() {

    }

    componentDidUpdate(prevProps, prevState) {
       // FIXME remove this.props.requestToService && 
        if (this.props.requestToService && this.props.reRender && this.state.reRender) {
            var command = {
                reportFilter: this.props.reportFilter,
                OptionalFilter: {
                    take: this.state.take,
                    page: (this.state.skip / this.state.take) + 1,
                    sort: this.props.sort
                }
            };
            this.setState({
                reRender: false
            })
            this.getFromServer(command);

        }
        if (this.props.open !== prevProps.open) {
            this.setState({ open: this.props.open });
        }
        if (this.props.openDetail !== prevProps.openDetail) {
            this.setState({ openDetail: this.props.openDetail });
        }
        // FIXME remove this.props.requestToService && 
        if (this.props.requestToService && this.props.setDelete !== prevProps.setDelete || this.props.setUpdateRow !== prevProps.setUpdateRow) {

            var command = {
                reportFilter: this.props.reportFilter,
                OptionalFilter: {
                    take: this.state.take,
                    page: (this.state.skip),
                    sort: this.props.sort
                }
            };
            this.getFromServer(command);
        }
    }
    componentDidMount() {
        if (this.props.requestToService && !this.props.callServiceAgain) {
            let sort = this.props.sort;
            this.setState({
                isLoading: true,
            })

            // if (this.props.sort[0].field.split(".").length == 2) {
            //     sort = [{
            //         field: this.props.sort[0].field.split(".")[1],
            //         dir: this.props.sort[0].dir
            //     }]
            // }
            let command = this.props.command;
            if (!this.props.isAnotherRequestService) {
                command = {
                    reportFilter: this.props.reportFilter,
                    OptionalFilter: {
                        take: this.state.take,
                        page: (this.state.skip / this.state.take) + 1,
                        sort: sort
                    }
                }

            }
            this.getFromServer(command);
        }
        else if (!this.props.requestToService) {
            this.setState({
                isLoading: false,
                res: [],
                items: [],
                totalRecords: 0,
                reRender: true
            })
        } else {
            this.setState({
                reRender: true
            })
        }
    }

    successAfterGet(response) {
        if (this.props.dynamicServiceColumns) {
            this.props.serviceColumns(null, this.successGetColumns);
        } else {

            if (response[this.props.responseFeildName] && response[this.props.responseFeildName].length > 0) {
                if (this.props.afterResponse) {
                    this.afterResponse(response).then(responseItems => {
                        this.setState({
                            res: responseItems[this.props.responseFeildName],
                            items: responseItems[this.props.responseFeildName],
                            totalRecords: responseItems.totalRecords ? responseItems.totalRecords  : responseItems[this.props.responseFeildName].totalRecords,
                        })
                    })

                } else {
                    this.setState({
                        res: response[this.props.responseFeildName],
                        items: response[this.props.responseFeildName],
                        totalRecords: response.totalRecords ? response.totalRecords : response[this.props.responseFeildName].totalRecords,
                    })
                }

            } else {
                this.setState({
                    res: [],
                    items: [],
                    totalRecords: 0,
                })
            }

            this.setState({
                isLoading: false
            })
        }
    }

    successGetColumns(response) {
        if (response.success) {
            // let columns = [];
            // response.result.map(item => {
            //     this.props.columns(this.props , response.result)
            //     columns.push({

            //     })
            // })
            // this.setState({
            //     columns : this.props.columns
            // })
        }

    }
    afterResponse(response) {
        return new Promise((resolve, reject) => {
            resolve(this.props.afterResponse(response));
        })
    }
    onSortChange(e) {
        this.setState({
            isLoading: true,
            sort: e.sort
        });

        var command = {
            reportFilter: this.props.reportFilter,
            OptionalFilter: {
                take: this.state.take,
                page: this.state.skip,
                sort: e.sort
            }
        }
        this.getFromServer(command);
    }

    onPageChange(e) {
        this.setState({
            isLoading: true
        })
        let sort = this.state.sort;
        // if (this.props.sort[0].field.split(".").length == 2) {
        //     sort = [{
        //         field: this.props.sort[0].field.split(".")[1],
        //         dir: this.props.sort[0].dir
        //     }]
        // }
        this.setState({
            skip: e.page.skip,
            take: e.page.take,
        });
        var command = {
            reportFilter: this.props.reportFilter,
            OptionalFilter: {
                take: e.page.take,
                page: (e.page.skip / e.page.take) + 1,
                sort: sort
            }
        }
        this.getFromServer(command);
    }

    onColumnsSubmit = (columnsState) => {
        this.setState({
            columns: columnsState
        });
    }

    showByDynamicColumn(column) {

        return (
            column.isFixed ?
                (
                    !column.dynamicColumn ?
                        <Column
                            key={column.id}
                            field={column.field}
                            title={column.title}
                            className={column.class}
                            format={column.format}
                            filter={column.filter}
                            locked={column.locked}
                            width={column.width}

                        />
                        : <Column
                            key={column.id}
                            title={column.title}
                            width={column.width}
                            format={column.format}
                            filter={column.filter}
                            locked={column.locked}
                            cell={(e) => column.cell(e, this.props)}

                        />) :
                column.show && (
                    !column.dynamicColumn ?
                        <Column
                            key={column.id}
                            field={column.field}
                            title={column.title}
                            className={column.class}
                            width={column.width}
                            format={column.format}
                            filter={column.filter}
                            locked={column.locked}
                            columnMenu={
                                props =>
                                    <CustomColumnMenu {...props}
                                        columns={this.state.columns}
                                        onColumnsSubmit={this.onColumnsSubmit}
                                    />

                            }
                        />
                        : <Column
                            key={column.id}
                            field={column.field}

                            title={column.title}
                            width={column.width}
                            format={column.format}
                            filter={column.filter}
                            locked={column.locked}
                            cell={(e) => column.cell(e, this.props)}
                            columnMenu={
                                props =>
                                    <CustomColumnMenu {...props}
                                        columns={this.state.columns}
                                        onColumnsSubmit={this.onColumnsSubmit
                                        }
                                    />

                            }
                        />))
    }

    handleExpandSearchPanel() {
        this.setState({
            open: !this.state.open
        })
    }
    handleExpandDetailPanel() {
        this.setState({
            openDetail: !this.state.openDetail
        })
    }
    search() {
        if(!this.props.noSearch){
            this.setState({
                isLoading: true
            })
            let sort = this.state.sort;
            // if (this.props.sort[0].field.split(".").length == 2) {
            //     sort = [{
            //         field: this.props.sort[0].field.split(".")[1],
            //         dir: this.props.sort[0].dir
            //     }]
            // }
            if (this.props.dynamicColumns) {
                this.setState({ columns: this.props.Columns(this.props, this.state) })
            }
    
            this.preSeaarch().then(result => {
                let command = this.props.command;
                if(!this.props.isAnotherRequestService){
                    this.setState({
                        skip: 0
                    });
                    command = {
                        reportFilter: result,
                        OptionalFilter: {
                            take: this.state.take,
                            page: 1,
                            sort: sort
                        }
                    }
                }else{
    
                }
             
                this.getFromServer(command)
                this.setState((state) => {
                    state.open = !this.state.open
                });
            })

        }
    };

    preSeaarch() {
        return new Promise((resolve, reject) => {
            if (this.props.preSearch)
                resolve(this.props.preSearch())
            else
                resolve(this.props.reportFilter)
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.items !== this.state.items || nextState.open !== this.state.open ||
            nextState.isLoading !== this.state.isLoading || nextProps.reloadColumnAfterGet || this.state.columns || nextProps.reRender;
    }



    render() {
        return (

            <React.Fragment>

                {this.props.children ?

                    this.props.children.length === undefined ?

                        <Filter search={this.search} handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>
                            {this.props.children}
                        </Filter>
                        :
                        this.props.children.map(children => {

                            if (children.props.id !== "detail") {
                                return <Filter byDetail search={this.search} handleExpandSearchPanel={this.handleExpandSearchPanel} {...this.state}>
                                    {children}
                                </Filter>

                            }

                            else {

                                return (<Detail search={this.search} handleExpandDetailPanel={this.handleExpandDetailPanel} {...this.state}>
                                    {children}
                                </Detail>);
                            }
                        })


                    : ''}
                <Paper className={(this.state.open ? this.props.classMainHeightOpenPanel : '') + ' main-paper-container-server'}>
                    <div className="main-height">
                        <div className={(this.state.open ? this.props.classHeightOpenPanel : '') + ' ' + this.props.heightClosePanel}>
                            <div className="k-rtl height-page">
                                <LocalizationProvider language="fa-FA">
                                    {this.state.isLoading ?
                                        <Loading />
                                        :
                                        <KendoUiGrid
                                            data={filterBy(this.state.items, this.props.filter)}
                                            style={{ width: '100%', height: '100%' }}
                                            skip={this.state.skip}
                                            detail={this.props.field}
                                            expandField={this.props.expandField}
                                            onExpandChange={this.props.expandChange}
                                            take={this.state.take}
                                            total={this.state.totalRecords}
                                            pageable={{ pageSizes: [50, 100, 200] }}
                                            pageSizes={this.state.take}
                                            selectable={true}
                                            onPageChange={this.onPageChange}
                                            reorderable={true}
                                            resizable={true}
                                            sortable={{ allowUnsort: false }}
                                            sort={this.state.sort}
                                            onSortChange={this.onSortChange}>
                                            {
                                                this.props.hasToolbar
                                                    ?
                                                    <GridToolbar>
                                                        {
                                                            this.props.hasToolbar.haveExcelPfdReport
                                                                ?
                                                                <div class="report-area">
                                                                    <button class="excel-report margin-right-5" onClick={this.props.hasToolbar.haveExcelPfdReport.excelReportHandler}><i class="k-icon k-i-excel"></i></button>
                                                                    <button class="pdf-report margin-right-5" onClick={this.props.hasToolbar.haveExcelPfdReport.pdfReportHandler}><i class="k-icon k-i-pdf"></i></button>
                                                                </div>
                                                                :
                                                                null

                                                        }
                                                        {
                                                            this.props.hasToolbar.haseExcelReport
                                                                ?
                                                                <div class="report-area">
                                                                    <button class="excel-report" onClick={this.props.hasToolbar.haseExcelReport.excelReportHandler}><i class="k-icon k-i-excel"></i></button>
                                                                </div>
                                                                :
                                                                null
                                                        }
                                                        {
                                                            this.props.hasToolbar.elemnts !== undefined
                                                                ?
                                                                this.props.hasToolbar.elemnts.map(
                                                                    (v, i) => {
                                                                        return (
                                                                            <button id={v.id} onClick={v.method} className={v.className}>{v.title}</button>
                                                                        )
                                                                    }
                                                                ) :
                                                                null

                                                        }
                                                    </GridToolbar>
                                                    :
                                                    null
                                            }
                                            {
                                                this.state.columns.map((column, id) =>

                                                    this.showByDynamicColumn(column)

                                                )}


                                        </KendoUiGrid>

                                    }
                                </LocalizationProvider>
                            </div>
                        </div>
                    </div>
                </Paper>
            </React.Fragment>

        );
    }
}


GridServerSideComponent.defaultProps = {
    heightClosePanel: "heightClosePanel",
    dynamicColumns: false,
    requestToService: true,
    sort: [
        {
            field: "created",
            dir: "desc"
        },
    ],
    hasToolbar: false,
    classMainHeightOpenPanel: '',
    classHeightOpenPanel: '',
    command : {},
    responseFeildName: "result"
}
const mapStateToProps = state => {

    return {
        setDelete: state.setDelete,
        setUpdateRow: state.setUpdateRow
    };
};



/*<-------------------connect------------->*/
const GridServer = connect(mapStateToProps)(GridServerSideComponent);



export default withStyles(styles)(GridServer);