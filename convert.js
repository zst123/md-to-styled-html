#!/usr/bin/env nodes
const showdown  = require('showdown');
const fs = require('fs');
const yargs = require('yargs')

const argv = yargs
    .usage('Usage: $0 [options]')
    .option('input', {
        alias: 'i',
        description: 'Input .md filename (default: README.md)',
        type: 'string',
    })
    .option('output', {
        alias: 'o',
        description: 'Output .html filename (default: append .html to input)',
        type: 'string',
    })
    .option('title', {
        alias: 't',
        description: 'Title of the .html file (default: empty string)',
        type: 'string',
    })
    .option('style', {
        alias: 's',
        description: 'Embed a .css theme in the .html file (default: no theme)',
        type: 'string',
    })
    .option('force', {
        alias: 'f',
        description: 'Overwrite if output file already exists (default: no)',
        type: 'boolean',
    })
    .demandOption(['input'], 'Please input .md file')
    .help('help')
    .alias('help', 'h')
    .argv;


let input_filename = argv.input || 'README.md'
let output_filename = argv.output || input_filename + '.html'
let theme_filename = argv.style || ''
let page_title = argv.title || ""
let overwrite = argv.force

var css_content = ''
if (theme_filename != '') {
    fs.readFile(theme_filename, function (err, data) {
        if (err) {
            throw err;
        }
        css_content = data;
        process();
    });

} else {
    process();
}

function process() {
    fs.readFile(input_filename, function read(err, data) {
        console.log("Input: " + input_filename);
        console.log("Output: " + output_filename + (overwrite ? ' (overwrite)' : ''));
        console.log("Theme: " + theme_filename);
        if (err) {
            throw err;
        }

        // Convert markdown to HTML
        converter = new showdown.Converter({
            ghCompatibleHeaderId: true,
            parseImgDimensions: true,
            simplifiedAutoLink: true,
            simpleLineBreaks: true,
            strikethrough: true,
            tasklists: true,
            ghMentions: true,
            tables: true
        });
        // converter.setFlavor('github');
        const md_content = data.toString();
        const html_content = converter.makeHtml(md_content)

        // Insert it into template
        let html_entire = `
        <html>
            <head>
                <title>${page_title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body class='markdown-body'>
                <div id='content'>

                    ${html_content}

                </div>
                <style type='text/css'>
                    ${css_content}
                </style>
            </body>
        </html>`;

        // Write to output
        const flag = overwrite ? 'w' : 'wx'
        fs.writeFile(output_filename, html_entire, { flag: flag }, function(err) {
            if (err) {
                console.log("File '" + output_filename + "' already exists. Aborted!");
            } else {
                console.log("Done, saved to " + output_filename);
            }    
        });
    });
}
