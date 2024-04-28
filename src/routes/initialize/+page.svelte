<script lang="ts">
  import Rules from "$lib/components/Rules.svelte";
  import Players from "$lib/components/Players.svelte";
  import Break from "$lib/components/Break.svelte"
  import Next from "$lib/components/Next.svelte"
  
  let stage = 0;
  
  let selectedGame: string;
  let selectedRules: string;
  
  let player1 = "Player 1"
  let player2 = "Player 2"
  
  let inningTop: string
  
</script>
  
<div class="container">
  <h1>Rack 'em Up!</h1>
    {#if stage === 0}
    <Rules bind:selectedGame bind:selectedRules/>
    {:else if stage === 1}
    <div>placeholder</div>
    {:else if stage === 2}
    <Break {player1} {player2} bind:inningTop/>
    {/if}
    
    <Next bind:stage/>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }

  h1 {
    margin: auto 
  }

</style>