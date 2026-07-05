import { format, parseISO } from "date-fns";
import DashIcons from "./renderIcons.js";

function createGroupFromTemplate(group) {
  const template = document.querySelector("#groupItemTemplate");
  const clone = template.content.cloneNode(true);

  const button = clone.querySelector(".groupCard");
  const name = clone.querySelector(".groupCardName");
  const count = clone.querySelector(".groupCardCount");

  button.dataset.groupId = group.id;
  name.textContent = group.title;
  count.textContent = group.tasks.length;

  return clone;
}

 function displaySelectedGroup(group) {
  if (!group) return;
  const mainChecklist = document.getElementById("mainChecklist");
  const template = document.getElementById("selectedGroupTemplate");
  const clone = template.content.cloneNode(true);

  const groupTitle = clone.querySelector(".groupTitle");
  const groupSub = clone.querySelector(".groupSubtitle");
  const taskChecklist = clone.querySelector(".taskChecklist");

  groupTitle.textContent = group.title;
  groupSub.textContent = group.desc;
  group.tasks.forEach((task) => {
    const taskToDisplay = createTaskFromTemplate(task);
    taskChecklist.appendChild(taskToDisplay);
  });

  mainChecklist.replaceChildren(clone);
  DashIcons();
}

function createTaskFromTemplate(task) {
  if (!task) return;
  const template = document.getElementById("taskRowTemplate");
  const clone = template.content.cloneNode(true);

  const taskRow = clone.querySelector(".taskRow");
  const taskName = clone.querySelector(".taskName");
  const priorityBadge = clone.querySelector(".priorityBadge");
  const dueDate = clone.querySelector(".dueDate");

  taskRow.dataset.taskId = task.id;
  taskName.textContent = task.name;
  priorityBadge.textContent = task.priority;
  priorityBadge.classList.add(`${task.priority}`);
  if (task.dueDate !== null) {
    const dateObj = parseISO(task.dueDate);
    const dateToDisplay = format(dateObj, "MMM d, yyyy");
    dueDate.textContent = dateToDisplay;
  } else {
    dueDate.textContent = "No due date";
  }

  return clone;
}

 function renderGroups(groups) {
  const groupManager = document.getElementById("groupsManager");
  groupManager.replaceChildren();
  groups.forEach((group) => {
    const newGroup = createGroupFromTemplate(group);
    groupManager.appendChild(newGroup);
  });
}

export function renderPage(groups, currentGroup = null) {
  renderGroups(groups);
  displaySelectedGroup(currentGroup);
}
