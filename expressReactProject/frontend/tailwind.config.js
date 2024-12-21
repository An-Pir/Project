/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = withMT({
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Open Sans', 'sans-serif'],
				roboto: ['Roboto', 'sans-serif'],
				montserrat: ['Montserrat', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif']
			},
			screens: {
				'xs': '475px',
				...defaultTheme.screens,
				'3xl': '1600px',
				'fhd': '1900px',
				'qhd': '2500px'
			},
		},
	},
	plugins: []
})
