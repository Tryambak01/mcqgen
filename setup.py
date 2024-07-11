# this file installs local packages in the virtual environment 

from setuptools import find_packages, setup

setup (
    name= "mcqgenerator",
    version= "0.0.1",
    author= "Tryambak",
    author_email= "tryambakaadiga@gmail.com",
    install_requires = ["openai", "langchain", "streamlit", "python-dotenv", "pyPDF2"],
    packages= find_packages()
)