import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nombre: '',
  cedula: '',
  telefono: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.nombre = action.payload.nombre;
      state.cedula = action.payload.cedula;
      state.telefono = action.payload.telefono;
      state.mail = action.payload.mail;
      state.uid = action.payload.uid;
    },
    clearUser: (state) => {
      state.nombre = '';
      state.cedula = '';
      state.telefono = '';
      state.mail = '';
      state.uid = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
