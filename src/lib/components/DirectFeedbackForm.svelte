<script lang="ts">
	import { submitDirectFeedback, type SubmitResult } from '$lib/submit';
	import type { Exposure } from 'src/types';

	import ResultBanner from './ResultBanner.svelte';

	export let formId: string;
	export let exposure: Exposure;

	let feedback: string;
	let name: string;
	let url: string;
	let isPublic: boolean;
	let result: SubmitResult;
	let isSubmitting: boolean;

	if (exposure === 'choose') {
		isPublic = true;
	}

	function onSubmit() {
		isSubmitting = true;
		submitDirectFeedback({
			api: window.location.href,
			formId,
			feedback,
			name,
			url,
			isPublic: exposure === 'public' ? true : isPublic
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

<form on:submit|preventDefault={onSubmit}>
	<div class="form-control w-full">
		<label class="label" for="feedback">
			<span class="label-text">내용</span>
		</label>
		<textarea name="feedback" bind:value={feedback} class="textarea w-full" required />
	</div>

	<div class="mt-2 form-control w-full">
		<label class="label" for="name">
			<span class="label-text">이름 (선택사항)</span>
		</label>
		<input type="text" name="name" bind:value={name} class="input input-bordered w-full" />
	</div>

	<div class="mt-2 form-control w-full">
		<label for="url" class="label">
			<span class="label-text">웹사이트나 소셜 미디어 (선택사항)</span>
		</label>
		<input type="url" name="url" bind:value={url} class="input w-full" placeholder="https://..." />
	</div>

	{#if exposure === 'public'}
		<p class="mt-2 ml-1 text-sm">등록된 정보는 웹사이트에 공개됩니다.</p>
	{:else if exposure === 'private'}
		<p class="mt-2 ml-1 text-sm">등록된 정보는 비공개로 저에게만 공유됩니다.</p>
	{:else if exposure === 'choose'}
		<div class="mt-2 form-control w-full">
			<label class="cursor-pointer label">
				<span class="label-text">등록된 정보는 웹사이트에 공개해도 괜찮습니다.</span>
				<input
					type="checkbox"
					name="isPublic"
					bind:checked={isPublic}
					class="toggle toggle-primary"
				/>
			</label>
		</div>
	{/if}

	<ResultBanner {result} />

	{#if result === undefined}
		<div class="mt-4 flex justify-end">
			<button
				type="submit"
				disabled={isSubmitting}
				class:loading={isSubmitting}
				class="btn btn-primary">등록</button
			>
		</div>
	{/if}
</form>
