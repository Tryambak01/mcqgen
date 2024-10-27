# MCQ Generator App

## Project Overview

The MCQ Generator App allows users to upload a PDF document, specify the desired number of questions, select the level of difficulty, and choose the subject. The app uses LangChain to wrap an OpenAI model, employing few-shot prompting techniques to generate relevant multiple-choice questions (MCQs) based on the PDF's content. This application aims to streamline the creation of quiz questions, making it a useful tool for educators, students, and training professionals.

### Features

- **PDF Upload**: Users can upload any PDF document as the source material for generating questions.
- **Question Customization**: Users can specify:
  - Number of questions
  - Level of difficulty (e.g., Easy, Medium, Hard)
  - Subject of the questions
- **MCQ Generation**: The app leverages LangChain with OpenAI for few-shot prompting, generating MCQs tailored to the uploaded content.
- **Interactive UI**: Simple frontend interface for easy interaction and input submission.

### Prerequisites

- **Node.js** and **npm**: For running the frontend.
- **Python** and **Flask**: For running the backend.
- **OpenAI API Key**: Required to access OpenAI’s language model through LangChain.
