import { glob } from "glob";
import fs from "fs/promises";
import { remark } from "remark";
import strip from "strip-markdown";
import matter from "gray-matter";

const WPM = 220;

async function calculateReadingTime() {
  console.log("Starting reading time calculation...");
  const reviewFiles = await glob("reviews/**/*.md");
  console.log(`Found ${reviewFiles.length} review files.`);

  if (reviewFiles.length === 0) {
    console.log("No review files found. Exiting.");
    return;
  }

  for (const file of reviewFiles) {
    try {
      const fileContent = await fs.readFile(file, "utf8");
      const { data: frontmatter, content: markdownContent } =
        matter(fileContent);

      const plainText = String(
        await remark().use(strip).process(markdownContent),
      );
      const wordCount = plainText.trim().split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / WPM);

      if (frontmatter.readingTime !== readingTime) {
        const newFrontmatter = { ...frontmatter, readingTime };
        const newFileContent = matter.stringify(
          markdownContent,
          newFrontmatter,
        );

        await fs.writeFile(file, newFileContent, "utf8");
        console.log(`Updated ${file}: readingTime -> ${readingTime} minutes`);
      } else {
        console.log(`No update needed for ${file}`);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  console.log("Reading time calculation complete.");
}

calculateReadingTime();
