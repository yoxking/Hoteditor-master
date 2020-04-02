<script>
import CoreEditor from '../comps/core/editor/index.js'
import loadPluginMixin from '../mixins/load-plugins.js'
import '../comps/core/support/index.js'

export default {
  extends: CoreEditor,
  mixins: [loadPluginMixin]
}
</script>
