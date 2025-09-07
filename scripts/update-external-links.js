
const fs = require("fs");
const path = require("path");

// Recursively get all JSX/TSX files in a directory
function getAllComponentFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllComponentFiles(filePath, fileList);
    } else if (filePath.endsWith(".jsx") || filePath.endsWith(".tsx")) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// Update external <a> tags in file content
function updateExternalLinks(content) {
  // Regex: Find <a ... href="http(s)://...">
  return content.replace(
    /<a([^>]*?)\s+href=(["'])(https?:\/\/.*?)(["'])([^>]*)>/gi,
    (match, beforeHref, quote1, url, quote2, afterHref) => {
      // Add rel and target if missing
      let newTag = `<a${beforeHref} href=${quote1}${url}${quote2}${afterHref}`;
      if (!/target\s*=\s*["'][^"']*["']/.test(match)) {
        newTag += ' target="_blank"';
      }
      if (!/rel\s*=\s*["'][^"']*["']/.test(match)) {
        newTag += ' rel="nofollow noopener noreferrer"';
      }
      newTag += ">";
      return newTag;
    }
  );
}

// Main
const rootDir = path.join(__dirname, "..", "src");
const files = getAllComponentFiles(rootDir);

files.forEach((file) => {
  const content = fs.readFileSync(file, "utf8");
  const updatedContent = updateExternalLinks(content);
  if (content !== updatedContent) {
    fs.writeFileSync(file, updatedContent, "utf8");
    console.log(`Updated external links in ${file}`);
  }
});

console.log("Done updating external links!");
