export function createGroup(title, desc) {
  if (typeof title !== "string" || title.trim() === "") {
    throw new Error("Title must be a non-empty string");
  }

  if (typeof desc !== "string" || desc.trim() === "") {
    throw new Error("Description must be a non-empty string");
  }

  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    desc: desc.trim(),
    tasks: [],
  };
}
