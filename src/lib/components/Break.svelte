<script lang="ts">
  export let player1: string;
  export let player2: string;
  export let inningTop

  const players = [1, 2]
  </script>
  
  <h2>Who Breaks First?</h2>
  <div>
  {#each players as player}
  <label>
    {#if player === 1}
    {player1}
    {:else}
    {player2}
    {/if}
    <input type="radio" value={player} bind:group={inningTop}/>
  </label>
  {/each}
  </div>
  
  
  <style></style>
  