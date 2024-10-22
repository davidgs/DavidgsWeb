import * as params from '@params';

console.log("params: ", params);

if (params.analytics) {
  console.log('Analytics: Analytics enabled');
  if (params.analytics.statcounter) {
    console.log('Analytics: Statcounter enabled');
    import('./statcounter');
  }
  if (params.analytics.posthog) {
    console.log('Analytics: Posthog enabled');
    import('./posthog');
  }
}
