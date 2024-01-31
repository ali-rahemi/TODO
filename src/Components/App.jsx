import { getByDisplayValue } from "@testing-library/react";
import { useState } from "react";
import './App.css';
import moment from 'moment';
import { useDispatch } from "react-redux";
import { addTaskAction, changeStatusAction } from "./AppSlice";
import { deleteTaskAction } from "./AppSlice";
import { editTaskAction } from "./AppSlice";
import { addSubTaskAction } from "./AppSlice";






function App(props) {





    // const [tasks, setTasks] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const [AddButton, setAddButton] = useState(true);
    const [selectedTaskData, setSelectedTaskData] = useState();

    const [inputValue, setInputValue] = useState([]);
    // const [DoingButton, setDoingButton]= useState([true]);
    const [ShowEditButton, setShowEditButton] = useState();
    const [temporaryTaskNote, settemporaryTaskNote] = useState();
    const [AddSubTaskButton, setAddSubTaskButton] = useState(true);
    const [TemporarySubTaskNote, setTemporarySubTaskNote] = useState();
    const [inputSubTaskValue, setInputSubTaskValue] = useState([]);
    const dispatch = useDispatch();


    const handleKeyDown = (event) => {

        if (event.key === 'Enter') {
            dispatch(addTaskAction({ taskText: inputValue, columnIndex: props.columnIndex, taskDate: moment().format('YYYY/MM/DD,h:mm:ss') }))

            setShowInput(false);
            setAddButton(true);
            setInputValue([]);

        }
    }

    const handleClick = () => {

        setShowInput(true)
        setAddButton(false)
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);

    }

    const handleDelete = (index) => {
        dispatch(deleteTaskAction({ columnIndex: props.columnIndex, taskIndex: index }));
    }


    const handleEdit = (taskNote, index) => {

        settemporaryTaskNote({ taskNote: taskNote, index: index })




    }
    const handleEditInputChange = (event) => {
        settemporaryTaskNote({ ...temporaryTaskNote, taskNote: event.target.value });


    }

    const handleEditinput = () => {

    }

    const handleEditKeyDown = (event) => {

        if (event.key === 'Enter') {

            // props?.oneditTask(props?.columnIndex, index);

            dispatch(editTaskAction({ columnIndex: props.columnIndex, temporaryTaskNote }));
            settemporaryTaskNote();
        }

    }

    const handleSubTasks = (index) => {
        setSelectedTaskData({ index })


    }

    const handleAddSubtask = () => {
        setAddSubTaskButton(false)
    }


    const handleStatusButton = (subTaskIndex, columnIndex, taskIndex) => {
        dispatch(changeStatusAction({ columnIndex, subTaskIndex, taskIndex }));
        //  setShowEditButton(false)
    }



    const handleSubTaskKeyDown = (event) => {

        if (event.key === 'Enter') {
            dispatch(addSubTaskAction({ columnIndex: props?.columnIndex, taskIndex: selectedTaskData.index, subTaskText: inputSubTaskValue }));

            setAddSubTaskButton(true);
            setInputSubTaskValue([]);
        }

    }



    const handleSubTaskInputChange = (event) => {
        setInputSubTaskValue(event.target.value);
        // setTemporarySubTaskNote();
    }



    return (<div className="totalApp"><div className="app">
        {selectedTaskData && <div className="sub-task-page"><div className="sub-tasks" style={{ margin: 24, background: 'white' }}>
            <img src='/images/close.png' className="close-subtask" onClick={() => setSelectedTaskData()} />
            <span className="sub-tasks-note">{props?.tasks[selectedTaskData.index].note}</span>


            <div className="sub-tasks">

                {AddSubTaskButton ? < img src="/images/add_button.png" className="add-sub-task" onClick={() => handleAddSubtask(props?.columnIndex, selectedTaskData.index)} />
                 : <input type="text" id="note-subtask" className="input-subtask-box" placeholder="Enter your subtask"
                    value={inputSubTaskValue} onChange={handleSubTaskInputChange} onKeyDown={handleSubTaskKeyDown}  ></input>}

             
                    <p className="sub-tasks-title">Sub Tasks:</p>
                    < section className="subtasks-tasks">
                    <div style={{ display: 'flex', flexFlow: 'column' }}>
                        {props?.tasks[selectedTaskData.index].subTasks?.map((item, index) =>
                            <span> <img src={item.status ? `/Images/done.jpg` : `/Images/didnt-done.jpg`} className="didnt-done" onClick={() => handleStatusButton(index, props?.columnIndex, selectedTaskData.index)} /> {item.task}</span>)}</div>
                </section> </div></div> </div>}

        {showInput && <input type="text" id="note" className="input-box" placeholder="Enter your task"
            value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown}  ></input>}


        {AddButton && < img src="/images/add_button.png" className="add-button" onClick={handleClick} />}
        {props?.tasks.map((task, index) =>
            <div onClick={() => { handleSubTasks(index, props?.columnIndex, task.note, task.subTasks) }}>
                <p className="task-note" style={{ backgroundColor: props.cardColor }} key={index} id="index">
                    {task.note}, <section className="task-buttons">
                        <img src='/images/trush.png' className="delete-task-button" onClick={(event) => { event.stopPropagation(); handleDelete(index) }} />

                        <img src='/images/edit.png' className="edit-task-button" onClick={(event) => { event.stopPropagation(); handleEdit(task.note, index) }} />
                    </section>

                </p>
                {temporaryTaskNote?.index === index && <input type="text" id="edited-note" className="edit-input"
                    placeholder="Edit your task" value={temporaryTaskNote.taskNote} onChange={handleEditInputChange}
                    onClick={(event) => { event.stopPropagation(); handleEditinput() }}
                    onKeyDown={handleEditKeyDown}></input>}
                <span className="task-date">{task.date}</span>
            </div>)}

    </div></div >);
}

export default App;


