import { createGroup } from "./groupFactory.js";
import { createTask } from "./taskFactory.js";

const VALID_PRIORITIES = ["low", "medium", "high"];

export default function store(loadedGroupsArray) {
  const groups = loadedGroupsArray.groups;
  let selectedGroupId = loadedGroupsArray.selectedGroupId;

  // Navigates to the selected group and stores its id
  const setSelectedGroup = (groupId) => {
    const index = groups.findIndex((group) => group.id === groupId);

    if (index === -1) return;

    selectedGroupId = groups[index].id;
  };

  // Gets the currently displayed group
  const getSelectedGroup = () => {
    const index = groups.findIndex((group) => group.id === selectedGroupId);

    if (index === -1) return null;

    return groups[index];
  };

  const getSelectedGroupId = () => selectedGroupId;

  const getGroups = () => groups;

  // Creates a new group and pushes it to the groups array
  const addGroup = (title, desc) => {
    const newGroup = createGroup(title, desc);
    groups.push(newGroup);
    return newGroup;
  };

  // Finds the selected group and removes it from the array
  const deleteGroup = () => {
    const index = groups.findIndex((group) => group.id === selectedGroupId);
    if (index === -1) return;

    groups.splice(index, 1);
    selectedGroupId = null;
  };

  // Clears every group and deselects the current group
  const deleteAllGroups = () => {
    groups.splice(0, groups.length);
    selectedGroupId = null;
  };

  // Finds the correct group, then creates a task and pushes it to the tasks array within that group
  const addTaskToSelectedGroup = (name, priority, dueDate) => {
    const selectedGroup = getSelectedGroup();
    if (!selectedGroup) return;

    const newTask = createTask(name, priority, dueDate);
    selectedGroup.tasks.push(newTask);
    return newTask;
  };

  // Finds the selected group, then removes the matching task
  const removeTaskFromGroup = (taskId) => {
    const selectedGroup = getSelectedGroup();
    if (!selectedGroup) return;

    const taskToDeleteIndex = selectedGroup.tasks.findIndex(
      (task) => task.id === taskId,
    );

    if (taskToDeleteIndex === -1) return;

    selectedGroup.tasks.splice(taskToDeleteIndex, 1);
  };

  const updateTaskPriority = (taskId, priority) => {
    const selectedGroup = getSelectedGroup();
    if (!selectedGroup) return;

    const normalizedPriority = priority.trim();
    if (!VALID_PRIORITIES.includes(normalizedPriority)) return;

    const taskToUpdate = selectedGroup.tasks.find((task) => task.id === taskId);
    if (!taskToUpdate) return;

    taskToUpdate.priority = normalizedPriority;
  };

  const updateTaskCompletion = (taskId, isCompleted) => {
    const selectedGroup = getSelectedGroup();
    if (!selectedGroup) return;

    const taskToUpdate = selectedGroup.tasks.find((task) => task.id === taskId);
    if (!taskToUpdate) return;

    taskToUpdate.completed = isCompleted;
  };

  return {
    setSelectedGroup,
    getSelectedGroup,
    getSelectedGroupId,
    removeTaskFromGroup,
    addTaskToSelectedGroup,
    updateTaskPriority,
    updateTaskCompletion,
    addGroup,
    deleteGroup,
    deleteAllGroups,
    getGroups,
  };
}
