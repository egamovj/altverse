import React, { useEffect, useRef } from 'react';
import { useUniverse } from '../contexts/UniverseContext';

const Particles = () => {
  const { currentUniverse } = useUniverse();
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Create initial particles
    const createParticles = () => {
      particles = [];
      const particleCount = Math.floor(window.innerWidth / 10); // Responsive particle count
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 0.5,
          color: currentUniverse.accentColor,
          velocity: {
            x: (Math.random() - 0.5) * 0.5,
            y: (Math.random() - 0.5) * 0.5
          },
          opacity: Math.random() * 0.5 + 0.2
        });
      }
      
      particlesRef.current = particles;
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Initialize
    resizeCanvas();
    createParticles();
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [currentUniverse]);
  
  // Update particles when universe changes
  useEffect(() => {
    if (particlesRef.current.length > 0) {
      particlesRef.current = particlesRef.current.map(particle => ({
        ...particle,
        color: currentUniverse.accentColor
      }));
    }
  }, [currentUniverse]);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
    />
  );
};

export default Particles;