import axios from 'axios';

const Validacao = (url = '', dados = {}) => {
  let source = axios.CancelToken.source();
  let retorno = null;
  setTimeout(() => {
    if (!retorno.serverOn){
      source.cancel('O Servidor não Respondeu');
    }
  }, 30000);
  retorno = axios.get(url, {params: dados, cancelToken: source.token}).then((response) => {
    return ({
      serverOn: true,
      dados: response.data.dados,
      status: true,//response.status,   PARA PASSAR DIRETO SEM RESPOSTA DO SERVIDOR. BASTA O SERVIDOR ESTAR ON
      erro: '', 
    });
  }).catch((error) => {
    return ({ 
      serverOn: false,
      dados: {},
      status: error.status,
      erro: error.message,
    }); 
  });

  return retorno;
};

export default Validacao;