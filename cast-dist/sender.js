var applicationID = '308A55B9';
var namespace = 'urn:x-cast:com.rafirahman.cast.rdmqa';
var session = null;

/**
 * Wait one second before attempting to intialize the Cast API
 */
// if (!chrome.cast || !chrome.cast.isAvailable) {
//     setTimeout(initializeCastApi, 1000);
// }

window.__onGCastApiAvailable = function(isAvailable) {
    if (isAvailable) {
      initializeCastApi();
    }
  };

/**
 * Configure and initialize the Cast API
 */
function initializeCastApi() {    

    cast.framework.CastContext.getInstance().setOptions({
        receiverApplicationId: applicationID,
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
      });

    // var sessionRequest = new chrome.cast.SessionRequest(applicationID);
    // var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
    //     sessionListener,
    //     receiverListener);
    // chrome.cast.initialize(apiConfig, onInitSuccess, onError);

    // // Initialization success callback 
    // function onInitSuccess() {
    //     appendMessage('[SUCCESS] Cast API initalization');
    // }

    // // Initialization error callback 
    // function onError(message) {
    //     appendMessage('[ERROR] Cast API initalization: ' + JSON.stringify(message));
    // }
}

/**
 * Listen for any Cast API sessions
 * 
 * @param {Event} e 
 */
function sessionListener(e) {
    appendMessage('New session ID:' + e.sessionId);
    session = e;
    session.addUpdateListener(sessionUpdateListener);
    session.addMessageListener(namespace, receiverMessage);
}

/**
 * Listen for updates regarding the current Cast API session
 * 
 * @param {Boolean} isAlive 
 */
function sessionUpdateListener(isAlive) {
    var message = isAlive ? 'Session Updated' : 'Session Removed';
    message += ': ' + session.sessionId;
    appendMessage('[LOG] ' + message);
    if (!isAlive) {
        session = null;
    }
}

/**
 * Listen for any discoverable Cast receivers
 * 
 * @param {Event} e 
 */
function receiverListener(e) {
    if (e === 'available') {
        appendMessage('[LOG]: Receiver found');
    } else {
        appendMessage('[LOG]: Receiver list empty');
    }
}

/** 
 * Receive and log messages from the connected receiver
 * 
 * @param {string} namespace The namespace of the message
 * @param {string} message A message string
 */
function receiverMessage(namespace, message) {
    appendMessage('[LOG] receiverMessage: ' + namespace + ', ' + message);
}

/**
 * Stop the Cast sender app
 */
function stopApp() {
    appendMessage('[LOG]: Stopping sender app');

    /* Uncomment the following lines to kill the receiver app when the sender app is stopped */
    
    // session.stop(onStopAppSuccess, onError);
    // appendMessage('[LOG]: Stopping receiver app');
    // // Stop app success callback
    // function onStopAppSuccess() {
    //     appendMessage('onStopAppSuccess');
    // }
}

/** 
 * Send anything to the receiver to invoke its CastMessageBus handler.
 * @param {Object} message The message to send
 */
function sendMessage(message) {
    if (session != null) {
        session.sendMessage(namespace, message, onSuccess.bind(this, 'Message sent: ' + message),
            onError);
    } else {
        chrome.cast.requestSession(function (e) {
            session = e;
            session.sendMessage(namespace, message, onSuccess.bind(this, 'Message sent: ' +
                message), onError);
        }, onError);
    }
}

// Generic success callback
function onSuccess(message) {
    appendMessage('[SUCCESS]: ' + message);
}
// Generic error callback
function onError(message) {
    appendMessage('[ERROR]: ' + message);
}

/* DEBUG FUNCTION(S) BELOW */

/** Append a message to the sender window
 * @param {string} message A message string
 */
function appendMessage(message) {
    console.log(message);
    var dw = document.getElementById('debugmessage');
    dw.innerHTML += '\n' + JSON.stringify(message);
}