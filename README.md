# Input text and textarea replacement using contenteditable attribute.

[TODO - brief summary]

## Demo
http://schartier.github.io/angular-edit/

## Dependencies
- required:
	[TODO]
- optional
	[TODO]

See `bower.json` and `index.html` in the `gh-pages` branch for a full list / more details

## Install
1. download the files
	1. Bower
		1. add `"angular-edit": "latest"` to your `bower.json` file then run `bower install` OR run `bower install angular-edit`
2. include the files in your app
	1. `edit.min.js`
	2. `edit.less` OR `edit.min.css` OR `edit.css`
3. include the module in angular (i.e. in `app.js`) - `schartier.angular-edit`

See the `gh-pages` branch, files `bower.json` and `index.html` for a full example.


## Documentation
See the `edit.js` file top comments for usage examples and documentation
https://github.com/schartier/angular-edit/blob/master/edit.js


## Development

1. `git checkout gh-pages`
	1. run `npm install && bower install`
	2. write your code then run `grunt`
	3. git commit your changes
2. copy over core files (.js and .css/.less for directives) to master branch
	1. `git checkout master`
	2. `git checkout gh-pages edit.js edit.min.js edit.less edit.css edit.min.css`
3. update README, CHANGELOG, bower.json, and do any other final polishing to prepare for publishing
	1. git commit changes
	2. git tag with the version number, i.e. `git tag v1.0.0`
4. create github repo and push
	1. [if remote does not already exist or is incorrect] `git remote add origin [github url]`
	2. `git push origin master --tags` (want to push master branch first so it is the default on github)
	3. `git checkout gh-pages`
	4. `git push origin gh-pages`
5. (optional) register bower component
	1. `bower register angular-edit [git repo url]`
