<script>
	export let elements
	export let elementEvent

	export let hideSymbols = false

	/* view transition */
	import { onNavigate } from '$app/navigation'

	onNavigate((navigation) => {
		if (!document.startViewTransition) return

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})
</script>

<div class="periodic-table">
	{#each elements as el}
		<button
			class="element {el.Symbol.toLowerCase()} {el.Type.toLowerCase().replace(/\s+/g, '_')}"
			style="view-transition-name: vt-{el.Element.toLowerCase()}"
			title={el.Element}
			onclick={(e) => elementEvent(e, el.AtomicNumber)}
		>
			<span class="atomic-symbol" class:hide={hideSymbols} class:two-chars={el.Symbol.length > 1}
				>{el.Symbol}</span
			>
			<!--
			<span class="atomic-name">{el.Element}</span>
      -->
			<span class="atomic-number {el.AtomicNumber > 99 ? 'three-digit' : ''}"
				>{el.AtomicNumber}</span
			>
		</button>
	{/each}
</div>

<style lang="scss">
	@use 'periodic-memory/fonts' as f;
	@use 'periodic-memory/element-type-color';

	.periodic-table {
		font-family: f.$sans-serif;
		display: grid;
		grid-column-gap: 2px;
		grid-row-gap: 2px;

		view-transition-name: periodic-table;

		--cell: 1fr;
		--unit-gap: 0.2;
		--gap: calc(var(--cell) * var(--unit-gap));

		grid-template-columns:
			repeat(3, var(--cell))
			var(--gap)
			repeat(15, var(--cell));

		grid-template-rows:
			repeat(7, var(--cell))
			var(--gap)
			repeat(2, var(--cell));

		width: 100%;
		aspect-ratio: calc((18 * 1 + var(--unit-gap)) / (9 * 1 + var(--unit-gap)));
	}

	.hide {
		display: none;
	}

	.element:hover {
		filter: saturate(1.5);
	}

	.element:focus {
		filter: saturate(1.2) brightness(1.4);
	}

	.element {
		all: unset;
		box-sizing: border-box;

		position: relative;

		background-color: var(--bg);

		container-type: inline-size; /* enables container queries */
		container-name: element-container;

		border-radius: 2px;

		display: grid;
		place-items: center;

		box-shadow: rgba(199, 199, 199, 0.6) 0px 2px 8px 0px;
	}

	.atomic-number.three-digit {
		font-size: 0.8rem;
		font-weight: 700;
	}

	.atomic-number {
		position: absolute;
		left: 0rem;
		top: 0rem;
		padding: 0.1rem;
		min-width: 1rem;
		background-color: white;
		border-radius: 4px 0 4px 0;
		color: var(--bg);
		font-size: clamp(0.8rem, 10vw, 1rem);
		aspect-ratio: 1;

		display: none;
	}

	.atomic-symbol {
		font-size: 0.8rem;
		font-weight: 800;
		color: white;
		letter-spacing: 2px;
		position: absolute;
	}

	.atomic-symbol.two-chars {
		letter-spacing: 0;
		font-size: 0.6rem;
	}

	.atomic-name {
		position: absolute;
		text-align: center;
		bottom: 0;
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 1px;
		background-color: white;
		width: 100%;
		border: 3px var(--bg) solid;
		border-radius: 6px;
		color: var(--bg);
		box-sizing: border-box;
	}

	.h {
		grid-area: 1 / 1 / 2 / 2;
	}
	.he {
		grid-area: 1 / 19 / 2 / 20;
	}
	.li {
		grid-area: 2 / 1 / 3 / 2;
	}
	.be {
		grid-area: 2 / 2 / 3 / 3;
	}
	.b {
		grid-area: 2 / 14 / 3 / 15;
	}
	.c {
		grid-area: 2 / 15 / 3 / 16;
	}
	.n {
		grid-area: 2 / 16 / 3 / 17;
	}
	.o {
		grid-area: 2 / 17 / 3 / 18;
	}
	.f {
		grid-area: 2 / 18 / 3 / 19;
	}
	.ne {
		grid-area: 2 / 19 / 3 / 20;
	}
	.na {
		grid-area: 3 / 1 / 4 / 2;
	}
	.mg {
		grid-area: 3 / 2 / 4 / 3;
	}
	.al {
		grid-area: 3 / 14 / 4 / 15;
	}
	.si {
		grid-area: 3 / 15 / 4 / 16;
	}
	.p {
		grid-area: 3 / 16 / 4 / 17;
	}
	.s {
		grid-area: 3 / 17 / 4 / 18;
	}
	.cl {
		grid-area: 3 / 18 / 4 / 19;
	}
	.ar {
		grid-area: 3 / 19 / 4 / 20;
	}
	.k {
		grid-area: 4 / 1 / 5 / 2;
	}
	.ca {
		grid-area: 4 / 2 / 5 / 3;
	}
	.sc {
		grid-area: 4 / 3 / 5 / 4;
	}
	.ti {
		grid-area: 4 / 5 / 5 / 6;
	}
	.v {
		grid-area: 4 / 6 / 5 / 7;
	}
	.cr {
		grid-area: 4 / 7 / 5 / 8;
	}
	.mn {
		grid-area: 4 / 8 / 5 / 9;
	}
	.fe {
		grid-area: 4 / 9 / 5 / 10;
	}
	.co {
		grid-area: 4 / 10 / 5 / 11;
	}
	.ni {
		grid-area: 4 / 11 / 5 / 12;
	}
	.cu {
		grid-area: 4 / 12 / 5 / 13;
	}
	.zn {
		grid-area: 4 / 13 / 5 / 14;
	}
	.ga {
		grid-area: 4 / 14 / 5 / 15;
	}
	.ge {
		grid-area: 4 / 15 / 5 / 16;
	}
	.as {
		grid-area: 4 / 16 / 5 / 17;
	}
	.se {
		grid-area: 4 / 17 / 5 / 18;
	}
	.br {
		grid-area: 4 / 18 / 5 / 19;
	}
	.kr {
		grid-area: 4 / 19 / 5 / 20;
	}
	.rb {
		grid-area: 5 / 1 / 6 / 2;
	}
	.sr {
		grid-area: 5 / 2 / 6 / 3;
	}
	.y {
		grid-area: 5 / 3 / 6 / 4;
	}
	.zr {
		grid-area: 5 / 5 / 6 / 6;
	}
	.nb {
		grid-area: 5 / 6 / 6 / 7;
	}
	.mo {
		grid-area: 5 / 7 / 6 / 8;
	}
	.tc {
		grid-area: 5 / 8 / 6 / 9;
	}
	.ru {
		grid-area: 5 / 9 / 6 / 10;
	}
	.rh {
		grid-area: 5 / 10 / 6 / 11;
	}
	.pd {
		grid-area: 5 / 11 / 6 / 12;
	}
	.ag {
		grid-area: 5 / 12 / 6 / 13;
	}
	.cd {
		grid-area: 5 / 13 / 6 / 14;
	}
	.in {
		grid-area: 5 / 14 / 6 / 15;
	}
	.sn {
		grid-area: 5 / 15 / 6 / 16;
	}
	.sb {
		grid-area: 5 / 16 / 6 / 17;
	}
	.te {
		grid-area: 5 / 17 / 6 / 18;
	}
	.i {
		grid-area: 5 / 18 / 6 / 19;
	}
	.xe {
		grid-area: 5 / 19 / 6 / 20;
	}
	.cs {
		grid-area: 6 / 1 / 7 / 2;
	}
	.ba {
		grid-area: 6 / 2 / 7 / 3;
	}
	.la {
		grid-area: 6 / 3 / 7 / 4;
	}
	.ce {
		grid-area: 9 / 5 / 10 / 6;
	}
	.pr {
		grid-area: 9 / 6 / 10 / 7;
	}
	.nd {
		grid-area: 9 / 7 / 10 / 8;
	}
	.pm {
		grid-area: 9 / 8 / 10 / 9;
	}
	.sm {
		grid-area: 9 / 9 / 10 / 10;
	}
	.eu {
		grid-area: 9 / 10 / 10 / 11;
	}
	.gd {
		grid-area: 9 / 11 / 10 / 12;
	}
	.tb {
		grid-area: 9 / 12 / 10 / 13;
	}
	.dy {
		grid-area: 9 / 13 / 10 / 14;
	}
	.ho {
		grid-area: 9 / 14 / 10 / 15;
	}
	.er {
		grid-area: 9 / 15 / 10 / 16;
	}
	.tm {
		grid-area: 9 / 16 / 10 / 17;
	}
	.yb {
		grid-area: 9 / 17 / 10 / 18;
	}
	.lu {
		grid-area: 9 / 18 / 10 / 19;
	}
	.hf {
		grid-area: 6 / 5 / 7 / 6;
	}
	.ta {
		grid-area: 6 / 6 / 7 / 7;
	}
	.w {
		grid-area: 6 / 7 / 7 / 8;
	}
	.re {
		grid-area: 6 / 8 / 7 / 9;
	}
	.os {
		grid-area: 6 / 9 / 7 / 10;
	}
	.ir {
		grid-area: 6 / 10 / 7 / 11;
	}
	.pt {
		grid-area: 6 / 11 / 7 / 12;
	}
	.au {
		grid-area: 6 / 12 / 7 / 13;
	}
	.hg {
		grid-area: 6 / 13 / 7 / 14;
	}
	.tl {
		grid-area: 6 / 14 / 7 / 15;
	}
	.pb {
		grid-area: 6 / 15 / 7 / 16;
	}
	.bi {
		grid-area: 6 / 16 / 7 / 17;
	}
	.po {
		grid-area: 6 / 17 / 7 / 18;
	}
	.at {
		grid-area: 6 / 18 / 7 / 19;
	}
	.rn {
		grid-area: 6 / 19 / 7 / 20;
	}
	.fr {
		grid-area: 7 / 1 / 8 / 2;
	}
	.ra {
		grid-area: 7 / 2 / 8 / 3;
	}
	.ac {
		grid-area: 7 / 3 / 8 / 4;
	}
	.th {
		grid-area: 10 / 5 / 11 / 6;
	}
	.pa {
		grid-area: 10 / 6 / 11 / 7;
	}
	.u {
		grid-area: 10 / 7 / 11 / 8;
	}
	.np {
		grid-area: 10 / 8 / 11 / 9;
	}
	.pu {
		grid-area: 10 / 9 / 11 / 10;
	}
	.am {
		grid-area: 10 / 10 / 11 / 11;
	}
	.cm {
		grid-area: 10 / 11 / 11 / 12;
	}
	.bk {
		grid-area: 10 / 12 / 11 / 13;
	}
	.cf {
		grid-area: 10 / 13 / 11 / 14;
	}
	.es {
		grid-area: 10 / 14 / 11 / 15;
	}
	.fm {
		grid-area: 10 / 15 / 11 / 16;
	}
	.md {
		grid-area: 10 / 16 / 11 / 17;
	}
	.no {
		grid-area: 10 / 17 / 11 / 18;
	}
	.lr {
		grid-area: 10 / 18 / 11 / 19;
	}
	.rf {
		grid-area: 7 / 5 / 8 / 6;
	}
	.db {
		grid-area: 7 / 6 / 8 / 7;
	}
	.sg {
		grid-area: 7 / 7 / 8 / 8;
	}
	.bh {
		grid-area: 7 / 8 / 8 / 9;
	}
	.hs {
		grid-area: 7 / 9 / 8 / 10;
	}
	.mt {
		grid-area: 7 / 10 / 8 / 11;
	}
	.ds {
		grid-area: 7 / 11 / 8 / 12;
	}
	.rg {
		grid-area: 7 / 12 / 8 / 13;
	}
	.cn {
		grid-area: 7 / 13 / 8 / 14;
	}
	.nh {
		grid-area: 7 / 14 / 8 / 15;
	}
	.fl {
		grid-area: 7 / 15 / 8 / 16;
	}
	.mc {
		grid-area: 7 / 16 / 8 / 17;
	}
	.lv {
		grid-area: 7 / 17 / 8 / 18;
	}
	.ts {
		grid-area: 7 / 18 / 8 / 19;
	}
	.og {
		grid-area: 7 / 19 / 8 / 20;
	}
</style>
