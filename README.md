# md-to-styled-html

Convert a markdown file to styled HTML page with [showdownjs](https://github.com/showdownjs/showdown).

HTML styles are used to stylise the HTML page in the `/themes` folder (courtesy of [markdown-viewer](https://github.com/simov/markdown-viewer/tree/master/themes)). You can also specify your own CSS file.

### Usage

Install dependencies

	$ npm install

Convert your markdown file

	$ node convert.js -i my_file.md -o index.html -s themes/github-dark.css -t 'My Project Page'

List of parameters

	$ node convert.js --help
	Usage: convert.js [options]

	Options:
	  --version     Show version number                                    [boolean]
	  --input, -i   Input .md filename (default: README.md)      [string] [required]
	  --output, -o  Output .html filename (default: append .html to input)  [string]
	  --title, -t   Title of the .html file (default: empty string)         [string]
	  --style, -s   Embed a .css theme in the .html file (default: no theme)[string]
	  --force, -f   Overwrite if output file already exists (default: no)  [boolean]
	  --help, -h    Show help                                              [boolean]

### Example

https://zst123.github.io/md-to-styled-html/index.html

Example of README.md with torpedo.css theme

	$ node convert.js -i README.md -o index.html -s themes/torpedo.css -t 'md-to-styled-html'
