import os
import json
import traceback
import pandas as pd
from langchain.chat_models import ChatOpenAI
#from langchain_community.chat_models import ChatOpenAI
from dotenv import load_dotenv

load_dotenv() 

KEY = os.getenv("OPEN_API_KEY")
llm = ChatOpenAI(openai_api_key = KEY, model_name = "gpt-3.5-turbo", temperature = 0.5)

from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.chains import SequentialChain
from langchain.callbacks import get_openai_callback


def generate_mcq(pdf_text, number_of_questions, subject, tone):
    RESPONSE_JSON = {
        "1":{
            "mcq" : "multiple choice question",
            "options" : {
                "a" : "choice here",
                "b" : "choice here",
                "c" : "choice here",
                "d" : "choice here",
            },
            "correct" : "correct answer",
        },
        "2":{
            "mcq" : "multiple choice question",
            "options" : {
                "a" : "choice here",
                "b" : "choice here",
                "c" : "choice here",
                "d" : "choice here",
            },
            "correct" : "correct answer",
        },
        "3":{
            "mcq" : "multiple choice question",
            "options" : {
                "a" : "choice here",
                "b" : "choice here",
                "c" : "choice here",
                "d" : "choice here",
            },
            "correct" : "correct answer",
        },
    }

    TEMPLATE = """
        Text : {text}
        You are an expert MCQ maker , given the above text, it is your job to create a quiz of {number} of multiple choice
        questions {subject} students in {tone} tone.
        Make sure the questions are not repeated and check all the questions to be conforming of the text.
        Make sure to format your response like RESPONSE_JSON below and use it as a guide
        Ensure to make {number} MCQs
        ### RESPONSE_JSON
        {response_json}

        Make sure that the output does not contain any additional text in the beginning and strictly outputs in {response_json} format , this is because i plan to directly use 
        the generated output into my code.
    """

    quiz_generation_prompt = PromptTemplate(
        input_variables = ["text", "number", "subject", "tone", "response_json"],
        template = TEMPLATE 
    )

    quiz_chain = LLMChain(llm = llm, prompt = quiz_generation_prompt, output_key= "quiz", verbose = True)

    TEMPLATE_2 = """
        You are an expert english grammarian and writer , Given a multiple choice quiz on {subject} students 
        you need to evaluate the complexity of the questions and give a complete analysis of the quiz.
        Use less than 50 words for the analysis. If the quiz is not at par with the cognitive abilities of the students then change 
        the tone such that it perfectly fits the student's abilities
        QUIZ MCQ:
        {quiz}
    """

    quiz_evaluation_prompt = PromptTemplate(
        input_variables = ["subject", "quiz"],
        template = TEMPLATE_2
    )

    review_chain = LLMChain(llm = llm, prompt = quiz_evaluation_prompt, output_key = "review", verbose = True)

    generate_evaluate_chain = SequentialChain(
        chains = [quiz_chain, review_chain],
        input_variables = ["text", "number", "subject", "tone", "response_json"],
        output_variables = ["quiz", "review"],
        verbose = True
    )

    with get_openai_callback() as cb:
        response = generate_evaluate_chain({
                "text" : pdf_text,
                "number" : number_of_questions,
                "subject" : subject,
                "tone" : tone,
                "response_json" : json.dumps(RESPONSE_JSON)
            }
        )
        print(cb)

    quiz = response.get('quiz')

    print(quiz)

    quiz_1 = json.loads(quiz)

    quiz_table_data = []
    for key, value in quiz_1.items():
        mcq = value["mcq"]
        options = " | ".join(
            [
                f"{option}: {option_value}"
                for option, option_value in value["options"].items()
                ]
            )
        correct = value["correct"]
        quiz_table_data.append({"MCQ": mcq, "Choices": options, "Correct": correct})

    quiz_table = pd.DataFrame(quiz_table_data)    
    script_dir = os.path.dirname(os.path.abspath(__file__))
    csv_file_path = os.path.join(script_dir, 'machinelearning.csv')
    quiz_table.to_csv(csv_file_path, index=False)

    return quiz

