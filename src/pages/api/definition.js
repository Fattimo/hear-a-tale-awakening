import clientPromise from 'utils/mongodb'

/**
 * GET:
 * word: word to get definition of
 * res: string containing definition of word
 */
const handler = async (req, res) => {
  const { word } = req.query
  if (!word) res.status(400).send('Error. No Word Provided')
  const client = await clientPromise
  const definitions = client.db('awakening').collection('definitions')
  const document = await definitions.findOne({
    words: word,
  })
  if (!document) res.status(400).send('Word Definition Not Found.')
  res.send(document.definition)
}

export default handler
