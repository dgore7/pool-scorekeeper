<script lang="ts">

  import PlayerFieldSet from "./PlayerFieldSet.svelte";
  export let playerOneName: string;
  export let playerTwoName: string;
  export let playerOneHandicap: number;
  export let playerTwoHandicap: number;

  
  </script>
  
  <!-- <h2>Who's Playin?</h2>-->

  <p class="mx-10">Cue Count - Crafty Calculations for Cool Cueists</p>
  <PlayerFieldSet name="player-one" bind:playerName={playerOneName} bind:playerHandicap={playerOneHandicap}/>
  <PlayerFieldSet name="player-two" bind:playerName={playerTwoName} bind:playerHandicap={playerTwoHandicap}/>

