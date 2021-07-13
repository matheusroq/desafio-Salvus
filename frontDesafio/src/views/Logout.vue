<script>


export default {
created() {
    localStorage.clear()
    this.$router.push({name: 'Index'})
}
}

</script>
