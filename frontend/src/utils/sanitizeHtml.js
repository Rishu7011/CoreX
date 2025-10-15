const ALLOWED = ["strong","em","code","pre","br","mark"];
export const sanitizeHtml = (html) => {
  const div = document.createElement("div"); div.innerHTML = html;
  div.querySelectorAll("*").forEach((n) => { if (!ALLOWED.includes(n.tagName.toLowerCase())) n.replaceWith(document.createTextNode(n.textContent)); });
  return div.innerHTML;
};