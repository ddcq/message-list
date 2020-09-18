import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './container.module.scss';

const Container: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
	<div {...props} className={cn(styles.container, className)}>
		{children}
	</div>
);

export default Container;
