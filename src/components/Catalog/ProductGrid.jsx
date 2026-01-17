import React from 'react';
import ProductCard from '../Product/ProductCard';

const ProductGrid = ({ products, onProductClick }) => {
    // Group products by 'group' field
    const groupedProducts = products.reduce((acc, product) => {
        const groupName = product.group || 'Other';
        if (!acc[groupName]) {
            acc[groupName] = [];
        }
        acc[groupName].push(product);
        return acc;
    }, {});

    return (
        <div style={{ padding: '16px' }}>
            {Object.entries(groupedProducts).map(([groupName, items]) => (
                <div key={groupName} style={{ marginBottom: '40px' }}>
                    <div style={{
                        backgroundColor: '#fff',
                        padding: '16px',
                        borderRadius: '8px',
                        marginBottom: '16px',
                        borderLeft: '4px solid var(--primary-color)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                    }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                            {groupName}
                        </h2>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '16px',
                        placeItems: 'center'
                    }}>
                        {items.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={onProductClick}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;
