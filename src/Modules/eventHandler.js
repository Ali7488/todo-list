import initStore from "./store.js";
import { saveState } from "./storage.js";
import { renderGroups } from "../UI /renderPage.js";
import { format } from "date-fns";

export default function initEventHandlers(loadedState) {
  const addGroupBtn = document.getElementById("addNewGroupBtn");
  const addGroupDialog = document.getElementById("addGroupDialog");
  const dialogActions = document.querySelectorAll(".dialogActions");
  const addGroupForm = document.getElementById("addGroupForm");

  const store = initStore(loadedState);
  renderGroups(store.getGroups());

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

    renderGroups(updatedGroups);

    addGroupDialog.close();
    addGroupForm.reset();
  });
}
