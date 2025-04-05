import { useCallback } from "react";
import { useNavigate } from "react-router";
import Cookie from "universal-cookie";
import axios from "axios";

export function meta() {
	return [{ title: "Login | FukutoTojido's Blog" }];
}

export default function Page() {
	const navigate = useNavigate();
	const submit = useCallback(
		async (formData: FormData) => {
			try {
				const {
					data: { token, expires_at },
				} = await axios.post(
					`${import.meta.env.VITE_SERVER_ENDPOINT}/api/auth/login`,
					formData,
				);
				const cookie = new Cookie(null);

				cookie.set("token", token, {
					expires: new Date(expires_at),
					secure: true,
					sameSite: "lax",
					path: "/",
				});

				navigate("/compose");
			} catch (e) {
				console.error(e);
			}
		},
		[navigate],
	);

	return (
		<>
			<img
				className="fixed w-full h-full object-cover object-center"
				src={"/Rinami.png"}
				alt=""
			/>
			<div className="absolute w-screen min-h-screen h-auto lg:h-screen lg:overflow-hidden overflow-auto p-2.5 flex flex-col items-center justify-center gap-2.5">
				<form
					action={submit}
					className="bg-base/96 text-text w-[400px] max-w-full p-5 rounded-xl border-1 border-overlay-2 shadow-md flex flex-col gap-2.5 backdrop-blur-md"
				>
					<div className="flex items-center gap-2.5 justify-center p-2.5 drop-shadow-md">
						<img src="/tryz.svg" alt="" width={50} />
						<div className="font-bold text-xl text-center">TRY-Z.net</div>
					</div>
					<label htmlFor="username" className="text-sm">
						Username
					</label>
					<input
						type="text"
						name="username"
						id="username"
						className="bg-mantle p-2.5 rounded-md focus-within:outline-overlay-2 focus-within:outline-1"
					/>
					<label htmlFor="password" className="text-sm">
						Password
					</label>
					<input
						type="password"
						name="password"
						id="password"
						className="bg-mantle p-2.5 rounded-md focus-within:outline-overlay-2 focus-within:outline-1"
					/>
					<button
						type="submit"
						className="bg-surface-0 border-1 text-text border-overlay-2 p-2.5 rounded-md mt-2.5 cursor-pointer hover:bg-surface-2 transition-all"
					>
						Login
					</button>
				</form>
			</div>
		</>
	);
}
