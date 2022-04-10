import clientPromise from 'utils/mongodb'

/**
 * GET:
 * word: word to get definition of
 * res: string containing definition of word
 */
const handler = async (req, res) => {
  const { word } = req.query
  if (!word) {
    res.status(400).send('Error. No Word Provided')
    return
  }
  const client = await clientPromise
  const definitions = client.db('awakening').collection('definitions')
  const document = await definitions.findOne({
    words: word.toLowerCase(),
  })
  if (!document) {
    res.status(400).json({
      definition: 'Word definition not found.',
    })
    return
  }
  res.json({
    definition: document.definition,
    key: document.words[0],
    related: document.related,
  })
}

export default handler
