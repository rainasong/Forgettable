import React from 'react';
import classes from './Loading.module.css';
import PropTypes from 'prop-types';
import BarLoader from 'react-spinners/BarLoader';

/*
 * Loading screen which takes in a text prop. Defaults to "Loading..."
 * if nothing is passed.
 *
 * Author: Mercury Lin (lin8231)
 */
const Loading = (props) => {
  return (
    <div className={classes.Loading}>
      <div className={classes.ContentContainer}>
        <BarLoader
          color={getComputedStyle(document.body) .getPropertyValue('--prmry')}
          css={
            {'background-color':
              getComputedStyle(document.body) .getPropertyValue('--hilit'),
            }
          }
          width={100}
          height={6}
        />
        <p>{props.text || 'Loading...'}</p>
      </div>
    </div>
  );
};

Loading.propTypes = {
  text: PropTypes.string,
};

export default Loading;
