class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        const produtosPrincipais = {};
        let possuiItemPrincipal = false;

        let valorTotal = 0;

        for (const item of itens) {
            const [produto, quantidade] = item.split(',');

            if (metodoDePagamento === 'dinheiro' && quantidade <= 0) {
                return 'Quantidade inválida!';
            }

            if (!produto || !quantidade || quantidade <= 0) {
                return 'Item inválido!';
            }

            if (!this.ehItemPrincipal(produto)) {
                if (!this.ehItemExtra(produto)) {
                    return 'Item inválido!';
                }
                if (!possuiItemPrincipal) {
                    return 'Item extra não pode ser pedido sem o principal';
                }
            } else {
                possuiItemPrincipal = true;
            }

            const precoUnitario = this.obterPrecoProduto(produto);
            if (precoUnitario === null) {
                return 'Item inválido!';
            }

            valorTotal += precoUnitario * quantidade;

            this.registrarProdutoPrincipal(produto, produtosPrincipais);

        }

        if (metodoDePagamento === 'dinheiro') {
            valorTotal *= 0.95; // Aplicar desconto de 5% para pagamento em dinheiro
        } else if (metodoDePagamento === 'credito') {
            valorTotal *= 1.03; // Aplicar acréscimo de 3% para pagamento com cartão de crédito

        } else if(metodoDePagamento === 'debito'){
       
        }
        else if (metodoDePagamento !== 'debito') {
            return 'Forma de pagamento inválida!';
        }

        const valorFinal = valorTotal.toFixed(2).replace('.', ',');
        return `R$ ${valorFinal}`;
    }

    ehItemPrincipal(produto) {
        const produtosPrincipais = ['cafe', 'suco', 'sanduiche', 'salgado', 'combo1', 'combo2'];
        return produtosPrincipais.includes(produto);
    }

    ehItemExtra(produto) {
        const produtosExtras = ['queijo', 'chantily'];
        return produtosExtras.includes(produto);
    }

    registrarProdutoPrincipal(produto, produtosPrincipais) {
        const produtoPrincipal = produto.split(',')[0];
        if (this.ehItemPrincipal(produtoPrincipal)) {
            produtosPrincipais[produtoPrincipal] = true;
        }
    }

    obterPrecoProduto(produto) {
        const precos = {
            'cafe': 3.00,
            'chantily': 1.50,
            'suco': 6.20,
            'sanduiche': 6.50,
            'queijo': 2.00,
            'salgado': 7.25,
            'combo1': 9.50,
            'combo2': 7.50,
           
        };

        return precos[produto] || null;
    }
}

export { CaixaDaLanchonete };





