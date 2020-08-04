
import axios from 'axios';
import toastr from 'toastr';
import errors from 'constants/errors'
import urlSettings from 'constants/urlSettings'

let token, uploadHeader = { 'Content-type': 'multipart/form-data' }, header = {};


/*<-----------AddHeder------->*/
export function AddHeader(key, value) {
    header[key] = value;
    uploadHeader[key] = value;
};

function ConfigUrl(url) {
    return url || urlSettings.baseUrl;
}
/*<-----------POST------->*/
export function Post(customUrl, data, then, isAuth = true, url = urlSettings.baseUrl, responseType = 'json') {

    if (isAuth) {
        if (customUrl.indexOf('http://') != -1) {
            ApiRequestAuthorized(customUrl, 'Post', data, null, responseType, then);
        } else {

            ApiRequestAuthorized(ConfigUrl(url) + customUrl, 'Post', data, null, responseType, then);
        }

    }
    else {
        if (customUrl.indexOf('http://') != -1) {
            ApiRequestUnauthorized(customUrl, 'Post', data, null, responseType, then)
        } else {
            ApiRequestUnauthorized(ConfigUrl(url) + customUrl, 'Post', data, null, responseType, then)
        }

    }
};
/*<-----------GET------->*/
export function Get(customUrl, params, then, isAuth = true, url = urlSettings.baseUrl, responseType = 'json') {
    if (isAuth) {
        ApiRequestAuthorized(ConfigUrl(url) + customUrl, 'GET', null, params, responseType, then);

    }
    else {
        ApiRequestUnauthorized(ConfigUrl(url) + customUrl, 'GET', null, params, responseType, then)
    }
};
/*<-----------DELETE------->*/
export function Delete(customUrl, params, then, isAuth = true, responseType = 'json') {

    if (isAuth) {
        ApiRequestAuthorized(customUrl, 'Delete', null, params, responseType, then);

    }
    else {
        ApiRequestUnauthorized(customUrl, 'Delete', null, params, responseType, then)
    }
};
/*<-----------Put------->*/
export function Put(customUrl, data, then, isAuth = true, responseType = 'json') {

    if (isAuth) {
        ApiRequestAuthorized(customUrl, 'PUT', null, data, responseType, then);

    }
    else {
        ApiRequestUnauthorized(customUrl, 'PUT', null, data, responseType, then)
    }
};

export function Upload(customUrl, data, files, then, isAuth = true, responseType = 'json') {
    if (isAuth) {
        if ((!token || token === '')) {
            window.location.href = '/login'
        }
        let formData = new FormData();

        if (data != null) {
            Object.keys(data).map(d => {

                formData.append(d, data[d])
            });
        }

        files.map(item => {
            formData.append('file', item);
        });
        var options = {
            method: 'POST',
            url: customUrl,
            headers: uploadHeader,
            responseType: responseType,
            data: formData,
        };
        axios(options).then(responseFunction).then(then).catch(
            (error) => errorHandler(error, then)
        );
    }

};


/*------Unauthorized Request------*/
function ApiRequestUnauthorized(customUrl, method, data, params, responseType, then) {
    var options = {
        method: method,
        url: customUrl,
        responseType: responseType,
        data: data,
        params: params
    };
    axios(options).then(responseFunction).then(then).catch(
        (error) => {

            errorHandler(error, then)
        }
    );
};
/*------errorUnauthorized------*/


function errorHandler(error, then) {
    console.log("ERROR: ", error);
    var response = error.response;
    return new Promise((resolve, reject) => {

        var res = response ? response.data : {};


        let status;
        if (res) {
            if (res.status)
                status = res.status;
            else {
                if (response) {
                    if (response.status)
                        status = response.status;
                    else {
                        status = 10;
                    }
                }
            }
        }
        else if (response) {
            if (response.status)
                status = response.status;
            else {
                status = 10;
            }
        }
        else {
            status = 10;
        }

        switch (status) {
            case 400:
                responseBadRequestFunction(res || response, then);
                resolve(res);
                break;
            case 404:
                {
                    let message = "اطلاعات یافت نشد ";
                    toastr.error(message);
                    resolve(res);

                    break;
                }
            case 500:
                let message = "بروز خطا در سرور";
                // res.success = false;
                toastr.error(message);
                resolve(res);
                break;
            case 401:
                // localStorage.removeItem("authentication");
                // window.location.href = '/login'
                break;
            default:
                reject('Error');
                break;
        }

    })

    // toastr.error(errors.unconnection);
};

