export const parseCodeBlocks = (text) => {
  const re = /```(\w+)?\n([\s\S]*?)```/g; const out = []; let m;
  while ((m = re.exec(text))) out.push({ language: m[1] || "plaintext", code: m[2].trim() });
  return out;
};