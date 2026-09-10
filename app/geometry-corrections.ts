export interface PathOffsetControl {
  y: number;
  offset: [number, number, number];
}

export interface GeometryCorrection {
  pathOffsets: PathOffsetControl[];
}

const smoothstep = (value: number) => {
  const clamped = Math.max(0, Math.min(1, value));
  return clamped * clamped * (3 - 2 * clamped);
};

export function correctedPositions(
  source: Float32Array,
  correction?: GeometryCorrection,
): Float32Array {
  if (!correction?.pathOffsets.length) return source;
  const controls = [...correction.pathOffsets].sort((left, right) => left.y - right.y);
  const output = new Float32Array(source);
  for (let index = 0; index < output.length; index += 3) {
    const y = output[index + 1];
    let offset = controls[0].offset;
    if (y >= controls.at(-1)!.y) {
      offset = controls.at(-1)!.offset;
    } else if (y > controls[0].y) {
      for (let controlIndex = 0; controlIndex < controls.length - 1; controlIndex++) {
        const lower = controls[controlIndex];
        const upper = controls[controlIndex + 1];
        if (lower.y <= y && y <= upper.y) {
          const blend = smoothstep((y - lower.y) / (upper.y - lower.y));
          offset = lower.offset.map((value, axis) =>
            value * (1 - blend) + upper.offset[axis] * blend,
          ) as [number, number, number];
          break;
        }
      }
    }
    output[index] += offset[0];
    output[index + 1] += offset[1];
    output[index + 2] += offset[2];
  }
  return output;
}
