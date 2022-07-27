const breakpoints = {
  mobileS: '320px',
  mobile: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1280px',
  desktop: '1400px',
};

export const DeviceMediaQueries = {
  mobileS: `(min-width: ${breakpoints.mobileS})`,
  mobile: `(min-width: ${breakpoints.mobile})`,
  tablet: `(min-width: ${breakpoints.tablet})`,
  laptop: `(min-width: ${breakpoints.laptop})`,
  laptopL: `(min-width: ${breakpoints.laptopL})`,
  desktop: `(min-width: ${breakpoints.desktop})`,
};
