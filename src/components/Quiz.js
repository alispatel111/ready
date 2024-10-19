import React, { useState, useEffect } from 'react';
import { QuizData } from '../Data/QuizData';
import QuizResult from './QuizResult';
import './Quiz.css'; 

function Quiz({ onLogout }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [writtenAnswer, setWrittenAnswer] = useState('');
    const [clickedOption, setClickedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [department, setDepartment] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVerified, setIsPasswordVerified] = useState(false);

    const departmentPasswords = {
        "IT": "password123",
        "HR": "hrpassword",
        "Finance": "finsecure",
        "Admin": "adminpassword",
        "Canada": "canadapassword",
        "USA": "usapassword",
        "Newzeland": "newzelandpassword"
    };

    const handleSubjectChange = (event) => {
        if (!name || !designation || !department) {
            alert('Please fill in all your details before selecting the department.');
            return;
        }

        const subject = event.target.value;
        setSelectedSubject(subject);
        
        setQuestions([]);
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setUserAnswers([]);
        setWrittenAnswer('');
        setClickedOption(null);
        setIsAnswered(false);
        setIsPasswordVerified(false);
    };

    const verifyPassword = () => {
        if (departmentPasswords[selectedSubject] === password) {
            setIsPasswordVerified(true);
            setQuestions(QuizData[selectedSubject] || []);
        } else {
            alert('Incorrect password! Please try again.');
        }
    };

    const changeQuestion = () => {
        if (!isPasswordVerified) return;

        const updatedAnswers = [...userAnswers];

        if (questions[currentQuestion].answer === 'Comprehension') {
            updatedAnswers[currentQuestion] = writtenAnswer;
        } else {
            updatedAnswers[currentQuestion] = clickedOption;
            if (clickedOption === questions[currentQuestion].answer) {
                setScore(score + 1);
            }
        }

        setUserAnswers(updatedAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setClickedOption(null);
            setWrittenAnswer('');
            setIsAnswered(false);
        } else {
            setShowResult(true);
        }
    };

    const resetAll = () => {
        setShowResult(false);
        setCurrentQuestion(0);
        setClickedOption(null);
        setScore(0);
        setSelectedSubject('');
        setQuestions([]);
        setUserAnswers([]);
        setWrittenAnswer('');
        setIsAnswered(false);
        setName('');
        setDesignation('');
        setDepartment('');
        setPassword('');
        setIsPasswordVerified(false);
    };

    return (
        <div className="quiz-container">
            <p className="heading-txt">Quiz APP</p>
            <button className="logout-button" onClick={onLogout}>Logout</button>
            
            <div className="user-info-container">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                />
            </div>

            <div className="subject-select-container">
                <select className="subject-select" onChange={handleSubjectChange} value={selectedSubject}>
                    <option value="">Select a Department</option>
                    {Object.keys(QuizData).map((subject) => (
                        <option key={subject} value={subject}>{subject}</option>
                    ))}
                </select>
            </div>

            {selectedSubject && !isPasswordVerified && (
                <div className="password-container">
                    <input
                        type="password"
                        placeholder="Enter Department Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="verify-password-btn" onClick={verifyPassword}>
                        Verify Password
                    </button>
                </div>
            )}

            <div className="question-container">
                {showResult ? (
                    <QuizResult 
                        score={score} 
                        totalScore={questions.length} 
                        tryAgain={resetAll} 
                        userAnswers={userAnswers} 
                        questions={questions}
                        name={name}
                        designation={designation}
                        department={department}
                    />
                ) : (
                    <>
                        {questions.length > 0 && isPasswordVerified && (
                            <>
                                <div className="question">
                                    <span className="question-number">{currentQuestion + 1}. </span>
                                    <span className="question-txt">{questions[currentQuestion].question}</span>
                                </div>

                                {questions[currentQuestion].answer === 'Comprehension' ? (
                                    <div className="comprehension-container animated-box">
                                        <textarea
                                            className="comprehension-textarea"
                                            placeholder="Write your answer here"
                                            value={writtenAnswer}
                                            onChange={(e) => setWrittenAnswer(e.target.value)}
                                        ></textarea>
                                    </div>
                                ) : (
                                    <div className="option-container animated-options">
                                        {questions[currentQuestion].options.map((option, i) => {
                                            const isCorrect = clickedOption === i + 1 && questions[currentQuestion].answer === i + 1;
                                            const isIncorrect = clickedOption === i + 1 && questions[currentQuestion].answer !== i + 1;

                                            return (
                                                <button
                                                    key={i}
                                                    className={`option-btn ${isCorrect ? "correct" : ""} ${isIncorrect ? "incorrect" : ""}`}
                                                    onClick={() => {
                                                        if (!isAnswered) {
                                                            setClickedOption(i + 1);
                                                            setIsAnswered(true);
                                                        }
                                                    }}
                                                    disabled={isAnswered}
                                                >
                                                    {option}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                                
                                <input type="button" value="Next" className="next-button" onClick={changeQuestion} />
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Quiz;
