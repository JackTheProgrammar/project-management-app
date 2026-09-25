# Project Rules & Development Guidelines

When working on this project, adhere strictly to the following rules and conventions:

## 1. Naming Conventions & Class Names
- Always use `jd-` prefixes for class names in JSX and LESS files (e.g., `className="jd-org-sidebar"`).
- Class names must be meaningful and follow BEM-like or structured naming.

## 2. Styling Architecture & Imports
- Always import `@import "../../variables.less";` and `@import "../../mixins.less";` (adjust relative paths depending on file depth) in all `.less` files.
- Always use parent-nested styles for LESS files (avoid flat/global styling outside of nesting).
- **NEVER** use `!important` or `:has()` pseudo-classes.
- Avoid `display: grid`, `display: float`, etc. Prefer **`display: flex`** (using mixins like `.flex()`, `.align-center()`, etc.) for layouts.

## 3. Typography & Spacing
- Base font family is **Source Sans Pro**.
- Base font size is `14px`, so **`1rem = 14px`**.
- **Spacing Rule (4x4 grid)**: Margin and padding sizes must strictly follow multiples of 4px using the defined variables (`@1x` = 4px, `@2x` = 8px, `@3x` = 12px, `@4x` = 16px, etc. up to `@30x`). Do **not** use arbitrary sizes like 15px or 25px.

## 4. Logical Properties
- Always use CSS logical properties for spacing where applicable (e.g., `margin-block-end` / `margin-block-start` / `margin-inline-end` / `margin-inline-start`) instead of physical directional properties like `margin-bottom` or `margin-left`.

## 5. Mobile Responsiveness
- Always write mobile screen responsive media queries for every `.less` file created or modified.

## 6. Reusable & Flexible JSX Components
- Build components to be reusable and flexible.
- Accept a `customClass` (or `className`) prop from the parent and append it to the component's root parent `div` (or wrapper element).
