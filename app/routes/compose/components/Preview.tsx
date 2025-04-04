import { useEffect, useRef } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import markdownComponents from "~/routes/markdown";

export default function Preview({ code }: { code: string }) {
	const mdxRef = useRef(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		(mdxRef.current as HTMLDivElement | null)?.scrollIntoView(false);
	}, [code]);
	return (
		<div
			className="flex-1 max-lg:max-h-102 max-lg:h-102 p-5 overflow-auto rounded-xl border-overlay-0 border-1 lg:h-full"
			ref={mdxRef}
		>
			<Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
				{code}
			</Markdown>
		</div>
	);
}
