import posthog from 'posthog-js'
import * as params from '@params'

console.log('Posthog: Posthog enabled', params.analytics.posthog.id);
posthog.init(params.analytics.posthog.id, {
  api_host: 'https://us.i.posthog.com',
  person_profiles: 'identified_only',
})
