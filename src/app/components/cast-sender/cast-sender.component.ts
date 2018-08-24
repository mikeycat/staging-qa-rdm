import { Component, OnInit } from '@angular/core';

declare var chrome: any;
declare var cast: any;

let session = null;

/** 
 * The following variables are used by this Cast sender app to discover the 
 * appropriate Cast receiver app to connect to. Currently, the associated Cast 
 * SDK app is associated with my (Rafi Rahman) personal Google account. 
 * 
 * In the future, it will be necessary to modify the applicationID and the namespace so they are 
 * linked to a Google Cast SDK Developer Console profile that is properly associated with RDM QA.
 */
let applicationID = '308A55B9';
let namespace = 'urn:x-cast:com.rafirahman.cast.rdmqa';

@Component({
  selector: 'cast-sender',
  templateUrl: './cast-sender.component.html',
  styleUrls: ['./cast-sender.component.css'],
})

/** 
 * An Angular component that prepares a Cast Application Framework sender app and produces 
 * a reusable Cast button that is attached to the Dashboard Cast app. For more information,
 * please read the official API documentation: https://developers.google.com/cast/docs/reference/chrome. 
 * */
export class CastSenderComponent implements OnInit {

  constructor() {
    /** 
     * Check if the current browser supports the Google Cast API (i.e., Chrome),
     * and initialize a CastContext with the appropriate variables set.
     */
    (window as any).__onGCastApiAvailable = function (isAvailable) {
      if (isAvailable) {
          cast.framework.CastContext.getInstance().setOptions({
            receiverApplicationId: applicationID,
            autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
          });
      }
    };
  }

  /**
   * Listen for any Cast API sessions and keep listening 
   * for messages and/or updates from the session(s).
   *
   * @param {Event} e   A Cast API session event
   */
  sessionListener(e) {
    console.log('New session ID:' + e.sessionId);
    session = e;
    session.addUpdateListener(this.sessionUpdateListener);
    session.addMessageListener(namespace, this.receiverMessage);
  }

  /**
   * Log session updates, and remove expired sessions.
   *
   * @param {Boolean} isAlive
   */
  sessionUpdateListener(isAlive: Boolean) {
    let message = isAlive ? 'Session Updated' : 'Session Removed';
    message += ': ' + session.sessionId;
    console.log('[LOG] ' + message);
    if (!isAlive) {
      session = null;
    }
  }

  /**
   * Log any receivers that are discovered that support the associated Cast app.
   * 
   * NOTE: as of 2018-08-23, the associated Cast app is unpublished, and the only 
   * receiver that supports the dashboard app is the Chromecast connected to Goldeneye TV.
   * It is likely that publishing this app will be the optimal path to take going forward,
   * in which case, it is necessary to modify the namespace and applicationID – as declared 
   * above – so they are associated with some sort of Rogers controller account.
   *
   * @param {Event} e
   */
  receiverListener(e: Event | String) {
    if (e === 'available') {
      console.log('[LOG]: Receiver found');
    } else {
      console.log('[LOG]: No receivers found');
    }
  }

  /**
   * Receive and log messages from the connected receiver
   *
   * @param {string} namespace The namespace of the message
   * @param {string} message A message string
   */
  receiverMessage(namespace: string, message: string) {
    console.log('[LOG] receiverMessage: ' + namespace + ', ' + message);
  }

  /**
   * Stop the Cast sender app.
   */
  stopApp() {
    console.log('[LOG]: Stopping sender app');

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
   * 
   * NOTE: Currently, this simply serves rudimentary debugging purposes,
   * but this function can be expanded considerably to add interactivity 
   * between a sender and the receiver app (which would need to be modified
   * apporpriately to handle interactivity related messages).
   * 
   * @param {Object} message  The data to send to the receiver
   */
  sendMessage(message: Object) {
    if (session != null) {
      session.sendMessage(namespace, message,
        () => console.log('[SUCCESS]: ' + message),
        () => console.log('[ERROR]: ' + message));
    } else {
      chrome.cast.requestSession(function (e) {
        session = e;
        session.sendMessage(namespace, message, this.onSuccess.bind(this, 'Message sent: ' +
          message), this.onError);
      }, this.onError);
    }
  }

  // Generic success callback
  onSuccess(message) {
    console.log('[SUCCESS]: ' + message);
  }
  // Generic error callback
  onError(message) {
    console.log('[ERROR]: ' + message);
  }

  ngOnInit() {

  }

}