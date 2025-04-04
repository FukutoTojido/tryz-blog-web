import { useState } from "react";
import ImageDropper from "./ImageDropper";

export default function Info({
	header,
}: {
	header?: {
		title: string;
		description: string;
		thumbnail: string;
	};
}) {
	const [open, setOpen] = useState(true);

	return (
		<div className="flex flex-col">
			<label
				htmlFor="info"
				className="text-md font-medium select-none p-2.5 px-5 rounded-md hover:bg-surface-1 bg-surface-0"
			>
				Blog Info
			</label>
			<div
				className="grid w-full grid-cols-1 gap-5 overflow-hidden md:grid-cols-7 grid-rows-1 h-min auto-cols-auto auto-rows-min p-5 max-h-[999px]"
				style={{
					maxHeight: open ? "999px" : "0px",
					padding: open ? "20px" : "0px 20px",
					opacity: open ? "100%" : "0%",
					transition: "ease-out 200ms",
				}}
			>
				<div className="flex flex-col gap-5 md:col-start-1 md:col-end-5 h-min">
					<label htmlFor="title" className="font-medium">
						Title
					</label>
					<input
						type="text"
						name="title"
						id="title"
						defaultValue={header?.title}
						className="p-2.5 border-1 border-overlay-0 focus-within:outline-0 focus-within:border-overlay-2 rounded-xl"
					/>
					<label htmlFor="description" className="font-medium">
						Description
					</label>
					<input
						type="text"
						name="description"
						id="description"
						defaultValue={header?.description}
						className="p-2.5 border-1 border-overlay-0 focus-within:outline-0 focus-within:border-overlay-2 rounded-xl"
					/>
				</div>
				<ImageDropper defaultThumb={ header?.thumbnail }/>
			</div>

			<input
				type="checkbox"
				name="info"
				id="info"
				className="hidden"
				defaultChecked={true}
				onChange={(event) => setOpen(event.target.checked)}
			/>
		</div>
	);
}
