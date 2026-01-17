import Papa from 'papaparse';

// Placeholder URL - User needs to provide the real Published CSV URL
const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRBftEu6Li1fhJdOYxluBTXy4nn8VV2MCZ6TXxlTgskmC2MigR6bMHjZ6edjjfQXUyWOGYI81gZw2H9/pub?output=csv';

export const fetchProducts = async () => {
    try {
        // For development without a real URL, return mock data if URL is dummy
        if (GOOGLE_SHEET_URL.includes('example')) {
            return getMockData();
        }

        const response = await fetch(GOOGLE_SHEET_URL);
        const csvText = await response.text();

        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    resolve(transformData(results.data));
                },
                error: (error) => {
                    reject(error);
                },
            });
        });
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
};

const transformData = (data) => {
    return data.map(item => {
        // Automate Price based on Group
        let price = '2,000'; // Default
        if (item.group && (item.group.includes('나염') || item.group.includes('Print'))) {
            price = '3,000';
        }
        // Add other rules if needed, or rely on default 2000 for Check & Stripe

        return {
            id: item.id,
            group: item.group,
            price: price, // Auto-calculated
            images: [
                getDriveDirectLink(item.image_normal),
                getDriveDirectLink(item.image_texture),
                getDriveDirectLink(item.image_scale),
                getDriveDirectLink(item.image_lifestyle)
            ].filter(Boolean),
            isSoldOut: item.is_soldout === 'TRUE' || item.is_soldout === 'true' || item.is_soldout === true,
        };
    });
};

// Helper: Convert Google Drive Share Link to Direct Link
const getDriveDirectLink = (url) => {
    if (!url) return '';
    try {
        // If it's already a direct link or not a drive link, return as is
        if (!url.includes('drive.google.com')) return url;

        // Extract ID from various Drive URL formats
        let id = '';
        const parts = url.split('/');

        // Format: https://drive.google.com/file/d/VIDEO_ID/view?usp=sharing
        if (url.includes('/file/d/')) {
            const index = parts.indexOf('d');
            if (index !== -1 && parts[index + 1]) {
                id = parts[index + 1];
            }
        }
        // Format: https://drive.google.com/open?id=VIDEO_ID
        else if (url.includes('id=')) {
            id = url.split('id=')[1].split('&')[0];
        }

        if (id) {
            return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`; // Use thumbnail API for better performance/reliability than uc?export=view
        }
        return url;
    } catch (e) {
        return url;
    }
};

const getMockData = () => {
    return [
        {
            id: '01',
            group: 'Check & Stripe',
            price: '2,000',
            images: [
                'https://via.placeholder.com/400x500/eee?text=Normal',
                'https://via.placeholder.com/400x500/ddd?text=Texture',
                'https://via.placeholder.com/400x500/ccc?text=Scale',
                'https://via.placeholder.com/400x500/bbb?text=Lifestyle',
            ],
            isSoldOut: false,
        },
        {
            id: '02',
            group: 'Check & Stripe',
            price: '2,500',
            images: ['https://via.placeholder.com/400x500/eee?text=Normal2'],
            isSoldOut: true,
        },
        {
            id: '03',
            group: 'Solid',
            price: '3,000',
            images: ['https://via.placeholder.com/400x500/eee?text=Normal3'],
            isSoldOut: false,
        }
    ];
};
