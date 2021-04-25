import React, { useState } from "react";
import { v4 as idGen } from "uuid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import EditModal from "./EditModal";
import AlertDialog from "./AlertDialog";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import CheckboxList from "./CheckBoxList";
import DeleteIcon from "@material-ui/icons/Delete";
import AddBoxIcon from "@material-ui/icons/AddBox";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  fullScreen: {
    backgroundColor: "#f0f0f0",
    width: "100%",
    height: "100vh",
    minHeight: "100vh",
  },
  sideBar: {
    paddingLeft: "20px",
    paddingTop: "20px",
    backgroundColor: "rgba(178,178,178,0.59)",
    height: "100vh",
    width: "25%",
    border: "3px solid black",
  },
}));

function ToDoInput() {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [toDoItems, setToDoItems] = useState([]);
  const [editedItem, setEditedItem] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [allCheckBoxChecked, setAllCheckBoxChecked] = useState(false);
  const [isDeletedItem, setIsDeletedItem] = useState(false);

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      addToDo(event);
    }
  }

  function addToDo() {
    if (!!inputValue) {
      const item = {
        id: idGen(),
        value: inputValue,
      };
      setToDoItems([...toDoItems, item]);
      setInputValue("");
    }
  }

  function handleTextFieldChange(event) {
    setInputValue(event.target.value);
  }

  function handleEdit(editItemId) {
    const editedToDoLists = toDoItems.find((item) => item.id === editItemId);
    setEditedItem(editedToDoLists);
  }

  function hasSelected() {
    !!checkedItems.length && setIsDeletedItem(true);
  }

  function handleDelete() {
    const filteredToDoLists = toDoItems.filter(
      (item) => !checkedItems.includes(item)
    );
    setToDoItems([...filteredToDoLists]);
    setCheckedItems([]);
    setIsDeletedItem(false);
    setAllCheckBoxChecked(false);
  }

  function handleSave(name) {
    setToDoItems([
      ...toDoItems.slice(0, toDoItems.indexOf(editedItem)),
      { ...editedItem, value: name },
      ...toDoItems.slice(toDoItems.indexOf(editedItem) + 1),
    ]);
    setEditedItem(null);
  }

  function handleCancel(name) {
    setIsDeletedItem(false);
    setEditedItem(null);
  }

  function handleToggle(id) {
    const currentIndex = checkedItems.indexOf(id);
    const newChecked = [...checkedItems];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedItems(newChecked);
  }

  function selectAll() {
    if (!isAllSelected) {
      setCheckedItems(toDoItems);
      setIsAllSelected(true);
    } else {
      setCheckedItems([]);
      setIsAllSelected(false);
    }
  }

  const handleCheckBoxChange = (event) => {
    setAllCheckBoxChecked(event.target.checked);
    selectAll();
  };

  return (
    <div className={classes.sideBar}>
      <div>
        <TextField
          style={{ marginTop: 8 }}
          variant={"outlined"}
          id="standard-basic"
          label="ToDoInput"
          value={inputValue}
          onChange={handleTextFieldChange}
          InputProps={{ onKeyDown: handleKeyPress }}
        />
        <Button style={{ marginLeft: 8 }} onClick={addToDo}>
          <AddBoxIcon color={"primary"} fontSize={"large"} />
        </Button>
      </div>
      {!!toDoItems.length && (
        <div style={{ textAlign: "right" }}>
          <Button onClick={hasSelected}>
            <DeleteIcon color={"primary"} />
          </Button>
          <label htmlFor="male">SelectAll</label>
          <Checkbox
            checked={allCheckBoxChecked}
            onChange={handleCheckBoxChange}
            inputProps={{ "aria-label": "primary checkbox" }}
            style={{ marginRight: 20 }}
          />
          <CheckboxList
            checked={checkedItems}
            onChange={handleToggle}
            onEdit={handleEdit}
          >
            {toDoItems}
          </CheckboxList>
        </div>
      )}
      {!!editedItem && (
        <EditModal
          data={editedItem}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      {isDeletedItem && (
        <AlertDialog onDelet={handleDelete} onCancel={handleCancel} />
      )}
    </div>
  );
}

export default ToDoInput;
