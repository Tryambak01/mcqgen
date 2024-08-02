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
        <div className="flex h-screen items-center justify-center space-x-4">
            <div className="bg-white shadow-md rounded-lg p-8 w-1/3 flex flex-col items-center">
                <h2 className="text-xl font-bold mb-4">For Teachers</h2>
                <p className="text-gray-600 mb-4">
                    The generated MCQs can be downloaded as a CSV file. Click the button below to download the CSV.
                </p>
                <button
                    onClick={downloadCSV}
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Download CSV
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg p-8 w-1/3 flex flex-col items-center">
                <h2 className="text-xl font-bold mb-4">For Students</h2>
                <p className="text-gray-600 mb-4">
                    If you are a student, you can take the test by clicking the button below.
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
