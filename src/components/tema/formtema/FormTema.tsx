import { useContext, useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";

function FormTema() {
  const navigate = useNavigate();

  const [tema, setTema] = useState<Tema>({} as Tema);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado!');
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    async function buscarPorId(id: string) {
      try {
        await buscar(`/temas/${id}`, (resposta: any) => setTema(resposta), {
          headers: { Authorization: token }
        });
      } catch (error: unknown) {
        if (String(error).includes('401')) {
          handleLogout();
        }
      }
    }

    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id, token, handleLogout]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value
    });
  }

  function retornar() {
    navigate('/temas');
  }

  async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar('/temas', tema, (resposta: any) => setTema(resposta), {
          headers: { Authorization: token }
        });
        alert('O Tema foi atualizado com sucesso!');
      } catch (error: unknown) {
        if (String(error).includes('401')) {
          handleLogout();
        } else {
          alert('Erro ao atualizar o tema.');
        }
      }
    } else {
      try {
        await cadastrar('/temas', tema, (resposta: any) => setTema(resposta), {
          headers: { Authorization: token }
        });
        alert('O Tema foi cadastrado com sucesso!');
      } catch (error: unknown) {
        if (String(error).includes('401')) {
          handleLogout();
        } else {
          alert('Erro ao cadastrar o Tema.');
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? 'Editar Tema' : 'Cadastrar Tema'}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema}>
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição do Tema:</label>

          <input
            type="text"
            placeholder="Descreva aqui seu tema"
            name="descricao"
            className="border-2 border-slate-700 rounded p-2"
            value={tema.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            required
          />
        </div>

        <button
          className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
          type="submit"
        >
          {isLoading ? (
            <ClipLoader
              color="#ffffff"
              size={24}
            />
          ) : (
            <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormTema;