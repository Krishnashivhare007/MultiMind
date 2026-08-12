import { createSlice } from '@reduxjs/toolkit'


export const messageSlice = createSlice({
  name: 'messages',
  initialState:{
    messages:[],
    
  },
  reducers: {
    setMessages:(state,action)=>{
        state.conversations = action.payload
    }
    
  }
})

export const {setMessages} = messageSlice.actions

export default messageSlice.reducer