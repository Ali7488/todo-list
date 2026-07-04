import { createGroup } from "./groupFactory.js";
import { createTask } from "./taskFactory.js";

export default function store(loadedGroupsArray) {
  const groups = loadedGroupsArray.groups;
  let selectedGroupId = loadedGroupsArray.selectedGroupId;

  // Navigates to teh seleceted group and returns it
  const setSelectedGroup = (groupId) => {
    const index = groups.findIndex((group) => group.id === groupId);

    if (index === -1) return;

    selectedGroupId = groups[index].id;
  };

  // Gets the currently displayed group
  const getSelectedGroup = () => {
    const index = groups.findIndex((group) => group.id === selectedGroupId);
    if (index === -1) {
      throw new Error("No group is currently selected");
    }

    return groups[index];
  };

  const getSelectedGroupId = () => {
    if (selectedGroupId === null) {
      throw new Error("No group is currently selected");
    }
    return selectedGroupId;
  };

  const getGroups = () => {
    return groups;
  };

  //creates a new group and pushes it to the groups array
  const addGroup = (title, desc) => {
    const newGroup = createGroup(title, desc);
    groups.push(newGroup);
    return newGroup;
  };

  //finds the group that matches the groupId and removes it from the array
  const deleteGroup = () => {
    const index = groups.findIndex((group) => group.id === selectedGroupId);
    if (index === -1) {
      return;
    }
    groups.splice(index, 1);
    selectedGroupId = null;
  };

  //finds the correct group, then creates a task and pushes it to the tasks array within that group
  const addTaskToSelectedGroup = (name, priority, dueDate) => {
    const neededGroupIndex = groups.findIndex(
      (group) => group.id === selectedGroupId,
    );

    if (neededGroupIndex === -1) return;

    const newTask = createTask(name, priority, dueDate);
    groups[neededGroupIndex].tasks.push(newTask);
    return newTask;
  };

  //finds the group that has the task to be deleted then removes it
  const removeTaskFromGroup = (taskId) => {
    const neededGroupIndex = groups.findIndex(
      (group) => group.id === selectedGroupId,
    );

    if (neededGroupIndex === -1) return;

    const taskToDeleteIndex = groups[neededGroupIndex].tasks.findIndex(
      (task) => task.id === taskId,
    );

    if (taskToDeleteIndex === -1) return;

    groups[neededGroupIndex].tasks.splice(taskToDeleteIndex, 1);
  };

  return {
    setSelectedGroup,
    getSelectedGroup,
    getSelectedGroupId,
    removeTaskFromGroup,
    addTaskToSelectedGroup,
    addGroup,
    deleteGroup,
    getGroups,
  };
}
