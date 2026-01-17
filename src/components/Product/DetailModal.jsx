import React, { useState } from 'react';

const VIEW_TYPES = [
    { id: 0, label: '기본', key: 'normal' },
    { id: 1, label: '질감', key: 'texture' },
    { id: 2, label: '크기', key: 'scale' },
];

const DetailModal = ({ product, onClose }) => {
    const [activeTab, setActiveTab] = useState(0);

    if (!product) return null;

    const { id, price, images, isSoldOut } = product;

    // images array order matches VIEW_TYPES: [normal, texture, scale, lifestyle]
    // Ideally, images should be an array of adequate length. 
    // If some are missing, we handle it gracefully.
    const currentImage = images[activeTab] || images[0];

    const handleOrder = () => {
        alert("원단 번호를 기억해두세요!\n나중에 하단 '전체 주문서 작성하기'를 눌러서 한 번에 주문하시면 됩니다.");
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: '#fff',
                width: '100%',
                maxWidth: '480px',
                maxHeight: '90vh',
                borderRadius: '16px',
                overflowY: 'auto',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
            }} onClick={e => e.stopPropagation()}>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        zIndex: 10,
                        background: 'rgba(255,255,255,0.8)',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        fontSize: '1.5rem',
                        lineHeight: '1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    &times;
                </button>

                {/* Main Image Area */}
                <div style={{ position: 'relative', width: '100%', paddingBottom: '125%', flexShrink: 0 }}>
                    <img
                        src={currentImage}
                        alt={`View ${VIEW_TYPES[activeTab].label}`}
                        style={{
                            position: 'absolute',
                            top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover'
                        }}
                    />
                    {isSoldOut && (
                        <div className="sold-out-overlay" style={{ fontSize: '1.5rem' }}>
                            판매 종료
                        </div>
                    )}
                </div>

                {/* Tab Navigation */}
                <div style={{ display: 'flex', borderBottom: '1px solid #eee' }}>
                    {VIEW_TYPES.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setActiveTab(type.id)}
                            style={{
                                flex: 1,
                                padding: '12px 0',
                                fontSize: '1rem',
                                fontWeight: activeTab === type.id ? '700' : '400',
                                color: activeTab === type.id ? 'var(--primary-color)' : '#888',
                                borderBottom: activeTab === type.id ? '3px solid var(--primary-color)' : 'none',
                                backgroundColor: '#fff'
                            }}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <div>
                            <span style={{ fontSize: '1rem', color: '#666', display: 'block' }}>Fabric Code</span>
                            <h2 style={{ fontSize: '2rem', fontWeight: '800', lineHeight: 1.2 }}>#{id}</h2>
                        </div>
                        <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                            {price}원
                        </div>
                    </div>

                    <p style={{ marginBottom: '24px', color: '#555', lineHeight: 1.6 }}>
                        {/* Description based on view type? Or just static text for now */}
                        {activeTab === 3 ?
                            "이 원단으로 만들 수 있는 스타일을 제안합니다." :
                            "고급스러운 터치감과 우수한 품질의 원단입니다."}
                    </p>

                    <button
                        onClick={handleOrder}
                        disabled={isSoldOut}
                        style={{
                            width: '100%',
                            padding: '18px',
                            backgroundColor: isSoldOut ? '#ccc' : 'var(--primary-color)',
                            color: '#fff',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            opacity: isSoldOut ? 0.7 : 1,
                            cursor: isSoldOut ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isSoldOut ? '품절된 상품입니다' : '이 원단 찜하기 (번호 기억)'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;
