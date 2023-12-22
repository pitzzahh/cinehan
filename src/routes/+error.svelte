<script lang="ts">
    import { page } from '$app/stores';
    import { ExclamationTriangle } from 'radix-icons-svelte';
	import * as Alert from '$lib/components/ui/alert';
</script>
<div class="m-4">
    <Alert.Root variant="destructive">
        <ExclamationTriangle class="h-4 w-4" />
        <Alert.Title>Error {$page.status}</Alert.Title>
        <Alert.Description>{$page.error?.message}</Alert.Description>
    </Alert.Root>
</div>
