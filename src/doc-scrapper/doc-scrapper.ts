import axios from "axios";
import { load } from "cheerio";

export class DocScrapper {
  constructor() {}

  public async downloadURLContent(url: string) {
    try {
      const response = await axios.get(url);
      const htmlString = response.data;
      // Example class name of the div element
      const targetClassName = "markdown";
      // Load the HTML string into cheerio
      const $ = load(htmlString);
      // Find the div element with the specific class
      const targetDiv = $(`article.${targetClassName}`);
      // Extract the inner HTML of the target div
      const extractedContent = targetDiv
        .text()
        .trim()
        .replace(/(\r\n|\n|\r)/gm, " ");

      // Output the extracted content
      console.log(extractedContent);
      return extractedContent ?? "";
    } catch (error: any) {
      console.error("Error:", error.message);
      return "";
    }
  }
}
