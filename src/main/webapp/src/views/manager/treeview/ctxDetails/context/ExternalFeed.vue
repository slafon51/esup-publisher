<template>
  <h3 class="mt-3 mb-2">{{ $t("manager.treeview.details.context.properties") }}</h3>
  <dl class="row entity-details">
    <dt class="col-sm-5"><span>{{$t('externalFeed.name')}}</span></dt>
    <dd class="col-sm-7"><span>{{context.name}}</span></dd>
  </dl>
  <dl class="row entity-details">
    <dt class="col-sm-5"><span>{{$t('externalFeed.rssUrl')}}</span></dt>
    <dd class="col-sm-7"><span>{{context.rssUrl}}</span></dd>
  </dl>
  <dl class="row entity-details" v-if="context.iconUrl && context.iconUrl !== '' && context.iconUrl !== 'http://' && context.publisher.context.reader.classificationDecorations.includes('ENCLOSURE')">
    <dt class="col-sm-5"><span>{{$t('category.iconUrl')}}</span></dt>
    <dd class="col-sm-7"><img class="media-object img-fluid" :src="context.iconUrl" alt="image" /></dd>
  </dl>
  <dl class="row entity-details">
    <dt class="col-sm-5"><span>{{$t('externalFeed.description')}}</span></dt>
    <dd class="col-sm-7"><span>{{context.description}}</span></dd>
  </dl>
  <dl class="row entity-details">
    <dt class="col-sm-5"><span>{{$t('externalFeed.lang')}}</span></dt>
    <dd class="col-sm-7"><span>{{$t(getLangLabel(context.lang))}}</span></dd>
  </dl>
  <dl class="row entity-details">
    <dt class="col-sm-5"><span>{{$t('externalFeed.ttl')}}</span></dt>
    <dd class="col-sm-7"><span>{{context.ttl}}</span></dd>
  </dl>
  <dl class="row entity-details">
    <dt class="col-sm-5"><span>{{$t('externalFeed.accessView')}}</span></dt>
    <dd class="col-sm-7"><span>{{$t(getAccessTypeLabel(context.accessView))}}</span></dd>
  </dl>
</template>

<script>
export default {
  name: 'ExternalFeed',
  inject: ['context', 'getEnumlabel'],
  methods: {
    getAccessTypeLabel (name) {
      return this.getEnumlabel('accessType', name) || ''
    },
    getLangLabel (name) {
      return this.getEnumlabel('lang', name) || ''
    }
  }
}
</script>
