// const SignalRHelper = function () {
//     var pushServerUrl, defaultHub, connection = {}, token, channelDictionary = {};

//     var privateMethods = {
//         configChannel: (params, channel) => {
//             channelName = channel;
//             if (typeof params != "undefined", params != null && params.length === 1) {
//                 channelName += params[0]
//             }
//             return channelName;
//         },
//         urlAndHubDefaul: (hubName, url) => {
//             return (typeof hubName === "undefined" && typeof url === "undefined")
//         },
//         configUrl: (hubName, url) => {
//             if (urlAndHubDefaul(hubName, url)) {
//                 return {
//                     confgUrl=pushServerUrl + defaultHub,
//                     hubName=defaultHub
//                 }

//             }
//             else {
//                 var httpUrl, httpConfigUrl, hubMessage;
//                 hubMessage = hubName ? hubName : defaultHub;
//                 url ? httpUrl = url : httpUrl = pushServerUrl;
//                 var httpConfigUrl = httpUrl + hubMessage;

//                 return {
//                     configUrl: httpConfigUrl,
//                     hubName: hubMessage
//                 }

//             }

//         },
//         startConnection: (url, hubName) => {

//             /*
//             var deferred = new Deferred();
//          var promise = deferred.promise;
//             */
//             var deferred = new promise(resolve => {
//                 const connection = new signalR.HubConnectionBuilder()
//                     .withUrl(url, {
//                         accessTokenFactory: () => {
//                             return token;
//                         }
//                     })
//                     .withAutomaticReconnect()
//                     .build();
//                 connection.start().then(function () {
//                     console.log('starting connect to :', hubName);

//                 })
//                     .catch((err) => { console.log("error connection signalR" + err) });
//                 resolve(true);
//             })



//             return deferred.promise;

//         },
//         checkingForConnection: (hubName, url) => {
//             if (typeof hubName != "undefined" && typeof url != "undefined" && typeof connection[hubName] === "undefined") {
//                 startConnection(url, hubName).then(function (response) {

//                 });
//             }
//             else {

//             }
//         },

//         addIntoChannelDictionary: (channelName, hubName) => {
//             var dictionaryKey = hubName + channelName;
//             if (typeof channelDictionary[dictionaryKey] === "undefined") {
//                 channelDictionary[dictionaryKey] = 1
//             }
//             else {
//                 channelDictionary[dictionaryKey]++;
//             }
//         },
//         onSubscribe: (channelName, hubName, method) => {

//             addIntoChannelDictionary(channelName, hubName);
//             connection[hubName].on(channelName, group => {

//             })
//         },

//     };
//     var factoryObj = {
//         setPushServerDefaultSetting: function (url, hubMessage, localToken) {
//             var deferred = new promise(resolve => {
//                 pushServerUrl = url;
//                 defaultHub = hubMessage;
//                 token = localToken;
//                 resolve(true);
//             })
//             return deferred.promise;
//         },
//         connect: function (url, hubName, localToken) {
//             var wsUrl = privateMethods.configUrl(hubName, url);
//             if (typeof pushServerUrl != "undefined" && typeof defaultHub != "undefined")
//                 privateMethods.startConnection(wsUrl.confgUrl, hubName)
//             else {
//                 setPushServerDefaultSetting(url, hubMessage, localToken).then(() => {
//                     privateMethods.startConnection(url, hubName);
//                 })
//             }
//         },
//         subscribe: function (params, channel, method, hubName, url) {
//             var wsUrl = privateMethods.configURL(hubName, url);
//             var wsChannel = privateMethods.configChannel(params, channel)
//             privateMethods.checkingForConnection(wsUrl.hubName, wsUrl.configUrl, function () {
//                 privateMethods.onSubscribe(wsChannel, wsUrl.hubName);
//             })
//         },
//         off: function (params, channel, hubName, url) {
//             var wsChannel = privateMethods.configChannel(params, channel);
//             var dictionaryKey = hubName + wsChannel;
//             if (channelDictionary[dictionaryKey] === 1) {
//                 if (typeof connection[hubName] != "undefined")
//                     connection[hubName].off(wsChannel);
//                 channelDictionary[dictionaryKey]--;
//             }
//             else if (channelDictionary[dictionaryKey] > 1) {


//                 channelDictionary[dictionaryKey]--;

//             }
//         }
//     }

//     return factoryObj;
// }

// export default SignalRHelper