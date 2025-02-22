<template>
  <div :class="getMainClass">
    <div v-if="environment === 'development'" class="development"></div>
    <div class="container-navbar">
      <NavBar></NavBar>
    </div>
    <div class="container-fluid">
      <Spinner></Spinner>
      <div class="card" :class="cssClass" v-if="initData">
        <router-view />
      </div>
      <div class="footer">
        <p class="help text-start">
          <a href="/aide/Publisher/indexAidePublisher.html" target="_blank"
            ><span>{{ $t("footer.help") }}</span></a
          >
        </p>
        <p class="project text-end">
          <router-link to="/home"
            ><span>{{ $t("footer.project") }}</span>
            <span id="footer-back-version"> v{{ backVersion }}</span></router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './components/navbar/NavBar'
import Spinner from './components/spinner/Spinner'
import ConfigurationService from '@/services/params/ConfigurationService'
import EnumDatasService from '@/services/entities/enum/EnumDatasService'

export default {
  name: 'App',
  components: {
    NavBar,
    Spinner
  },
  data () {
    return {
      // Variable indiquant le mode sur lequel l'application est lancée
      environment: process.env.NODE_ENV,
      // Variable indiquant la version de l'application indiquée dans le pom.xml
      backVersion: process.env.BACK_VERSION,
      // Variable indiquant si les données d'initalisation ont été chargées
      initData: false
    }
  },
  computed: {
    // Génère les références css de la page
    getMainClass () {
      return [
        'esup-publisher',
        this.getCssEnv(),
        !this.isIframe() ? 'not-in-iframe' : ''
      ]
    },
    cssClass () {
      return this.$router.currentRoute.value.meta.cssClass
    }
  },
  methods: {
    // Détermine le style css en fonction de l'adresse hôte utilisée
    getCssEnv () {
      const sn = window.location.host
      switch (sn) {
        case 'www.chercan.fr':
          return 'clg18'
        case 'test-clg18.giprecia.net':
          return 'clg18'
        case 'www.colleges-eureliens.fr':
          return 'clg28'
        case 'test-clg28.giprecia.net':
          return 'clg28'
        case 'e-college.indre.fr':
          return 'clg36'
        case 'test-clg36.giprecia.net':
          return 'clg36'
        case 'www.touraine-eschool.fr':
          return 'clg37'
        case 'test-clg37.giprecia.net':
          return 'clg37'
        case 'ent.colleges41.fr':
          return 'clg41'
        case 'test-clg41.giprecia.net':
          return 'clg41'
        case 'mon-e-college.loiret.fr':
          return 'clg45'
        case 'test-clg45.giprecia.net':
          return 'clg45'
        case 'lycees.netocentre.fr':
          return 'lycees'
        case 'test-lycee.giprecia.net':
          return 'lycees'
        case 'cfa.netocentre.fr':
          return 'cfa'
        case 'test-cfa.giprecia.net':
          return 'cfa'
        default:
          return 'default'
      }
    },
    // Détermine si la fenêtre est une iFrame
    isIframe () {
      try {
        // 2 ways to test if iframe depending on browser compatibility
        return (
          window.self !== window.top ||
          window.location !== window.parent.location
        )
      } catch (e) {
        // default use: the app is in iframe
        return true
      }
    }
  },
  created () {
    // Ajout du script iframe-resizer si on est dans une iFrame
    if (this.isIframe()) {
      const iframeResizerScript = document.createElement('script')
      iframeResizerScript.setAttribute('src', '/commun/postMessage-resize-iframe-in-parent.js')
      document.head.appendChild(iframeResizerScript)
    }
    Promise.all([ConfigurationService.init(), EnumDatasService.init()]).finally(() => {
      this.initData = true
    })
  },
  beforeMount () {
    // Initialisation du store et de la langue
    this.$store.commit('initializeStore')
    if (this.$i18n.locale !== this.$store.getters.getLanguage) {
      this.$i18n.locale = this.$store.getters.getLanguage
    }
  }
}
</script>
