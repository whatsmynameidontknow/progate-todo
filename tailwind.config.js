/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            fontFamily: {
                rocksalt: ['"Rock Salt"', 'cursive'],
            },
        },
    },
    plugins: [],
};
