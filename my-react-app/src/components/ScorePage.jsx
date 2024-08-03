import React from 'react';

const ScorePage = ({ mcqs, userAnswers, goBack }) => {
    let score = 0;

    Object.keys(userAnswers).forEach((key) => {
        if (userAnswers[key] === mcqs[key].correct) {
            score += 1;
        }
    });

    const totalQuestions = Object.keys(mcqs).length;

    return (
        <div className="flex flex-col w-screen justify-center items-center min-h-screen bg-gradient-to-b from-indigo-950 via-blue-300 to-slate-200">
            <div className="w-64 h-64 bg-slate-50 rounded-full flex flex-col justify-center items-center shadow-xl mb-5">
                <div className="text-2xl font-bold text-black">{score}/{totalQuestions}</div>
                <div className="text-center mt-2 text-black">Your score is: {score} out of {totalQuestions}</div>
            </div>
            <div>
                <button className = 'bg-indigo-950 hover:bg-indigo-700' onClick = {goBack}>Go Back</button>
            </div>
        </div>
    );
};

export default ScorePage;
