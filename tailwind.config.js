/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
    ],
    theme: {
        container: {
            screens: {
                // 'tablet': '640px',
                // 'laptop': '1024px',
                // 'desktop': '1280px',
                // sm: "600px",
                // md: "728px",
                // lg: "984px",
                // xl: "1240px",
                "2xl": "1496px",
            },
        },
        extend: {},
    },
    plugins: [],
};
