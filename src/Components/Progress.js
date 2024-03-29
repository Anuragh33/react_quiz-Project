import { useQuiz } from "../Contexts/QuizContext"

function Progress() {
  const { index, numQuestions, points, maxPoints, answer } = useQuiz()

  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index}</strong> / <strong> {numQuestions}</strong>
      </p>
      <p>
        <strong>{points}</strong> / <strong>{maxPoints}</strong> points
      </p>
    </header>
  )
}

export default Progress
