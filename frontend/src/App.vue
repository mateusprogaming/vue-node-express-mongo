<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
		<Header title="Spider - Tecnologia de Sucesso" 
			:hideToggle="!user"
			:hideUserDropdown="!user" />
		<Menu v-if="user" />
		<Loading v-if="validatingToken" />
		<Content v-else />
		<Footer />
	</div>
</template>

<script>
import axios from "axios"
import { baseApiUrl, userKey } from "@/global"
import { mapState } from "vuex"
import Header from "@/components/template/Header"
import Menu from "@/components/template/Menu"
import Content from "@/components/template/Content"
import Footer from "@/components/template/Footer"
import Loading from "@/components/template/Loading"

export default {
	name: "App",
	components: { Header, Menu, Content, Footer, Loading },
	computed: mapState(['isMenuVisible', 'user']),
	data: function() {
		return {
			validatingToken: true
		}
	},
	methods: {
		async validateToken() {
			this.validatingToken = true

			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			this.$store.commit('setUser', null)

			if(!userData) {
				this.validatingToken = false
				this.$router.push({ name: 'auth' })
				return
			}

			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

			if (res.data) {
				this.$store.commit('setUser', userData)
				
				if(this.$mq === 'xs' || this.$mq === 'sm') {
					this.$store.commit('toggleMenu', false)
				}
			} else {
				localStorage.removeItem(userKey)
				this.$router.push({ name: 'auth' })
			}

			this.validatingToken = false
		}
	},
	created() {
		this.validateToken()
	}
}
</script>

<style>
	* {
		font-family: "Lato", sans-serif;
	}

	body {
		margin: 0;
	}

	#app {
		/* renderiza as fontes biblioteca (index.js) */
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		/* tamanho proporcionado pela tela inteira */
		height: 100vh;
		/* cada componente tem grid area e vamos aplicar na tela agora e organizar */
		display: grid;
		/* 3 linhas - 1 linha "HEADER" 2 - linha "FRAME" 3 - "RODAPE"*/ 
		grid-template-rows: 60px 1fr 40px;
		/* 2 colunas = 1 coluna "MENU" 2 -  */
		grid-template-columns: 300px 1fr;
		grid-template-areas:
			"header header" /*tres linhas e 2 coluna ficara << assim */
			"menu content"
			"menu footer";
	}

	#app.hide-menu {
		grid-template-areas:
			"header header"
			"content content"
			"footer footer";
	}
</style>