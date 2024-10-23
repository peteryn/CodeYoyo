// import { signIn, auth } from "../../auth";
// export default async function SignIn() {
// 	const session = await auth();
// 	const myToken = session?.myIdToken;
// 	console.log(myToken);

// 	// Usage example with POST:
// 	try {
// 		const jwt = myToken;
// 		if (jwt) {
// 			const d = await fetch("http://localhost:5158/cookie", { credentials: "include",  mode: "cors" });
// 			console.log(d)
// 		}
// 	} catch (error) {
// 		console.log("YOU HAVE AN ERROR");
// 		console.error("Error:", error);
// 	}

// 	return (
// 		<>
// 			<form
// 				action={async () => {
// 					"use server";
// 					await signIn("google");
// 				}}
// 			>
// 				<button type="submit">Signin with Google</button>
// 			</form>
// 		</>
// 	);
// }

"use client";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
export default function Hello() {
	const { data: session, status } = useSession();
	const handle = async () => {
		console.log("in async");
		const jwt = session?.myIdToken;
		console.log(`jwt: ${jwt}`);
		const b = await fetch("http://localhost:5158/easy");
		if (jwt) {
			console.log("in jwt");
			const a = await fetch("http://localhost:5158/signin", {
				method: "POST",
				credentials: "include",
				headers: {
					Authorization: `Bearer ${jwt}`,
					"Content-Type": "application/json",
				},
			});
		}

		const fa = await fetch("http://localhost:5158/secure", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
		const res = await fa.json();
		const p = document.getElementById("res");
		if (p) {
			console.log("hi");
			p.textContent = res.message;
		}
		console.log(res);
	};

	return (
		<>
			<button onClick={() => signIn("google")}>Sign In With Google</button>
			<button onClick={handle}>Handle</button>
			<h1>Result:</h1>
			<p id="res"></p>
		</>
	);
}
