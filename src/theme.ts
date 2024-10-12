import { css } from "styled-components";
import { Interpolation, RuleSet, Styles } from "styled-components/dist/types";

export const breakpoints = {
  xs: { min: 0, max: 380 },
  sm: { min: 381, max: 576 },
  md: { min: 577, max: 768 },
  lg: { min: 769, max: 991 },
  xl: { min: 992, max: 1199 },
  xxl: { min: 1200, max: undefined },
};

export const fontSizes = {
  caption: 8,
  body1: 14,
  body2: 12,
  h1: 32,
  h2: 28,
  h6: 24,
};

export const palette = {
  grey: {
    100: "#f4f4f4",
    200: "#d4d4d4",
    300: "#c4c4c4",
  },
  primary: {
    main: "",
    light: "",
    dark: "",
  },
  secondary: {
    main: "",
    light: "",
    dark: "",
  },
  warning: {
    main: "",
    light: "",
    dark: "",
  },
} as const;

// export const media = Object.entries(breakpoints).reduce(
//   (acc, [label, breakpoint]) => {
//     const mediaFunc: Media = (...args) => {
//       if (label === "xs" || breakpoint.min === 0) {
//         return css(...args);
//       }
//       return css`
//         @media (min-width: ${breakpoint.min}px) {
//           ${css(...args)}
//         }
//       `;
//     };
//     return { ...acc, [label]: mediaFunc };
//   },
//   {} as Record<Breakpoint, Media>
// );

export const media = {
  up: (key: Breakpoint) => {
    const { min } = breakpoints[key];
    const mediaQuery: Media = (...args) => {
      if (!min) {
        return css(...args);
      }
      return css`
        @media (min-width: ${min}px) {
          ${css(...args)}
        }
      `;
    };

    return mediaQuery;
  },
  down: (key: Breakpoint) => {
    const { max } = breakpoints[key];
    const mediaQuery: Media = (...args) => {
      if (!max) {
        return css(...args);
      }
      return css`
        @media (max-width: ${max}px) {
          ${css(...args)}
        }
      `;
    };

    return mediaQuery;
  },
};

export type Breakpoint = keyof typeof breakpoints;
export type Media = (
  styles: Styles<object>,
  ...interpolations: Interpolation<object>[]
) => RuleSet<object>;
