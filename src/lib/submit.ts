export type SubmitResult = { success?: boolean; error?: any };

export function submitTweet({ api, formId, url }: { api: string; formId: string; url: string }) {
	return fetch(api, {
		method: 'POST',
		headers: {
			accept: 'application/json'
		},
		body: JSON.stringify({
			type: 'tweet',
			formId,
			url
		})
	});
}

export function submitDirectFeedback({
	api,
	formId,
	feedback,
	name,
	url,
	isPublic
}: {
	api: string;
	formId: string;
	feedback: string;
	name: string;
	url: string;
	isPublic: boolean;
}) {
	return fetch(api, {
		method: 'POST',
		headers: {
			accept: 'application/json'
		},
		body: JSON.stringify({
			type: 'direct',
			formId,
			feedback,
			name,
			url,
			isPublic
		})
	});
}
