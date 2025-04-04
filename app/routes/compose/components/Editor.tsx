import { useState } from "react";
import Input from "./Input";
import Preview from "./Preview";

export default function Editor({ content }: { content?: string }) {
	const [code, setCode] = useState(content ?? "");

	return (
		<div className="w-full flex lg:flex-row flex-col flex-1 gap-2.5 overflow-hidden">
			<Input setCode={setCode} defaultValue={content} />
			<Preview code={code} />
		</div>
	);
}
