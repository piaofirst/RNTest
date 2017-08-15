import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    ScrollView,
    View
} from 'react-native';
import RNTesterTitle from './RNTesterTitle';

export default class RNTesterPage extends Component {
    props: {
        noScroll?: boolean,
        noSpacer?: boolean,
    };

    static propTypes: {
        noScroll: PropTypes.bool,
        noSpacer: PropTypes.bool
    };

    render() {
        var ContentWrapper;
        var wrapperProps = {};
        if (this.props.noScroll) {
            ContentWrapper = ((View: any): ReactClass<any>);
        } else {
            ContentWrapper = (ScrollView: ReactClass<any>);
            wrapperProps.automaticallyAdjustContentInsets = !this.props.title;
            wrapperProps.keyboardShouldPersistTaps = 'handled';
            wrapperProps.keyboardDismissMode = 'interactive';
        }
        var title = this.props.title ?
            <RNTesterTitle title={this.props.title}/> : null;
        var spacer = this.props.noSpacer ? null : <View style={styles.spacer}/>;
        return(
            <View style={styles.container}>
                {title}
                <ContentWrapper style={styles.wrapper} {...wrapperProps}>
                    {this.props.children}
                    {spacer}
                </ContentWrapper>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e9eaed',
        flex: 1,
    },
    spacer: {
        height: 270,
    },
    wrapper: {
        flex: 1,
        paddingTop: 10,
    }

});