import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SurveyExplorer from './SurveyExplorer';
import { SURVEYS } from './data'

ReactDOM.render(<SurveyExplorer surveys={SURVEYS.surveys}/>, document.getElementById('root'));