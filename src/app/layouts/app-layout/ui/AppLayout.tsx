import { Outlet } from 'react-router-dom';

import styles from './appLayout.module.scss';

export function AppLayout() {
  return (
    <div className={styles.appLayout}>
      <Outlet />
    </div>
  );
}
