import os

def salvar_conteudo_dos_arquivos(diretorio_base, arquivo_saida):
    with open(arquivo_saida, 'w', encoding='utf-8') as output_file:
        for root, _, files in os.walk(diretorio_base):
            for file_name in files:
                # Obtendo o caminho completo do arquivo
                caminho_completo = os.path.join(root, file_name)
                
                # Lendo o conteúdo do arquivo
                try:
                    with open(caminho_completo, 'r', encoding='utf-8') as current_file:
                        conteudo = current_file.read()
                    
                    # Escrevendo o caminho e o conteúdo no arquivo de saída
                    output_file.write(f'Arquivo: {caminho_completo}\n')
                    output_file.write(f'{conteudo}\n')
                    output_file.write('#' * 80 + '\n')  # Separador entre arquivos
                except Exception as e:
                    # Caso não seja possível ler o arquivo
                    output_file.write(f'Arquivo: {caminho_completo}\n')
                    output_file.write(f'[ERRO AO LER O ARQUIVO: {e}]\n')
                    output_file.write('#' * 80 + '\n')

# Configurações
diretorio_base = '.'  # Altere para o diretório que deseja analisar
arquivo_saida = 'output.txt'  # Nome do arquivo onde será salvo o conteúdo

# Executando a função
salvar_conteudo_dos_arquivos(diretorio_base, arquivo_saida)
