import { createContext, useContext, useEffect, useReducer } from "react"

const QuizContext = createContext()

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
}

const SECONDS_PER_QUESTION = 30

function reducer(state, action) {
  //console.log(state, reducer)
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      }
    case "errorFound":
      return { ...state, status: "error" }
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      }
    case "newAnswer":
      const question = state.questions.at(state.index)
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      }
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      }
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      }
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      }
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      }

    default:
      throw new Error("Unknown Action")
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState)

  const numQuestions = questions.length

  const maxPoints = questions.reduce((pre, cur) => pre + cur.points, 0)

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "errorFound" }))
  }, [])

  return (
    <QuizContext.Provider
      value={{
        index,
        numQuestions,
        points,
        answer,
        questions,

        status,
        highscore,
        secondsRemaining,
        maxPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined)
    throw new Error("QuizContext is loaded outside of the QuizProvider")
  return context
}

export { useQuiz, QuizProvider }
