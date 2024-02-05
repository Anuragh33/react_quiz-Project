import { useEffect, useReducer } from "react"
import Header from "./Header"
import Main from "./Main"

const initialState = {
  questions: [],
  status: "loading",
}

function reducer(state, action) {
  console.log(state, reducer)
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      }
    case "errorFound":
      return { ...state, status: "error" }
    default:
      throw new Error("Unknown Action")
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

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
        {" "}
        <p>1/10</p>
        <p>question</p>
      </Main>
    </div>
  )
}
