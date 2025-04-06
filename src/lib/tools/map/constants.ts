import { Wilaya } from "../named";

type DrawPath = {
  [key: string]: string;
};

export const constants = {
  WIDTH: 500,
  MAPCOLOR: '#ffffff',
  STROKE_COLOR: '#000000',
  STROKE_WIDTH: 0.5,
  HOVERCOLOR: '#303030',
  SELECTED_COLOR: '#ff0000',
};

export const stateCode = Wilaya.map((pre) => pre.name)
export const drawPath = Wilaya.reduce((acc, pre) => {
  acc[pre.name] = pre.geo;
  return acc;
}, {} as DrawPath);
