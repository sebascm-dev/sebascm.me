"use client";

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface LikeButtonProps {
  projectId: string;
  initialLikes: number;
}

const LikeButtonProject: React.FC<LikeButtonProps> = ({ projectId, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const likedProjects = JSON.parse(localStorage.getItem('likedProjects') || '[]');
    if (likedProjects.includes(projectId)) {
      setHasLiked(true);
    }
  }, [projectId]);

  const handleLike = async () => {
    if (hasLiked) return;

    try {
      const { error } = await supabase
        .from('projects')
        .update({ likes: likes + 1 })
        .eq('id', projectId);

      if (error) {
        console.error('Error al actualizar likes:', error.message);
        return;
      }

      const likedProjects = JSON.parse(localStorage.getItem('likedProjects') || '[]');
      likedProjects.push(projectId);
      localStorage.setItem('likedProjects', JSON.stringify(likedProjects));

      setLikes((prevLikes) => prevLikes + 1);
      setHasLiked(true);
    } catch (err) {
      console.error('Error al manejar el like:', err);
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
        fill={hasLiked ? 'orange' : 'none'}
        stroke="orange"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`icon icon-tabler icons-tabler-outline icon-tabler-heart transition-colors duration-300 ${hasLiked ? 'animate-pulse' : ''}`}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
      </svg>
      <p className='mt-[1px] text-xs tabular-nums text-gray-100/85'>{likes} Me gustas</p>
    </button>
  );
};

export default LikeButtonProject;
