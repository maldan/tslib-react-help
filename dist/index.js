"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smartPage = exports.reduxFastConnect = void 0;
function reduxFastConnect(connect, storeName, component, actionList) {
    function mapStateToProps(state) {
        return state[storeName];
    }
    function mapDispatchToProps(dispatch) {
        const aList = {};
        for (const key in actionList) {
            aList[key] = (...args) => {
                dispatch(actionList[key](...args));
            };
        }
        return aList;
    }
    return connect(mapStateToProps, mapDispatchToProps)(component);
}
exports.reduxFastConnect = reduxFastConnect;
function smartPage(fn, connect, storeName, actionList) {
    function mapStateToProps(state) {
        return state[storeName]; //
    }
    function mapDispatchToProps(dispatch) {
        const aList = {};
        for (const key in actionList) {
            aList[key] = (...args) => {
                dispatch(actionList[key](...args));
            };
        }
        return aList;
    }
    function mergeProps(stateProps, dispatchProps, ownProps) {
        return Object.assign(Object.assign({}, stateProps), dispatchProps);
    }
    return connect(mapStateToProps, mapDispatchToProps, mergeProps)(fn);
}
exports.smartPage = smartPage;
