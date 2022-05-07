<script context="module">
	export async function load({ params }) {
		const { slug } = params;
		return {
			props: { hello: 'Eunjae' }
		};
	}
</script>

<script lang="ts">
	export let hello;

	let mode: 'introduction' | 'form' = 'introduction';
	function showForm() {
		mode = 'form';
	}
</script>

<div class="container mx-auto flex justify-center">
	{#if mode === 'introduction'}
		<div class="mt-8 mx-4 card w-full sm:w-96 bg-base-200 shadow-xl">
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<figure><img src="/profile.jpeg" alt="Profile picture of Eunjae Lee" /></figure>
			<div class="card-body">
				<h2 class="card-title">SaaS 해커톤 강좌에 대한 피드백을 부탁드려요.</h2>
				<p>안녕하세요, 이은재입니다 👋🏼</p>
				<p>
					이번에 진행하고 있는 SaaS 해커톤 강좌를 위해 미니 스트리밍과 몇몇 녹화된 영상을 올리고
					있는데요. 도움이 되고 있을까요? 여러분이 피드백을 주시면 좀더 나아질 수 있을 것 같아요.
				</p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary" type="button" on:click={showForm}>좋아요</button>
				</div>
			</div>
		</div>
	{:else if mode === 'form'}
		<p>here comes the form.</p>
	{/if}
</div>
