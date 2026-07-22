export const stripHtmlTags = (html) => {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
};

export const readTime = (html) => {
  const words = stripHtmlTags(html).split(" ").filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
};

export const formatDate = (date, long = false) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        month: long ? "long" : "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recent";

export const truncate = (text, max = 160) =>
  !text || text.length <= max ? text || "" : text.substring(0, max).trim() + "…";
