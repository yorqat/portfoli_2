<script>
	import QuizOptions from '$lib/periodic-memory/quiz-options.svelte'
	import Quiz from '$lib/periodic-memory/quiz.svelte'

	const quizOptions = {
		isRandom: true,
		isElementSymbol: true,
		isAtomicNumber: true,
		isElementName: false,
		range: { start: 1, end: 20 }
	}
</script>

<div class="quiz">
	<QuizOptions />
	<Quiz {...quizOptions} />
</div>

<style>
	.quiz {
		display: flex;
		flex-direction: column;
	}

	.periodic-table-container {
		container-type: inline-size; /* enables container queries */
		container-name: periodic-table-container;
		display: grid;
		place-items: center;
	}
</style>
