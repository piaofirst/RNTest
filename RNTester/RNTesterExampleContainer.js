import React,{Component} from 'react';
import {
    Platform,
} from 'react-native';

import RNTesterBlock from './RNTesterBlock';
import RNTesterPage from './RNTesterPage';

export default class RNTesterExampleContainer extends Component{
    renderExample(example, i){
        var {title, description, platform} = example;
        if (platform){
            if (Platform.OS !== platform){
                return null;
            }
            title += ' (' + platform + ' only)';
        }
        return(
            <RNTesterBlock
                key={i}
                title={title}
                description={description}>
                {example.render()}
            </RNTesterBlock>
        );
    }
    render(){
        if (!this.props.module.examples){
            return <this.props.module/>;
        }
        return(
            <RNTesterPage title={this.props.title}>
                {this.props.module.examples.map(this.renderExample)}
            </RNTesterPage>
        )
    }
}