<script lang="ts">
	function handleSubmit(e) {
		const formData = new FormData(e.target);
		const url = formData.get('url');
		console.log('# handleSubmit', url);
	}
</script>

<form class="flex gap-4" on:submit|preventDefault={handleSubmit}>
	<input
		type="url"
		name="url"
		placeholder="https://twitter.com/..."
		class="input w-full max-w-xs"
	/>
	<button type="submit" class="btn btn-primary">등록</button>
</form>
