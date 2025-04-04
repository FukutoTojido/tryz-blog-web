import { Link } from "react-router";

export default function Navigation({
	title,
	id,
}: { title?: string; id?: string }) {
	if (!id)
		return (
			<div className="w-full bg-black/20 p-2.5 px-5 rounded-xl">
				<div className="font-medium text-md">Home</div>
			</div>
		);

	return (
		<div className="w-full flex gap-2.5 bg-black/20 p-2.5 px-5 rounded-xl items-center overflow-hidden">
			<Link
				to="/"
				className="font-medium text-md hover:underline underline-offset-8"
			>
				<div>Home</div>
			</Link>
			<div>{">"}</div>
			<div className="line-clamp-1 overflow-ellipsis">{title}</div>
		</div>
	);
}
