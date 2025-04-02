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
		},
		backgroundImage: {
		  'gradient-moving': 'linear-gradient(270deg, #ffecd2, #fcb69f, #a1c4fd, #c2e9fb)',
		},
		animation: {
		  'bg-pan': 'bg-pan 20s ease infinite',
		  'slide-in': 'slideIn 0.6s ease-out forwards',
		  'fade-in': 'fadeIn 1s ease-in forwards',
		},
		keyframes: {
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