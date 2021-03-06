<template>
  <div>
    {{ result }}
  </div>
</template>

<script>
export default {
  data: () => ({
    result: ''
  }),
  async fetch () {
    await new Promise(resolve => setTimeout(resolve, 200))
  }
}
</script>
