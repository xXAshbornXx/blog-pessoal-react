import axios from "axios";
import type { AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "https://blogpessoal-avjw.onrender.com",
});

export const cadastrarUsuario = async (
  url: string,
  dados: unknown,
  setDados: (dados: unknown) => void
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const login = async (
  url: string,
  dados: unknown,
  setDados: (dados: unknown) => void
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const buscar = async (
  url: string,
  setDados: (dados: unknown) => void,
  header: AxiosRequestConfig
) => {
  const resposta = await api.get(url, header);
  setDados(resposta.data);
};

export const cadastrar = async (
  url: string,
  dados: unknown,
  setDados: (dados: unknown) => void,
  header: AxiosRequestConfig
) => {
  const resposta = await api.post(url, dados, header);
  setDados(resposta.data);
};

export const atualizar = async (
  url: string,
  dados: unknown,
  setDados: (dados: unknown) => void,
  header: AxiosRequestConfig
) => {
  const resposta = await api.put(url, dados, header);
  setDados(resposta.data);
};

export const deletar = async (
  url: string,
  header: AxiosRequestConfig
) => {
  await api.delete(url, header);
};