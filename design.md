# Design Tokens

## Font

| Token | Value |
|---|---|
| `--font-family-sans` | `'SCoreDream', system-ui, sans-serif` |
| `--font-family-mono` | `monospace` |
| `--font-size-xs` | `0.75rem` (12px) |
| `--font-size-sm` | `0.875rem` (14px) |
| `--font-size-base` | `1rem` (16px) |
| `--font-size-lg` | `1.125rem` (18px) |
| `--font-size-xl` | `1.25rem` (20px) |
| `--font-size-2xl` | `1.5rem` (24px) |
| `--font-size-3xl` | `1.75rem` (28px) |
| `--line-height-tight` | `1.25` |
| `--line-height-normal` | `1.5` |
| `--line-height-loose` | `1.75` |

## Color

| Token | Value |
|---|---|
| `--background-color` | `#FFFFFF` |
| `--background-color-secondary` | `#E6F7F8` |
| `--text-primary` | `#1F3233` |
| `--text-secondary` | `#285F63` |
| `--color-primary` | `#1E8E96` |
| `--color-primary-dark` | `#285F63` |
| `--color-accent` | `#00BCC9` |
| `--border-color` | `#C8EAEC` |
| `--btn-primary-bg` | `#1E8E96` |
| `--btn-primary-text` | `#FFFFFF` |

## Spacing

| Token | Value |
|---|---|
| `--spacing-1` | `4px` |
| `--spacing-2` | `8px` |
| `--spacing-3` | `12px` |
| `--spacing-4` | `16px` |
| `--spacing-6` | `24px` |
| `--spacing-8` | `32px` |
| `--spacing-12` | `48px` |
| `--spacing-16` | `64px` |
| `--spacing-24` | `96px` |

## Border Radius

| Token | Value |
|---|---|
| `--radius-sm` | `4px` |
| `--radius-md` | `8px` |
| `--radius-lg` | `12px` |
| `--radius-full` | `9999px` |

## Button

```css
.btn-primary {
  background: var(--btn-primary-bg);   /* #1E8E96 */
  color: var(--btn-primary-text);      /* #FFFFFF */
}
.btn-primary:hover {
  background: var(--color-primary-dark); /* #285F63 */
}
```
