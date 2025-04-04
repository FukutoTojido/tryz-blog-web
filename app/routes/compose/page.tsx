import { useCallback, useEffect } from "react";
import Editor from "./components/Editor";
import Info from "./components/Info";
import axios from "axios";
import { useNavigate } from "react-router";
import type { Route } from "./+types/page";

const submitResult = async (formData: FormData) => {
	const [title, description, content, preview] = [
		formData.get("title"),
		formData.get("description"),
		formData.get("content"),
		formData.get("preview"),
	];

	if (
		(title as string).trim() === "" ||
		(description as string).trim() === ""
	) {
		return;
	}

	const submitFormData = new FormData();
	submitFormData.append("title", title as string);
	submitFormData.append("description", description as string);
	submitFormData.append("content", content as string);
	submitFormData.append("thumbnail", preview as Blob);

	try {
		const { data } = await axios.post(
			`${import.meta.env.VITE_SERVER_ENDPOINT}/api/blogs`,
			submitFormData,
			{
				withCredentials: true,
			},
		);
		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export async function clientLoader() {
	try {
		const { data } = await axios.get(
			`${import.meta.env.VITE_SERVER_ENDPOINT}/api/auth`,
			{
				withCredentials: true,
			},
		);

		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
}

export default function Page({ loaderData }: Route.ComponentProps) {
	console.log(loaderData);

	const navigate = useNavigate();
	const action = useCallback(
		async (formData: FormData) => {
			const { id } = await submitResult(formData);

			if (!id) return;
			navigate(`/blogs/${id}`);
		},
		[navigate],
	);

	useEffect(() => {
		if (!loaderData) navigate("/login");
	}, [navigate, loaderData]);

	if (!loaderData) return "";

	return (
		<div className="w-full h-full flex flex-col gap-5">
			<div className="text-2xl font-medium">Compose</div>
			<form
				action={action}
				className="gap-5 flex-1 flex flex-col overflow-hidden"
			>
				<Info />
				<span className="font-medium">Content</span>
				<Editor />
				<button
					type="submit"
					className="ml-auto p-2.5 bg-surface-0 border-1 border-overlay-0 rounded-xl cursor-pointer"
				>
					Submit
				</button>
			</form>
		</div>
	);
}
