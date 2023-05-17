import { useState, CSSProperties } from 'react';

export const linkListStyle: CSSProperties = {
  listStyle: 'none',
  overflow: 'hidden',
  transition: 'max-height 0.5s ease-in-out',
};

export const linksStyle: CSSProperties = {
  textDecoration: 'none',
  color: '#63666a',
  padding: '5px 5px 5px 5px',
  cursor: 'pointer'
};

export const linksHoverStyle: CSSProperties = {
  ...linksStyle,
  color: '#6BA4B8'
};

export const containerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
};

export const hamburgerStyle: CSSProperties = {
  cursor: 'pointer',
  padding: '0',
  position: 'absolute',
  bottom: '-30px',
};
