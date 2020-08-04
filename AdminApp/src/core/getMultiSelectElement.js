
export function GetMultiSelectElement(object, collect, elementName, stateName, response) {
  /*eslint array-callback-return: "off"*/
  if (response.result.length > 0 && collect !== undefined) {
    let accountCodes = [];

    var accountCode = response.result.find(main => {
      if (main.code === collect[elementName])
        return main.code === collect[elementName]

    })

    accountCodes.push(accountCode);
    if (typeof (stateName) === 'string'){
      object.setState({ [stateName]: accountCodes });
    }
    else if (typeof (stateName) === 'object' && stateName.length && stateName.length > 0){
      object.setState(
        () => stateName.map(s => ({ [s]: accountCodes }))
      )
    }
      
  }
}




export function GetMultiSelectElementMoreItem(object, collect, elementName, array, response) {
  /*eslint array-callback-return: "off"*/
  if (response.result.length > 0 && collect !== undefined) {
    let accountCodes = [];
    response.result.map(
      (responseItem, index) => {
        array.map(
          (arrayItem) => {
            if (arrayItem.id === responseItem.id) {
              accountCodes.push(responseItem.id);
            }
          }
        )
      }
    );
    object.setState({ elementName: accountCodes });
  }
}
export function GetDropDownElement(object, collect, elementName, stateName, response, responsefield = "code") {
  /*eslint array-callback-return: "off"*/
  if (response.result.length > 0 && collect !== undefined && collect[elementName]) {


    var accountCode = response.result.find(main => {
      if (main[responsefield] === collect[elementName])
        return main[responsefield] === collect[elementName]
    })
    if (accountCode)
      object.setState({ [stateName]: accountCode });
  }
}

export function GetDropDownElementWithoutResponse(object, collect, elementName, stateName, result) {
  /*eslint array-callback-return: "off"*/
  if (result.length > 0 && collect !== undefined) {
    var accountCode = result.find(main => {
      if (main.code === collect[elementName])
        return main.code === collect[elementName]
    })
    object.setState({ [stateName]: accountCode });
  }
}