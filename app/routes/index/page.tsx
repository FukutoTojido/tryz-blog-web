import axios from "axios";
import type { Route } from "./+types/page";
import type { BlogHeader } from "~/types";
import BlogItem from "./components/BlogItem";
import Navigation from "~/components/Navigation";

export async function clientLoader() {
	try {
		const { data } = await axios.get(
			`${import.meta.env.VITE_SERVER_ENDPOINT}/api/blogs`,
		);
		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
}

export default function Page({ loaderData }: Route.ComponentProps) {
	if (!loaderData) return "Error fetching blogs list";
	return (
		<div className="w-full flex flex-col gap-5 overflow-auto pr-2.5">
			<Navigation/>
			{(loaderData as BlogHeader[]).map((data) => (
				<BlogItem key={data.id} data={data} />
			))}
		</div>
	);
}
