<script lang="ts">
	import { submitTweet, type SubmitResult } from '$lib/submit';

	import ResultBanner from './ResultBanner.svelte';

	export let formId: string;
	let url: string;
	let result: SubmitResult;
	let isSubmitting: boolean;

	async function handleSubmit() {
		isSubmitting = true;
		submitTweet({
			api: window.location.href,
			formId,
			url
		})
			.then(async (response) => {
				if (response.ok) {
					result = { success: true };
				} else {
					result = { error: await response.text() };
				}
			})
			.catch((error) => {
				result = { error };
				throw error;
			})
			.finally(() => {
				isSubmitting = false;
			});
	}
</script>

<form class="flex gap-4" on:submit|preventDefault={handleSubmit}>
	<input
		type="url"
		name="url"
		bind:value={url}
		placeholder="https://twitter.com/..."
		class="input w-full max-w-xs"
	/>

	{#if result === undefined}
		<button
			type="submit"
			disabled={isSubmitting}
			class:loading={isSubmitting}
			class="btn btn-primary">등록</button
		>
	{/if}
</form>

<ResultBanner {result} />
