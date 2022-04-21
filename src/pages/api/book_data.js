import clientPromise from 'utils/mongodb'

const { getSession } = require('next-auth/react')

const handler = async (req, res) => {
  const session = await getSession({ req })
  if (session === null) {
    res.status(401).send('Not currently authed')
    return
  }
  if (req.method === 'GET') {
    const client = await clientPromise
    const users = client.db('awakening').collection('users')
    const user = await users.findOne({ email: session.user.email })
    res.json({ bookData: user.bookData || {} })
  } else if (req.method === 'POST') {
    const client = await clientPromise
    const users = client.db('awakening').collection('users')
    const newBookData = req.body
    const { ok, value } = await users.findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          bookData: newBookData,
        },
      },
      { returnDocument: 'after' }
    )
    if (ok != 1) {
      res.status(400)
      return
    }
    res.json(value)
  } else {
    res.status(400).send('Request not post')
    return
  }
}

export default handler
