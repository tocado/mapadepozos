import { createSlice } from '@reduxjs/toolkit'

export const RfiltroPozos = createSlice({
  name: 'filtroPozos',
  initialState: {
    filtro: {
        name: "",
        Provincia: "",
        Departamento: "",
        Uso: "",
        fecha: {
            min: "",
            max: "",
        },
        Profundidad: {
            min: "",
            max: "",
        },
        NivelEstatico: {
            min: "",
            max: "",
        },
        NivelDinamico: {
            min: "",
            max: "",
        },
        Caudalmedio: {
            min: "",
            max: "",
        },
        DuenioDelDato: "",
    },
  },
  reducers: {
    setFiltro: (state, action) => {
      state.filtro = action.payload
    },
  },
})

export const { setFiltro } = RfiltroPozos.actions

export const traeFiltro = (state) => state.RfiltroPozos.filtro
export default RfiltroPozos.reducer
