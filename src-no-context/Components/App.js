import { useEffect, useReducer } from "react"
import Header from "./Header"
import Main from "./Main"
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./StartScreen"
import Question from "./Question"
import NextButton from "./NextButton"
import Progress from "./Progress"
import FinishScreen from "./FinishScreen"
import Timer from "./Timer"
import Footer from "./Footer"
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

export default function App() {
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
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
      </Main>

      {status === "finished" && (
        <FinishScreen
          points={points}
          maxpoints={maxPoints}
          dispatch={dispatch}
          highscore={highscore}
        />
      )}
    </div>
  )
}
