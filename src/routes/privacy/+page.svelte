<script>
	import { page } from '$app/state'
	import { theme } from '$lib/theming'
</script>

<div
	class="base"
	id="privacy-policy"
	data-prefers-color-scheme
	data-compel-color-scheme={$theme ?? page.data.theme}
>
	<header>
		<h1>Privacy Policy</h1>
		<p>Last Updated: August 15, 2025</p>
	</header>

	<main>
		<p>
			Welcome to our publication! We are committed to protecting your privacy and being transparent
			about how our website operates. This policy outlines how we use cookies and other technologies
			on this site.
		</p>
		<p>
			This website does not collect, store, or process any personal data. The information collected
			is completely anonymous and cannot be used to identify you.
		</p>

		<section>
			<h2>1. How We Use Cookies and Tracking Technologies</h2>
			<p>
				Cookies are small text files that are stored on your device when you visit a website. They
				are widely used to make websites work more efficiently and to provide information to the
				site's owner.
			</p>

			<h3>A. Functional and Necessary Cookies</h3>
			<p>
				We use functional cookies to provide you with a consistent and user-friendly experience.
				These cookies are essential for the website to function as you expect.
			</p>

			<h4>Theme Preference Cookie:</h4>
			<p>
				To provide a smooth user experience and prevent a "Flash of Unstyled Content" (FOUC), a
				cookie is used to remember your theme preference (e.g., light or dark mode). This allows the
				website to render the correct theme on the server-side (SSR) before the page loads. This
				cookie does not contain any personal data and is used solely to store your chosen visual
				preference. You can opt out of this cookie by setting your theme preference to "auto," which
				will use your system's default theme instead.
			</p>

			<h3>B. A/B Testing and Experience Optimization</h3>

			<h4>ABContext Widget Cookie:</h4>
			<p>
				This publication features an interactive "ABContext" widget that allows us to test different
				content styles and user experiences. This widget lets you choose which experiences are more
				pleasant based on your interactions. To ensure you have a consistent experience throughout
				your visit, a temporary, non-persistent cookie is used. This cookie contains a randomly
				generated, anonymous alias that helps the widget remember which content styling to display
				for the duration of your session. This cookie is not used to track you across different
				visits or websites. It is automatically deleted when you close your browser. The data
				collected is completely anonymous and aggregated, and cannot be used to identify you.
			</p>
		</section>

		<section>
			<h2>2. Your Choices and Controls</h2>
			<p>
				Because our website does not collect any personal data, you do not need to take any action
				to protect your privacy. The cookies used are strictly for site functionality and anonymous
				experience optimization.
			</p>
			<p>
				You can, however, manage your theme preference directly on the website. Additionally, you
				can always control and delete cookies through your web browser settings. Please refer to
				your browser's help menu for more information on how to do this.
			</p>
		</section>

		<section>
			<h2>3. Changes to this Privacy Policy</h2>
			<p>
				We may update this Privacy Policy from time to time to reflect changes in technology or best
				practices. We will notify you of any changes by posting the new Privacy Policy on this page.
			</p>
		</section>

		<section>
			<h2>4. Contact Information</h2>
			<p>If you have any questions about this Privacy Policy, you can contact us at:</p>
			<address>
				<a href="mailto:feedback@mail.yorqat.com">feedback@mail.yorqat.com</a>
			</address>
		</section>
	</main>
</div>

<style lang="scss">
	@use '_index' as *;

	main,
	header {
		@include layout-respond-between('0', 'md') {
			padding-inline: $x-space-2;
		}

		@include layout-respond-between('md', 'lg') {
			padding-inline: $x-space-4;
		}

		@include layout-respond('md') {
			padding-inline: $x-space-8;
			max-width: $x-breakpoint-md-content;
			margin-inline: auto;
		}
	}

	#privacy-policy {
		@include layout-respond-between('0', 'md') {
			padding-block: $x-space-4;
		}

		@include layout-respond-between('md', 'lg') {
			padding-block: $x-space-6;
		}

		@include layout-respond('md') {
			padding-block: $x-space-10;
		}
	}

	$custom-light-theme: ();
	$custom-dark-theme: ();

	@include theming-declare-schemes-basic($custom-light-theme, $custom-dark-theme);
	@include theming-impose-schemes-basic();
</style>
