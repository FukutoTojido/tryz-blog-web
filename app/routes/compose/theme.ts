import type { OnMount } from "@monaco-editor/react";

const monacoTheme: Parameters<Parameters<OnMount>[1]["editor"]["defineTheme"]>[1] = {
	base: "vs-dark",
	inherit: true,
	rules: [
		{
			background: "2E3440",
			token: "",
		},
		{
			foreground: "616e88",
			token: "comment",
		},
		{
			foreground: "a3be8c",
			token: "string",
		},
		{
			foreground: "b48ead",
			token: "constant.numeric",
		},
		{
			foreground: "81a1c1",
			token: "constant.language",
		},
		{
			foreground: "81a1c1",
			token: "keyword",
		},
		{
			foreground: "81a1c1",
			token: "storage",
		},
		{
			foreground: "81a1c1",
			token: "storage.type",
		},
		{
			foreground: "8fbcbb",
			token: "entity.name.class",
		},
		{
			foreground: "8fbcbb",
			fontStyle: "  bold",
			token: "entity.other.inherited-class",
		},
		{
			foreground: "88c0d0",
			token: "entity.name.function",
		},
		{
			foreground: "81a1c1",
			token: "entity.name.tag",
		},
		{
			foreground: "8fbcbb",
			token: "entity.other.attribute-name",
		},
		{
			foreground: "88c0d0",
			token: "support.function",
		},
		{
			foreground: "f8f8f0",
			background: "f92672",
			token: "invalid",
		},
		{
			foreground: "f8f8f0",
			background: "ae81ff",
			token: "invalid.deprecated",
		},
		{
			foreground: "b48ead",
			token: "constant.color.other.rgb-value",
		},
		{
			foreground: "ebcb8b",
			token: "constant.character.escape",
		},
		{
			foreground: "8fbcbb",
			token: "variable.other.constant",
		},
	],
	colors: {
		"editor.foreground": "#D8DEE9",
		"editor.background": "#16161600",
		"editor.selectionBackground": "#434C5ECC",
		"editor.lineHighlightBackground": "#bababa22",
		"focusBorder": "#00000000",
		"editorCursor.foreground": "#D8DEE9",
		"editorWhitespace.foreground": "#434C5ECC",
	},
};

export default monacoTheme;