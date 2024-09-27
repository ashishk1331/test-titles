![Banner for test titles.](banner.jpg)

# Test Titles

A simple formatting-language-based string generator to produce more vivid and practical test titles for your next project.

## Features:

1. Simple to use
2. 0 dependencies
3. Easy to learn and set up

## Core Philosophy

| Symbol | Element | Color   | Purpose  |
| ------ | ------- | ------- | -------- |
| \.     | Meta    | Yellow  | Classify |
| \#     | Topic   | Magenta | Identify |
|        | Title   | White   | Text     |
| \*     | Args    | Red     | Modifier |

1. You can use more than one meta element; they function like classes assigned to an HTML element.
2. However, you can only add a single topic name to each title, which behaves like an ID assigned to an HTML element.
3. You can also add any number of arguments to the title, which are similar to the arguments passed to a function.
4. Every other word without any symbol prefixed to it will be regarded as text for the title.

## Usage

1. Install the package

   ```sh
   npm i -D @hugekontrast/test-titles
   ```

2. Use the `t` function in your test blocks for the colorful test titles.

   ```js
   // sum.test.js
   import { expect, test } from "vitest";
   import { sum } from "./sum.js";
   import { t } from "@hugekontrast/test-titles";

   test(t("#addition 1 + 2 to equal 3"), () => {
     expect(sum(1, 2)).toBe(3);
   });
   ```
