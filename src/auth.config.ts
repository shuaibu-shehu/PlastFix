import GoogleProvider from "next-auth/providers/google"

const authConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    access_type: 'offline',
                    prompt: 'consent'                },
            },
        })
    ],
    secret: process.env.AUTH_SECRET,
};

export default authConfig; 