<script context="module" lang="ts">
	import { cva } from 'class-variance-authority';

	const ballContainer = cva(
		[
			'aspect-square',
			'rounded-full',
			'flex',
			'flex-none',
			'overflow-hidden',
			'relative',
			'transition-colors',
			'duration-200'
		],
		{
			variants: {
				size: {
					small: ['text-m', 'w-10'],
					large: ['text-3xl', 'w-24']
				},
				striped: {
					true: [
						'before:absolute',
						'before:bg-amber-50',
						'before:top-0',
						'before:h-4',
						'before:w-full',
						'after:absolute',
						'after:bg-amber-50',
						'after:bottom-0',
						'after:h-4',
						'after:w-full'
					],
					false: ''
				}
			},
			defaultVariants: {
				size: 'large'
			},
			compoundVariants: [
				{
					striped: true,
					size: 'small',
					class: ['before:h-[.5rem]', 'after:h-[.5rem]']
				}
			]
		}
	);

	const numberContainer = cva(
		[
			'aspect-square',
			'rounded-full',
			'm-auto',
			'text-black',
			'bg-amber-50',
			'flex',
			'justify-center',
			'items-center'
		],
		{
			variants: {
				size: {
					small: ['text-xs', 'w-4'],
					large: ['text-3xl', 'w-10']
				}
			},
			defaultVariants: {
				size: 'large'
			}
		}
	);

	export type BallModel = {
		number: number;
		color: string;
		isStripe: boolean;
		isDead: boolean;
		isPocketed: boolean;
		isPostKill: boolean;
	};
</script>

<script lang="ts">
	export let size: 'large' | 'small';
	export let ball: BallModel;
</script>

{#if ball.isDead && size === 'large'}
	<div
		aria-label="ball number"
		class={numberContainer({ size, class: ['font-noto', 'absolute', 'left-7', 'top-1'] })}
	>
		{ball.number}
	</div>
{:else}
	<div
		class={ballContainer({
			size,
			striped: ball.isStripe,
			class: ball.isPocketed && size === 'large' ? 'bg-dead-ball' : ball.color
		})}
	>
		<div aria-label="ball number" class={numberContainer({ size, class: 'font-noto' })}>
			{ball.number}
		</div>
	</div>
{/if}
