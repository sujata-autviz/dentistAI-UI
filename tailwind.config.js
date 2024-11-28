/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                textBlack: '#1E1E1E',
                textDanger: '#ED1B24',
            }
        },
    },
    plugins: [],
}