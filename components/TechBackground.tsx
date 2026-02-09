import React, { useEffect, useState } from 'react';

const TechBackground: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 bg-primary z-0" />;
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-primary pointer-events-none">
      {/* Dynamic Theme Background */}
      <div className="absolute inset-0 bg-primary" />
    </div>
  );
};

export default TechBackground;
