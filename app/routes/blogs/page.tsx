import { MarkdownHooks } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeStarryNight from "rehype-starry-night";
import markdownComponents from "../markdown";
import axios, { type AxiosError } from "axios";
import type { Route } from "./+types/page";
import Navigation from "~/components/Navigation";
import TableOfContents from "./components/TableOfContents";
import { memo, useState } from "react";
import { RiCalendar2Fill, RiMenuFill } from "@remixicon/react";
import { getDateFromISO } from "../index/components/BlogItem";
import Loader from "~/components/Loader";

interface IHeadingData {
	level: number;
	content: string;
}

export async function loader({ params }: Route.LoaderArgs) {
	try {
		const { data } = await axios.get(
			`${import.meta.env.VITE_SERVER_ENDPOINT}/api/blogs/${params.id}`,
		);

		const headings = (data.content.match(/^#{1,2}\s.*/gm) ?? []).map(
			(curr: string): IHeadingData => {
				const [headingLevel, ...headingContent] = curr.split(" ");

				return {
					level: headingLevel.length,
					content: headingContent.join(" "),
				};
			},
		);

		return { ...data, headings };
	} catch (e) {
		console.error((e as AxiosError).toJSON());
		return null;
	}
}

export function meta({ data }: Route.MetaArgs) {
	if (!data)
		return [
			{ title: "Not Found | FukutoTojido's blog" },
			{ property: "og:title", content: "Not Found | FukutoTojido's blog" },
			{ property: "og:url", content: "https://blog.try-z.net" },
			{
				name: "twitter:title",
				content: "Not Found | FukutoTojido's blog",
			},
			{ property: "twitter:url", content: "https://blog.try-z.net" },
			{ property: "twitter:domain", content: "blog.try-z.net" },
		];

	const { thumbnail, title, description } = data;
	const meta = [
		{ title: `${title} | FukutoTojido's blog` },
		{
			name: "description",
			content: description,
		},
		{ property: "og:title", content: `${title} | FukutoTojido's blog` },
		{
			property: "og:description",
			content: description,
		},
		{ property: "og:url", content: "https://blog.try-z.net" },
		{ name: "twitter:card", content: "summary_large_image" },
		{
			name: "twitter:title",
			content: `${title} | FukutoTojido's blog`,
		},
		{
			name: "twitter:description",
			content: description,
		},
		{ property: "twitter:url", content: "https://blog.try-z.net" },
		{ property: "twitter:domain", content: "blog.try-z.net" },
	];

	if (thumbnail) {
		meta.push(
			...[
				{
					property: "og:image",
					content: thumbnail,
				},
				{
					name: "twitter:image",
					content: thumbnail,
				},
			],
		);
	} else {
		meta.push(
			...[
				{
					property: "og:image",
					content: "https://cdn.try-z.net/615454066033557504-preview",
				},
				{
					name: "twitter:image",
					content: "https://cdn.try-z.net/615454066033557504-preview",
				},
			],
		);
	}

	return meta;
}

const MarkdownMemo = memo(({ content }: { content: string }) => {
	return (
		<MarkdownHooks
			fallback={<Loader />}
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[rehypeStarryNight]}
			components={markdownComponents}
		>
			{content}
		</MarkdownHooks>
	);
});

export default function Page({ loaderData }: Route.ComponentProps) {
	const [showToC, setShowToC] = useState(false);

	if (loaderData === null) return "Cannot load blog";
	return (
		<div className="flex w-full flex-col overflow-hidden md:gap-5">
			<div className="w-full flex justify-between items-center gap-2.5">
				<Navigation title={loaderData.title} id={loaderData.id} />
				<button
					type="button"
					onClick={() => setShowToC(!showToC)}
					className="w-min justify-end max-md:flex hidden"
				>
					<RiMenuFill />
				</button>
			</div>
			<div className="w-full flex gap-2.5 overflow-hidden md:flex-row flex-col">
				<div className="flex-1 h-full flex flex-col gap-5 overflow-auto pr-2.5">
					<div className="flex flex-col w-full gap-2.5">
						<div className="text-4xl font-medium">{loaderData.title}</div>
						<div className="text-lg text-subtext-0">
							{loaderData.description}
						</div>
						<div className="w-full flex gap-2.5 items-center">
							<RiCalendar2Fill size={16} />
							<div className="text-xs text-subtext-0">
								Posted on {getDateFromISO(loaderData.timestamp)}
							</div>
						</div>
					</div>
					<img
						src={`${loaderData.thumbnail}?${Date.now()}`}
						alt=""
						className="w-full h-auto rounded-xl object-cover object-center"
					/>
					<div className="w-full">
						<MarkdownMemo content={loaderData.content} />
					</div>
				</div>
				<div className="border-r-2 border-surface-2 max-lg:hidden" />
				<TableOfContents headings={loaderData.headings} showToC={showToC} />
			</div>
		</div>
	);
}
