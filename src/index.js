import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SurveyExplorer from './SurveyExplorer';

fetch('https://my-json-server.typicode.com/focaldata/demo/db')
  .then( res => res.json() )
  .then( data => ReactDOM.render(<SurveyExplorer surveys={data.surveys}/>, document.getElementById('root')) )

ReactDOM.render(<h3 style={{marginLeft: '20px'}}>Fetching...</h3>, document.getElementById('root'));