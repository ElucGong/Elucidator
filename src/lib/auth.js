import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import axios from "axios";
import { authConfig } from "./auth.config";

const ip = process.env.BACKEND

const login = async (credentials) => {
    try {
        const { username, password } = credentials

        let res = await axios({
            url: `${ip}/user/name/${username}`,
        })

        const user = res.data

        console.log('fffffffffff', user)

        if (!user) throw new Error("Wrong credentials!")

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        )

        if (!isPasswordCorrect) throw new Error("Wrong credentials!")

        // if (!user.isActive) throw new Error("This user is not active!")

        return user;
    } catch (err) {
        console.log('login', err)
        throw new Error(err.message)
    }
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials)
                    return user
                } catch (err) {
                    return null
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            return true
        },
        ...authConfig.callbacks
    }
});