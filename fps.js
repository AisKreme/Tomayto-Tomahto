/**
 * Allows to obtain the estimated Hz of the primary monitor in the system.
 *
 * @param {Function} callback The function triggered after obtaining the estimated Hz of the monitor.
 * @param {Boolean} runIndefinitely If set to true, the callback will be triggered indefinitely (for live counter).
 */
let fpsX;

function getScreenRefreshRate(callback, runIndefinitely) {
  let requestId = null;
  let callbackTriggered = false;
  runIndefinitely = runIndefinitely || false;

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
      window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;
  }

  let DOMHighResTimeStampCollection = [];

  let triggerAnimation = function (DOMHighResTimeStamp) {
    DOMHighResTimeStampCollection.unshift(DOMHighResTimeStamp);

    if (DOMHighResTimeStampCollection.length > 10) {
      let t0 = DOMHighResTimeStampCollection.pop();
      let fps = Math.floor((1000 * 10) / (DOMHighResTimeStamp - t0));
      fpsX = fps;

      if (!callbackTriggered) {
        callback.call(undefined, fps, DOMHighResTimeStampCollection);
      }

      if (runIndefinitely) {
        callbackTriggered = false;
      } else {
        callbackTriggered = true;
      }
    }

    requestId = window.requestAnimationFrame(triggerAnimation);
  };

  window.requestAnimationFrame(triggerAnimation);

  // Stop after half second if it shouldn't run indefinitely
  if (!runIndefinitely) {
    window.setTimeout(function () {
      window.cancelAnimationFrame(requestId);
      requestId = null;
    }, 500);
  }
}

// After 500ms, will output the estimated Hz of the monitor (frames per second - FPS)
getScreenRefreshRate(function (FPS) {
  console.log(`${FPS} FPS detected. Game Mode Set.`);
});

// Warning: the method will be executed forever, ideal for live counters
// getScreenRefreshRate(function (FPS) {
//   console.log(`${FPS} FPS`);
// }, true);
