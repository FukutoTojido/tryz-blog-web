import { Link } from "react-router";
import type { Components } from "react-markdown";

const markdownComponents: Components = {
	h1: ({ children }) => {
		return <h1 id={`${children?.toString().toLowerCase().replaceAll(/[^a-z0-9\-]/g, "-")}`}>{children}</h1>;
	},
	h2: ({ children }) => {
		return <h2 id={`${children?.toString().toLowerCase().replaceAll(/[^a-z0-9\-]/g, "-")}`}>{children}</h2>;
	},
	p: ({ children }) => <p className="my-4 first:mt-0 last:mb-0">{children}</p>,
	img: (props) =>
		props.src ? (
			<img
				className="max-w-[80%] w-auto h-auto mx-auto my-8 rounded-lg shadow-xl"
				{...props}
				alt=""
			/>
		) : (
			""
		),
	a: (props) => (
		<Link {...props} to={props.href ?? ""} className="font-medium text-[#468edb]">
			{props.children}
		</Link>
	),
};

export default markdownComponents;
