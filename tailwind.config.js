
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background': "url(./assets/background.svg)",
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: '#26A96C',
          foreground: 'hsl(var(--primary-foreground))',
          light: 'rgba(38, 169, 108, 0.1)',
        },
        secondary: {
          DEFAULT: '#3B6064',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
       
        text: {
          primary: '#03012C',
          secondary: '#3B6064',
        },
        "color-5": "#fff",
        "color-2": "#03012c",
        darkgray: "#9ca3af",
        color: "#26a96c",
        dimgray: "#49485b",
        "color-6": "#909090",
        ghostwhite: "rgba(249, 248, 254, 0.8)",
        whitesmoke: {
          "100": "#f9fafb",
          "200": "#f8f8f8",
          "300": "#f6f6f6",
          "400": "#eee",
          "500": "rgba(247, 247, 247, 0.7)",
        },
        gainsboro: {
          "100": "#dedede",
          "200": "#dbdbdb",
          "300": "#d9d9d9",
          "400": "rgba(222, 222, 222, 0.09)",
          "500": "#e6e6e6",
        },
        "color-3": "#3b6064",
        darkslategray: {
          "100": "#374151",
          "200": "rgba(46, 62, 92, 0.8)",
        },
        gray: {
          "100": "rgba(255, 255, 255, 0.65)",
          "200": "rgba(255, 255, 255, 0.8)",
        },
        "main-color-1": "#1e1f4b",
        mediumseagreen: "#40c285",
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
