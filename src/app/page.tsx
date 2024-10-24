"use client";

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import GoogleButton from "react-google-button";

export default function Hello() {
	const { data: session, status } = useSession();
	const handle = async () => {
		const jwt = session?.myIdToken;
		const p = document.getElementById("res");
		if (jwt) {
			await fetch("http://localhost:5158/signin", {
				method: "POST",
				credentials: "include",
				headers: {
					Authorization: `Bearer ${jwt}`,
					"Content-Type": "application/json",
				},
			});

			const data = await fetch("http://localhost:5158/secure", {
				method: "GET",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			});
			const res = await data.json();
			if (p) {
				p.textContent = res.message;
			}
		} else {
			if (p) {
				p.textContent = "You are not logged in";
			}
		}
	};

	return (
		<div className="center">
			<div className="login">
				<GoogleButton
					type="dark"
					onClick={() => {
						signIn("google");
					}}
				/>
				<h2 className="google-signin-status">
					{session?.user?.name ? "Hello " + session.user.name : "Not Signed In"}
				</h2>
				<div className="secret-area">
					<button className="info-button" onClick={handle}>
						Get Info From Server
					</button>
					<p id="res"></p>
				</div>
			</div>
		</div>
	);
}
