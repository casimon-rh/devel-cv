import React from 'react';
import Plot from 'react-plotly.js';

class Grafica extends React.Component {
        render() {
            return ( 
                <Plot data = {this.props.data}
                layout = {{
                        title: this.props.title,
                        xaxis: {
                            showticklabels: false,
                            hovermode:'closest'
                        },
                        paper_bgcolor:'rgba(0,0,0,0)',
                        plot_bgcolor:'rgba(0,0,0,0)',
                        font:{
                            family:'Courier New, monospace', 
                            size:16, 
                            color:'#7f7f7f'
                        }
                        
                    }}
                />);
            }
        }
        //{width: 820, height: 640, title: this.props.title}
        export default (Grafica);