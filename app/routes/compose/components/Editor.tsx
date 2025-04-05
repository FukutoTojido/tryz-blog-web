import { memo, useState, type Dispatch, type SetStateAction } from "react";
import Input from "./Input";
import Preview from "./Preview";

const InputMemo = memo(
	({
		setCode,
		defaultContent,
	}: { setCode: Dispatch<SetStateAction<string>>; defaultContent?: string }) => {
		return <Input setCode={setCode} defaultValue={defaultContent} />;
	},
);

export default function Editor({ content }: { content?: string }) {
	const [code, setCode] = useState(content ?? "");

	return (
		<div className="w-full flex lg:flex-row flex-col flex-1 gap-2.5 overflow-hidden">
			<InputMemo setCode={setCode} defaultContent={content} />
			<Preview code={code} />
		</div>
	);
}
