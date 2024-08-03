import React from 'react';
import axios from 'axios';

const ResultsPage = ({ mcqs, onTakeTest }) => {
    const downloadCSV = async () => {
        try {
            const response = await axios({
              url: 'http://127.0.0.1:5000/csv', 
              method: 'GET',
              responseType: 'blob', 
            });
      
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = 'machinelearning.csv'; 
            document.body.appendChild(a);
            a.click();
            a.remove();
          } catch (error) {
            console.error('Error downloading the file:', error);
          }
    };

    return (
        <div className="flex h-screen items-center justify-center space-x-10 bg-gradient-to-b from-indigo-950 via-blue-300 to-slate-200">
            <div className="bg-white shadow-md rounded-lg p-8 w-1/3 flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-4 text-black">For Teachers</h2>
                <p className="text-gray-800 mb-4 text-base">
                As a teacher, you can utilize the generated MCQs to create engaging and effective assignments for your students. To get started, simply click the button below to download the CSV. Enhance your assignments with well-crafted, AI-generated MCQs tailored to your educational needs. Download the file now and make your teaching experience even more impactful.
                </p>
                <button
                    onClick={downloadCSV}
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Download CSV
                </button>
            </div>

            <div className="bg-indigo-950 shadow-md rounded-lg p-8 w-1/3 flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-4 text-white">For Students</h2>
                <p className="text-white mb-4">
                As a student, you can take the test by clicking the button below. This feature allows you to instantly start the exam, and upon completion, your test will be evaluated automatically. Your scores will be provided at the end, giving you immediate feedback on your performance. Begin your test now and experience the ease and efficiency of this automated evaluation system.
                </p>
                <button
                    onClick={onTakeTest}
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Take Test
                </button>
            </div>
        </div>
    );
};

export default ResultsPage;
