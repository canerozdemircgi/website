'use strict';

const GetRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const GetRandomFloat = (min, max) => Math.random() * (max - min) + min;
const GetRandomColor = (rMin, rMax, gMin, gMax, bMin, bMax) =>
{
	const r = GetRandomInt(rMin, rMax);
	const g = GetRandomInt(gMin, gMax);
	const b = GetRandomInt(bMin, bMax);
	return `rgb(${r}, ${g}, ${b})`;
};
const GetRandomSelect = inputs => inputs[Math.floor(Math.random() * inputs.length)];