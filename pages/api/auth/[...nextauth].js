import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoClient } from "mongodb"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const client = await MongoClient.connect(process.env.MONGODB_URI || "mongodb+srv://admin:admin123@testing.dc4lc.mongodb.net/travel_x?retryWrites=true&w=majority&appName=Testing");
        const db = client.db();
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ email: credentials.email });
        if (!user) {
          client.close();
          throw new Error('No user found with the given email');
        }

        if (user.password !== credentials.password) {
          client.close();
          throw new Error('Invalid password');
        }

        client.close();
        return { id: user._id.toString(), email: user.email };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  }
}

export default NextAuth(authOptions)

