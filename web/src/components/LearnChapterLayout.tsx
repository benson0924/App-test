import { Outlet, useLocation } from 'react-router-dom';
import ChapterShell from './ChapterShell';

/** Wraps individual learn chapters with sticky TOC + progress; index page passes through. */
export default function LearnChapterLayout() {
  const { pathname } = useLocation();
  if (pathname === '/learn') return <Outlet />;
  return (
    <ChapterShell>
      <Outlet />
    </ChapterShell>
  );
}
