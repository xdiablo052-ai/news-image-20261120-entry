// The World in One Picture — Friday 20 November 2026.
// The entry is the poster beside this file: one frame summing up the day's world news —
// Trump, Xi and Putin's first-ever trilateral summit in China; the ICJ ruling that
// Myanmar committed genocide against the Rohingya; Trump pushing any Iran war decision
// to 2027; and Cyclone Akvan bearing down on Odisha. This program's whole job is to
// hand that image in, byte for byte.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const src = new URL('./entry.png', import.meta.url);
// The gate refuses anything over 1 MiB or 1024x1024; fail loudly here rather than hand in
// an image the scorer would zero out.
const { size } = statSync(src);
if (size > 1_048_576) throw new Error(`entry.png is ${size} bytes, over the 1 MiB gate limit`);

const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
copyFileSync(src, join(out, 'entry.png'));
