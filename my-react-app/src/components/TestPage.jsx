import React, { useState } from 'react';

const TestPage = ({ mcqs, onSubmit }) => {
    const [answers, setAnswers] = useState({});

    const handleChange = (question, option) => {
        setAnswers({ ...answers, [question]: option });
    };

    const handleSubmit = () => {
        onSubmit(answers);
    };

    return (
        <div className="flex w-screen justify-center items-center min-h-screen bg-gradient-to-b from-indigo-950 via-blue-300 to-slate-200 p-12">
            <div className="w-full bg-slate-50 p-8 rounded-lg shadow-lg">
                <h2 className = 'font-bold text-black text-2xl mb-12'>Test</h2>
                {Object.keys(mcqs).map((key, index) => (
                    <div key={index} className="mb-6">
                        <p className="font-bold mb-2 text-black">{index + 1}. {mcqs[key].mcq}</p>
                        {Object.keys(mcqs[key].options).map((option) => (
                            <label key={option} className="block mb-1 text-black">
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={option}
                                    onChange={() => handleChange(key, option)}
                                    className="mr-2"
                                />
                                {mcqs[key].options[option]}
                            </label>
                        ))}
                    </div>
                ))}
                <button 
                    onClick={handleSubmit} 
                    className="bg-indigo-950 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default TestPage;
