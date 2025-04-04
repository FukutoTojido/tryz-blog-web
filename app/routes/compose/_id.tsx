import { useCallback, useEffect } from "react";
import Editor from "./components/Editor";
import Info from "./components/Info";
import axios from "axios";
import { useNavigate } from "react-router";
import type { Route } from "./+types/page";

const submitResult = async (formData: FormData, id: string) => {
	const [title, description, content, preview, deleteImage] = [
		formData.get("title"),
		formData.get("description"),
		formData.get("content"),
		formData.get("preview"),
		formData.get("deleteImage"),
	];

	console.log(deleteImage);

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
    submitFormData.append("deleteImage", deleteImage === null ? "false" : "true")

	try {
		const { data } = await axios.post(
			`${import.meta.env.VITE_SERVER_ENDPOINT}/api/blogs/${id}`,
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

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
	try {
		await axios.get(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/auth`, {
			withCredentials: true,
		});

		const { data: blogData } = await axios.get(
			`${import.meta.env.VITE_SERVER_ENDPOINT}/api/blogs/${params.id}`,
		);

		return blogData;
	} catch (e) {
		console.error(e);
		return null;
	}
}

export default function Page({ loaderData }: Route.ComponentProps) {
	const navigate = useNavigate();
	const action = useCallback(
		async (formData: FormData) => {
			await submitResult(formData, loaderData.id);
			navigate(`/blogs/${loaderData?.id}`);
		},
		[loaderData?.id, navigate],
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
				<Info
					header={{
						title: loaderData.title,
						description: loaderData.description,
						thumbnail: loaderData.thumbnail,
					}}
				/>
				<span className="font-medium">Content</span>
				<Editor content={loaderData.content} />
				<button
					type="submit"
					className="ml-auto p-2.5 bg-base hover:bg-surface-0 border-1 border-overlay-0 rounded-xl cursor-pointer"
				>
					Submit
				</button>
			</form>
		</div>
	);
}
