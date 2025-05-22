import { Color } from '@payload-types';

export const isColor = (
  value: string | Color | null | undefined
): value is Color => {
  return (
    value !== null &&
    value !== undefined &&
    typeof value !== 'string' &&
    'hexCode' in value
  );
};
