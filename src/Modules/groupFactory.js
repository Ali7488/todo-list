export function createGroup(title, desc) {
  if (typeof title !== "string" || title.trim() === "") {
    throw new Error("Title must be a non-empty string");
  }

  if (typeof desc !== "string") {
    throw new Error("Description must be a string");
  }

  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    desc: desc.trim(),
    tasks: [],
  };
}
