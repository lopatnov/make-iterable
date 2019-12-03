var fs = require("fs");
var obj = JSON.parse(fs.readFileSync("package.json", "utf8"));
var registry = "https://registry.npmjs.org";
for (var i = 0; i < process.argv.length; i++) {
    if (process.argv[i] === '-s') {
        registry = process.argv[++i];
        break;
    }
}
obj.publishConfig.registry = registry;
fs.writeFileSync("package.json", JSON.stringify(obj, null, 4));