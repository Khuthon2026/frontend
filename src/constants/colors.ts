export const COLORS = {
  primary: '#1B16CC',
  primaryDark: '#152F59',
  accent: '#84CC16',
  gaugeGreen: '#84CC16',
  gaugeYellow: '#f5c842',
  gaugeRed: '#ef4d4d',
  bar1: '#ec4f8d',
  bar2: '#e98246',
  bar3: '#84CC16',
  bar4: '#5cc0b9',
  warn: '#ef4d4d',
} as const;

export const GAUGE_GRADIENT_RGB = {
  start: [132, 204, 22] as const, // green
  middle: [245, 200, 66] as const, // yellow
  end: [239, 77, 77] as const, // red
};
