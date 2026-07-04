import { parseISO, isValid } from "date-fns";

export function createTask(name, priority, dueDate) {
  if (typeof name !== "string" || name.trim() === "") {
    throw new Error("Title must be a non-empty string");
  }

  if (
    typeof priority !== "string" ||
    (priority.trim() !== "high" &&
      priority.trim() !== "medium" &&
      priority.trim() !== "low")
  ) {
    throw new Error("priority must be either high, medium, or low");
  }

  if (typeof dueDate !== "string") {
    throw new Error("dueDate must be a string");
  }

  const cleanedDate = dueDate.trim();
  let normalizedDate = null;

  if (cleanedDate !== "") {
    const parsedDate = parseISO(cleanedDate);
    if (!isValid(parsedDate)) {
      throw new Error("dueDate is invalid");
    }

    normalizedDate = cleanedDate;
  }

  return {
    id: crypto.randomUUID(),
    name: name.trim(),
    completed: false,
    priority: priority.trim(),
    dueDate: normalizedDate,
  };
}
