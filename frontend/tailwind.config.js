/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
	"./index.html",
	"./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
		colors: {
			beige: "#f5f5dc"
		},
		backgroundImage: {
			'gradient-moving': 'linear-gradient(270deg, #ffecd2, #fcb69f, #a1c4fd, #c2e9fb)',
		  },
		  animation: {
			'bg-pan': 'bg-pan 20s ease infinite',
		  },
		  keyframes: {
			'bg-pan': {
			  	'0%':   { backgroundPosition: '0% 50%' },
				// '25%':  { backgroundPosition: '50% 50%' },
				'50%':  { backgroundPosition: '100% 50%' },
				// '75%':  { backgroundPosition: '50% 50%' },
				'100%': { backgroundPosition: '0% 50%' },
				},
			},
  		},
	},
  plugins: [],
}

// style={{ textAlign: "center", marginTop: "50px" }}