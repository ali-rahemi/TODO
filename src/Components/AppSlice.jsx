import { createSlice, current } from '@reduxjs/toolkit'

// ${moment().format('YYYY/MM/DD,h:mm:ss')}




const initialState = {
    app: {
        columns: [
            {
                title: 'hello',
                color: 'white',
                tasks: [
                    {
                        note: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown....",
                        date: "",
                        subTasks: [
                            {
                                task: " regarded interms of its content rather than its physical",
                                status: false

                            },
                            {
                                task: "piece of writing distinct from other material such note",
                                status: false
                            }
                        ]
                    },
                    {
                        note: "first card / 2",
                        date: "",
                        subTasks: [
                            {
                                task: "washing dishes",
                                status: false

                            },
                            {
                                task: "washing car",
                                status: false
                            }
                        ]

                    }
                ]
            },
            {
                title: "title",
                tasks: [
                    {
                        note: "second card / 1",
                        date: "",
                        subTasks: [
                            {
                                task: "washing dishes",
                                status: false

                            },
                            {
                                task: "washing car",
                                status: false
                            }
                        ]
                    }
                ]
            },
            {
                title: "title",
                tasks: [
                    {
                        note: "third card / 1",
                        date: "",
                        subTasks: [
                            {
                                task: "washing dishes",
                                status: false

                            },
                            {
                                task: "washing car",
                                status: false
                            }
                        ]
                    }
                ]
            }
        ]
    }
};






function addTask(state, action) {
    const payload = action.payload;
    const { taskText, columnIndex, taskDate } = payload;
    let newApp = { ...state.app }
    newApp = {
        ...newApp, columns: [...newApp.columns].map((column, cIndex) => {
            let newColumn = { ...column }
            if (cIndex === columnIndex) {
                newColumn = { ...newColumn, tasks: [...newColumn.tasks, { note: taskText, date: taskDate }] }
            }
            return newColumn;
        })
    }
    return { ...state, app: newApp };
}




function deleteTask(state, action) {
    const payload = action.payload;
    const { taskIndex, columnIndex } = payload;
    let newState = { ...state }

    newState = {
        ...newState, app: {
            ...newState.app, columns: newState.app.columns.map((column, cIndex) => {
                let newColumn = { ...column };
                if (cIndex === columnIndex) {
                    newColumn = {
                        ...newColumn, tasks: newColumn.tasks.filter((_, index) => index !== taskIndex)
                    }
                }
                return newColumn;

            })

        }
    }
    return newState;
}



function editTask(state, action) {
    const payload = action.payload;
    const { columnIndex, temporaryTaskNote } = payload;
    let newState = { ...state }
    newState = {
        ...newState, app: {
            ...newState.app, columns: newState.app.columns.map((column, cIndex) => {
                let newColumn = { ...column };
                if (cIndex === columnIndex) {
                    newColumn = {
                        ...newColumn, tasks: newColumn.tasks.map((task, tIndex) => {
                            let newTask = { ...task };
                            if (tIndex === temporaryTaskNote.index) {
                                newTask = { ...newTask, note: temporaryTaskNote.taskNote }
                            }
                            return newTask;
                        })
                    };
                }
                return newColumn;
            })
        }
    }
    return newState;

}


function changeStatus(state, action) {
    const payload = action.payload;
    const { columnIndex, subTaskIndex, taskIndex } = payload;

    let newState = { ...state }
    newState = {
        ...newState, app: {
            ...newState.app, columns: newState.app.columns.map((column, cIndex) => {
                let newColumn = { ...column };
                if (cIndex === columnIndex) {
                    newColumn = {
                        ...newColumn, tasks: newColumn.tasks.map((task, tIndex) => {
                            let newTask = { ...task };
                            if (tIndex === taskIndex) {
                                newTask = {
                                    ...newTask, subTasks: task?.subTasks.map((subTask, sIndex) => {
                                        let newSubTask = { ...subTask };
                                        if (sIndex === subTaskIndex) {
                                            newSubTask = { ...newSubTask, status: !newSubTask.status }
                                        }
                                        return newSubTask;

                                    })
                                }
                            }
                            return newTask;
                        })
                    };
                }
                return newColumn;
            })
        }
    }
    return newState;


}





function addSubTask(state, action) {
    const payload = action.payload;
    const { columnIndex, taskIndex, subTaskText } = payload;

    let newState = { ...state }
    newState = {
        ...newState, app: {
            ...newState.app, columns: newState.app.columns.map((column, cIndex) => {
                let newColumn = { ...column };
                if (cIndex === columnIndex) {
                    newColumn = {
                        ...newColumn, tasks: newColumn.tasks.map((task, tIndex) => {
                            let newTask = { ...task };
                            if (tIndex === taskIndex) {
                                newTask = {
                                    ...newTask, subTasks: [...newTask.subTasks, { task: subTaskText }]
                                }
                          

                            }
                            return newTask;
                        })
                    }
                 
                }
                return newColumn;
            })

        }

    }
    return newState;
}



























const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {

        addTask,
        deleteTask,
        editTask,
        changeStatus,
        addSubTask


    }

})


export const {
    addTask: addTaskAction,
    deleteTask: deleteTaskAction,
    editTask: editTaskAction,
    changeStatus: changeStatusAction,
    addSubTask: addSubTaskAction
} = appSlice.actions

export default appSlice.reducer;
