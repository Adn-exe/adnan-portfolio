import React, { useEffect, useState } from 'react';

const TechBackground: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 bg-[#000000] z-0" />;
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#000000] pointer-events-none">
      {/* Pure Black Background - No Noise, No Grid */}
      <div className="absolute inset-0 bg-black" />
    </div>
  );
};

export default TechBackground;
