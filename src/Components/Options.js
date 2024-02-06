function Options({ questions }) {
  return (
    <div>
      {" "}
      <div className="options">
        {questions.options.map((ques, i) => (
          <button className="btn btn-option" key={ques}>
            {ques}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Options
