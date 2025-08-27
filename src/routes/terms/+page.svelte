<script>
	import { page } from '$app/state'
	import { theme } from '$lib/theming'
</script>

<div
	class="base"
	id="terms-of-use"
	data-prefers-color-scheme
	data-compel-color-scheme={$theme ?? page.data.theme}
>
	<header>
		<h1>Terms of Use</h1>
		<p>Last Updated: August 15, 2025</p>
	</header>

	<main>
		<p>
			By accessing and using this website, you agree to comply with and be bound by these Terms of
			Use.
		</p>

		<section>
			<h2>1. Intellectual Property Rights</h2>
			<p>
				Unless otherwise stated, all content on this website, including but not limited to the
				design, text, graphics, and code, is the exclusive intellectual property of Yor Qat. All
				rights are reserved. You may not copy, reproduce, or use any content from this site without
				our express written permission.
			</p>
		</section>

		<section>
			<h2>2. Content Disclaimers</h2>

			<h3>AI-Generated Assets:</h3>
			<p>
				Some assets, including images, graphics, or text, may have been created or generated with
				the assistance of artificial intelligence.
			</p>

			<h3>Trademark and Brand Mockups:</h3>
			<p>
				This website may contain mockups of existing brands, including trademarks, logos, and
				product designs. These are used for illustrative purposes only. Any such brand identities
				are the intellectual property of their respective owners. Their use on this site does not
				imply any affiliation with, endorsement by, or sponsorship from the trademark owners.
			</p>

			<h3>General Disclaimer:</h3>
			<p>
				The content on this website is provided for demonstration and informational purposes only.
				We make no representations or warranties of any kind, express or implied, about the
				completeness, accuracy, reliability, suitability, or availability of the content.
			</p>
		</section>

		<section>
			<h2>3. Limitation of Liability</h2>
			<p>
				In no event shall we be liable for any direct, indirect, incidental, special, or
				consequential damages that may arise from your use of this website.
			</p>
		</section>

		<section>
			<h2>4. Governing Law</h2>
			<p>
				These Terms of Use are governed by and construed in accordance with the laws of <strong
					>Germany</strong
				>. This choice reflects our commitment to adhering to the highest standards of data
				protection and consumer rights, aligning with the principles of the General Data Protection
				Regulation (GDPR) of the European Union.
			</p>
		</section>

		<section>
			<h2>5. Contact Information</h2>
			<p>
				If you have any questions about these Terms of Use, please contact us at: <a
					href="mailto:feedback@mail.yorqat.com">feedback@mail.yorqat.com</a
				>
			</p>
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

	#terms-of-use {
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
