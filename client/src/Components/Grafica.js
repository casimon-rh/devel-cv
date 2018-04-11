import React from 'react';
import Plot from 'react-plotly.js';

class Grafica extends React.Component{
    render(){
        return(<Plot data={this.props.data} layout={ {width: 820, height: 640, title: this.props.title} }/>);
    }
}
export default (Grafica);