import { Mod } from 'src/components/models';

export const copyStruct = <T>(obj: T): T => JSON.parse(JSON.stringify(obj)) as T;

export const modTotal = (m: Mod[]): number => {
  let t = 0;
  m.forEach((v) => (t += v.value));
  return t;
};

export const keys = (e: object): string[] =>
  Object.keys(e)
    .map((key) => e[key as keyof typeof e])
    .filter((value) => typeof value === 'string') as string[];
