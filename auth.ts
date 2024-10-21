import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [Google],
	callbacks: {
		jwt({ token, user, account }) {
			if (user) {
				// User is available during sign-in
				token.id = user.id;
				token.idToken = account?.id_token;
			}
			return token;
		},
		session({ session, token }) {
			session.myIdToken = token.idToken;
			return session;
		},
	},
});
