import { useContext } from "react"
import { TodoContext } from "./todoApp";

const hardCodedNames = {
  "-1": 'All notes',
  "-2": 'Reminders', 
}

export const useLabel = (labelId) => {
  const todoApp = useContext(TodoContext);
  const {state: {todos, labels}, actions: {selectLabel}, methods: {updateLabel}} = todoApp;
  const matchedLabel = labels.filter(label => label._id === labelId);
  let label, selectThisLabel, updateLabelName, reminderCount;

  switch (labelId) {
    case -1:
      reminderCount = 0; break;
    case -2:
      reminderCount = todos.filter(todo => todo.urgency > 0).length; break;
    default:
      reminderCount = todos.filter(todo => todo.label === labelId && todo.urgency > 0).length;
  }

  // some special ID
  if (matchedLabel.length === 0 ) {
    label = {
      id: labelId,
      name: hardCodedNames[labelId],
    };
    updateLabelName = () => {throw Error(`You can't update this label name: id = ${labelId}`)};
  } else {
    label = matchedLabel[0];
    updateLabelName = (text) => updateLabel(labelId, {name: text});
  }
  selectThisLabel = () => selectLabel(labelId);


  return {
    label,
    selectThisLabel, updateLabelName, isUpdatable: labelId > 0, reminderCount
  };
}
