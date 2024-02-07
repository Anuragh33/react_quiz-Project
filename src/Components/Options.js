function Options({ questions, answer, dispatch }) {
  const hadAnswered = answer !== null

  return (
    <div>
      {" "}
      <div className="options">
        {questions.options.map((ques, i) => (
          <button
            className={`btn btn-option ${i === answer ? "answer" : ""} ${
              hadAnswered
                ? i === questions.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={ques}
            disabled={hadAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: i })}
          >
            {ques}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Options
