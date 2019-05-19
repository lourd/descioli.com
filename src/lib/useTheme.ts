import { ThemeContext } from '@emotion/core';
import { useContext } from 'react';
import { Theme } from 'style/theme';

export const useTheme = () => useContext(ThemeContext) as Theme;
