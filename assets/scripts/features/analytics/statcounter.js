import * as params from '@params';

    console.log('StatCounter: Statcounter enabled');
    const sc_project = params.analytics.statcounter.project;
    const sc_invisible = params.analytics.statcounter.invisible;
    const sc_security = params.analytics.statcounter.security;
    const scJsHost =  "https://www.statcounter.com/js/";

    const ns = document.createElement('noscript');
    ns.setAttribute('class', 'statcounter');
    const a = document.createElement('a');
    a.setAttribute('title', 'web counter');
    a.setAttribute('href', 'https://statcounter.com/');
    a.setAttribute('target', '_blank');
    const img = document.createElement('img');
    img.setAttribute('class', 'statcounter');
    img.setAttribute('src', 'https://c.statcounter.com/' + params.analytics.statcounter.project + '/0/' + params.analytics.statcounter.security + '/' + params.analytics.statcounter.invisible + '/');
    img.setAttribute('alt', 'web counter');
    img.setAttribute('referrerPolicy', 'no-referrer-when-downgrade');
    ns.appendChild(a);
    a.appendChild(img);
document.body.appendChild(ns);


