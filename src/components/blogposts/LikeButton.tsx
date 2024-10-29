"use client";

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface LikeButtonProps {
    postId: string;
    initialLikes: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, initialLikes }) => {
    const [likes, setLikes] = useState(initialLikes);
    const [hasLiked, setHasLiked] = useState(false);
    const supabase = createClientComponentClient();

    useEffect(() => {
        // Verificar si el usuario ya ha dado like a este post
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
        if (likedPosts.includes(postId)) {
            setHasLiked(true);
        }
    }, [postId]);

    const handleLike = async () => {
        if (hasLiked) return; // No permite dar like si ya se ha dado

        setLikes(likes + 1); // Actualiza el estado local
        const { error } = await supabase
            .from('posts')
            .update({ likes: likes + 1 })
            .eq('id', postId);

        if (error) {
            console.error('Error al actualizar likes:', error);
        } else {
            // Guardar el postId en localStorage
            const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
            likedPosts.push(postId);
            localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
            setHasLiked(true);
        }
    };

    return (
        <button
            className={`flex flex-row gap-1 items-center mt-2 transition-transform duration-300`}
            onClick={handleLike}
            disabled={hasLiked}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={hasLiked ? 'orange' : 'none'} // Cambiar el color según el estado
                stroke="orange"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`icon icon-tabler icons-tabler-outline icon-tabler-heart transition-colors duration-300 ${hasLiked ? 'animate-pulse' : ''}`}
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
            </svg>
            <p className='mt-[1px] text-xs tabular-nums'>{likes} Like</p>
        </button>
    );
};

export default LikeButton;
