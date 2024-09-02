import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
    user: any | null;
}

const initialState: IUserState = {
    user: null,
};

export const userSlice = createSlice({
    initialState,
    name: 'userSlice',
    reducers: {
        cleanUser: () => initialState,
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
    },
});

export default userSlice.reducer;

export const { cleanUser, setUser } = userSlice.actions;