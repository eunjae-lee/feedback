<script lang="ts">
</script>

<form class="">
	<div class="form-control w-full max-w-xs">
		<label class="label" for="name">
			<span class="label-text">이름</span>
		</label>
		<input type="text" name="name" class="input input-bordered w-full max-w-xs" required />
	</div>

	<div class="mt-2 form-control w-full max-w-xs">
		<label class="label" for="feedback">
			<span class="label-text">피드백</span>
		</label>
		<textarea name="feedback" class="textarea w-full" required />
	</div>

	<div class="mt-2 form-control w-full max-w-xs">
		<label for="url" class="label">
			<span class="label-text">웹사이트나 소셜 미디어 (선택사항)</span>
		</label>
		<input type="url" class="input w-full max-w-xs" placeholder="https://..." />
	</div>

	<div class="mt-2 form-control w-full max-w-xs">
		<label class="cursor-pointer label">
			<span class="label-text">피드백을 웹사이트에 공개해도 괜찮습니다.</span>
			<input type="checkbox" class="toggle toggle-primary" name="public" />
		</label>
	</div>
	<!-- <p class="ml-1 text-sm">피드백이 웹사이트에 공개됩니다.</p> -->

	<div class="mt-4 flex justify-end">
		<button type="submit" class="btn btn-primary">등록</button>
	</div>
</form>
