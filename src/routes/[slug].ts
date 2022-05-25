import type { Feedback, Form } from '../types';
import { createClient } from '@supabase/supabase-js';
import fetch from 'isomorphic-unfetch';

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ADMIN_API_KEY
);

export async function get({ params }) {
	const { slug } = params;
	const { data, error } = await supabase.from<Form>('forms').select('*').eq('slug', slug).single();
	if (error) {
		return {
			status: 404
			// body: { error }
		};
	} else {
		return {
			status: 200,
			body: { data }
		};
	}
}

export async function post({ request }) {
	const { type, ...rest } = await request.json();
	let payload;

	if (type === 'tweet') {
		const { formId, url } = rest;
		payload = {
			form_id: formId,
			type,
			url
		};
	} else if (type === 'direct') {
		const { formId, feedback, name, url, isPublic } = rest;
		payload = {
			form_id: formId,
			type,
			feedback,
			name,
			url,
			is_public: isPublic
		};
	} else {
		return {
			status: 500,
			body: { error: `unknown type (${type})` }
		};
	}

	const { error } = await supabase.from<Feedback>('feedbacks').insert([payload]);
	await sendToDiscord({ payload });

	return error
		? {
				status: 500,
				body: { error }
		  }
		: {
				status: 200
		  };
}

async function sendToDiscord({ payload }: { payload: any }) {
	const webhook = (import.meta.env.VITE_DISCORD_WEBHOOK ||
		process.env.VITE_DISCORD_WEBHOOK) as string;

	const { data } = await supabase
		.from<Form>('forms')
		.select('*')
		.eq('id', payload.form_id)
		.single();

	try {
		await fetch(webhook, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				embeds: [
					{
						title: data?.title,
						fields: Object.entries(payload)
							.filter((entry) => entry[1])
							.map((entry) => ({ name: entry[0], value: entry[1] }))
					}
				]
			})
		});
	} catch (err) {
		console.error(err);
	}
}
