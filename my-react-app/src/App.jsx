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
        setMcqs(mcqs);
        setStage('results');
    };

    const handleTestSubmit = (answers) => {
        setUserAnswers(answers);
        setStage('score');
    };

    return (
        <div>
            {stage === 'landing' && <LandingPage onMCQsGenerated={handleMCQsGenerated} />}
            {stage === 'results' && <ResultsPage mcqs={mcqs} onTakeTest={() => setStage('test')} />}
            {stage === 'test' && <TestPage mcqs={mcqs} onSubmit={handleTestSubmit} />}
            {stage === 'score' && <ScorePage mcqs={mcqs} userAnswers={userAnswers} />}
        </div>
    );
};

export default App;