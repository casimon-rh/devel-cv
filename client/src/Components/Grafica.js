import React from 'react';
import Plot from 'react-plotly.js';

class Grafica extends React.Component {
        render() {
            return ( 
                <Plot data = {this.props.data}
                layout = {{
                        title: this.props.title,
                        xaxis: {
<<<<<<< HEAD
                            showticklabels: false,
                            hovermode:'closest'
=======
                            showticklabels: false
>>>>>>> be0ce7fd615a2977f4949233f60bfcbca88eefc2
                        }
                    }}
                />);
            }
        }
        //{width: 820, height: 640, title: this.props.title}
        export default (Grafica);