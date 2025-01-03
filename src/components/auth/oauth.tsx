import { signIn } from "@/auth"

export default function OAuth() {
    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                await signIn("google", { callbackUrl: '/' });
            }}
        >
            <button type="submit">Sign in with Google</button>
        </form>
    );
} 