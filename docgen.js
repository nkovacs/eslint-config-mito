var extend = require("xtend");


function parseFile(contents) {
    var rules = contents.rules || {};
    if (contents.extends) {
        for (var i = 0, l = contents.extends.length; i < l; i++) {
            var subrules = parseFile(require(contents.extends[i].replace(/^eslint-config-mito/, '.') + '.js'));
            rules = extend(rules, subrules);
        }
    }
    return rules;
}

if (process.argv.length < 3) {
    console.log('missing filename');
    process.exit(1);
}

var rules = parseFile(require(process.argv[2]));

var md = '';

for (var rulename in rules) {
    md += '* [' + rulename + ']' + '(http://eslint.org/docs/rules/' + rulename + '): ' + JSON.stringify(rules[rulename]) + "\n";
}

console.log(md);
