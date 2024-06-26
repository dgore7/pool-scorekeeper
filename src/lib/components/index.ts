import type { ComponentProps } from 'svelte';
import { default as Toast } from './Toast.svelte';
import { default as PlayerForm } from './PlayerForm.svelte';
import type Dialog from './Dialog.svelte';

export { default as Well } from './Well.svelte';
export { default as PlayerFieldSet } from './PlayerFieldSet.svelte';
export { default as RuleForm } from './RuleForm.svelte';

export { Toast, PlayerForm };
export type ToastProps = ComponentProps<Toast>;
export type DialogProps = ComponentProps<Dialog>;
export type PlayerFormData = NonNullable<ComponentProps<PlayerForm>['playerFormData']>;
