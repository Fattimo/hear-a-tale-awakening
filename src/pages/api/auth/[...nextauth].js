import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'
import { MongoClient } from 'mongodb'

export default NextAuth({
  //https://dev.to/dawnind/authentication-with-credentials-using-next-auth-and-mongodb-part-1-m38
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'jsmith@email.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        let client = new MongoClient(process.env.MONGO_DB)
        client = await client.connect()
        const users = client.db('awakening').collection('users')
        console.log(credentials)
        const result = await users.findOne({ email: credentials.email })
        if (!result) {
          throw new Error('no user found with email')
        }
        const checkPassword = await compare(
          credentials.password,
          result.password
        )
        if (!checkPassword) {
          throw new Error('password does not match')
        }
        return {
          email: result.email,
        }
      },
    }),
    // ...add more providers here
  ],
})
