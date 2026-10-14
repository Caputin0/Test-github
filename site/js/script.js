// Doppio Mocha — funcionalidades básicas da página inicial

document.addEventListener("DOMContentLoaded", () => {
    const campoPesquisa = document.querySelector('.pesquisa input[type="search"]');
    const formularioPesquisa = document.querySelector(".pesquisa");
    const produtos = [...document.querySelectorAll(".produto")];
    const botoesComprar = document.querySelectorAll(".botao-comprar");
    const contadorCarrinho = document.getElementById("contador-carrinho");
    const linkCarrinho = document.getElementById("link-carrinho");

    let carrinho = [];

    // Pesquisa: filtra os cards pelo nome, categoria e descrição.
    function filtrarProdutos() {
        const termo = campoPesquisa.value.trim().toLocaleLowerCase("pt-BR");

        produtos.forEach((produto) => {
            const texto = produto.innerText.toLocaleLowerCase("pt-BR");
            produto.hidden = termo !== "" && !texto.includes(termo);
        });
    }

    campoPesquisa.addEventListener("input", filtrarProdutos);
    formularioPesquisa.addEventListener("submit", (evento) => {
        evento.preventDefault();
        filtrarProdutos();
        document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
    });

    // Adiciona os produtos ao carrinho e atualiza a quantidade.
    botoesComprar.forEach((botao) => {
        botao.addEventListener("click", () => {
            const card = botao.closest(".produto");
            const nome = card.querySelector("h3").textContent.trim();
            const precoTexto = card.querySelector(".preco").textContent;
            const preco = Number(
                precoTexto.replace("R$", "").trim().replace(/\./g, "").replace(",", ".")
            );

            carrinho.push({ nome, preco });
            contadorCarrinho.textContent = carrinho.length;
            botao.textContent = "Adicionado ✓";
            window.setTimeout(() => {
                botao.textContent = "Adicionar ao carrinho";
            }, 1200);

            console.log("Carrinho atual:", carrinho);
        });
    });

    // Ao clicar no carrinho, mostra os itens adicionados e o total.
    linkCarrinho.addEventListener("click", (evento) => {
        evento.preventDefault();

        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio. Adicione um produto para começar!");
            return;
        }

        const resumo = carrinho.map((item, indice) =>
            `${indice + 1}. ${item.nome} — ${item.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })}`
        );

        const total = carrinho.reduce((soma, item) => soma + item.preco, 0);
        alert(
            "SEU CARRINHO\n\n" + resumo.join("\n") +
            "\n\nTotal: " + total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
        );
    });
});
