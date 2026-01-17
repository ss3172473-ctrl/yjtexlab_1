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
                <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: '#fff',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                }}>
                    #{id}
                </div>
            </div>
            {/* Price and Details removed as requested */}
        </div>
    );
};

export default ProductCard;
