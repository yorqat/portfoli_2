# 🧱 UI Components Mixin Checklist

This document tracks whether each core UI component has a **default style definition encapsulated in a mixin**.  
Mixins should be flexible (accept props), composable, and named clearly (e.g. `@mixin button`, `@mixin input-field`, etc.).

---

## 🔹 Layout Components

| Component       | Mixin Implemented? | Notes                                                            |
| --------------- | ------------------ | ---------------------------------------------------------------- |
| Container       | ⬜                 | Define max-widths, padding, responsive variants                  |
| Grid / Flex     | ⬜                 | Useful for layout scaffolding. Variant: direction, gap           |
| Header / Navbar | ⬜                 | Include spacing, height, shadow, sticky variant, theming         |
| Sidebar         | ⬜                 | Vertical stack layout, scroll overflow. Variants: collapse state |
| Footer          | ⬜                 | Usually consistent padding, border-top, responsive layout        |

---

## 🔹 Input & Control Components

| Component         | Mixin Implemented? | Notes                                                                                                                                  |
| ----------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| Button            | ⬜                 | Variants: `primary`, `secondary`, `ghost`, `danger`, `link`. States: `hover`, `active`, `disabled`, `loading`. Sizes: `sm`, `md`, `lg` |
| Input (Text)      | ⬜                 | Variants: `default`, `error`, `success`. States: `focused`, `disabled`, `readonly`                                                     |
| Textarea          | ⬜                 | Shares base input styles; supports `resize`, `error`, `disabled`                                                                       |
| Checkbox          | ⬜                 | Custom checkmark, support `indeterminate`, `checked`, `disabled`, accessibility                                                        |
| Radio Button      | ⬜                 | Shared logic with checkbox, theme-aware                                                                                                |
| Select / Dropdown | ⬜                 | Support `filled`, `outlined`, caret styling, hover, focus states                                                                       |
| Toggle / Switch   | ⬜                 | `on`/`off` styles, supports labels, accessibility helpers                                                                              |
| Slider            | ⬜                 | Styles for track, thumb, active segments                                                                                               |
| Date Picker       | ⬜                 | Often themed around input. Consider integration mode with external lib                                                                 |

---

## 🔹 Display & Feedback Components

| Component      | Mixin Implemented? | Notes                                                                                      |
| -------------- | ------------------ | ------------------------------------------------------------------------------------------ |
| Card           | ✅                 | Base layout mixin available. Variants: `elevated`, `outlined`, `hoverable`                 |
| Badge / Tag    | ⬜                 | Color variants (`success`, `info`, `warning`, `error`), sizes (`sm`, `md`)                 |
| Alert / Toast  | ⬜                 | Type variants (`success`, `warning`, `info`, `danger`), includes icon slot, dismiss button |
| Modal / Dialog | ⬜                 | Centered panel w/ backdrop. States: `open`, `closed`, optional animations                  |
| Tooltip        | ⬜                 | Placement variants (`top`, `right`, etc.), arrow support, accessibility                    |
| Spinner        | ⬜                 | Color and size variants, keyframe animation optionality                                    |
| Progress Bar   | ⬜                 | Support `indeterminate`, `buffer`, `striped`, theming                                      |
| Avatar         | ⬜                 | Shape (`circle`, `square`), size (`sm`, `md`, `lg`), fallback initial                      |
| List / Table   | ⬜                 | Style variants: `bordered`, `zebra`, `hoverable`. Table: headers, footers                  |
| Pagination     | ⬜                 | States: `active`, `disabled`. Size variants. Icons optional                                |

---

## 🔹 Navigation Components

| Component        | Mixin Implemented? | Notes                                                                                          |
| ---------------- | ------------------ | ---------------------------------------------------------------------------------------------- |
| Tabs             | ⬜                 | Orientation variants (`horizontal`, `vertical`), underline vs block. States: `active`, `hover` |
| Breadcrumbs      | ⬜                 | Separator customization (`/`, `›`, etc.), truncation, ellipsis support                         |
| Drawer           | ⬜                 | Slide-in animation, from `left` or `right`. States: `open`, `closed`                           |
| Stepper / Wizard | ⬜                 | Step states (`complete`, `current`, `upcoming`), orientation variants                          |

---

## 🔹 Utility Components

| Component              | Mixin Implemented? | Notes                                                                          |
| ---------------------- | ------------------ | ------------------------------------------------------------------------------ |
| Accordion / Disclosure | ⬜                 | Collapsible content. States: `open`, `closed`. Animate height                  |
| Search Bar             | ⬜                 | Input field + icon. Variants: `inline`, `expandable`                           |
| Filter Panel           | ⬜                 | Layout of grouped filters (checkboxes, tags, sliders). Support sticky or modal |
| File Upload            | ⬜                 | States: `default`, `drag-over`, `error`. UI: Button or dropzone                |
| Notification Center    | ⬜                 | List of alert-like items. Positioning (`top-right`, etc.)                      |
| Shortcut Handler       | ⬜                 | Mostly JS-based, but possible visual indicators                                |

---

## 📌 Notes

- All mixins should **consume design tokens** from something like `_tokens.scss` (colors, radii, spacing, font sizes).
- Encourage **explicit variant support** using mixin parameters (e.g. `@mixin button($variant: 'primary', $size: 'md')`).
- Prefer **semantic names**: avoid overly generic terms like `@mixin rounded`; instead, use `@mixin card-base`, `@mixin input-wrapper`, etc.
- Favor **modular mixins** that compose into more complex ones. E.g. `@mixin surface` + `@mixin spacing` used inside `@mixin card`.
- Consider optional **style fallbacks** (e.g. flat vs elevated card) when features are not supported (e.g. box-shadow).
- Group stateful behavior like `hover`, `focus`, `disabled`, and `invalid` styling inside the mixin by default.

---

**Next Steps:**

- [ ] Prioritize high-usage components like `button`, `input`, `card`, and `badge`.
- [ ] Define shared utility mixins like `@mixin flex-center`, `@mixin visually-hidden`, `@mixin focus-ring`.
- [ ] Optionally auto-generate component docs from Sass annotations using [SassDoc](http://sassdoc.com/) or equivalent.

---

If you want, I ca
