const indent = (depth: number) =>
  Array(2 * depth)
    .fill(" ")
    .join("");

export const converter = (json: unknown, depth = 1): string => {
  const idt0 = indent(depth - 1);
  const idt = indent(depth);

  if (typeof json === "string") {
    return `"${json}"`;
  }
  if (typeof json === "number") {
    return `${json}`;
  }
  if (json instanceof Array) {
    return `[\n${json
      .map((it) => `${idt}${converter(it, depth + 1)},\n`)
      .join("")}${idt0}]`;
  }
  if (json instanceof Object) {
    return `{\n${Object.keys(json)
      .map((k) => `${idt}"${k}" = ${converter((json as any)[k], depth + 1)}\n`)
      .join("")}${idt0}}`;
  }

  return "";
};
