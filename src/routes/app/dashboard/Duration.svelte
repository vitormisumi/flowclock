<script lang="ts">
	import { getContext } from "svelte";
	import type { Session } from "../session/types";
	import type { Writable } from "svelte/store";

    const sessions: Writable<Session[]> = getContext('sessions');
</script>

<p class="text-white">Duration</p>