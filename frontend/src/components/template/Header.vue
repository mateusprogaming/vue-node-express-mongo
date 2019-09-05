<template>
    <header class="header">
        <!-- criando uma classe toggle -->
        <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
            <!-- classe usando font -->
            <i class="fa fa-lg" :class="icon"></i> 
            <!-- chamando classe computada ^^^ -->
        </a>
        <!-- classe de titulo -->
        <h1 class="title">
            <router-link to="/">{{ title }}</router-link>
        </h1>
        <UserDropdown v-if="!hideUserDropdown" />
    </header>
</template>

<script>
import UserDropdown from './UserDropdown'

export default {
    // entrando dentro de header
    name: 'Header',
    components: { UserDropdown },
    // atributo 2 propriedade de paramentros
    props: {
        // primeira prioridade
        title: String,
        //atributo hiddenTogle sume e aparece menu
        hideToggle: Boolean,
        hideUserDropdown: Boolean
    },
    // propriedade computada
    computed: {
        icon() {
            return this.$store.state.isMenuVisible ? "fa-angle-left" : "fa-angle-down"
        }
    },
    methods: {
        toggleMenu() {
            this.$store.commit('toggleMenu')
        }
    }
}
</script>

<style>
    .header {
        grid-area: header;
        background:  linear-gradient(to right, #e21f1f, #020c0c);

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        font-size: 1.2rem;
        color: #fff;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
    }

    .title a {
        color: #FFF;
        text-decoration: none;
    }

    .title a:hover {
        color: #FFF;
        text-decoration: none;
        border-radius: 8px;
    }

    header.header > a.toggle {
        width: 60px;
        height: 100%;
        color: #fff;
        justify-self: flex-start;
        text-decoration: none;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    header.header > a.toggle:hover {
        color: #fff;
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>
