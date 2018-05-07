import React from 'react';
//import logo from './logo.svg'
// import './App.css'
import {fetchGithub} from '../Actions/Github';
import {fetchWaka} from '../Actions/Waka';
import {fetchKnowledge} from '../Actions/Knowledge';
import Grafica from './Grafica';
import Banner from './Banner';

class Page extends React.Component{
    
    componentDidMount (){
        var self = this;
        self.props.dispatch(fetchKnowledge());
        self.props.dispatch(fetchGithub());
        self.props.dispatch(fetchWaka());
    }
    render() {
    return ( 
        <div>
            <Banner/>
            <div style={{marginTop:'150px'}}><h1> Graphs </h1>
            <Grafica data={this.props.state.githubData} title="Github"/>
            <Grafica data={this.props.state.wakaData} title="Waka Time (Last 7 days)"/>
            <Grafica data={this.props.state.knowledgeData} title="Manejo de lenguajes"/>
            <p>Source code at: <a href="https://github.com/darknesstiller/devel-cv">Github</a></p>
            <p>Author: <a href="https://github.com/darknesstiller">@darknesstiller</a></p>
            </div>
        </div>
        );
    }
}
export default Page;