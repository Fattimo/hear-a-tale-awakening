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
  const { letter } = req.query
  const QUIZ_SIZE = 4
  if (!letter) {
    res.status(400).send('Error. No Letter Provided')
    return
  }
  const client = await clientPromise
  const definitions = client.db('awakening').collection('definitions')
  const agg = definitions.aggregate([
    { $match: { first_letter: letter } },
    { $sample: { size: QUIZ_SIZE } },
  ])
  const payload = {
    choices: [],
    correctIndex: Math.floor(Math.random() * QUIZ_SIZE),
  }
  let i = 0
  for await (const document of agg) {
    if (i === payload.correctIndex) payload.definition = document.definition
    const choice =
      document.words[Math.floor(Math.random() * document.words.length)]
    payload.choices.push(choice)
    i++
  }
  if (payload.choices.length < QUIZ_SIZE){
    res.status(400).send('Quiz too small.')
    return
  }
  res.json(payload)
}

export default handler
