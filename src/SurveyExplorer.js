import React, { useEffect } from 'react';
import './SurveyExplorer.css';
import Chart from 'chart.js';

function SurveyExplorer({ surveys }) {
  const titles = surveys.map(s => ( {id: s.surveyId, title: s.title} ));
  const survey = surveys[0];

  return (
    <div className="survey-explorer">
      <SurveySelector titles={titles}/>
      <SurveyResults survey={survey}/>
    </div>
  );
}

function SurveySelector({ titles }) {
  return (
    <div className="survey-selector"> 
      <h3>Select a survey</h3>
      {titles.map( ( {id, title} ) => <a className="survey-link" key={id} href={id}>{title}</a>)}
    </div>
  );
}

function SurveyResults({ survey }) {  
  return (
    <div className="survey-results">
      <h2>{survey.title}</h2>
      {/* whats the key prop for? understand */}
      {survey.questions.map(q => <Question key={q.questionId} question={q} />)}
    </div>
  );
}

function Question({ question }) {
  useEffect( () => drawDistribution(question.questionId.toString(), question.answerOptions) );

  return (
    <div className="survey-question">
      <div className="question-title">{question.questionTitle}</div>
      <canvas id={question.questionId} width="400" height="100"></canvas>
    </div>
  ); 
}

function drawDistribution(ctx, answerOptions) {
  new Chart(ctx, {
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