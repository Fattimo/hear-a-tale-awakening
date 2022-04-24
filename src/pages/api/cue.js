import { getSession } from 'next-auth/react'
import clientPromise from 'utils/mongodb'

/**
 * handles cueing a word and the data that comes with it
 * POST: click a word
 * { word }
 * PUT: quiz a word
 * GET: query all cues by user
 */
const handler = async (req, res) => {
  const session = await getSession({ req })
  if (session === null) {
    res.status(401).send('Not currently authed')
    return
  }
  const client = await clientPromise
  const db = client.db('awakening')
  const users = db.collection('users')
  const cues = db.collection('cues')
  const currUser = await users.findOne({ email: session.user.email })
  if (req.method === 'POST') {
    const { word } = req.body
    if (!word) {
      res.status(400).send('No Word')
      return
    }
    await cues.findOneAndUpdate(
      { word, user: currUser._id },
      {
        $inc: { count: 1 },
      },
      {
        upsert: true,
      }
    )
    res.status(200).json({ word })
  } else if (req.method === 'PUT') {
    const { word, correct, score } = req.body
    if (!word || typeof correct !== 'boolean' || (!score && score !== 0)) {
      res.status(400).send('Bad data')
    }
    const increment = {}
    if (correct) increment.correct = 1
    else increment.incorrect = 1
    await cues.findOneAndUpdate(
      {
        word,
        user: currUser._id,
      },
      {
        $max: { score },
        $inc: increment,
      },
      {
        upsert: true,
      }
    )
    await users.findOneAndUpdate(
      {
        _id: currUser._id,
      },
      {
        $inc: increment,
      }
    )
    res.status(200).json({ word })
  } else if (req.method === 'GET') {
    const { word } = req.query
    if (!word) {
      res.status(400).json('no word')
      return
    }
    const data = await cues.findOne(
      { user: currUser._id, word },
      { projection: { _id: 0, user: 0 } }
    )
    res.status(200).json({
      data
    })
  } else {
    res.status(400).send('Method not recognized')
  }
}

export default handler
