import {
	useRef,
	useCallback,
	useEffect,
	type Dispatch,
	type SetStateAction,
} from "react";
import { Editor, type OnMount } from "@monaco-editor/react";
import monacoTheme from "../theme";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const debounce = (fn: (...agrs: any) => void, timeout = 300) => {
	let timer: string | number | NodeJS.Timeout | undefined;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	return (...agrs: any) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(this, agrs);
		}, timeout);
	};
};

export default function Input({
	setCode,
	defaultValue
}: {
	defaultValue?: string
	setCode: Dispatch<SetStateAction<string>>;
}) {
	const editorRef = useRef<Parameters<OnMount>[0]>(null);
	const areaRef = useRef<HTMLTextAreaElement>(null);

	const handleEditorMount: OnMount = useCallback((editor, monaco) => {
		editorRef.current = editor;

		monaco.editor.defineTheme("custom", monacoTheme);
		monaco.editor.setTheme("custom");
	}, []);

	return (
		<div className="flex-1 rounded-xl border-1 border-overlay-0 p-5 overflow-hidden">
			<textarea name="content" id="content" className="hidden" ref={areaRef} defaultValue={defaultValue ?? ""} />
			<Editor
				height="100%"
				defaultLanguage="mdx"
				defaultValue={defaultValue ?? ""}
				theme="custom"
				onMount={handleEditorMount}
				onChange={debounce((value: string) => {
					setCode(value ?? "");
					if (areaRef.current) {
						areaRef.current.value = value ?? "";
					}
				})}
				options={{
					minimap: { enabled: false },
					fontFamily: "Cascadia Code",
					fontSize: 15,
					wordWrap: "on",
					lineNumbersMinChars: 3,
					folding: false,
					stickyScroll: {
						enabled: false,
					},
				}}
				className="lg:h-full h-102"
			/>
		</div>
	);
}
