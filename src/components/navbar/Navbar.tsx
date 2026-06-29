import { Link } from "react-router-dom"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

function Navbar() {

  const navigate = useNavigate();

const { handleLogout } = useContext(AuthContext);

function logout() {

    handleLogout()
    alert('O Usuário foi desconectado com sucesso!')
    navigate('/')
}

  return (
    <>
      <div className='w-full flex justify-center py-4
                      bg-indigo-900 text-white'>
      
        <div className="container flex justify-between text-lg mx-8">
          <Link to='/home' className="text-2xl font-bold">Blog Pessoal</Link>

          <div className='flex gap-4'>
            Postagens
            Temas
            Cadastrar tema
            Perfil
            <button onClick={logout} className='hover:underline bg-transparent border-none cursor-pointer'>Sair</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar