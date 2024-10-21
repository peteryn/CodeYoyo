import { signIn, auth } from "../../auth";

export default async function SignIn() {
	const session = await auth();
	const myToken = session?.myIdToken;

	const makeAuthenticatedRequest = async (
		url: string,
		jwt: string,
		method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
		body?: object
	) => {
		const options: RequestInit = {
			method,
			credentials: "include", // Enable cookie handling
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
		};

		if (body) {
			options.body = JSON.stringify(body);
		}

		const response = await fetch(url, options);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		// You can check the cookies that were set
		console.log("Response headers:", response.headers);
		console.log("Response status:", response.status);

		return "";
	};

	// Usage example with POST:
	try {
		const jwt = myToken;
		if (jwt) {
			const data = await makeAuthenticatedRequest(
				"http://localhost:5299/signin",
				jwt,
				"POST",
				{}
			);
			console.log("data")
			console.log(data);
		}
	} catch (error) {
		console.error("Error:", error);
	}

	return (
		<form
			action={async () => {
				"use server";
				await signIn("google");
			}}
		>
			<button type="submit">Signin with Google</button>
		</form>
	);
}
