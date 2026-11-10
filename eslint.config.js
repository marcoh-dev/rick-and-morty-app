import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier/flat";
import importPlugin from "eslint-plugin-import";
import globals from "globals";

export default defineConfig([
	{
		files: ["**/*.js"],
		extends: [js.configs.recommended],
		plugins: { import: importPlugin },
		languageOptions: { ecmaVersion: 2023, sourceType: "module", globals: globals.browser },
		rules: {
			"import/order": [
				"error",
				{
					groups: [["builtin", "external"], "internal", ["parent", "sibling", "index"]],
					"newlines-between": "always",
					alphabetize: { order: "asc", caseInsensitive: true },
					named: true,
				},
			],
			"import/no-duplicates": "error",
			"no-unused-vars": [
				"error",
				{ vars: "all", args: "none", ignoreRestSiblings: true, caughtErrors: "all" },
			],
		},
	},
	prettier,
]);
