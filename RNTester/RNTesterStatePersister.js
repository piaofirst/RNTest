import React from 'react';

export type PassProps<State> ={
    state: State,
    setState: (stateLamda: (state:State) => State) => void,
};

function createContainer<Props:Object, State>(
    Component: ReactClass<Props & {persister:PassProps<State>}>,
    spec:{
        cacheKeySuffix: (props: Props) => string,
        getInitialState: (props: Props) => State,
        version?: string,
    }
): ReactClass<Props> {
    return class ComponentWithPersistedState extends React.Component{
        props: Props;
        static displayName = `RNTesterStatePersister(${Component.displayName || Component.name})`;
        state = {value: spec.getInitialState(this.props)};
        _cacheKey=`RNTester:${spec.version || 'v1'}:${spec.cacheKeySuffix(this.props)}`;
        componentDidMount(){
            // AsyncStorage.getItem(this._cacheKey, (err, value) => {
            //     if (!err && value) {
            //         this.setState({value: JSON.parse(value)});
            //     }
            // });
        }
        _passSetState = (stateLamda: (state:State) => State):void => {
            this.setState((state) => {
                const value = stateLamda(state.value);
                // AsyncStorage.setItem(this._cacheKey, JSON.stringify(value));
                return {value};
            });
        };
        render(){
            return(
                <Component
                    {...this.props}
                    persister={{
                        state: this.state.value,
                        setState:this._passSetState
                    }}
                />
            );
        }
    };
}
const RNTesterStatePersister = {
    createContainer,
};

module.exports = RNTesterStatePersister;