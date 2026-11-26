const pesquisarNome = document.querySelector('#pesquisarNome')
const pesquisarCodigo = document.querySelector('#pesquisarCodigo')
const areaPesquisa = document.querySelector('#areaPesquisa')
const campoPesquisa = document.querySelector('#campoPesquisa')
const confirmarPesquisa = document.querySelector('#confirmarPesquisa')
const mensagem = document.querySelector('#mensagem')
const conteiner = document.querySelector('#conteiner')
const overlay = document.querySelector('#overlay')
const fechar = document.querySelector('.fechar')
const nome = document.querySelector('#nome')
const imagem = document.querySelector('#imagem')
const codigo = document.querySelector('#codigo')
const preco = document.querySelector('#preco')
const categoria = document.querySelector('#categoria')

let tipoPesquisa = ''
let produtos = []

fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Não foi possível carregar os produtos.')
        }
        return response.json()
    })
    .then(dados => {
        produtos = dados
        console.log('Produtos carregados:', produtos)
    })
    .catch(erro => {
        console.error(erro)
        mensagem.textContent = 'Erro ao carregar os produtos.'
    })

pesquisarNome.addEventListener('click', () => {
    tipoPesquisa = 'nome'
    areaPesquisa.classList.remove('hidden')
    campoPesquisa.placeholder = 'Digite o nome do produto'
    campoPesquisa.value = ''
    mensagem.textContent = ''
    campoPesquisa.focus()
})

pesquisarCodigo.addEventListener('click', () => {
    tipoPesquisa = 'codigo'
    areaPesquisa.classList.remove('hidden')
    campoPesquisa.placeholder = 'Digite o código do produto'
    campoPesquisa.value = ''
    mensagem.textContent = ''
    campoPesquisa.focus()
})

function consultar() {
    const pesquisa = campoPesquisa.value.trim()
    if (pesquisa === '') {
        mensagem.textContent = 'Digite algo para pesquisar!'
        return
    }
    let produto
    if (tipoPesquisa === 'codigo') {
        const cod = Number(pesquisa)
        if (Number.isNaN(cod)) {
            mensagem.textContent = 'Digite um código válido!'
            return
        }
        produto = produtos.find(produto => produto.codigo === cod)
    } else if (tipoPesquisa === 'nome') {
        produto = produtos.find(produto =>
            produto.nome.toLowerCase().includes(pesquisa.toLowerCase())
        )
    }
    if (produto) {
        exibirProduto(produto)
        mensagem.textContent = ''
    } else {
        mensagem.textContent = 'Produto não encontrado! Tente novamente.'
    }
}

confirmarPesquisa.addEventListener('click', consultar)
campoPesquisa.addEventListener('keydown', evento => {
    if (evento.key === 'Enter') {
        consultar()
    }
})

function exibirProduto(produto) {
    nome.textContent = produto.nome
    imagem.src = produto.imagem
    imagem.alt = produto.nome
    codigo.textContent = `Código: ${produto.codigo}`
    preco.textContent = produto.preco.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
    categoria.textContent = `Categoria: ${produto.categoria}`
    conteiner.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

function fecharModal() {
    conteiner.classList.add('hidden')
    overlay.classList.add('hidden')
}
fechar.addEventListener('click', fecharModal)
overlay.addEventListener('click', fecharModal)
document.addEventListener('keydown', evento => {
    if (evento.key === 'Escape') {
        fecharModal()
    }
})
