'use strict';

const GetRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const GetRandomFloat = (min, max) => Math.random() * (max - min) + min;
const GetRandomRgb = (rMin, rMax, gMin, gMax, bMin, bMax) =>
{
	const r = GetRandomInt(rMin, rMax);
	const g = GetRandomInt(gMin, gMax);
	const b = GetRandomInt(bMin, bMax);
	return `rgb(${r}, ${g}, ${b})`;
};
const GetRandomHsl = (hMin, hMax, sMin, sMax, lMin, lMax) =>
{
	const h = GetRandomInt(hMin, hMax);
	const s = GetRandomInt(sMin, sMax);
	const l = GetRandomInt(lMin, lMax);
	return `hsl(${h}, ${s}%, ${l}%)`;
};
const GetRandomSelect = inputs => inputs[Math.floor(Math.random() * inputs.length)];