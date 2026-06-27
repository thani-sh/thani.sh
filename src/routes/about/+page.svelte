<script lang="ts">
	import SocialIcons from '$lib/ui/SocialIcons.svelte';

	// Career data: chronological order. Kadira first (Storybook birthplace),
	// then Creately → Klarna → Normative → PostNord. Only the start year on
	// each node. Gaps are implied by the timeline rhythm, not spelled out.
	const roles = [
		{ dates: '2015', company: 'Kadira', current: false },
		{ dates: '2016', company: 'Creately', current: false },
		{ dates: '2020', company: 'Klarna', current: false },
		{ dates: '2023', company: 'Normative', current: false },
		{ dates: '2025', company: 'PostNord', current: true }
	];
</script>

<!-- /about: the about page. Same chrome as the home page (thani.sh / $ whoami
     + divider + icons + page link), so the two pages feel like siblings. -->
<div class="container mx-auto p-4">
	<header class="pt-20 pb-4 lg:pt-32 lg:pb-6">
		<h1 class="text-5xl font-light tracking-tight lg:text-7xl">thani<span class="text-primary">.</span>sh</h1>
		<p class="mt-2 font-mono text-base text-base-content/70 lg:text-lg">
			<span class="text-primary">$</span> whoami
		</p>
		<div class="mt-8 flex items-center gap-3">
			<span class="h-px w-12 bg-base-content/20"></span>
			<span class="h-1.5 w-1.5 rounded-full bg-primary"></span>
			<span class="h-px flex-1 bg-base-content/10"></span>
		</div>
		<div class="mt-3 flex items-center justify-between">
			<a
				href="/"
				class="font-mono text-xs text-base-content/50 hover:text-primary"
				>← home</a
			>
			<SocialIcons />
		</div>
	</header>
</div>

<main class="container mx-auto max-w-3xl space-y-10 p-4 pb-16 lg:pb-20">
	<!-- whoami: short identity paragraph. First thing below the header. -->
	<section>
		<h3 class="flex items-center gap-2 font-mono text-sm text-base-content/60">
			<span class="text-primary">##</span> whoami
		</h3>
		<p class="mt-4 text-base-content/80 leading-relaxed">
			I'm a Sweden-based software engineer with 10+ years of professional coding experience. These days, I mostly build with TypeScript and Go, while dedicating my weekends to mastering AI through hands-on side projects.
		</p>
	</section>

	<!-- career: summary sentence, then the visual timeline -->
	<section>
		<h3 class="flex items-center gap-2 font-mono text-sm text-base-content/60">
			<span class="text-primary">##</span> career
		</h3>
		<p class="mt-4 text-base-content/80 leading-relaxed">
			Co-founded Kadira (where I helped lay the initial bricks for Storybook), built Creately's collaborative editor, kept Klarna's monthly invoice smoooth, wrote more SQL than is healthy at Normative, and now leading a full-stack team at PostNord.
		</p>

		<ol class="mt-8 grid grid-cols-1 gap-y-10 sm:grid-cols-5 sm:gap-x-4">
			{#each roles as role, i (role.company)}
				<li class="relative flex flex-col pl-7 sm:items-center sm:pl-0 sm:pt-7">
					<!-- Desktop: horizontal connecting lines (left half + right half of cell) -->
					{#if i > 0}
						<span
							class="absolute left-0 top-[5px] hidden h-px w-1/2 bg-base-300 sm:block"
							aria-hidden="true"
						></span>
					{/if}
					{#if i < roles.length - 1}
						<span
							class="absolute left-1/2 top-[5px] hidden h-px w-1/2 bg-base-300 sm:block"
							aria-hidden="true"
						></span>
					{/if}
					<!-- Mobile: vertical connecting line dropping to the next node -->
					{#if i < roles.length - 1}
						<span
							class="absolute left-[5px] top-[6px] bottom-0 w-px bg-base-300 sm:hidden"
							aria-hidden="true"
						></span>
					{/if}

					<!-- Dot: top-left on mobile, top-center on desktop. Filled with
					     primary for current role, outlined for past. -->
					<span
						class="absolute left-0 top-0 flex h-3 w-3 items-center justify-center rounded-full border-2 bg-base-100 sm:left-1/2 sm:top-0 sm:-translate-x-1/2 {role.current
							? 'border-primary'
							: 'border-base-300'}"
						aria-hidden="true"
					>
						{#if role.current}
							<span class="h-1.5 w-1.5 rounded-full bg-primary"></span>
						{/if}
					</span>

					<p class="font-mono text-xs text-base-content/50">{role.dates}</p>
					<h4 class="mt-1 font-light text-base text-base-content">{role.company}</h4>
				</li>
			{/each}
		</ol>
	</section>

	<!-- Side projects: kept as prose because there's no useful visual for
	     "I tinker on OSS sometimes". -->
	<section class="text-base-content/80 space-y-4 leading-relaxed">
		<p>
			Side projects are how I learn new things, mostly on weekends and late nights after the kids are asleep. Blog posts happen even less often.
		</p>
	</section>
</main>
