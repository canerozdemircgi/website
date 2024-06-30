importScripts('../../js/common.js');

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

	const start_angle = Math.random() * Math.PI * 2;
	const end_angle = Math.random() * Math.PI * 2;
	const is_clockwise = Math.random() > 0.5;

	const h = GetRandomInt(0, 359);
	const s = GetRandomInt(50, 100);
	const l = GetRandomInt(66, 100);

	return [[x, y, radius, start_angle, end_angle, is_clockwise], `hsl(${h}, ${s}%, ${l}%)`];
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
		const to_be_deleted_indexes = [];

		canvas_context.clearRect(0, 0, canvas.width, canvas.height)
		for (let i = 0; i < stars.length; ++i)
		{
			const star = stars[i];

			if (Math.random() > 0.75)
			{
				const gesture = GetRandomSelect(gestures);
				star[0][0] += gesture[0];
				star[0][1] += gesture[1];
			}

			canvas_context.beginPath();
			canvas_context.arc(...star[0]);
			canvas_context.fillStyle = star[1];
			canvas_context.fill();

			if
			(
				star[0][0] < 0 - 4 ||
				star[0][0] >= canvas.width + 4 ||
				star[0][1] < 0 - 4 ||
				star[0][1] >= canvas.height + 4
			)
			{
				to_be_deleted_indexes.push(i);
			}
		}

		const to_be_inserted_length = to_be_deleted_indexes.length;
		while (to_be_deleted_indexes.length > 0)
		{
			stars.splice(to_be_deleted_indexes.pop(), 1);
		}
		for (let i = 0; i < to_be_inserted_length; ++i)
		{
			stars.push(GetStar());
		}
	}

	// canvas.style.visibility = 'visible';
};

self.onmessage = e =>
{
	if (e.data.msg === 'init')
	{
		canvas = e.data.canvas;
		canvas_context = canvas.getContext('2d');

		canvas_offset_width = e.data.offsetWidth;
		canvas_offset_height = e.data.offsetHeight;

		setInterval(RefreshAnimation, 250);
	}
	else if (e.data.msg === 'resize')
	{
		canvas_offset_width = e.data.offsetWidth;
		canvas_offset_height = e.data.offsetHeight;
	}
};