import React from 'react';

class Banner extends React.Component{
  render(){
    return(
      <div style={{position: 'fixed',top: 0,width: '100%','zIndex': 1,'backgroundColor': '#253228', left: 0}}>
        <a href="#">
          <img src="https://raw.githubusercontent.com/darknesstiller/devel-cv/master/client/public/banner.png" style={{height:'150px'}} />
          </a>
      </div>
    );}
}
export default Banner;