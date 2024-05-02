export const authConfig = {
    pages: {
        signIn: "/login",
    },
    providers: [],
    callbacks: {
        // FOR MORE DETAIL ABOUT CALLBACK FUNCTIONS CHECK https://next-auth.js.org/configuration/callbacks
        async jwt({ token, user }) {
            if (user) {
                console.log('aaaaaaaaaaaaaa', user)
                token.id = user.id
                token.avatar = user.avatar
                token.description = user.description
                token.isAdmin = user.isAdmin
                token.isActive = user.isActive
                console.log('bbbbbbbbbbbbbb', token)
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id
                session.user.avatar = token.avatar
                session.user.description = token.description
                session.user.isAdmin = token.isAdmin
                session.user.isActive = token.isActive
            }
            return session
        },
        authorized({ auth, request }) {
            const user = auth?.user;
            const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin")
            const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login")
            const isOnSpacePage = request.nextUrl?.pathname.startsWith("/space")
            const isOnHomePage = request.nextUrl?.pathname == '/'

            // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD

            if (isOnAdminPanel && !user?.isAdmin) {
                return false
            }

            // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE

            if (isOnLoginPage && user) {
                return Response.redirect(new URL("/", request.nextUrl))
            }

            // ONLY AUTHENTICATED USERS CAN REACH THE SPACE PAGE

            if (isOnSpacePage && !user) {
                return false
            }

            // INACTIVE USER

            if(user && !(user.isActive) && !isOnHomePage)
                return false

            return true
        },
    },
}