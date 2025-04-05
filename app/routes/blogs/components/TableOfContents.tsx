import { memo } from "react";
import { Link } from "react-router";

interface IHeadingData {
	level: number;
	content: string;
}

const ContentsList = memo(({ headings }: { headings: IHeadingData[] }) => {
	return (
		<>
			{headings.map((data) => {
				const id = data.content.toLowerCase().replaceAll(/[^a-z0-9\-]/g, "-");
				return (
					<Link key={id} className={`in-${data.level - 1}`} to={`#${id}`}>
						{data.content}
					</Link>
				);
			})}
		</>
	);
});

export default function TableOfContents({
	headings,
	showToC,
}: { headings: IHeadingData[]; showToC: boolean }) {
	return (
		<div className="md:w-[300px] w-full flex flex-col gap-2.5 order-first md:order-none mt-2.5 md:mt-0">
			<div
				className={`w-full flex flex-col gap-2.5 p-5 max-md:bg-mantle rounded-xl overflow-hidden ${showToC ? "max-md:h-auto max-md:p-5" : "max-md:h-0 max-md:py-0 max-md:px-5"}`}
				style={{
					transition: "ease-in-out 200ms",
				}}
			>
				<ContentsList headings={headings} />
			</div>
		</div>
	);
}
