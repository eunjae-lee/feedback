<script context="module" lang="ts">
	import type { LoadInput } from '@sveltejs/kit';

	export async function load({ props }: LoadInput) {
		const { id, title, description, exposure } = props.data;
		return {
			props: { formId: id, title, description, exposure }
		};
	}
</script>

<script lang="ts">
	import TweetFeedbackForm from '../lib/components/TweetFeedbackForm.svelte';
	import DirectFeedbackForm from '../lib/components/DirectFeedbackForm.svelte';
	import type { Exposure } from 'src/types';

	export let formId: string;
	export let title: string;
	export let description: string;
	export let exposure: Exposure;

	let feedbackType: 'tweet' | 'direct';

	let mode: 'introduction' | 'form' = 'introduction';
	function showForm() {
		mode = 'form';
	}
</script>

<div class="container mx-auto flex justify-center">
	<div class="my-8 mx-4 card w-96 lg:w-1/3 bg-base-200 shadow-xl">
		<!-- svelte-ignore a11y-img-redundant-alt -->
		<figure><img src="/profile.jpeg" alt="Profile picture of Eunjae Lee" /></figure>
		<div class="card-body">
			<h2 class="card-title mb-4">{title}</h2>
			{#each description.split('\n') as desc}
				<p class="mt-1">{desc}</p>
			{/each}
			{#if mode === 'introduction'}
				<div class="mt-4 card-actions justify-end">
					<button class="btn btn-primary" type="button" on:click={showForm}>좋아요</button>
				</div>
			{/if}

			{#if mode === 'form'}
				<p class="mt-8 font-bold">혹시, 이미 트위터에 올리셨나요?</p>
				<div class="form-control mt-2">
					<label class="p-0 cursor-pointer label">
						<input
							type="radio"
							class="radio"
							bind:group={feedbackType}
							name="feedback_type"
							value={'tweet'}
						/>
						<span class="label-text">네, 트윗 URL 붙여넣을게요.</span>
					</label>
				</div>
				{#if feedbackType === 'tweet'}
					<TweetFeedbackForm {formId} />
				{/if}

				<div class="form-control mt-2">
					<label class="p-0 cursor-pointer label">
						<input
							type="radio"
							class="radio"
							bind:group={feedbackType}
							name="feedback_type"
							value={'direct'}
						/>
						<span class="label-text">아뇨, 여기서 작성할게요.</span>
					</label>
				</div>
				{#if feedbackType === 'direct'}
					<DirectFeedbackForm {formId} {exposure} />
				{/if}
			{/if}
		</div>
	</div>
</div>
