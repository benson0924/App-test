import { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathProps {
  children: string;
  display?: boolean;
  className?: string;
}

export default function Katex({ children, display = false, className = '' }: MathProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      katex.render(children, ref.current, {
        displayMode: display,
        throwOnError: false,
        trust: true,
      });
    }
  }, [children, display]);

  if (display) {
    return <div className={`katex-display ${className}`} ref={ref as React.RefObject<HTMLDivElement>} />;
  }
  return <span className={className} ref={ref} />;
}
