<script lang="ts">
	import { SITE, ROLE } from '$lib/site'
</script>

<footer class="site-footer">
	<div class="footer-content">
		<!-- About / Brand -->
		<div class="footer-column">
			<h4>About me</h4>
			<p>
				{SITE.name}, {ROLE.level}
				{ROLE.primary}. Everything here is self-initiated work.
			</p>
		</div>

		<!-- Quick Links -->
		<div class="footer-column">
			<h4>Quick Links</h4>
			<ul>
				<li><a href="/works">Works</a></li>
				<li><a href="/blog">Writing</a></li>
				<li><a href="/contact">Contact</a></li>
			</ul>
		</div>

		<!-- Connect / Social -->
		<div class="footer-column">
			<h4>Connect</h4>
			<p class="footer-email">
				<a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
			</p>
			<div class="social-links">
				<a href="https://www.linkedin.com/in/yorqat/" target="_blank" aria-label="LinkedIn">
					<img src="/icons/linkedin.svg" alt="LinkedIn" />

					LinkedIn
				</a>
				<a href="https://github.com/yorqat" target="_blank" aria-label="GitHub">
					<img src="/icons/github.svg" alt="GitHub" />

					Github
				</a>
				<a href="https://dribbble.com/yorqat" target="_blank" aria-label="Dribbble">
					<img src="/icons/dribbble.svg" alt="Dribbble" />

					Dribbble
				</a>

				<a
					href="https://twitter.com/intent/tweet?screen_name=yorqat&ref_src=twsrc%5Etfw"
					aria-label="X"
					class="twitter-mention-button"
					data-show-count="false"
				>
					<img src="/icons/x.svg" alt="X" />

					@yorqat
				</a>
			</div>
		</div>

		<div class="footer-bottom">
			<p>&copy; 2025 Yor Qat. All rights reserved.</p>
			<p><a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Use</a></p>
		</div>
	</div>
</footer>

<style lang="scss">
	@use '_index' as *;

	.site-footer {
		background: var(--color-surface);
		/* Extra wide desktops*/

		padding-block: $x-space-md;
		@include fonts-stack('Satoshi-Regular', sans);
		@include fonts-alternate-style();
	}

	.footer-content {
		display: flex;
		gap: $x-space-md;
		justify-content: space-around;

		@include layout-respond-max('md') {
			flex-direction: column;
		}

		@include layout-respond('2xl') {
			max-width: $x-breakpoint-xl-content;
			margin-inline: auto;

			> * {
				flex-basis: 100%;
			}
		}
	}

	.footer-column {
		padding: $x-space-xs $x-space-md;

		h4 {
			margin-bottom: $x-space-md;
		}
	}

	.social-links {
		margin-block-start: $x-space-sm;

		a {
			display: flex;
			align-items: center;
			gap: $x-space-sm;

			img {
				aspect-ratio: 1;
				max-width: $x-font-size-lg;
			}
		}
	}

	.footer-email {
		margin-block-end: $x-space-xs;

		a {
			overflow-wrap: anywhere;
		}
	}
</style>
