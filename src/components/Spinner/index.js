/* @flow */

import React from 'react';
import styles from './styles.css';

export default () =>
  (<div className={styles["rdw-spinner"]}>
    <div className={styles["rdw-bounce1"]} />
    <div className={styles["rdw-bounce2"]} />
    <div className={styles["rdw-bounce3"]} />
  </div>);
