import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import stylisticTs from '@stylistic/eslint-plugin-ts'
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"),
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },

            parser: tsParser,
            ecmaVersion: 2020,
            sourceType: "module",
        },

        rules: {
            // semi: ["error", "always"],
            // quotes: ["error", "single"],
            // "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-explicit-any": "off",
            indent: "off",
            "@typescript-eslint/indent": "off",
            "@typescript-eslint/quotes": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/space-before-function-paren": "off",
            "@typescript-eslint/object-curly-spacing": "off",
            "@typescript-eslint/semi": "off",
            "@typescript-eslint/consistent-type-imports": "off",
            "@typescript-eslint/no-trailing-spaces": "off",
            '@typescript-eslint/no-var-requires': 'off',
            'no-multi-spacing': 'off',
            commaSpacing: 'off',

        },
    },
];
