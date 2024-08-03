import React, { useState } from 'react';
import axios from 'axios';

const LandingPage = ({ onMCQsGenerated }) => {
    const [numMCQs, setNumMCQs] = useState('');
    const [difficulty, setDifficulty] = useState('simple');
    const [subject, setSubject] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hi submit has been clicked , generating mcq");
        const formData = new FormData();
        formData.append('numMCQs', numMCQs);
        formData.append('difficulty', difficulty);
        formData.append('subject', subject);
        formData.append('file', file);

        setLoading(true);
        const response = await axios.post('http://127.0.0.1:5000/generate', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        setLoading(false);
        console.log(response.data);
        onMCQsGenerated(response.data);
    };

    return (
        <div className="flex h-screen p-1 bg-white">
            <div className="w-1/3 bg-indigo-950 flex flex-col rounded-md items-center justify-center p-4">
                <div className="w-full flex flex-col items-center">
                    <img src="./src/assets/GAT-logo.png" alt="Logo" className="mb-4 w-12 h-12" />
                    <h1 className="text-2xl font-bold mb-2">QuizCraft AI</h1>
                </div>
                <div className="text-center">
                    <p className="text-white text-lg">
                        This MCQ generator lets you select the number of MCQs to generate. You can specify the level of difficulty of the questions, the subject name, and also upload a pdf of your choice to create questions from.
                    </p>
                </div>
            </div>
            <div className="w-2/3 flex flex-col items-center justify-center bg-gradient-to-b from-slate-200 via-slate-100 to-slate-50">
                <h2 className="text-2xl font-bold text-black mb-4">MCQ Generator</h2>
                <div className="bg-white shadow-xl rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="numMCQs" className="block text-sm font-medium text-gray-700">Number of MCQs</label>
                            <input
                                type="number"
                                id="numMCQs"
                                value={numMCQs}
                                onChange={(e) => setNumMCQs(e.target.value)}
                                className="mt-1 block bg-slate-50 w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                                min = "1"
                            />
                        </div>
                        <div>
                            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Difficulty Level</label>
                            <select
                                id="difficulty"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="mt-1 block w-full bg-slate-50 px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            >
                                <option value="">Select Difficulty</option>
                                <option value="simple">Simple</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-slate-50 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="file" className="block text-sm font-medium text-gray-700">Upload PDF</label>
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="mt-1 block w-full px-3 py-2 text-black bg-slate-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <button type="submit" className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-950 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Generate MCQs
                            </button>
                            {loading && <p className = "text-gray-700 p-1 text-center text-sm">Generating MCQ's .....</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
