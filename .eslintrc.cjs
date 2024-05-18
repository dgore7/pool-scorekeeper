/** @type { import("eslint").Linter.FlatConfig } */
module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		node: true,
		es2017: true
	},
	globals: {
		angular: true,
		NodeJS: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		},
		{
			files: ['*.{ts,js,svelte}'],
			rules: {
				'@typescript-eslint/no-unused-vars': [
					'error',
					{
						varsIgnorePattern: '^_',
						argsIgnorePattern: '^_'
					}
				],
				'svelte/no-at-html-tags': 'off',
				'no-case-declarations': 'off'
			}
		}
	]
};
