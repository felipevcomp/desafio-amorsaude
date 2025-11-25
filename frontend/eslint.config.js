// ESLint 9 + Flat Config for Angular 17

import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import angular from "@angular-eslint/eslint-plugin";
import angularTemplate from "@angular-eslint/eslint-plugin-template";
import importPlugin from "eslint-plugin-import";
import jsdoc from "eslint-plugin-jsdoc";

export default [
  // Global ignores
  {
    ignores: [
      ".angular/**/*",
      "dist/**/*",
      "node_modules/**/*",
      "**/*.html"
    ]
  },

  // TypeScript Rules
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        ecmaVersion: 2022
      }
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "@angular-eslint": angular,
      import: importPlugin,
      jsdoc
    },
    rules: {
      /* Angular */
      "@angular-eslint/component-class-suffix": ["error", { suffixes: ["Component"] }],
      "@angular-eslint/directive-class-suffix": ["error", { suffixes: ["Directive"] }],
      "@angular-eslint/use-lifecycle-interface": "warn",

      /* TypeScript */
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-floating-promises": "error",

      /* Clean Code */
      "no-console": "warn",
      "no-debugger": "warn",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],

      /* Imports */
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          alphabetize: { order: "asc", caseInsensitive: true }
        }
      ],
      "import/no-unresolved": "off",

      /* Documentação */
      "jsdoc/require-jsdoc": [
        "warn",
        {
          require: {
            MethodDefinition: true,
            ClassDeclaration: true,
            FunctionDeclaration: true
          }
        }
      ],
      "jsdoc/require-param": "warn",
      "jsdoc/require-returns": "warn"
    }
  },

  // Angular HTML templates
  {
    files: ["**/*.html"],
    plugins: {
      "@angular-eslint/template": angularTemplate
    },
    rules: {
      "@angular-eslint/template/no-negated-async": "error"
    }
  }
];
