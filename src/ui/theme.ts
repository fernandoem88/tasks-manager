import { css } from "styled-components";
import { Interpolation, RuleSet, Styles } from "styled-components/dist/types";

export const BREAK_POINTS = {
  xs: { min: 0, max: 380 },
  sm: { min: 381, max: 576 },
  md: { min: 577, max: 768 },
  lg: { min: 769, max: 991 },
  xl: { min: 992, max: 1199 },
  xxl: { min: 1200, max: undefined },
};

export const FONT_SIZES = {
  caption: "10px",
  body1: "15px",
  body2: "12px",
  h6: "18px",
  h2: "28px",
  h1: "32px",
} as const;

export const PALETTE = {
  grey: {
    100: "#f4f4f4",
    200: "#d4d4d4",
    300: "#c4c4c4",
    400: "#e7e7e7",
  },
  primary: {
    main: "#3a86ff",
    light: "#eef5ff",
    dark: "#204d94",
  },
  secondary: {
    main: "#e3a730",
    light: "#ffcc39",
    dark: "#4c3b24",
  },
  warning: {
    main: "#e76632",
    light: "#ec906e",
    dark: "#a64824",
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

export const MEDIA = {
  up: (key: Breakpoint) => {
    const { min } = BREAK_POINTS[key];
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
    const { max } = BREAK_POINTS[key];
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

export type Breakpoint = keyof typeof BREAK_POINTS;
export type Media = (
  styles: Styles<object>,
  ...interpolations: Interpolation<object>[]
) => RuleSet<object>;
