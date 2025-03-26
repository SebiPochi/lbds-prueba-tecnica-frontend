<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>Error {{ route.query.error }}</template>
