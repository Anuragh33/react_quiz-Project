import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./Components/App"
import { QuizProvider } from "./Contexts/QuizContext"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <QuizProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </QuizProvider>
)
