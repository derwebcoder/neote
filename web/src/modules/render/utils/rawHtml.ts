/**
 * (!) Use only for testing purposes!
 * It will remove any repeated whitespace, it will also destroy text content that way.
 *
 * @param html
 * @returns
 */
export const rawHtml = (html: string | HTMLElement | Array<HTMLElement>) => {
  let htmlString = html;

  if (Array.isArray(htmlString)) {
    htmlString = htmlString[0];
  }

  if (typeof htmlString !== "string") {
    htmlString = (htmlString as HTMLElement).outerHTML;
  }

  htmlString = htmlString.replace(/\s+/g, " ").trim();

  return htmlString;
};
