// The World in One Picture — Friday 20 November 2026.
// The entry is the poster beside this file: one frame summing up the day's world news —
// Trump, Xi and Putin's first-ever trilateral summit in China; the ICJ ruling that
// Myanmar committed genocide against the Rohingya; Trump pushing any Iran war decision
// to 2027; and Cyclone Akvan bearing down on Odisha. This program's whole job is to
// hand that image in, byte for byte.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const src = new URL('./entry.png', import.meta.url);
// The gate refuses anything over 1 MiB or 1024x1024; fail loudly here rather than hand in
// an image the scorer would zero out. Read the PNG header itself so a wrong-sized file
// is caught even if its byte count looks fine.
const buf = readFileSync(src);
if (buf.length > 1_048_576) throw new Error(`entry.png is ${buf.length} bytes, over the 1 MiB gate limit`);
if (buf.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') throw new Error('entry.png is not a PNG');
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
if (width > 1024 || height > 1024) throw new Error(`entry.png is ${width}x${height}, over the 1024x1024 gate`);

const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
copyFileSync(src, join(out, 'entry.png'));
