export const sanitizeQuillOutput = (html) => {
  return html.replace(/<p><br><\/p>/g, "");
};