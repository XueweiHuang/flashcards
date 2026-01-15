import { useState } from 'react';

interface CategoryButtonProps {
  category: string;
  emoji: string;
  color: string;
  hoverColor: string;
  onClick: (category: string) => void;
}

/**
 * Reusable category button component
 * Used for category selection with consistent styling
 */
export const CategoryButton = ({
  category,
  emoji,
  color,
  hoverColor,
  onClick,
}: CategoryButtonProps) => {
  const [bgColor, setBgColor] = useState(color);

  return (
    <button
      onClick={() => onClick(category)}
      className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-8 text-center group w-[180px] rounded-[5px]"
      style={{ backgroundColor: bgColor }}
      onMouseEnter={() => setBgColor(hoverColor)}
      onMouseLeave={() => setBgColor(color)}
    >
      <div
        className="mb-4 group-hover:scale-110 transition-transform text-8xl"
        aria-hidden="true"
      >
        {emoji}
      </div>
      <h2 className="text-2xl font-bold capitalize text-white">{category}</h2>
    </button>
  );
};
