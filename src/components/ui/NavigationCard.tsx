import { Link } from 'react-router-dom';
import { useState } from 'react';

interface NavigationCardProps {
  to: string;
  emoji: string;
  title: string;
  description: string;
  color: string;
  hoverColor: string;
}

/**
 * Reusable navigation card component for home page links
 * Provides consistent styling and hover behavior
 */
export const NavigationCard = ({
  to,
  emoji,
  title,
  description,
  color,
  hoverColor,
}: NavigationCardProps) => {
  const [bgColor, setBgColor] = useState(color);

  return (
    <Link
      to={to}
      className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-8 text-center group w-[200px] rounded-[5px]"
      style={{ backgroundColor: bgColor }}
      onMouseEnter={() => setBgColor(hoverColor)}
      onMouseLeave={() => setBgColor(color)}
    >
      <div
        className="mb-4 group-hover:scale-110 transition-transform text-6xl"
        aria-hidden="true"
      >
        {emoji}
      </div>
      <h2 className="text-2xl font-bold mb-3 text-white">{title}</h2>
      <p className="text-blue-50">{description}</p>
    </Link>
  );
};
