import React, { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadBasic } from '@tsparticles/basic';

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadBasic(engine);
  }, []);

  const particlesConfig = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "connect",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        connect: {
          distance: 80,
          lineLinked: {
            opacity: 0.5,
          },
          radius: 60,
        },
      },
    },
    particles: {
      color: {
        value: "#06b6d4",
      },
      links: {
        color: "#06b6d4",
        distance: 120,
        enable: true,
        opacity: 0.15,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 0.3,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 1200,
        },
        value: 40,
      },
      opacity: {
        value: 0.3,
        random: false,
        animation: {
          enable: false,
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: 2,
        animation: {
          enable: false,
        },
      },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesConfig}
      className="absolute inset-0 -z-10"
    />
  );
};

export default ParticleBackground;