module.exports = {
	extends: ["react-app", "prettier"],
	plugins: ["prettier"],
	rules: {
		"prettier/prettier": [
			"error",
			{
				trailingComma: "es5",
				useTabs: true,
				printWidth: 100,
				semicolons: true,
				quoteProps: "as-needed",
				jsxSingleQuote: false,
				bracketSpacing: true,
				arrowParens: "always",
				endOfLine: "lf",
			},
		],
	},
};
