/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  "./index.html",
	  "./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
	  extend: {
		colors: {
		  beige: "#f5f5dc",
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
		},
		backgroundImage: {
		  'gradient-moving': 'linear-gradient(270deg, #ffffff, #94a3b8, #3b82f6)',
		},
		animation: {
		  'bg-pan': 'bg-pan 20s ease infinite',
		  'slide-in': 'slideIn 0.6s ease-out forwards',
		  'fade-in': 'fadeIn 1s ease-in forwards',
		  'pop': 'pop 0.3s ease-out forwards',
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
