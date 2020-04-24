export enum MediaBreakpointsEnum {
  ExtraSmall = '(max-width: 575.98px)',
  Small = '(max-width: 767.98px) and (min-width: 576px)',
  Medium = '(max-width: 991.98px) and (min-width: 768px)',
  Large = '(max-width: 1199.98px) and (min-width: 992px)',
  ExtraLarge = '(min-width: 1200px)'
}

export const ALL_MEDIA_BREAKPOINTS = [
  MediaBreakpointsEnum.ExtraSmall,
  MediaBreakpointsEnum.Small,
  MediaBreakpointsEnum.Medium,
  MediaBreakpointsEnum.Large,
  MediaBreakpointsEnum.ExtraLarge
];
