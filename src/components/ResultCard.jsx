import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCollection, removeFromCollection } from '../redux/features/CollectionSlice';

/**
 * RESULT CARD COMPONENT:
 * This component is responsible for showing a single item (Photo, Video, or GIF).
 * It handles video playback on hover using 'useRef'.
 */
const ResultCard = ({ item, type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Select the collection from Redux to check if this item is already saved
  const collection = useSelector((state) => state.collection.items);
  const isSaved = collection.some((i) => i.id === item.id);

  // useRef is used to control the <video> element directly (like play/pause)
  const videoRef = useRef(null);
  
  // Local state to track if the mouse is over this specific card
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Helper function to get the correct Image URL based on the media type.
   */
  const getImageUrl = () => {
    if (type === 'photos') return item.urls?.regular || item.urls?.small;
    if (type === 'videos') return item.image; // Pexels video preview image
    if (type === 'gifs') return item.images?.fixed_height?.url;
    return '';
  };

  /**
   * Helper function to get the Video URL (only for Pexels videos).
   */
  const getVideoUrl = () => {
    if (type === 'videos') {
      return item.video_files?.find(f => f.file_type === 'video/mp4')?.link || item.video_files?.[0]?.link;
    }
    return null;
  };

  /**
   * Helper function to get the Original Source URL
   */
  const getSourceUrl = () => {
    if (type === 'photos') return item.links?.html;
    if (type === 'videos') return item.url;
    if (type === 'gifs') return item.url;
    return '#';
  };

  /**
   * Helper function to get the Title
   */
  const getTitle = () => {
    if (type === 'photos') return item.alt_description || item.description || `Photo by ${item.user?.name}`;
    if (type === 'videos') return `Video by ${item.user?.name}`;
    if (type === 'gifs') return item.title;
    return 'Untitled';
  };

  const imageUrl = getImageUrl();
  const videoUrl = getVideoUrl();
  const sourceUrl = getSourceUrl();
  const title = getTitle();

  /**
   * Toggles the item in the collection.
   * Uses e.stopPropagation() to prevent the card click (which opens the link).
   */
  const handleSaveToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isSaved) {
      dispatch(removeFromCollection(item.id));
    } else {
      // We store the type with the item so we know how to render it in the collection page
      dispatch(addToCollection({ ...item, mediaType: type }));
      // Redirect to collection page after saving
      navigate('/collection');
    }
  };

  const handleCardClick = () => {
    window.open(sourceUrl, '_blank', 'noopener,noreferrer');
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log("Video play failed:", err));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      className="group relative overflow-hidden rounded-2xl bg-gray-900 aspect-square cursor-pointer transition-all duration-500 hover:scale-[1.03] active:scale-95 shadow-2xl border border-gray-800/50"
    >
      {/* Media content */}
      {type === 'videos' ? (
        <div className="relative h-full w-full bg-black">
            <img 
              src={imageUrl} 
              alt={title} 
              className={`h-full w-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`} 
            />
            <video
              ref={videoRef}
              src={videoUrl}
              muted
              loop
              playsInline
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            />
            {!isHovered && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 text-white shadow-lg transform transition-transform group-hover:scale-110">
                        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                </div>
            )}
        </div>
      ) : (
        <img 
          src={imageUrl} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
      )}
      
      {/* Premium Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">
        
        {/* Save Button */}
        <div className="absolute top-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <button 
            onClick={handleSaveToggle}
            className={`flex items-center gap-2 px-4 py-2 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold transition-all hover:scale-110 active:scale-90 shadow-lg ${
              isSaved ? 'bg-red-600/80 hover:bg-red-500' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <svg className={`w-4 h-4 ${isSaved ? 'fill-white' : 'fill-pink-500'}`} viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            {isSaved ? 'Unsave' : 'Save'}
          </button>
        </div>

        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-white text-sm font-bold truncate mb-1 pr-2 drop-shadow-md">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            <p className="text-gray-300 text-[10px] tracking-widest uppercase font-semibold">
              View Original {type.slice(0, -1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
