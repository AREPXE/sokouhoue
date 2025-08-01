import React, { forwardRef } from 'react';
import { CompositionCanvasProps } from '../types';

export const CompositionCanvas = forwardRef<
  HTMLDivElement,
  CompositionCanvasProps
>(
  (
    {
      fullName,
      price,
      recordNumber,
      customText,
      photoUrl,
      elements,
      className = '',
      displaySize = 500,
    },
    ref
  ) => {
    return (
      <div className={`mx-auto ${className}`}>
        {/* Display Canvas - Responsive for viewing */}
        <div
          className="relative bg-gray-200 rounded-lg overflow-hidden mx-auto shadow-lg"
          style={{
            width: `${displaySize}px`,
            height: `${displaySize}px`,
          }}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('/flyer2.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />

          {/* User Photo */}
          {photoUrl && (
            <div
              className="absolute"
              style={{
                left: `${elements.photo.x}%`,
                top: `${elements.photo.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <img
                src={photoUrl}
                alt="User"
                className="shadow-lg object-cover"
                style={{
                  width: `${(elements.photo.size * displaySize) / 1000}px`,
                  height: `${(elements.photo.size * displaySize) / 1000}px`,
                  borderRadius: '5px',
                }}
              />
            </div>
          )}

          {/* Name */}
          {fullName && (
            <div
              className="absolute font-serif text-white "
              style={{
                left: `${elements.name.x}%`,
                top: `${elements.name.y}%`,
                transform: 'translate(-50%, -50%)',
                fontSize: `${(elements.name.size * displaySize) / 1000}px`,
                // textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
              }}
            >
              {fullName}
            </div>
          )}

          {/* Price */}
          {price > 0 && (
            <div
              className="absolute font-bold text-black-300"
              style={{
                left: `${elements.price.x}%`,
                top: `${elements.price.y}%`,
                transform: 'translate(-50%, -50%)',
                fontSize: `${(elements.price.size * displaySize) / 1000}px`,
                // textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
              }}
            >
              {price.toFixed(2)} FCFA
            </div>
          )}

          {/* Record Number */}
          {recordNumber && (
            <div
              className="absolute font-bold text-gray-500"
              style={{
                left: `${elements.recordNumber.x}%`,
                top: `${elements.recordNumber.y}%`,
                transform: 'translate(-50%, -50%)',
                fontSize: `${
                  (elements.recordNumber.size * displaySize) / 1000
                }px`,
                // textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              }}
            >
              {recordNumber}
            </div>
          )}

          {/* Custom Text */}
          {customText && (
            <div
              className="absolute font-semibold text-white"
              style={{
                left: `${elements.customText.x}%`,
                top: `${elements.customText.y}%`,
                transform: 'translate(-50%, -50%)',
                fontSize: `${
                  (elements.customText.size * displaySize) / 1000
                }px`,
                whiteSpace: 'pre-line',
                textAlign: 'center',
                // textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
              }}
            >
              {customText}
            </div>
          )}
        </div>

        {/* Hidden Export Canvas - Always 1000x1000px for complete badge export */}
        <div
          ref={ref}
          className="absolute pointer-events-none opacity-0"
          style={{
            left: '0px',
            top: '0px',
            width: '1000px',
            height: '1000px',
            zIndex: -10,
          }}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('/flyer2.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />

          {/* User Photo */}
          {photoUrl && (
            <div
              className="absolute"
              style={{
                left: `${elements.photo.x}%`,
                top: `${elements.photo.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <img
                src={photoUrl}
                alt="User"
                className="rounded-lg shadow-lg object-cover"
                style={{
                  width: `${elements.photo.size}px`,
                  height: `${elements.photo.size}px`,
                }}
              />
            </div>
          )}

          {/* Name */}
          {fullName && (
            <div
              className="absolute font-serif font-bold text-white"
              style={{
                left: `${elements.name.x}%`,
                top: `${elements.name.y}%`,
                transform: 'translate(-50%, -50%)',
                fontSize: `${elements.name.size}px`,
                // textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
              }}
            >
              {fullName}
            </div>
          )}

          {/* Price */}
          {price > 0 && (
            <div
              className="absolute font-bold text-black"
              style={{
                left: `${elements.price.x}%`,
                top: `${elements.price.y - 2}%`,
                transform: 'translate(-50%, -50%)',
                fontSize: `${elements.price.size}px`,
                // textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
              }}
            >
              {price.toFixed(2)} FCFA
            </div>
          )}

          {/* Record Number */}
          {recordNumber && (
            <div
              className="absolute font-bold text-gray-500"
              style={{
                left: `${elements.recordNumber.x}%`,
                top: `${elements.recordNumber.y}%`,
                transform: 'translate(-50%, -50%)',
                fontSize: `${elements.recordNumber.size}px`,
                // textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              }}
            >
              {recordNumber}
            </div>
          )}

          {/* Custom Text */}
          {customText && (
            <div
              className="absolute font-semibold text-white"
              style={{
                left: `${elements.customText.x}%`,
                top: `${elements.customText.y}%`,
                transform: 'translate(-50%, -50%)',
                fontSize: `${elements.customText.size}px`,
                whiteSpace: 'pre-line',
                textAlign: 'center',
                // textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
              }}
            >
              {customText}
            </div>
          )}
        </div>
      </div>
    );
  }
);
