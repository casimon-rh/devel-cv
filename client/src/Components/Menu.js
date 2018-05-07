import React from 'react';

import ImageMapper from 'react-image-mapper';
import {changeCurrent} from '../Actions/Frontend';

class Menu extends React.Component {
  render() {
    var self = this;
    return (
      <div style={{ height: '200px', width: '100%' }}>
        <ImageMapper
          src={"../menu.svg"}
          onClick={(area, index, event) => {
            self.props.dispatch(changeCurrent(index));
          }}
          map={{
            name: 'test',
            areas: [
              { shape: 'circle', coords: [85, 70, 40] },
              { shape: 'circle', coords: [245, 148, 40] },
              { shape: 'circle', coords: [405, 148, 40] },
              { shape: 'circle', coords: [562, 148, 40] },
              { shape: 'circle', coords: [722, 148, 40] },
            ]
          }}
          style={{ height: '100px', width: '100%' }}
          width={800} height={200}
        />
      </div>
    );
  }
}
export default Menu;