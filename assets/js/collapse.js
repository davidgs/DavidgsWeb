// Handler will be called when the DOM is fully loaded
// So the script can be placed anywhere on the page
var callback = function() {
  var collapseHooks = document.getElementsByClassName('collapseAfter');
  for (var hook of collapseHooks) {
    var wrap = hook.parentNode;
    var a = document.createElement('a');
    wrap.append(a);
    a.addEventListener('click', toggleCollapse, false);
    a.className = 'collapseAnchor';
    a.href="#"; /* without this it's not keyboard focusable */
    wrap.classList.add('collapseWrap');
    // check/set defaults just to be safe
    if(!wrap.hasAttribute('data-text-open')) {
      wrap.setAttribute('data-text-open', 'See Less ▲');
    }
    if(!wrap.hasAttribute('data-text-closed')) {
      wrap.setAttribute('data-text-closed', 'See More ▼');
    }
    setName(a, wrap);
  } // for hook
  function toggleCollapse(e) {
    e.preventDefault();
    currParent = e.currentTarget.parentNode;
    currParent.classList.toggle('closed');
    setName(e.currentTarget, currParent);
  } // toggleCollapse
};

function setName(el, parent) {
  if(parent.classList.contains('closed')) {
    el.text = parent.getAttribute('data-text-closed');
  } else {
    el.text = parent.getAttribute('data-text-open');
  }
}

if(document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)) {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
}
