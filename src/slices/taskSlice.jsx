import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name:"tasks",
    initialState:[],
    reducers:{
        addTask:(state, action)=>{
            state.push(action.payload)
            console.log(`Current State: ${JSON.stringify(state)}`)
        },
        toggleTask:(state,action)=>{
            const index = action.payload;
            state[index].taskCompleted = !state[index].taskCompleted;
        },
        deleteTask:(state,action)=>{
            const taskName = action.payload;
            const index = state.findIndex((item) => JSON.stringify(item.taskName).toUpperCase() === JSON.stringify(taskName).toUpperCase());
            if(index!==-1){
                state.splice(index,1)
            }
        },
        editTask:(state,action)=>{
            const {taskId, taskName, taskDesc} = action.payload;
            state[taskId].taskName = taskName;
            state[taskId].taskDesc = taskDesc;
        }
    }
})

export const {addTask, toggleTask, deleteTask, editTask} = taskSlice.actions;
export default taskSlice.reducer;