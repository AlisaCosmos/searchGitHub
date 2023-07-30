import Scrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
import './SmoothScroll.scss';
import { useEffect } from 'react';

const overscrollPlugin = {
  enable: true,
  effect: 'bounce',
  damping: 0.15,
  maxOverscroll: 150,
  glowColor: '#fff',
};

const options = {
  damping: 0.07,
  plugins: {
    overscroll: { ...overscrollPlugin },
  },
};

export default function SmoothScroll() {
  useEffect(() => {
    Scrollbar.use(OverscrollPlugin);
    Scrollbar.init(document.body, options);
    return () => {
      if (Scrollbar) Scrollbar.destroy(document.body);
    };
  }, []);

  return null;
}
