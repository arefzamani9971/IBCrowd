
export default function DropDownListDataProvider(object, name, response, then) {
        let obj = object.state[name];
        obj.list = response;
        object.setState({ [name]: obj }, function () {
            if (then)
                return then();
        })
}