<script>
	import { PlayerFieldSet, Well } from '$lib/components';
	import logo from '$lib/assets/brand.svg';
</script>

<div class="p-4 flex flex-col gap-4 min-h-screen">
	<div><img src={logo} alt="rack em up" class="my-1" /></div>
	<p>Cue Count - Crafty Calculations for Cool Cueists*</p>
	<PlayerFieldSet name="player-one" />
	<PlayerFieldSet name="player-two" />
	<div class="flex-1"></div>
	<button class="flex justify-center items-center h-[3.75rem] rounded-[60px] bg-white text-black">Let’s Rack ‘Em Up!</button>
</div>
