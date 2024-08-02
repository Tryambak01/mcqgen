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
        <div>
            {Object.keys(mcqs).map((key, index) => (
                <div key={index}>
                    <p>{mcqs[key].mcq}</p>
                    {Object.keys(mcqs[key].options).map((option) => (
                        <label key={option}>
                            <input
                                type="radio"
                                name={`question-${index}`}
                                value={option}
                                onChange={() => handleChange(key, option)}
                            />
                            {mcqs[key].options[option]}
                        </label>
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default TestPage;
