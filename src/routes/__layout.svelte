<script>
	import '../app.css';

	import * as Sentry from '@sentry/browser';
	import { BrowserTracing } from '@sentry/tracing';

	Sentry.init({
		dsn: 'https://95569b8dbe6f46de990eeb484012c166@o401874.ingest.sentry.io/6432880',
		integrations: [new BrowserTracing()],

		// Set tracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production
		tracesSampleRate: 1.0
	});
</script>

<slot />
