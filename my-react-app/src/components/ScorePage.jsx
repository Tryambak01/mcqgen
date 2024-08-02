import React from 'react';

const ScorePage = ({ mcqs, userAnswers }) => {
    let score = 0;

    Object.keys(userAnswers).forEach((key) => {
        if (userAnswers[key] === mcqs[key].correct) {
            score += 1;
        }
    });

    return <div>Your score is: {score} out of {Object.keys(mcqs).length}</div>;
};

export default ScorePage;
