import React from 'react';

export const AccountIcon: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <svg className={className} viewBox="0 0 55 55">
      <path
        d="M27.7113 53.3466C41.8694 53.3466 53.3469 41.8692 53.3469 27.711C53.3469 13.5529 41.8694 2.07544 27.7113 2.07544C13.5531 2.07544 2.07568 13.5529 2.07568 27.711C2.07568 41.8692 13.5531 53.3466 27.7113 53.3466Z"
        stroke="white"
        strokeWidth="1.5"
      />
      <path
        d="M27.7121 31.4115C33.2847 31.4115 37.8021 26.8941 37.8021 21.3215C37.8021 15.7489 33.2847 11.2314 27.7121 11.2314C22.1395 11.2314 17.6221 15.7489 17.6221 21.3215C17.6221 26.8941 22.1395 31.4115 27.7121 31.4115Z"
        stroke="white"
        strokeWidth="1.5"
      />
      <path
        d="M45.9864 45.6722C41.8932 40.0025 35.2359 36.302 27.7041 36.302C20.1782 36.302 13.515 39.9965 9.42188 45.6722"
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  );
};
