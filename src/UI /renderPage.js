const groupManager = document.getElementById("groupsManager");

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

export function renderGroups(groups) {
  groupManager.replaceChildren();
  groups.forEach((group) => {
    const newGroup = createGroupFromTemplate(group);
    groupManager.appendChild(newGroup);
  });
}
