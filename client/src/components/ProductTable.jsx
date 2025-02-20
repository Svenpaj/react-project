import React from 'react';

const ProductTable = ({ categories }) => {

    return (
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
                <tr>
                    <th>Kategori</th>
                    <th>Produkt</th>
                    <th>Pris</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category) => (
                    <React.Fragment key={category.id}>
                        <tr>
                            <td rowSpan={category.products.length + 1} style={{ fontWeight: "bold" }}>
                                {category.category}
                            </td>
                        </tr>
                        {category.products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                            </tr>
                        ))}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    )
}

export default ProductTable;