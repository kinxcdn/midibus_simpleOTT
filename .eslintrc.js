module.exports = {
  // 루트 ESLint 설정 파일임을 나타냅니다.

  // 코드가 실행되는 환경을 정의합니다.
  env: {
    es6: true, // ECMAScript 6 기능을 지원합니다.
    node: true, // Node.js 환경을 지원합니다.
    browser: true, // 브라우저 환경을 지원합니다.
  },

  // TypeScript용 파서를 지정합니다.
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true }, // JSX 문법을 지원합니다.
    jsx: true,
    useJSXTextNode: true,
  },

  // 다양한 ESLint 설정을 확장하여 코드 분석을 개선합니다.
  extends: [
    "eslint:recommended", // 기본 ESLint 추천 규칙입니다.
    "plugin:@typescript-eslint/eslint-recommended", // TypeScript 특정 추천 규칙입니다.
    "plugin:@typescript-eslint/recommended", // 추가 TypeScript 추천 규칙입니다.
    "eslint-config-prettier", // Prettier와 충돌하는 ESLint 규칙을 비활성화합니다.
    "plugin:react/recommended", // React 추천 규칙입니다.
    "plugin:prettier/recommended", // ESLint와 Prettier 포맷팅을 함께 사용합니다.
    "prettier", // Prettier 포맷팅을 강제합니다.
  ],

  // 추가 ESLint 플러그인을 지정합니다.
  plugins: ["@typescript-eslint", "import", "prettier", "react", "react-hooks"],

  // 특정 플러그인에 대한 설정을 구성합니다.
  settings: { react: { version: "detect" } },

  // ESLint 규칙 및 구성을 정의합니다.
  rules: {
    // Prettier 포맷팅 규칙을 준수하도록 합니다.
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],

    // 암묵적 형 변환을 허용하지 않습니다.
    "no-implicit-coercion": "error",

    // 정의되지 않은 변수 사용 규칙을 끕니다.
    "no-undef": "off",

    // 들여쓰기 규칙을 끕니다. TypeScript 규칙을 사용할 것입니다.
    indent: "off",
    "@typescript-eslint/indent": "off",

    // 세미콜론 규칙을 끕니다.
    semi: "off",

    // 특정 TypeScript 규칙을 끕니다.
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-explicit-any": "off",

    // 불필요한 부울 캐스트를 끕니다.
    "no-extra-boolean-cast": "off",

    // getter 함수가 값을 반환하지 않을 때 경고합니다.
    "getter-return": "warn",

    // 함수에 대한 명시적 반환 타입을 강제하지 않습니다.
    "@typescript-eslint/explicit-function-return-type": "off",

    // 변수가 정의되기 전에 사용되는 것을 허용합니다.
    "@typescript-eslint/no-use-before-define": "off",

    // 빈 인터페이스 사용 규칙을 끕니다.
    "@typescript-eslint/no-empty-interface": "off",

    // 클래스 생성자 내의 매개변수 속성 사용 규칙을 끕니다.
    "@typescript-eslint/no-parameter-properties": "off",

    // 특정 import 사용을 제한합니다.
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "util",
            importNames: ["isArray"],
            message: "`Array.isArray` 대신 사용해주세요!",
          },
        ],
      },
    ],

    // Promise executor로 async 함수 사용에 대한 경고를 표시합니다.
    "no-async-promise-executor": "warn",

    // 'as const' 대신 타입 어설션 사용에 대한 경고를 표시합니다.
    "@typescript-eslint/prefer-as-const": "warn",

    // 선택적 체이닝과 함께 사용하는 non-null 어설션에 대한 경고를 표시합니다.
    "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",

    // 특정 금지된 타입 사용에 대한 경고를 표시합니다.
    "@typescript-eslint/ban-types": "warn",

    // 추론 가능한 타입 사용에 대한 경고를 표시합니다.
    "@typescript-eslint/no-inferrable-types": "warn",

    // 빈 함수 사용 규칙을 끕니다.
    "@typescript-eslint/no-empty-function": "off",

    // 변수, 함수, 인터페이스, 타입 별칭에 대한 네이밍 규칙을 설정합니다.
    "@typescript-eslint/naming-convention": [
      "error",
      {
        format: ["camelCase", "UPPER_CASE", "PascalCase"],
        selector: "variable",
        leadingUnderscore: "allow",
      },
      { format: ["camelCase", "PascalCase"], selector: "function" },
      { format: ["PascalCase"], selector: "interface" },
      { format: ["PascalCase"], selector: "typeAlias" },
    ],

    // 내보낸 함수와 클래스에 대한 명시적 반환 타입을 강제하지 않습니다.
    "@typescript-eslint/explicit-module-boundary-types": "off",

    // 배열 타입 구문을 지정합니다.
    "@typescript-eslint/array-type": ["error", { default: "array-simple" }],

    // 사용하지 않는 변수에 대한 경고를 표시합니다. 나머지 형제는 무시합니다.
    "@typescript-eslint/no-unused-vars": ["warn", { ignoreRestSiblings: true }],

    // 클래스 멤버 순서를 지정합니다.
    "@typescript-eslint/member-ordering": [
      "error",
      {
        default: [
          "public-static-field",
          "private-static-field",
          "public-instance-field",
          "private-instance-field",
          "public-constructor",
          "private-constructor",
          "public-instance-method",
          "private-instance-method",
        ],
      },
    ],

    // 특정 주석 단어에 대한 경고를 표시합니다.
    "no-warning-comments": [
      "warn",
      {
        terms: ["TODO", "FIXME", "XXX", "BUG"],
        location: "anywhere",
      },
    ],

    // 재할당되지 않는 변수에 대해 'const' 사용을 강제합니다.
    "prefer-const": "error",

    // 'var' 사용을 금지합니다.
    "no-var": "error",

    // 모든 블록에 대해 중괄호 사용을 요구합니다.
    curly: ["error", "all"],

    // 엄격한 일치 비교를 요구합니다.
    eqeqeq: ["error", "always", { null: "ignore" }],

    // 중복된 import 사용을 금지합니다.
    "import/no-duplicates": "error",

    // React 컴포넌트에 대한 prop-types 유효성 검사를 끕니다.
    "react/prop-types": "off",

    // 컴포넌트의 표시 이름을 위한 규칙을 끕니다.
    "react/display-name": "off",

    // React hooks의 규칙을 적용합니다.
    "react-hooks/rules-of-hooks": "error",

    // 훅의 의존성 배열에 대해 완전한 의존성을 요구합니다.
    "react-hooks/exhaustive-deps": "error",

    // 'target="_blank"' 사용 시 'rel="noreferrer"' 사용을 요구합니다.
    "react/jsx-no-target-blank": "error",

    // 'require' 대신 'import' 사용을 위한 경고를 표시합니다.
    "@typescript-eslint/no-var-requires": 0,

    // JSX 사용 시 'React' import 요구를 끕니다.
    "react/react-in-jsx-scope": "off",

    // 'css'는 무시하고 알 수 없는 속성에 대한 경고를 표시합니다.
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
  },
};
