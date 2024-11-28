/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            maxHeight: {
                'table-custom-height': 'calc(100vh - 200px)',
            },
            colors: {
                textBlack: '#1E1E1E',
                textDanger: '#ED1B24',
            }
        },
    },
    plugins: [],
}