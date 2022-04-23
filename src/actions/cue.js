const cueWord = (word) => {
  fetch('/api/cue', {
    method: 'POST',
    body: JSON.stringify({ word }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

const quizWord = (word, score, correct) => {
  fetch('/api/cue', {
    method: 'PUT',
    body: JSON.stringify({ word, score, correct }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export { cueWord, quizWord }
