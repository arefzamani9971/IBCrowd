import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Grid from '@material-ui/core/Grid';
import Uploader from 'shared/components/uploader/uploaderArea';
import '@progress/kendo-ui';
import urlSettings from '../../../../../../constants/urlSettings';


const $ = require("jquery");

class GetWareHouseUploadComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {


    }

    rerenderComponent = (data) => {
        // this.props.history.push(
        //     {
        //         pathname: '/main/trade/trades/tradeListCommodity',
        //         uploadResultData: data.result
        //     }
        // )

    };
    render() {

        return (
            <React.Fragment>
                <Header {...this.props} />

                    <Grid container spacing={8} className="padding-20">
                        <Grid item md={6}>
                            <Uploader rerenderComponent={this.rerenderComponent}  uploadItem={{title: ''}} accepted={[".xls", ".xlsx"]} uploadUrl={urlSettings.TradeUrl} uploadApi={'trade/uploadwarehousetrade'} />
                        </Grid>
                    </Grid>

            </React.Fragment>

        )
    }
}

export default GetWareHouseUploadComponent;