/*------Unauthorized Request with error handler------*/
export function ApiRequestUnauthorizedWithError(customUrl, method, data, responseType, then, error) {
    var options = {
        method: method,
        url: customUrl,
        responseType: responseType,
        data: data,
    }
    axios(options).then(then).catch(error);
};
/*------Authorized Request------*/
function ApiRequestAuthorized(customUrl, method, data, params, responseType, then) {
    if ((!token || token === '')) {
        window.location.href = '/login'
    }
    var options = {
        method: method,
        url: customUrl,
        headers: header,
        responseType: responseType,
        data: data,
        params: params
    }
    axios(options).then(responseFunction).then(then).catch((error) => errorHandler(error, then));
};
;

function responseBadRequestFunction(res, then) {
    let message;

    if (res.errors && res.errors.InvalidRecaptcha) {
        message = res.error.message
    }
    else {

        message = res.message ? res.message : res.Message || "عملیات با شکست روبرو شد";
    }

    // res.success = false;
    toastr.error(message);
    then(res);
}
function responseFunction(response) {


    // var res = response.data;
    return new Promise((resolve, reject) => {




        // res.success = true
        resolve(response.data);



    })
};
export function DownloadExcel(customUrl, data, fileName, then, url = urlSettings.baseUrl) {
    Download(url + customUrl, data, fileName, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,", false, then)
};

export function DownloadPdf(customUrl, data, fileName, prewPdf, then, url = urlSettings.baseUrl) {
    Download(url + customUrl, data, fileName, "application/pdf", prewPdf, then)
};
export function DownloadZip(customUrl, data, fileName, then, url = urlSettings.baseUrl) {

    Download(url + customUrl, data, fileName, "application/zip", false, then)
};
function Download(customUrl, data, fileName, fileType, prewPdf = false, then) {

    if ((!token || token === '')) {
        window.location.href = '/login'
    }
    var options = {
        method: 'POST',
        url: customUrl,
        headers: header,
        responseType: 'arraybuffer',
        data: data,
    }

    axios(options).then((response) => responseDownload(response, fileName, fileType, prewPdf)).then(then).catch(errorAuthorized);
};

function responseDownload(response, fileName, fileType, prewPdf) {
    return new Promise((resolve, reject) => {


        if (response.status === 200) {

            var res = response.data;
            var decodedString = String.fromCharCode.apply(null, new ArrayBuffer(res));

            if (decodedString[0] === '{') {
                var obj = JSON.parse(decodedString);
                if (obj.isError) {
                    toastr.error('دانلود فایل با مشکل مواجه گردید')
                }

            }
            else {
                var data = new Blob([res], { type: fileType });
                var csvURL = window.URL.createObjectURL(data);
                var tempLink = document.createElement('a');
                tempLink.href = csvURL;


                if (prewPdf === undefined || !prewPdf) {


                    if (fileType == 'application/pdf')
                        tempLink.setAttribute('download', fileName + '.pdf');
                    else {
                        if (fileType == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,')
                            tempLink.setAttribute('download', fileName + '.xlsx');
                        else {
                            tempLink.setAttribute('download', fileName + '.zip');

                        }

                    }


                } else {
                    tempLink.target = prewPdf;
                }



                tempLink.click();

            }

            resolve(response.data);
        } else {
            reject('Error');
        }
    })
};

/*------errorAuthorized------*/
function errorAuthorized(error) {
    if (error.response && error.response.status === 401) {
        // toastr.error(errors.unauthorize);
        // localStorage.removeItem("authentication");
        // window.location.href = '/login'
    }

};

/*<-----------Authorized Request whit error handler------->*/
function ApiRequestAuthorizedWithError(customUrl, method, data, responseType, then, error) {
    if ((!token || token === '')) {
        window.location.href = '/login'
    }
    var options = {
        method: method,
        url: customUrl,
        headers: { 'Authorization': ("Bearer " + token) },
        responseType: responseType,
        data: data
    }

    axios(options).then(then).catch(error);
};

/*<-----------SetToken------->*/
export function SetToken(tokenParam) {
    return new Promise((resolve, reject) => {
        if ((!tokenParam || tokenParam === '')) {
            window.location.href = '/login'
        }
        token = tokenParam;
        AddHeader('Authorization', "Bearer " + tokenParam);
        resolve(true);
    });
}

/*<-----------DeleteToken------->*/
export function DeleteToken() {
    token = '';
    header = {};
};













