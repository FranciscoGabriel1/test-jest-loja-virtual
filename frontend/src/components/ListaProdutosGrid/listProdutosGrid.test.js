import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ProductListGrid from '.'; 

const listaProdutos = [
    { id: 1, nome: 'Banana', preco: 5, estoque: 5 },
    { id: 2, nome: 'Cebola', preco: 4, estoque: 0 },
];

const mockDoProdutoSelecionado = jest.fn();

const props = {
    data: listaProdutos,
    onProductClicked: mockDoProdutoSelecionado,
};


describe('ProductListGrid', () => {
    it('renderiza os card de produto corretamente', async () => {
        render(<ProductListGrid {...props} />);
        const productCards = screen.getAllByRole('img');
        expect(productCards).toHaveLength(listaProdutos.length);
        listaProdutos.forEach((product) => {
            expect(screen.getByText(product.nome)).toBeInTheDocument();
        });

        const addButton = screen.getAllByLabelText('Adicionar ao carrinho')[0]; 
        const disabledButton = screen.getAllByText('Indisponível')[0]; 

        userEvent.click(disabledButton);
       await userEvent.click(addButton);
       await waitFor(() => {
       expect(mockDoProdutoSelecionado).toHaveBeenCalledTimes(1);
       expect(mockDoProdutoSelecionado).toHaveBeenCalledWith(listaProdutos[0]);
});
    });
});