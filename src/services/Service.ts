/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const api = axios.create({
  baseURL: 'https://blogpessoal-avjw.onrender.com'
})

export const cadastrarUsuario = async (url: string, dados: any, setDados: any) => {
  const resposta = await api.post(url, dados)
  setDados(resposta.data)
}

export const login = async (url: string, dados: any, setDados: any) => {
  const resposta = await api.post(url, dados)
  setDados(resposta.data)
}