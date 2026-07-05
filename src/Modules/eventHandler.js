import initStore from "./store.js";
import { saveState } from "./storage.js";
import { renderPage } from "../UI /renderPage.js";

export default function initEventHandlers(loadedState) {
  // HTML elements
  const addGroupBtn = document.getElementById("addNewGroupBtn");
  const addGroupDialog = document.getElementById("addGroupDialog");
  const dialogActions = document.querySelectorAll(".dialogActions");
  const addGroupForm = document.getElementById("addGroupForm");
  const mainChecklist = document.getElementById("mainChecklist");
  const groupsManager = document.getElementById("groupsManager");
  const addTaskDialog = document.getElementById("addTaskDialog");
  const addTaskForm = document.getElementById("addTaskForm");

  const store = initStore(loadedState);
  if (!loadedState.selectedGroupId) {
    renderPage(store.getGroups());
  } else {
    renderPage(store.getGroups(), store.getSelectedGroup());
  }

  addGroupBtn.addEventListener("click", () => {
    addGroupDialog.showModal();
  });

  dialogActions.forEach((btnGroup) => {
    btnGroup.addEventListener("click", (event) => {
      const clickedBtn = event.target;
      if (clickedBtn.dataset.action === "close-dialog") {
        const dialog = clickedBtn.closest("dialog");
        dialog.close();
      } else return;
    });
  });

  addGroupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const groupTitle = document.getElementById("groupTitleInput");
    const groupDesc = document.getElementById("groupDescInput");

    const newGroup = store.addGroup(groupTitle.value, groupDesc.value);
    store.setSelectedGroup(newGroup.id);
    const updatedGroups = store.getGroups();

    const newState = { groups: updatedGroups, selectedGroupId: newGroup.id };
    saveState(newState);

    renderPage(updatedGroups, newGroup);

    addGroupDialog.close();
    addGroupForm.reset();
  });

  groupsManager.addEventListener("click", (event) => {
    const clickedBtn = event.target;
    const selectedGroup = clickedBtn.closest(".groupCard");
    if (!selectedGroup) return;

    const groupId = selectedGroup.dataset.groupId;
    store.setSelectedGroup(groupId);
    const groupToDisplay = store.getSelectedGroup();

    const newState = { groups: store.getGroups(), selectedGroupId: groupId };
    saveState(newState);

    renderPage(store.getGroups(), groupToDisplay);
  });

  mainChecklist.addEventListener("click", (event) => {
    const clickedBtn = event.target.closest(".addNewTaskBtn");
    if (!clickedBtn) return;

    addTaskDialog.showModal();
  });

  mainChecklist.addEventListener("click", (event) => {
    const clickedBtn = event.target.closest(".taskCheckbox");
    if (!clickedBtn) return;

    const taskRow = event.target.closest(".taskRow");
    if (clickedBtn.checked) {
      taskRow.classList.add("completed");
      return;
    }

    if (taskRow.classList.contains("completed"))
      taskRow.classList.remove("completed");
  });

  mainChecklist.addEventListener("click", (event) => {
    const clickedBtn = event.target.closest(".taskDeleteBtn");
    if (!clickedBtn) return;

    const taskRow = event.target.closest(".taskRow");
    const taskId = taskRow.dataset.taskId;

    store.removeTaskFromGroup(taskId);
    const updatedGroups = store.getGroups();

    const newState = {
      groups: updatedGroups,
      selectedGroupId: store.getSelectedGroupId(),
    };

    saveState(newState);
    renderPage(updatedGroups, store.getSelectedGroup());
  });

  addTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskName = document.getElementById("taskNameInput");
    const taskPriority = document.getElementById("taskPriorityInput");
    const dueDate = document.getElementById("taskDueDateInput");

    const newTask = store.addTaskToSelectedGroup(
      taskName.value,
      taskPriority.value,
      dueDate.value,
    );
    const updatedGroups = store.getGroups();

    const newState = {
      groups: updatedGroups,
      selectedGroupId: store.getSelectedGroupId(),
    };

    saveState(newState);

    renderPage(updatedGroups, store.getSelectedGroup());
    addTaskDialog.close();
    addTaskForm.reset();
  });
}
