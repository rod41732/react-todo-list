import { useContext } from "react"
import { TodoContext } from "./todoApp";

const hardCodedNames = {
  "-1": 'All notes',
  "-2": 'Reminders', 
}

export const useLabel = (labelId) => {
  const todoApp = useContext(TodoContext);
  const labels = todoApp.labels.filter(label => label.id == labelId);
  let label, selectThisLabel, updateLabelName;
  if (labels.length === 0 ) {
    label = {
     name: hardCodedNames[labelId],
    };
    updateLabelName = () => {throw Error("You can't update this label name")};
  } else {
    label = labels[0];
    updateLabelName = (text) => todoApp.updateLabel(labelId, {text});
  }
  selectThisLabel = () => todoApp.selectLabel(labelId);


  return {
    label,
    selectThisLabel, updateLabelName
  };
}
