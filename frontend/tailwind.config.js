/** @type {import('tailwindcss').Config} */
module.exports = {
	purge: [
	  "./index.html",
	  "./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
	  extend: {
		colors: {
		  beige: '#f9f9dc',
		  amber: {
			50: '#fffbeb',
			100: '#fef3c7',
			200: '#fde68a',
			300: '#fcd34d',
			400: '#fbbf24',
			500: '#f59e0b',
			600: '#d97706',
			700: '#b45309',
			800: '#92400e',
			900: '#78350f',
			950: '#451a03',
		  },
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
		silver: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a', // Mid silver
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
          // Metallic variants
          'shiny': '#c0c0c0',
          'chrome': '#d3d3d3',
          'platinum': '#e5e4e2',
          'metallic': '#aaa9ad',
        },
		},
		backgroundImage: {
		  'gradient-moving': 'linear-gradient(270deg, #ffffff, #94a3b8, #3b82f6)',
		},
		dropShadow: {
		  'glow': '0 0 10px rgba(217, 119, 6, 0.7)',
		},
		animation: {
		  'bg-pan': 'bg-pan 20s ease infinite',
		  'slide-in': 'slideIn 0.6s ease-out forwards',
		  'fade-in': 'fadeIn 1s ease-in forwards',
		  'pop': 'pop 0.3s ease-out forwards',
		  'pulse-slow': 'pulse 3s ease-in-out infinite',
		},
		keyframes: {
			pop: {
				'0%': { transform: 'scale(1)' },
				'50%': { transform: 'scale(1.1)' },
				'100%': { transform: 'scale(1.03)' },
			},
		  'bg-pan': {
			'0%':   { backgroundPosition: '0% 50%' },
			'50%':  { backgroundPosition: '100% 50%' },
			'100%': { backgroundPosition: '0% 50%' },
		  },
		  slideIn: {
			'0%': {
			  opacity: 0,
			  transform: 'translateY(20px)',
			},
			'100%': {
			  opacity: 1,
			  transform: 'translateY(0)',
			},
		},
		fadeIn: {
			'0%':   { opacity: 0 },
			'25%':  { opacity: 0.2 },
			'50%':  { opacity: 0.5 },
			'75%':  { opacity: 0.8 },
			'100%': { opacity: 1 },
		  },
		},
	  },
	},
	plugins: [],
  }

// style={{ textAlign: "center", marginTop: "50px" }}
