import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCollection, removeFromCollection } from '../redux/features/CollectionSlice';

const ResultCard = ({ item, type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const collection = useSelector((state) => state.collection.items);
  const isSaved = collection.some((i) => i.id === item.id);

  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const getImageUrl = () => {
    if (type === 'photos') return item.urls?.regular || item.urls?.small;
    if (type === 'videos') return item.image;
    if (type === 'gifs') return item.images?.fixed_height?.url;
    return '';
  };

  const getVideoUrl = () => {
    if (type === 'videos') {
      return (
        item.video_files?.find(f => f.file_type === 'video/mp4')?.link ||
        item.video_files?.[0]?.link
      );
    }
    return null;
  };

  const getSourceUrl = () => {
    if (type === 'photos') return item.links?.html;
    if (type === 'videos') return item.url;
    if (type === 'gifs') return item.url;
    return '#';
  };

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

  const handleSaveToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSaved) {
      dispatch(removeFromCollection(item.id));
    } else {
      dispatch(addToCollection({ ...item, mediaType: type }));
      navigate('/collection');
    }
  };

  const handleCardClick = () => {
    window.open(sourceUrl, '_blank', 'noopener,noreferrer');
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
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
      className="group relative w-full overflow-hidden rounded-3xl bg-neutral-900 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
    >
      <div className="relative aspect-[1/1] sm:aspect-[4/5] w-full">

        {type === 'videos' ? (
          <>
            <img
              src={imageUrl}
              alt={title}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
            />
            <video
              ref={videoRef}
              src={videoUrl}
              muted
              loop
              playsInline
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            />
          </>
        ) : (
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-400" />

        <button
          onClick={handleSaveToggle}
          className={`absolute top-3 right-3 sm:top-4 sm:right-4 z-20 px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border transition-all duration-300 ${
            isSaved
              ? 'bg-red-600 text-white border-red-500'
              : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
          }`}
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>

        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 translate-y-6 group-hover:translate-y-0 transition-all duration-500">
          <h3 className="text-white text-sm sm:text-base font-semibold truncate drop-shadow-lg">
            {title}
          </h3>
          <p className="text-gray-300 text-[11px] sm:text-xs uppercase tracking-wider mt-1">
            View Original {type.slice(0, -1)}
          </p>
        </div>

      </div>
    </div>
  );
};

export default ResultCard;