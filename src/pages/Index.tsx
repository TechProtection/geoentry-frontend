
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard by default for mockup
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-geo-dark">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Cargando...</h1>
        <p className="text-xl text-geo-text-muted">Redirigiendo...</p>
      </div>
    </div>
  );
};

export default Index;
