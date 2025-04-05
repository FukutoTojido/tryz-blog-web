import {
	type RouteConfig,
	index,
	layout,
	route,
} from "@react-router/dev/routes";

export default [
	layout("routes/layout.tsx", [
		index("routes/index/page.tsx"),
		route("blogs/:id", "routes/blogs/page.tsx"),
		layout("routes/compose/layout.tsx", [
			route("compose", "routes/compose/page.tsx"),
			route("compose/:id", "routes/compose/_id.tsx"),
		]),
	]),
	route("/login", "routes/login/page.tsx"),
] satisfies RouteConfig;
