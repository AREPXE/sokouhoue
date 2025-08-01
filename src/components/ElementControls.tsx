import React from 'react';
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
} from 'lucide-react';
import { ElementPosition } from '../types';

interface ElementControlsProps {
  label: string;
  position: ElementPosition;
  onMove: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onResize: (direction: 'increase' | 'decrease') => void;
  className?: string;
}

export const ElementControls: React.FC<ElementControlsProps> = ({
  label,
  position,
  onMove,
  onResize,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">
        {label}
      </h3>

      {/* Movement Controls */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2 text-center">Position</p>
        <div className="grid grid-cols-3 gap-1 w-24 mx-auto">
          <div></div>
          <button
            onClick={() => onMove('up')}
            className="p-2 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
          >
            <ChevronUp className="w-4 h-4 text-blue-600" />
          </button>
          <div></div>

          <button
            onClick={() => onMove('left')}
            className="p-2 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-blue-600" />
          </button>
          <div className="p-2 bg-gray-100 rounded">
            <div className="w-4 h-4 bg-blue-600 rounded-full mx-auto"></div>
          </div>
          <button
            onClick={() => onMove('right')}
            className="p-2 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-blue-600" />
          </button>

          <div></div>
          <button
            onClick={() => onMove('down')}
            className="p-2 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
          >
            <ChevronDown className="w-4 h-4 text-blue-600" />
          </button>
          <div></div>
        </div>
      </div>

      {/* Size Controls */}
      <div>
        <p className="text-xs text-gray-500 mb-2 text-center">Taille</p>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onResize('decrease')}
            className="p-2 bg-green-50 hover:bg-green-100 rounded transition-colors"
          >
            <Minus className="w-4 h-4 text-green-600" />
          </button>
          <span className="px-3 py-2 bg-gray-100 rounded text-xs font-mono">
            {Math.round(position.size)}
          </span>
          <button
            onClick={() => onResize('increase')}
            className="p-2 bg-green-50 hover:bg-green-100 rounded transition-colors"
          >
            <Plus className="w-4 h-4 text-green-600" />
          </button>
        </div>
      </div>
    </div>
  );
};
