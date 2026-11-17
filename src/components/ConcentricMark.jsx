import React from 'react';

/**
 * Six concentric oval outlines (slightly taller than wide) rendered as 2px solid strokes.
 * The primary brand identifier for SUBHALAXMI, replacing a wordmark or monogram,
 * echoing the royal bangle/ring form as a typographic sculpture.
 */
export default function ConcentricMark({
  size = 280,
  strokeColor = '#212123',
  strokeWidth = 2,
  className = '',
}) {
  // 6 concentric ovals, slightly taller than wide (aspect ratio ~ 0.88 : 1)
  const radii = [
    { rx: 110, ry: 125 },
    { rx: 90, ry: 102 },
    { rx: 71, ry: 80 },
    { rx: 53, ry: 60 },
    { rx: 36, ry: 41 },
    { rx: 20, ry: 23 },
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 280 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        display: 'block',
        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      aria-label="SUBHALAXMI Concentric Ring Brand Mark"
    >
      <g transform="translate(140, 140)">
        {radii.map((r, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="0"
            rx={r.rx}
            ry={r.ry}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            vectorEffect="non-scaling-stroke"
            style={{
              transition: 'stroke 0.3s ease, rx 0.4s ease, ry 0.4s ease',
            }}
          />
        ))}
      </g>
    </svg>
  );
}
