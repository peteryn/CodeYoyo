"use client";

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Hello() {
	const { data: session, status } = useSession();
	const handle = async () => {
		const jwt = session?.myIdToken;
		const b = await fetch("http://localhost:5158/easy");
		if (jwt) {
			await fetch("http://localhost:5158/signin", {
				method: "POST",
				credentials: "include",
				headers: {
					Authorization: `Bearer ${jwt}`,
					"Content-Type": "application/json",
				},
			});
		}

		const data = await fetch("http://localhost:5158/secure", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
		const res = await data.json();
		const p = document.getElementById("res");
		if (p) {
			p.textContent = res.message;
		}
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
