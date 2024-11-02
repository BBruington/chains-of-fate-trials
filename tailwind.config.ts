import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		keyframes: {
  			inputPulse: {
  				'0%, 10%, 30%, 50%, 70%, 90%': {
  					backgroundColor: '#A61919'
  				},
  				'20%, 40%, 60%, 80%, 100%': {
  					backgroundColor: '#CB7979'
  				}
  			},
  			posePulse: {
  				'0%, 100%': {
  					opacity: '.25'
  				},
  				'50%': {
  					opacity: '.75'
  				}
  			},
  			reveal: {
  				'0%': {
  					transform: 'translateX(0%)'
  				},
  				'100%': {
  					transform: 'translateX(100%)'
  				}
  			},
  			swipe: {
  				'0%': {
  					transform: 'translateX(-50%) skew(-30deg)'
  				},
  				'100%': {
  					transform: 'translateX(0%) skew(-30deg)'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			reveal: 'reveal .5s forwards',
  			inputPulse: 'inputPulse 4s ease-in-out',
  			posePulse: 'posePulse 3s ease-in-out infinite',
  			swipe: 'swipe .2s 1',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		cursor: {
  			pinkCursor: 'url(/cursors/pink-cursor.png), auto',
  			pinkCursorPointer: 'url(/cursors/pink-cursor-pointer.png), pointer',
  			blueCursor: 'url(/cursors/blue-cursor.png), auto',
  			blueCursorPointer: 'url(/cursors/blue-cursor-pointer.png), pointer',
  			greenCursor: 'url(/cursors/green-cursor.png), auto',
  			greenCursorPointer: 'url(/cursors/green-cursor-pointer.png), pointer',
  			redCursor: 'url(/cursors/red-cursor.png), auto',
  			redCursorPointer: 'url(/cursors/red-cursor-pointer.png), pointer'
  		},
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			}
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		}
  	}
  },
  plugins: [],
};
export default config;
