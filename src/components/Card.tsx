import React, { useState } from 'react';
import { CardType, CardColor } from '../redux/actionTypes/gameTypes';
import classNames from 'classnames';

type CardParams = {
  card: CardType;
  color: CardColor;
  className?: string;
  checkable?: boolean;
  onCheckChange?: (checked: boolean, card: CardType) => void;
};
export default function Card({ card, color, className, checkable, onCheckChange }: CardParams) {
  const [checked, setChecked] = useState(false);

  const changeChecked = (value: boolean) => {
    setChecked(value);
    onCheckChange && onCheckChange(value, card);
  };

  return (
    <div
      className={classNames(className, 'w-48 h-64 border rounded p-4 text-xs relative cursor-default', {
        'bg-gray-800': color === CardColor.Black,
        'text-gray-100': color === CardColor.Black,
        'bg-gray-100': color === CardColor.White,
        'text-gray-800': color === CardColor.White,
      })}
      onClick={() => changeChecked(!checked)}
      role="button"
    >
      {card.message}
      {checkable && (
        <input
          type="checkbox"
          className="absolute right-0 bottom-0 mb-4 mr-4"
          checked={checked}
          onChange={(e) => changeChecked(e.target.checked)}
        />
      )}
    </div>
  );
}