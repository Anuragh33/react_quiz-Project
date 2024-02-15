import { useQuiz } from "../Contexts/QuizContext"

function Options({ question }) {
  const { answer, dispatch } = useQuiz()
  const hadAnswered = answer !== null

  return (
    <div>
      {" "}
      <div className="options">
        {question.options.map((ques, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hadAnswered
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={ques}
            disabled={hadAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {ques}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Options
