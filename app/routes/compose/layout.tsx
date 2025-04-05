import { Link, Outlet } from "react-router";

export function meta() {
	return [
		{ title: "Compose | FukutoTojido's blog" },
	];
}

export default function Layout() {
	return <Outlet />;
}
