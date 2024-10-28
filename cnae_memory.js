// Importa o módulo axios
const axios = require('axios');

const getAllCNAESubclassesIds = () => {
  try {
    // Medição de memória antes de criar o array
    const beforeMemory = process.memoryUsage().heapUsed;

    // Faz a requisição para obter todas as subclasses do CNAE
    axios.get('https://servicodados.ibge.gov.br/api/v2/cnae/subclasses/492990').then(ids => {
      if (ids.status === 200) {
        // Extrai todos os ids dos elementos que são objetos
        ids = ids.data.map(subclass => subclass.id)
        console.log(ids)
        console.log('Total de IDs encontrados:', ids.length);
        console.log('Primeiros 10 IDs:', ids.slice(0, 10)); // Exibe os primeiros 10 IDs

        // Medição de memória depois de criar o array
        const afterMemory = process.memoryUsage().heapUsed;

        // Cálculo da diferença de memória
        const memoryUsed = afterMemory - beforeMemory;
        console.log(`Memória utilizada para armazenar os IDs: ${(memoryUsed / 1024 / 1024).toFixed(2)} MB`);
      } else {
        console.error('Erro ao obter as subclasses do CNAE');
      }
    })

  } catch (error) {
    console.error('Erro na requisição:', error.message);
  }
};

// Chama a função para obter e listar todos os IDs e medir a memória usada
getAllCNAESubclassesIds();
