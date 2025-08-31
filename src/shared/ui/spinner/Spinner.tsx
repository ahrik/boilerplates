import clsx from 'clsx';
import { LoaderCircle } from 'lucide-react';

import styles from './spinner.module.scss';

type Props = {
  isFullScreen?: boolean;
};

export const Spinner = ({ isFullScreen }: Props) => {
  return (
    <div className={clsx(isFullScreen && styles.spinnerIsFull, 'flex items-center justify-center')}>
      <LoaderCircle fontSize={'200px'} className={styles.spinnerIcon} />
    </div>
  );
};
