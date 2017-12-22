const webpack = require("webpack");

// Helps us to resolve paths as seen  in the line resolve()
const {resolve} = require("path");


const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

    entry: [
        "react-hot-loader/patch", //activates hot module replacement.

        "webpack-dev-server/client?http://localhost:8080", // connects to the necessary endpoint (localhost:8080)

        "webpack/hot/only-dev-server", // instructs Webpack to bundle our code, then provide it to the development server if/when bundling is successful.

        resolve(__dirname, "src", "index.jsx") //Here we are specifing the entry points where the bundling process starts
    ],

    // Here we are telling webpack where to place the newly-bundled code is placed

    output: {

        // determines  the name of the file containing our conca
        filename: "app.bundle.js",

        path: resolve(__dirname, "build"),

        //configuration for a single page application like ours
        publicPath:"/" 
    },

    // resolve tells webpack to look for files with  a certain file extension

    resolve: {

        extensions: [".js", ".jsx"]

    },

    // tells Webpack how to communicate errors. 
    devtool:"#sourcemap", 



    devServer:{
        hot:true, //enables HMR on the local server.

        contentBase:resolve(__dirname,"build"), //points to the source code it will serve in the browser.

        publicPath:"/" //specifies where hot-reloaded modules should be loaded

    },



    //it is important the eslinter to come before because they are executed in the decending 
    module: {
        rules: [
            {
                test: /\.jsx?$/, //takes a RegEx indication which file the loader should transform

                enforce:"pre", //specifies the preloader

                loader:"eslint-loader", 

                exclude:/node_modules/,  //we are excluding the the following file to prevent eslint from linting it

                options:{

                    emitWarning:true, //instructs eslinter to promp us with when there in mulpractice or bug

                    configFile:"./.eslintrc.json", //points to our config files

                    fix:true //Helps us fix bugs immediately they appear eg indention and single quotes

                }   

            },
                
            {
                test: /\.jsx?$/, //takes a RegEx indication which file the loader should transform

                loader: "babel-loader", //details which loader will be responsible for transforming these files

                exclude: /node_modules/, //indicates which files should not be transformed

                //tells babel which type of project we are working on (React) and the version of we are working on
                options: {
                    presets: 
                    [
                        ["es2015", {"modules":false}],
                        "react"
                        //Babel organizes code into format called commonJS by default. But this format doesn't support hot module replacement
                    ],
                    plugins:[
                        "react-hot-loader/babel"
                    ]
                }
            }
        ]
    },


    
    plugins:[
        new webpack.HotModuleReplacementPlugin(),

        new webpack.NamedModulesPlugin(),

        new HtmlWebpackPlugin({


            // tells the plugin which file it should use as a template for creating the index.html file in our build directory.
            template:"template.ejs",

            //provides the name of our HTML's root DOM node
            appMountId: "react-app-root",

            //simply sets the text our index's <title> tags.
            title:"React Help Queue",

            //is the location we'd like to place our programmatically-generated index.html.
            filename:resolve(__dirname,"build", "index.html")

        }),
    ]
};