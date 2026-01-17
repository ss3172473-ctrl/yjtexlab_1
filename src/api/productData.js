// Initial Data populated with Google Drive File IDs
// Pattern: 1-1, 1-2, 1-3 ...
export const initialProductData = [
    { id: 1, group: '체크&스트라이프', imageIds: ['1zn46EOsQ3pEU7pPsQMwmZFdEUiyPrEUH', '1QWZ4paFWtVhHXCoOQju23-uTqDl2GDdi', '1hC6Kfd6DtEIFbBazxWV7NIB4FjdXhvVF'] },
    { id: 2, group: '체크&스트라이프', imageIds: ['1IzH3ycbpP7kYcqnqmQgQuXts_0RTBw2_', '1iGh9R4SpFzK5H-wo-IjtqVJ3Qz8uOWNi', '1jG-2FtIN2echYcDK5k179GU7Fpi6xkSN'] },
    { id: 3, group: '체크&스트라이프', imageIds: ['1psX5kXVOsuwHcAad5iEo6ClnBOU6h2I5', '105f4-610Aimd_e0hrv0YDgBY0rjQqM3-', '1kCMAR8FP_ELhRWESrduLK3esWhByCN4B'] },
    { id: 4, group: '체크&스트라이프', imageIds: ['1poFM-dhknxYEm2AFFboLhSwProysQ6iZ', '1D2sG6AnXp1rFGHKNgG4VrEbxmFhx85_M', '1B5N5Rsj4uiqlfFsbvpczI_zJzYR7bWpa'] },
    { id: 5, group: '체크&스트라이프', imageIds: ['1yGmOonrTIHVYAYM9GHXUKla_HxqK6ta_', '1cKp-4CbSyBMlWC8Tr28P39jGuaR4eWpm', '1F4rnCtUYU1aDHnkl96tqOz7AjFP85U80'] },
    // Placeholders for remaining items (User can fill ids via Admin or Code)
    { id: 6, group: '나염', imageIds: ['', '', ''] },
    { id: 7, group: '나염', imageIds: ['', '', ''] },
    { id: 8, group: '나염', imageIds: ['', '', ''] },
];

export const getDriveImageLink = (id) => {
    if (!id) return '';
    return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
};
