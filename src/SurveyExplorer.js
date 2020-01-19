import React, { useEffect } from 'react';
import './SurveyExplorer.css';
import Chart from 'chart.js';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function SurveyExplorer({ surveys }) {
  const titles = surveys.map(s => ( {surveyId: s.surveyId, title: s.title} ));

  return (
    <div className="survey-explorer">
      <Router>
        <SurveySelector titles={titles}/>        
        <Route path="/" exact render={() => <div className="survey-results"><h2>{'Select survey'}</h2></div>} />
        <Route path="/:surveyId" render={({ match }) => <SurveyResults survey={surveys.find(s => s.surveyId === parseInt(match.params.surveyId))} />}/>
      </Router>
    </div>
  );
}

function SurveySelector({ titles }) {
  return (
    <Drawer variant="permanent" anchor="left">
      <div class="survey-nav">
        <List>
          {titles.map( ( {surveyId, title} ) => (
            <Link to={`${surveyId}`} key={surveyId}>
              <ListItem button key={surveyId}>
                <ListItemText primary={title} />
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
    </Drawer>
  );
}

function SurveyResults({ survey }) {  
  return (
    <div className="survey-results">
      <h2>{survey.title}</h2>
      {survey.questions.map(q => <Question key={q.questionId} question={q}/>)}
    </div>
  );
}

function Question({ question }) {
  const canvasId = "c"+question.questionId

  useEffect( () => {
    const newChart = drawDistribution(canvasId, question.answerOptions);
    // clean up; fixes bug where mouse over caused old data to flash
    return () => newChart.destroy();
  } );

  return (
    <div className="survey-question">
      <div className="question-title">{question.questionTitle}</div>
      <canvas id={canvasId} width="400" height="100"></canvas>
    </div>
  ); 
}

function drawDistribution(ctx, answerOptions) {
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: answerOptions.map(option => option.text),
      datasets: [{
        label: '% of Votes',
        data: answerOptions.map(option => option.selectedByRespondents),
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            suggestedMax: 60,
            beginAtZero: true,
            stepSize: 20
          }
        }],             
        xAxes: [{
          gridLines: {
            display: false,
          },  
          ticks: {
            fontSize: 8,
          }
        }]
      }
    }
  });
}

export default SurveyExplorer;
