import React from 'react';
//import logo from './logo.svg'
// import './App.css'
import {fetchGithub} from '../Actions/Github';
import {fetchWaka} from '../Actions/Waka';
import Grafica from './Grafica';
class Page extends React.Component{
    
    constructor(props) {
        super(props);
    }
    componentDidMount (){
        var self = this;
        self.props.dispatch(fetchGithub());
        self.props.dispatch(fetchWaka());
    }
    render() {
    return ( 
        <div>
            <h1> Graphs </h1>
            <Grafica data={this.props.state.githubData} title="Github"/>
            <Grafica data={this.props.state.wakaData} title="Waka Time (ultimos 7 dias)"/>
        </div>
        );
    }
}
export default Page;