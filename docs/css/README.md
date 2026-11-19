# Minimum CSS

The whole app uses **one CSS file**: `sculptures/src/index.css` (about 50 lines).
It is loaded once in `main.jsx`:

```js
import './index.css'
```

No classes, no frameworks. We only style **HTML tags** (`h1`, `ul`, `table`...) and the `#root` box.

> Learn more: [W3Schools CSS Tutorial](https://www.w3schools.com/css/)

---

## First, five words

- **Rule (selector + property + value)**: every piece of CSS has the same shape. The **selector** says **which** elements, the **property** says **what** to change, the **value** says **how**.
  > "A CSS rule consists of a selector and a declaration block."
  > [W3Schools: CSS Syntax](https://www.w3schools.com/css/css_syntax.asp)

  ```css
  h1 { color: red; }
  /* h1 = selector, color = property, red = value */
  ```

  > "CSS selectors are used to "find" (or select) the HTML elements you want to style."
  > [W3Schools: CSS Selectors](https://www.w3schools.com/css/css_selectors.asp)

- **Element selector**: just the **tag name**. It selects **all** elements of that tag. This is the one we use most: `body`, `h1`, `h2`, `table`, `ul`.
  > "The `element` selector selects HTML elements based on the element name."
  > [W3Schools: CSS Selectors](https://www.w3schools.com/css/css_selectors.asp)

  ```css
  ul { list-style: none; }   /* every <ul> on the page */
  ```

- **Id selector**: a selector that starts with **`#`**. It selects the **one** element with that `id` in the HTML.
  > "The `id` selector uses the id attribute of an HTML element to select a specific element."
  > [W3Schools: CSS Selectors](https://www.w3schools.com/css/css_selectors.asp)

  ```css
  #root { margin: 0 auto; }   /* only <div id="root"> */
  ```

- **Pseudo-class**: a selector that starts with **`:`**. It selects elements by a **state** or **position**, not by name (e.g. `:hover` = mouse over it, `:root` = the top element).
  > "A CSS pseudo-class is a keyword that can be added to a selector, to define a style for a special state of an element."
  > [W3Schools: CSS Pseudo-classes](https://www.w3schools.com/css/css_pseudo_classes.asp)

  ```css
  button:hover { color: red; }   /* only when the mouse is over a button */
  ```

- **At-rule**: starts with **`@`**. It is **not** a selector: it wraps other rules and decides **when** they apply.
  > "CSS at-rules are statements that instruct CSS on how to behave."
  > [W3Schools: CSS At-rules](https://www.w3schools.com/cssref/css_ref_atrules.php)

  ```css
  @media (prefers-color-scheme: dark) {
    :root { --bg: #16171d; }   /* only when the computer is in dark mode */
  }
  ```

> Not used here: the **class selector** (`.name`) selects all elements with `class="name"` (in React: `className="name"`).
> "The `class` selector selects HTML elements with a specific class attribute." [W3Schools: CSS Selectors](https://www.w3schools.com/css/css_selectors.asp)

---

## Before / after

On the left, the browser with **no CSS** at all. On the right, the **same page with our CSS**.

| No CSS | With our CSS |
|---|---|
| ![Home without CSS](img/home-no-css.png) | ![Home with CSS](img/home.png) |

What changed:

- everything is **centered**
- a modern **font** (`system-ui`)
- **softer text color** (grey instead of black)
- headings are **lighter** (not bold)

---

## The rules, one by one

### 1. Colors and font: `:root`

> "The `:root` selector matches the document's root element."
> [W3Schools: CSS Variables](https://www.w3schools.com/css/css3_variables.asp)

```css
:root {
  --text: #6b6375;
  --text-h: #08060d;
  --bg: #fff;

  font: 18px/1.45 system-ui, sans-serif;
  color-scheme: light dark;
  color: var(--text);
  background: var(--bg);
}
```

- `:root` is the whole page.
- `--text`, `--text-h` and `--bg` are **variables**: we write each color **once** and reuse it.
  - `--text` is the normal text color
  - `--text-h` is the heading color
  - `--bg` is the background
- `font: 18px/1.45 system-ui` sets the text size to 18px with comfortable line spacing, using the computer's own font.
- `color-scheme: light dark` tells the browser that we support both themes, so buttons and inputs also follow the theme.

### 2. Dark mode: `@media (prefers-color-scheme: dark)`

> "The CSS `@media` rule is used in media queries to apply different styles for different media types/devices."
> [W3Schools: CSS @media Rule](https://www.w3schools.com/cssref/atrule_media.php)

```css
@media (prefers-color-scheme: dark) {
  :root {
    --text: #9ca3af;
    --text-h: #f3f4f6;
    --bg: #16171d;
  }
}
```

If your computer is in **dark mode**, we only **change the 3 variables**.
Everything else updates automatically, because it all uses those variables.

| Light | Dark |
|---|---|
| ![Light mode](img/home.png) | ![Dark mode](img/home-dark.png) |

### 3. Remove the page margin: `body`

> "The `<body>` tag defines the document's body."
> [W3Schools: HTML body tag](https://www.w3schools.com/tags/tag_body.asp)

```css
body {
  margin: 0;
}
```

Browsers add a small margin around the page by default (`margin: 8px`). We remove it.

### 4. The main box: `#root`

> "The CSS `#id` selector selects the element with the specified id."
> [W3Schools: CSS #id Selector](https://www.w3schools.com/cssref/sel_id.php)

```css
#root {
  max-width: 1126px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
}
```

`#root` is the `<div id="root">` in `index.html` where React draws the app.

- `max-width: 1126px` stops the page getting too wide on big screens.
- `margin: 0 auto` puts the box in the **middle** of the screen.
- `padding: 0 1rem` leaves a little space on the left and right (useful on phones).
- `text-align: center` **centers** all the text inside.

#### `:root` vs `#root`

`:root` and `#root` look alike, but they are **not the same thing**:

| | `:root` | `#root` |
|---|---|---|
| Type | pseudo-class (`:`) | id selector (`#`) |
| Selects | the `<html>` element (top of the page) | the element with `id="root"` |
| Comes from | the browser, always exists | us, written in `index.html` |
| We use it for | global **variables**, font, colors | the **box** where React draws the app |

```text
<html>              <- :root
  <body>            <- body
    <div id="root"> <- #root  (React app lives here)
      <h1>, <ul>, <table>...
```

The name "root" in `#root` is just the id Vite picked. It has nothing to do with `:root`.

### 5. Headings: `h1`, `h2`

```css
h1,
h2 {
  font-weight: 500;
  color: var(--text-h);
}

h1 {
  font-size: clamp(36px, 5vw, 56px);
}

h2 {
  font-size: 24px;
}
```

- Headings use the **darker** color `--text-h`, so they stand out from the text.
- `font-weight: 500` makes them a bit lighter than the default bold.
- `clamp(36px, 5vw, 56px)` gives a **responsive** title size: never smaller than 36px, never bigger than 56px, and in between it follows the screen width (`5vw` = 5% of the window width).

### 6. Center the table: `table`

> "The `<table>` tag defines an HTML table."
> [W3Schools: HTML table tag](https://www.w3schools.com/tags/tag_table.asp)

```css
table {
  margin: 0 auto;
}
```

`text-align: center` centers **text**, but a `<table>` is a **box**, so it stays on the left.
`margin: 0 auto` centers the box itself. It's the same trick we used for `#root`.

| No CSS | With our CSS |
|---|---|
| ![Remove without CSS](img/remove-no-css.png) | ![Remove with CSS](img/remove.png) |

### 7. Lists without bullets: `ul`

```css
ul {
  list-style: none;
  padding: 0;
}
```

- `list-style: none` removes the bullets (•).
- `padding: 0` removes the space browsers leave on the left for the bullets. Without it, the centered list would sit slightly to the right.

| No CSS | With our CSS |
|---|---|
| ![Filter without CSS](img/filter-by-year-no-css.png) | ![Filter with CSS](img/filter-by-year.png) |

---

## All the views

| Home | Add |
|---|---|
| ![Home](img/home.png) | ![Add](img/add.png) |

| Remove | Filter by year |
|---|---|
| ![Remove](img/remove.png) | ![Filter by year](img/filter-by-year.png) |

---

## What we did **not** need

- **No CSS classes** (`className`): styling the tags is enough for this app.
- **No CSS framework** (Bootstrap, Tailwind...).
- **No extra files**: the `App.css` that came with the Vite template was deleted because nothing used it.
- **No inline styles**: the menu bar in `Layout.jsx` is a `<nav>` with React Router `<Link>`s, styled in `index.css` with the `nav` element selector (`display: flex; gap: 1rem; ...`) that puts the links in a row with a line under them.

---

> Screenshots taken from the real app (`npm run dev`) at 1000px wide, using headless Chrome.
