import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contract: null,
    address: null
}

const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        setWallet: (state, action) => {
            state.contract = action.payload.contract;
            state.address = action.payload.address;
        }
    }
})

export const { setWallet } = walletSlice.actions;
export default walletSlice.reducer;