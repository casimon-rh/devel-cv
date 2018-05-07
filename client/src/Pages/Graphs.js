import React from 'react';

import Grafica from '../Components/Grafica';

class Graphs extends React.Component {
  render() {
    return (
      <div>
        <h1> Graphs </h1>
        <Grafica data={this.props.githubData} title="Github" />
        <Grafica data={this.props.wakaData} title="Waka Time (Last 7 days)" />
        <Grafica data={this.props.knowledgeData} title="Manejo de lenguajes" />
      </div>
    );
  }
}
export default Graphs;