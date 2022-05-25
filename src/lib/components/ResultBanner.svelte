<script lang="ts">
	import type { SubmitResult } from '$lib/submit';

	export let result: SubmitResult;
</script>

{#if result.success === true}
	<div class="mt-4 alert alert-success shadow-lg">
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current flex-shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span>등록되었습니다. 감사합니다 🤗</span>
		</div>
	</div>
{/if}

{#if result.success !== true}
	<div class="mt-4 alert alert-error shadow-lg">
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current flex-shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span>오류가 발생했습니다. 빠른 시일 안에 해결하겠습니다.</span>
		</div>
	</div>
{/if}
