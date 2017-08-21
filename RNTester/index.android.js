import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Image
} from 'react-native';
import RNTesterNavigationReducer from  './RNTesterNavigationReducer';
import RNTesterExampleList from './RNTesterExampleList'
import RNTesterExampleContainer from './RNTesterExampleContainer'
const RNTesterList = require('./RNTesterList');
import type { RNTesterNavigationState } from './RNTesterNavigationReducer';
import RNTesterActions from './RNTesterActions';
// const RNTesterActions = require('./RNTesterActions');
const BackHandler = require('BackHandler');

const Header = ({onBack, title}: { onBack?: () => mixed, title: string }) => (
    <View style={styles.header}>
        <View style={styles.headerCenter}>
            <Text style={styles.title}>{title}</Text>
        </View>
        {onBack && <View style={styles.headerLeft}>
            {/*<Button title="Back" onPress={onBack}/>*/}
            <TouchableOpacity onPress={onBack}>
                <Image style={styles.image} source={require('../image/topbar_icon_back_press.png')} />
            </TouchableOpacity>
        </View>}
    </View>
);

export default class RNTesterApp extends Component {
    props: Props;
    state: RNTesterNavigationState;
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this._handleBack);
    }
    componentDidMount(){
        // const launchAction = exampleAction || urlAction;
        const launchAction = null;
        const initialAction = launchAction || {type: 'InitialAction'};
        this.setState(RNTesterNavigationReducer(null, initialAction));
    }

    render() {
        if(!this.state){
            return null;
        }
        if(this.state.openExample){
            const Component = RNTesterList.Modules[this.state.openExample];
            if(Component.external){
                return (
                    <Component
                        onExampleExit={this._handleBack}
                    />
                );
            }else if (Component){
                return(
                    <View style={styles.exampleContainer}>
                        <Header onBack={this._handleBack} title={Component.title}/>
                        <RNTesterExampleContainer module={Component} />
                    </View>
                )
            }
        }
        return (
            <View style={styles.exampleContainer}>
                <Header title='RNTester'/>
                <RNTesterExampleList
                onNavigate={this._handleAction}
                list={RNTesterList}
            />
            </View>
        );
    }

    _handleBack = () => {
        return this._handleAction(RNTesterActions.Back());
    }
    _handleAction = (action: ?RNTesterAction): boolean => {
        if(!action){
            return true;
        }
        const newState = RNTesterNavigationReducer(this.state, action)
        if (this.state !== newState){
            this.setState(
                newState,
                //todo
            )
            return true
        }
        return false;
    }
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#96969A',
        backgroundColor: '#38ADFF',
        flexDirection: 'row',
        paddingTop: 20,
    },
    headerLeft: {
        paddingTop:5
    },
    image:{
        marginLeft:10,
        width:20,
        height:15,
    },
    headerCenter: {
        flex: 1,
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        bottom:20,
    },
    title: {
        fontSize: 19,
        fontWeight: '600',
        textAlign: 'center',
    },
    exampleContainer: {
        flex: 1,
    },
});