function consultar() {
    let cod = Number(document.querySelector('#cod').value)
    fetch("data.json")
        .then(response => response.json())
        .then(produtos => {
            const nome = document.querySelector('#nome')
            const imagem = document.querySelector('#imagem')
            const codigo = document.querySelector('#codigo')
            const preco = document.querySelector('#preco')
            const categoria = document.querySelector('#categoria')
            const fechar = document.querySelector('.fechar')
            let conteiner = document.querySelector('#conteiner')
            let produto = produtos.find(produto => produto.codigo === cod)
            if (produto) {
                nome.textContent = produto.nome
                imagem.src = produto.imagem
                imagem.alt = produto.nome
                codigo.textContent = `Código: ${produto.codigo}`
                preco.textContent = produto.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
                categoria.textContent = produto.categoria
                conteiner.classList.remove("hidden")
                fechar.onclick = () => {
                    conteiner.classList.add("hidden")
                }
            } else {
                window.alert('Produto não encontrado! Tente novamente.')
            }
        })
}
document.querySelector('#button').addEventListener("click", consultar)