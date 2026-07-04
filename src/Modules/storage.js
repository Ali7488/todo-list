const STORAGE_KEY = "taskdock-state";

export const loadState = () => {
  const currentState = localStorage.getItem(STORAGE_KEY);
  if (currentState === null) return getDefaultState();

  try {
    const currentStateObj = JSON.parse(currentState);
    return currentStateObj;
  } catch (error) {
    return getDefaultState();
  }
};

export const saveState = (state) => {
  const stringToSave = JSON.stringify(state);
  localStorage.setItem(STORAGE_KEY, stringToSave);
};

export const clearState = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getDefaultState = () => {
  return {
    groups: [],
    selectedGroupId: null,
  };
};
