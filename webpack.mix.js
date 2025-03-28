const mix = require("laravel-mix");

mix.js("resources/js/app.js", "public/js")
    .version()
    .sourceMaps()
    .vue()

    .sass("resources/scss/app.scss", "public/css")
    .sourceMaps();

mix.webpackConfig({
    resolve: {
        extensions: [".js", ".vue", ".json"],
        // alias: {
        //     "@": path.resolve("resources/assets/web/js"),
        //     "@components": path.resolve("resources/assets/web/js/components"),
        //     "@icons": path.resolve("resources/assets/web/js/icons"),
        // },
    },
    // output: {
    //     chunkFilename: "static/js/chunks/[name].js",
    // },
});

// mix.browserSync({
//     proxy: "http://127.0.0.1:8000",
//     host: "laravel-passkeys.dev",
// });
