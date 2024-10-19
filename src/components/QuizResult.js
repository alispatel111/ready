import React from 'react';
import jsPDF from 'jspdf';
import './QuizResult.css';

function QuizResult(props) {
    const handleDownload = () => {
        const doc = new jsPDF();
        let y = 10; // Starting position on the first page

        // Get current date and time
        const currentDate = new Date().toLocaleString();

        // Add user details at the top of the PDF
        let resultMessage = `Name: ${props.name}\nDesignation: ${props.designation}\nDepartment: ${props.department}\n\n`;
        resultMessage += `Your Score: ${props.score}\nTotal Score: ${props.totalScore}\n\n`;
        resultMessage += `Date: ${currentDate}\n`;
        resultMessage += `Duration: ${props.duration} minutes\n\n`;

        // Split resultMessage into lines that fit on the page
        const lines = doc.splitTextToSize(resultMessage, 180); // Split text to fit within 180mm width
        lines.forEach((line) => {
            if (y > 280) { // If the y position goes beyond the page height (A4 is about 297mm high)
                doc.addPage(); // Add a new page
                y = 10; // Reset y position for new page
            }
            doc.text(line, 10, y); // Add text to PDF
            y += 10; // Move down for next line
        });

        // Now process the questions and answers
        props.questions.forEach((question, index) => {
            const userAnswer = props.userAnswers[index];
            let correctAnswer = null;
            let isCorrect = false;

            let questionMessage = `Q${index + 1}: ${question.question}\n`;

            if (question.answer === 'Comprehension') {
                questionMessage += `Your Answer: ${userAnswer || "No answer"}\n`;
                questionMessage += "Correct Answer: This is a comprehension question.\n";
                questionMessage += "Result: This answer is subjective.\n\n";
            } else {
                correctAnswer = question.answer + 1;
                isCorrect = userAnswer === correctAnswer;

                questionMessage += `Your Answer: ${question.options[userAnswer - 1] || "No answer"}\n`;
                questionMessage += `Correct Answer: ${question.options[correctAnswer - 1]}\n`;
                questionMessage += isCorrect ? "Result: Correct ✅\n\n" : "Result: Incorrect ❌\n\n";
            }

            const questionLines = doc.splitTextToSize(questionMessage, 180); // Split each question to fit within page width
            questionLines.forEach((line) => {
                if (y > 280) {
                    doc.addPage();
                    y = 10;
                }
                doc.text(line, 10, y);
                y += 10;
            });
        });

        doc.save('quiz_result.pdf');
    };

    return (
        <div className="result-container">
            <div className="show-score animated-box">
                Your Score: {props.score}<br />
                Total Score: {props.totalScore}<br />
                Duration: {props.duration} minutes
            </div>
            <button className="result-button try-again-btn" onClick={props.tryAgain}>Try Again</button>
            <button className="result-button download-btn" onClick={handleDownload}>Download Result</button>
        </div>
    );
}

export default QuizResult;
