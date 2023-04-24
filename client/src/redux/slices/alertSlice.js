import {createSlice} from '@reduxjs/toolkit'

export const alertSlice = createSlice({
    name:"alerts",
    initialState:{
        loading:false
    },
    reducers:{
        showLoader: (state) =>{
            state.loading=true
        },
        hideLoader: (state) =>{
            state.loading=false
        }
    }
})

export const {showLoader,hideLoader} = alertSlice.actions