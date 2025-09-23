<footer class="site-footer">
	<div class="footer-content">
		<!-- About / Brand -->
		<div class="footer-column">
			<h4>About me</h4>
			<p>Designing products that ship, scale, and serve real users.</p>
		</div>

		<!-- Quick Links -->
		<div class="footer-column">
			<h4>Quick Links</h4>
			<ul>
				<li><a href="/#about">About</a></li>
				<li><a href="/#services">Services</a></li>
				<li><a href="/#contact">Contact</a></li>
			</ul>
		</div>

		<!-- Connect / Social -->
		<div class="footer-column">
			<h4>Connect</h4>
			<div class="social-links">
				<a href="https://www.linkedin.com/in/yorqat/" target="_blank" aria-label="LinkedIn">
					<img src="/icons/linkedin.svg" alt="LinkedIn" />

					LinkedIn
				</a>
				<a href="https://github.com/yorqat" target="_blank" aria-label="GitHub">
					<img src="/icons/github.svg" alt="GitHub" />

					Github
				</a>
				<a href="https://dribbble.com/yourprofile" target="_blank" aria-label="Dribbble">
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
		@include fonts-stack('Satoshi', 'sans-serif');
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
</style>
