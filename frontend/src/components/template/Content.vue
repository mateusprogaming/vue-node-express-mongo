<template>
    <div class="content">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Content'
}
</script>

<style>
    .content {
        grid-area: content;
        background-image: url("https://st3.depositphotos.com/4265589/16911/v/600/depositphotos_169117466-stock-video-red-network-digital-technology-background.jpg");
        padding: 20px;
    }
</style>
