import React from 'react';
import Button from '@material-ui/core/Button';
import { Grid as KendoUiGrid } from '@progress/kendo-react-grid';
import { GridColumn as Column } from '@progress/kendo-react-grid';
import { LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import { orderBy } from '@progress/kendo-data-query';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import faMessages from 'constants/fa.json';
import FaIcon from 'shared/components/Icon/Icon';
import { CustomColumnMenu } from 'shared/components/kendoGrid/kendoGrid';
import Loading from 'core/Loading';
import kendoGrid from './kendoGrid';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Filter from './filterPanel/filterPanel'
import styles from 'containers/layout/panel/theme';
import './kendoServer.css'
import { th } from 'date-fns/esm/locale';
import Detail from './detailPanel/detailPanel';
import { connect } from "react-redux";

loadMessages(faMessages, 'fa-FA');

class GridServerSideComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: this.props.Columns(this.props, this.state),
            isLoading: true,
            items: [],
            totalRecords: 0,
            skip: 0,
            take: 50,
            open: false,
            openDetail: this.props.openDetail,
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
        this.preGet = this.preGet.bind(this);

    }

    getFromServer(command) {
        this.props.service(command, this.successAfterGet);


    }
  

    //ToDo dirty code
    componentDidUpdate(prevProps, prevState) {
        if (this.props.reRender && this.state.reRender) {
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
 
        if (this.props.setDelete !== prevProps.setDelete) {
            var command = {
                reportFilter: this.props.reportFilter,
                OptionalFilter: {
                    take: this.state.take,
                    page: (this.state.skip / this.state.take) + 1,
                    sort: this.props.sort
                }
            };
            this.getFromServer(command);

        }



    }

    componentDidMount(pre) {
        if (this.props.requestToService && !this.props.callServiceAgain) {
            let sort = this.props.sort;
            this.setState({
                isLoading: true
            })

            if (this.props.sort[0].field.split(".").length == 2) {
                sort = [{
                    field: this.props.sort[0].field.split(".")[1],
                    dir: this.props.sort[0].dir
                }]
            }
            var command = {
                reportFilter: this.props.reportFilter,
                OptionalFilter: {
                    take: this.state.take,
                    page: (this.state.skip / this.state.take) + 1,
                    sort: sort
                }
            }
            this.getFromServer(command);
        } else if (!this.props.requestToService) {
            this.setState({
                isLoading: false,
                res: [],
                items: [],
                totalRecords: 0,
            })
        } else {
            this.setState({
                reRender: true
            })
        }
    }

    preGet() {
        if (this.props.preGet)
            this.props.preGet();
    }

    successAfterGet(response) {

        if (response.success) {
            if (response.result && response.result.length > 0) {

                if (this.props.afterResponse) {
                    this.afterResponse(response).then(responseItems => {
                        this.setState({
                            res: responseItems.result,
                            items: responseItems.result,
                            totalRecords: responseItems.totalRecords,
                        }, this.preGet)
                    })

                } else {
                    this.setState({
                        res: response.result,
                        items: response.result,
                        totalRecords: response.totalRecords,
                    }, this.preGet)
                }

            } else {
                this.setState({
                    res: [],
                    items: [],
                    totalRecords: response.totalRecords,
                }, this.preGet)
            }


        }
        else {
            this.setState({
                res: this.state.res,

            }, this.preGet)
        }
        this.setState({
            isLoading: false
        }, this.preGet)
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
        this.setState({ open: !this.state.open })
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
        if (this.props.sort[0].field.split(".").length == 2) {
            sort = [{
                field: this.props.sort[0].field.split(".")[1],
                dir: this.props.sort[0].dir
            }]
        }
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
                            width={column.width}
                            footerTemplate={"Total Amount:"}

                        />
                        : <Column
                            key={column.id}
                            title={column.title}
                            width={column.width}
                            format={column.format}
                            filter={column.filter}
                            footerTemplate={"Total Amount:"}
                            cell={(e) => column.cell(e)}

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
                            footerTemplate={"Total Amount:"}
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
                            title={column.title}
                            width={column.width}
                            format={column.format}
                            filter={column.filter}
                            footerTemplate={"Total Amount:"}
                            cell={(e) => column.cell(e)}
                            columnMenu={
                                props =>
                                    <CustomColumnMenu {...props}
                                        columns={this.state.columns}
                                        onColumnsSubmit={this.onColumnsSubmit}
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
        this.setState({
            isLoading: true
        })
        let sort = this.state.sort;
        if (this.props.sort[0].field.split(".").length == 2) {
            sort = [{
                field: this.props.sort[0].field.split(".")[1],
                dir: this.props.sort[0].dir
            }]
        }
        if (this.props.dynamicColumns) {
            this.setState({ columns: this.props.Columns(this.props, this.state) })
        }

        this.preSeaarch().then(result => {

            this.setState({
                skip: 1
            });
            var command = {
                reportFilter: result,
                OptionalFilter: {
                    take: this.state.take,
                    page: 1,
                    sort: sort
                }
            }
            this.getFromServer(command)
            this.setState((state) => {
                state.open = !state.open
            });
        })


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
            nextState.isLoading !== this.state.isLoading || nextProps.reRender;
    }

    render() {
        const { classes } = this.props;
        if (this.state.isLoading) {
            return (<Loading />)
        }
        else {
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

                                    return (
                                    <Detail search={this.search} handleExpandDetailPanel={this.handleExpandDetailPanel} {...this.state}>
                                        {children}
                                    </Detail>);
                                }
                            })


                        : ''}
                    <Paper className={"main-paper-container-server"}>
                        <div className={(this.state.res.length >= 16 ? "main-height" : '')}>
                            <div className={(this.state.openDetail && this.state.open ? this.props.classHeightOpenPanelFull : (this.state.open ? this.props.classHeightOpenPanel : this.state.openDetail ? this.props.heightOpenDetailPanel : this.props.heightClosePanel))}>
                                <div className="k-rtl height-page">
                                    <LocalizationProvider language="fa-FA">
                                        <KendoUiGrid
                                            data={this.state.items}
                                            style={{ width: '100%', height: '100%' }}
                                            skip={this.state.skip}
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
                                            group={[
                                                {
                                                    aggregates: [{
                                                        field: 'debit',
                                                        aggregate: 'sum'
                                                    }]
                                                }
                                            ]}
                                            onSortChange={this.onSortChange}>
                                            {
                                                this.state.columns.map((column, id) =>

                                                    this.showByDynamicColumn(column)

                                                )}
                                        </KendoUiGrid>
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </div>
                    </Paper>
                </React.Fragment>

            );
        }




    }
}


GridServerSideComponent.defaultProps = {
    heightClosePanel: "heightClosePanel",
    heightOpenDetailPanel: "heightClosePanel",
    classHeightOpenPanelFull: '',
    dynamicColumns: false,
    requestToService: true,
    open: false,
    openDetail: false,
    sort: [
        {
            field: "created",
                dir: "desc"
        }
    ]
}
const mapStateToProps = state => {
   
    return {
        setDelete: state.setDelete
    };
};



/*<-------------------connect------------->*/
const GridServer = connect(mapStateToProps)(GridServerSideComponent);



export default withStyles(styles)(GridServer);