importScripts('../../js/common.js');

const PI2 = Math.PI * 2;
const gestures =
[
	[-1, -1],
	[-1, 0],
	[-1, 1],
	[0, -1],
	[0, 1],
	[1, -1],
	[1, 0],
	[1, 1]
];

let canvas;
let canvas_context;

let stars;

let canvas_offset_width;
let canvas_offset_height;

const GetStar = () =>
{
	const x = Math.random() * canvas.width;
	const y = Math.random() * canvas.height;
	const radius = Math.random() * 1.5;

	const start_angle = Math.random() * PI2;
	const end_angle = Math.random() * PI2;
	const is_clockwise = Math.random() > 0.5;

	const hsl = GetRandomHsl(0, 359, 25, 75, 25, 100);

	return [[x, y, radius, start_angle, end_angle, is_clockwise], hsl];
};

const RefreshAnimation = () =>
{
	// canvas.style.visibility = 'hidden';

	if (canvas.width !== canvas_offset_width || canvas.height !== canvas_offset_height)
	{
		canvas.width = canvas_offset_width;
		canvas.height = canvas_offset_height;

		stars = [];
		const stars_count = Math.floor(canvas.width * canvas.height / (1024 * 1.25 * 1.25));
		for (let i = 0; i < stars_count; ++i)
		{
			const star = GetStar();

			canvas_context.beginPath();
			canvas_context.arc(...star[0]);
			canvas_context.fillStyle = star[1];
			canvas_context.fill();

			stars.push(star);
		}
	}
	else
	{
		for (let i = 0; i < stars.length; ++i)
		{
			let star = stars[i];

			if (Math.random() > 0.9375)
			{
				canvas_context.beginPath();
				canvas_context.arc(star[0][0], star[0][1], star[0][2] + 2, 0, PI2);
				canvas_context.fillStyle = '#202020';
				canvas_context.fill();

				const gesture = GetRandomSelect(gestures);
				star[0][0] += gesture[0];
				star[0][1] += gesture[1];

				if
				(
					star[0][0] < 0 - 4 ||
					star[0][0] >= canvas.width + 4 ||
					star[0][1] < 0 - 4 ||
					star[0][1] >= canvas.height + 4
				)
					stars[i] = GetStar();

				canvas_context.beginPath();
				canvas_context.arc(...star[0]);
				canvas_context.fillStyle = star[1];
				canvas_context.fill();
			}
		}
	}

	// canvas.style.visibility = 'visible';

	if (canvas_context.commit)
		canvas_context.commit();

	setTimeout(RefreshAnimation, 64);
};

self.onmessage = e =>
{
	if (e.data.msg === 'init')
	{
		canvas = e.data.canvas;
		canvas_context = canvas.getContext('2d');

		canvas_offset_width = e.data.offsetWidth;
		canvas_offset_height = e.data.offsetHeight;

		RefreshAnimation();
	}
	else if (e.data.msg === 'resize')
	{
		canvas_offset_width = e.data.offsetWidth;
		canvas_offset_height = e.data.offsetHeight;
	}
};