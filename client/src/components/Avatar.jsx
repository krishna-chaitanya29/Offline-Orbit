import { useState } from 'react';
import { API_BASE_URL } from '../lib/apiBase';

function InitialsFallback({ name, className, style }) {
    const initials = (name || 'U').slice(0, 2).toUpperCase();
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
    let hash = 0;
    for (let i = 0; i < (name || '').length; i++) {
        hash = (name || '').charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = colors[Math.abs(hash) % colors.length];

    return (
        <div
            className={`${className} ${color} flex items-center justify-center text-white font-bold tracking-wide`}
            style={style}
        >
            {initials}
        </div>
    );
}

export default function Avatar({ src, name, className }) {
    const [imgFailed, setImgFailed] = useState(false);

    // Resolve local upload paths to full server URL
    let finalSrc = src;
    if (src && src.startsWith('/uploads')) {
        finalSrc = `${API_BASE_URL}${src}`;
    }

    // Show initials if no image source or if the image failed to load
    if (!finalSrc || imgFailed) {
        return <InitialsFallback name={name} className={className} />;
    }

    return (
        <>
            <img
                src={finalSrc}
                alt={name || 'User'}
                className={`${className} object-cover`}
                onError={() => setImgFailed(true)}
            />
        </>
    );
}
