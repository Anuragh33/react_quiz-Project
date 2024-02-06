import { type } from "@testing-library/user-event/dist/type"

function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h3> Welcome to the React quiz.</h3>
      <h3>{numQuestions} questions to Test your React Knowledge.</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Start the Quiz
      </button>
    </div>
  )
}

export default StartScreen
