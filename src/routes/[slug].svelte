<script context="module">
	export async function load({ params }) {
		const { slug } = params;
		console.log({ slug });

		return {
			props: { hello: 'Eunjae' }
		};
	}
</script>

<script>
	export let hello;
</script>

<p>umm... hello {hello}</p>
