module.exports = function (eleventyConfig) {
eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

return {
dir: {
input: "src",
output: "_site"
},
markdownTemplateEngine: "njk",
htmlTemplateEngine: "njk",
dataTemplateEngine: "njk"
};
};