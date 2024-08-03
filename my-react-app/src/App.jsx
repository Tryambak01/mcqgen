import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ResultsPage from './components/ResultsPage';
import TestPage from './components/TestPage';
import ScorePage from './components/ScorePage';

const App = () => {
    const [stage, setStage] = useState('landing');
    const [mcqs, setMcqs] = useState(null);
    const [userAnswers, setUserAnswers] = useState(null);

    const handleMCQsGenerated = (mcqs) => {
        console.log("test : mcq has been set");
        setMcqs(mcqs);
        setStage('results');
    };

    const handleTestSubmit = (answers) => {
        setUserAnswers(answers);
        setStage('score');
    };

    const handleGoBack = () => {
      setStage('landing');
    };

    const handleTakeTest = () => {
      console.log('test stage is set')
      setStage('test');
    };

    return (
        <div>
            {stage == 'landing' && <LandingPage onMCQsGenerated={handleMCQsGenerated} />}
            {stage == 'results' && <ResultsPage mcqs={mcqs} onTakeTest = {handleTakeTest} />}
            {stage == 'test' && <TestPage mcq={mcqs} onSubmit={handleTestSubmit} />}
            {stage == 'score' && <ScorePage mcq={mcqs} userAnswers={userAnswers} goBack={handleGoBack}/>}
        </div>
    );
};

export default App;