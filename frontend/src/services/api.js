import axios from 'axios';//importa a api da axios

const api = axios.create({//var api recebe a url servidora
    baseURL: 'http://localhost:3333',// parametro passado com ,
})
export default api;//para todas as rotas poderem importar 