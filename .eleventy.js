module.exports = function (eleventyConfig) {
eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

return {
dir: {
input: "src",
output: "docs"
},
pathPrefix: "/historic_glass_museum_foundation/",
markdownTemplateEngine: "njk",
htmlTemplateEngine: "njk",
dataTemplateEngine: "njk"
};
};