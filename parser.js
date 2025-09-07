let unparsedURL = "https://example.com:8080/path/to/resource?query=param#section";
console.log("Original:", unparsedURL);
let parsedUrl = new URL(unparsedURL);
console.log("Parsed:", parsedUrl);