export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: 'rgb(var(--bg) / <alpha-value>)',        // page background
        soft: 'rgb(var(--bg-soft) / <alpha-value>)',   // alternate section background
        card: 'rgb(var(--card) / <alpha-value>)',      // card / surface background
        ink: 'rgb(var(--ink) / <alpha-value>)',        // primary text
        muted: 'rgb(var(--muted) / <alpha-value>)',    // secondary text
        faint: 'rgb(var(--faint) / <alpha-value>)',    // tertiary text
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          ink: 'rgb(var(--accent-ink) / <alpha-value>)', // text on accent bg
        },
      },
    },
  },
  plugins: [],
};
