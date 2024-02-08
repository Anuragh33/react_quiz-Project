function FinishScreen({ points, maxpoints }) {
  return (
    <p className="result">
      You have Scored <strong>{points}</strong> out of {maxpoints}
    </p>
  )
}

export default FinishScreen
