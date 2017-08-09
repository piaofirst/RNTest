const RNTesterList = require('./RNTesterList');
export type RNTesterNavigationState={
    openExample: ?String
}

export default function RNTesterNavigationReducer(
    state: ?RNTesterNavigationState,
    action: any
):RNTesterNavigationState {
        //默认状态 明确的列表状态 在example中返回
        if(!state || action.type === 'RNTesterListAction' || (state.openExample && action.type === 'RNTesterBackAction')){
            return{
                // openExample 为null 将返回列表视图
                openExample: null,
            };
        }
        if(action.type === 'RNTesterExampleAction'){
            // 确保 state 返回之前 看到module
            const ExampleModule = RNTesterList.Modules[action.openExample];
            if(ExampleModule){
                return{
                    openExample:action.openExample,
                };
            }
        }
        return state;
}