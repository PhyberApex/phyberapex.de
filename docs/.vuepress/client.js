import { defineClientConfig } from 'vuepress/client'
import ResumeEn from './components/ResumeEn.vue'
import ResumeDe from './components/ResumeDe.vue'
import CvLayout from './components/CvLayout.vue'

export default defineClientConfig({
  layouts: {
    CvLayout,
  },
  enhance({ app }) {
    app.component('ResumeEn', ResumeEn)
    app.component('ResumeDe', ResumeDe)
  },
})
