import { createContext, useContext, useState, ReactNode } from 'react';

interface UserInteractionState {
  favorites: Set<string>;
  likes: Map<string, boolean>; // true for like, false for dislike
  commentLikes: Set<string>;
}

interface UserInteractionContextType {
  state: UserInteractionState;
  toggleFavorite: (id: string) => void;
  toggleLike: (id: string) => void;
  toggleDislike: (id: string) => void;
  toggleCommentLike: (commentId: string) => void;
  isFavorited: (id: string) => boolean;
  isLiked: (id: string) => boolean;
  isDisliked: (id: string) => boolean;
  isCommentLiked: (commentId: string) => boolean;
}

const UserInteractionContext = createContext<UserInteractionContextType | undefined>(undefined);

export const UserInteractionProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<UserInteractionState>({
    favorites: new Set(),
    likes: new Map(),
    commentLikes: new Set(),
  });

  const toggleFavorite = (id: string) => {
    setState(prev => {
      const newFavorites = new Set(prev.favorites);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return {
        ...prev,
        favorites: newFavorites,
      };
    });
  };

  const toggleLike = (id: string) => {
    setState(prev => {
      const newLikes = new Map(prev.likes);
      const currentState = newLikes.get(id);
      
      if (currentState === true) {
        // Already liked, remove like
        newLikes.delete(id);
      } else {
        // Not liked or disliked, add like
        newLikes.set(id, true);
      }
      
      return {
        ...prev,
        likes: newLikes,
      };
    });
  };

  const toggleDislike = (id: string) => {
    setState(prev => {
      const newLikes = new Map(prev.likes);
      const currentState = newLikes.get(id);
      
      if (currentState === false) {
        // Already disliked, remove dislike
        newLikes.delete(id);
      } else {
        // Not disliked or liked, add dislike
        newLikes.set(id, false);
      }
      
      return {
        ...prev,
        likes: newLikes,
      };
    });
  };

  const toggleCommentLike = (commentId: string) => {
    setState(prev => {
      const newCommentLikes = new Set(prev.commentLikes);
      if (newCommentLikes.has(commentId)) {
        newCommentLikes.delete(commentId);
      } else {
        newCommentLikes.add(commentId);
      }
      return {
        ...prev,
        commentLikes: newCommentLikes,
      };
    });
  };

  const isFavorited = (id: string) => state.favorites.has(id);
  const isLiked = (id: string) => state.likes.get(id) === true;
  const isDisliked = (id: string) => state.likes.get(id) === false;
  const isCommentLiked = (commentId: string) => state.commentLikes.has(commentId);

  return (
    <UserInteractionContext.Provider
      value={{
        state,
        toggleFavorite,
        toggleLike,
        toggleDislike,
        toggleCommentLike,
        isFavorited,
        isLiked,
        isDisliked,
        isCommentLiked,
      }}
    >
      {children}
    </UserInteractionContext.Provider>
  );
};

export const useUserInteraction = () => {
  const context = useContext(UserInteractionContext);
  if (context === undefined) {
    throw new Error('useUserInteraction must be used within a UserInteractionProvider');
  }
  return context;
};