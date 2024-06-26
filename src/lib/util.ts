import { Mod } from 'src/components/models';

export const modTotal = (m: Mod[]): number => {
  let t = 0;
  m.forEach((v) => (t += v.value));
  return t;
};
