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
  const deleteAllGroupsBtn = document.getElementById("deleteAllGroupsBtn");
  const deleteAllGroupsDialog = document.getElementById(
    "deleteAllGroupsDialog",
  );
  const deleteAllGroupsForm = document.getElementById("deleteAllGroupsForm");
  const changePriorityDialog = document.getElementById("changePriorityDialog");
  const changePriorityForm = document.getElementById("changePriorityForm");
  const changePriorityInput = document.getElementById("changePriorityInput");
  const priorityTaskIdInput = document.getElementById("priorityTaskIdInput");

  const store = initStore(loadedState);

  const getCurrentState = () => ({
    groups: store.getGroups(),
    selectedGroupId: store.getSelectedGroupId(),
  });

  const saveAndRender = () => {
    saveState(getCurrentState());
    renderPage(store.getGroups(), store.getSelectedGroup());
  };

  renderPage(store.getGroups(), store.getSelectedGroup());

  addGroupBtn.addEventListener("click", () => {
    addGroupDialog.showModal();
  });

  deleteAllGroupsBtn.addEventListener("click", () => {
    deleteAllGroupsDialog.showModal();
  });

  dialogActions.forEach((btnGroup) => {
    btnGroup.addEventListener("click", (event) => {
      const clickedBtn = event.target.closest("[data-action='close-dialog']");
      if (!clickedBtn) return;

      const form = clickedBtn.closest("form");
      const dialog = clickedBtn.closest("dialog");

      form?.reset();
      dialog?.close();
    });
  });

  addGroupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const groupTitle = document.getElementById("groupTitleInput");
    const groupDesc = document.getElementById("groupDescInput");

    const newGroup = store.addGroup(groupTitle.value, groupDesc.value);
    store.setSelectedGroup(newGroup.id);

    saveAndRender();

    addGroupDialog.close();
    addGroupForm.reset();
  });

  deleteAllGroupsForm.addEventListener("submit", (event) => {
    event.preventDefault();

    store.deleteAllGroups();
    saveAndRender();

    deleteAllGroupsDialog.close();
    deleteAllGroupsForm.reset();
  });

  groupsManager.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest(".groupDeleteBtn");

    if (deleteBtn) {
      const groupItem = deleteBtn.closest(".groupItem");
      const groupCard = groupItem.querySelector(".groupCard");
      const groupId = groupCard.dataset.groupId;

      store.setSelectedGroup(groupId);
      store.deleteGroup();

      saveAndRender();
      return;
    }

    const selectedGroup = event.target.closest(".groupCard");
    if (!selectedGroup) return;

    const groupId = selectedGroup.dataset.groupId;
    store.setSelectedGroup(groupId);

    saveAndRender();
  });

  mainChecklist.addEventListener("click", (event) => {
    const clickedBtn = event.target.closest(".addNewTaskBtn");
    if (!clickedBtn) return;

    addTaskDialog.showModal();
  });

  mainChecklist.addEventListener("click", (event) => {
    const priorityBadge = event.target.closest(".priorityBadge");
    if (!priorityBadge) return;

    const taskRow = priorityBadge.closest(".taskRow");
    priorityTaskIdInput.value = taskRow.dataset.taskId;
    changePriorityInput.value = priorityBadge.textContent.trim();

    changePriorityDialog.showModal();
  });

  mainChecklist.addEventListener("change", (event) => {
    const clickedCheckbox = event.target.closest(".taskCheckbox");
    if (!clickedCheckbox) return;

    const taskRow = clickedCheckbox.closest(".taskRow");
    const taskId = taskRow.dataset.taskId;

    store.updateTaskCompletion(taskId, clickedCheckbox.checked);
    saveAndRender();
  });

  mainChecklist.addEventListener("click", (event) => {
    const clickedBtn = event.target.closest(".taskDeleteBtn");
    if (!clickedBtn) return;

    const taskRow = clickedBtn.closest(".taskRow");
    const taskId = taskRow.dataset.taskId;

    store.removeTaskFromGroup(taskId);
    saveAndRender();
  });

  changePriorityForm.addEventListener("submit", (event) => {
    event.preventDefault();

    store.updateTaskPriority(
      priorityTaskIdInput.value,
      changePriorityInput.value,
    );
    saveAndRender();

    changePriorityDialog.close();
    changePriorityForm.reset();
  });

  addTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskName = document.getElementById("taskNameInput");
    const taskPriority = document.getElementById("taskPriorityInput");
    const dueDate = document.getElementById("taskDueDateInput");

    store.addTaskToSelectedGroup(
      taskName.value,
      taskPriority.value,
      dueDate.value,
    );

    saveAndRender();

    addTaskDialog.close();
    addTaskForm.reset();
  });
}
