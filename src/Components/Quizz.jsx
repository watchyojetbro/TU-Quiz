import React, { useRef, useState } from "react";
import "./Quizz.css";
import { data } from "../assets/Q_As.js";

const Quizz = () => {
    const [index, setIndex] = useState(0);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);


    const Option1 = useRef(null);
    const Option2 = useRef(null);
    const Option3 = useRef(null);
    const Option4 = useRef(null);
    const option_array = [Option1, Option2, Option3, Option4];

    const question = data[index]; // ← derive, don't keep separate state

    const checkAns = (e, ans) => {
        if (!lock) {
            if (ans === question.ans) {
                e.target.classList.add("correct");
                setScore((s) => s + 1);
                setLock(true);
            } else {
                e.target.classList.add("wrong");
                option_array[question.ans - 1].current.classList.add("correct");
                setLock(true);
            }
        }
    };

    const next = () => {
        if (lock) {
            if (index < data.length - 1) {
                setIndex((prev) => prev + 1);
                setLock(false);
                option_array.forEach((option) => {
                    option.current.classList.remove("correct");
                    option.current.classList.remove("wrong");
                });
            } else {

                setShowResult(true);
            }
        }
    };


    return (
        <div className="container">
            <h1>TU Quiz</h1>
            <hr />
            <h2>{index + 1}. {question.question}</h2>
            <ul>
                <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
                <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
                <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
                <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
            </ul>
            <button onClick={next}>Next</button>
            <div className="index">
                {index + 1} of {data.length} questions — Score: {score}
            </div>
            {showResult && (
                <div className="result-backdrop">
                    <div className="result-modal">
                        <h2>Quiz Complete 🎉</h2>
                        <p>Your Score: {score} out of  {data.length}</p>
                        <button onClick={() => window.location.reload()}>Restart</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quizz;
