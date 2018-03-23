module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname + '/',
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },

    watch: true
};
