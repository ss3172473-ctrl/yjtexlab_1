import React from 'react';

const ProductCard = ({ product, onClick }) => {
    const { id, price, images, isSoldOut } = product;
    const mainImage = images && images.length > 0 ? images[0] : '';

    return (
        <div
            onClick={() => onClick(product)}
            style={{
                position: 'relative',
                borderRadius: 'var(--border-radius)',
                overflow: 'hidden',
                backgroundColor: 'var(--card-bg)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                cursor: 'pointer',
                transition: 'transform 0.2s',
            }}
        >
            <div style={{ position: 'relative', paddingBottom: '100%', overflow: 'hidden' }}>
                <img
                    src={mainImage}
                    alt={`Fabric ${id}`}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                    loading="lazy"
                />
                {isSoldOut && (
                    <div className="sold-out-overlay">
                        판매 종료
                    </div>
                )}
            </div>
            <div style={{ padding: '12px' }}>
                <h3 className="font-bold" style={{ fontSize: '1.2rem', marginBottom: '4px' }}>
                    #{id}
                </h3>
                <p style={{ color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: '500' }}>
                    {price}원
                </p>
            </div>
        </div>
    );
};

export default ProductCard;
