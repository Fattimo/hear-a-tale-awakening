import clientPromise from 'utils/mongodb'

/**
 * GET params:
 * letter: letter to get quiz for
 * res: {
 *  choices: []
 *  correctIndex: number
 *  definition: string
 * }
 */
const handler = async (req, res) => {
  let { word } = req.query
  word = word.toLowerCase()
  const QUIZ_SIZE = 4
  if (!word) {
    res.status(400).send('Error. No Letter Provided')
    return
  }
  const client = await clientPromise
  const definitions = client.db('awakening').collection('definitions')
  const agg = definitions.aggregate([
    { $match: { first_letter: word.charAt(0) } },
    { $sample: { size: QUIZ_SIZE } },
  ])
  const payload = { choices: [] }
  let i = 0
  let wordPresent = false
  for await (const document of agg) {
    let choice =
      document.words[Math.floor(Math.random() * document.words.length)]
    if (document.words.includes(word)) {
      payload.definition = document.definition
      payload.correctIndex = i
      wordPresent = true
      choice = word
    }
    payload.choices.push(choice)
    i++
  }
  if (payload.choices.length < QUIZ_SIZE) {
    res.status(400).send('Quiz too small.')
    return
  }
  if (!wordPresent) {
    payload.correctIndex = Math.floor(Math.random() * QUIZ_SIZE)
    payload.definition = (
      await definitions.findOne({
        words: word,
      })
    ).definition
    payload.choices[payload.correctIndex] = word
  }
  res.json(payload)
}

export default handler
