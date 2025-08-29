import { Outlet } from '@tanstack/react-router';

import styles from './appLayout.module.scss';

export function AppLayout() {
  return (
    <div className={styles.appLayout}>
      <Outlet />
    </div>
  );
}
