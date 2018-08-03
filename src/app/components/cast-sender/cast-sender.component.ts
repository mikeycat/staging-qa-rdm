import { Component, OnInit } from '@angular/core';

declare var chrome: any;
declare var cast: any;
let applicationID = '308A55B9';
let namespace = 'urn:x-cast:com.rafirahman.cast.rdmqa';
let session = null;

@Component({
  selector: 'cast-sender',
  templateUrl: './cast-sender.component.html',
  styleUrls: ['./cast-sender.component.css'],
})

export class CastSenderComponent implements OnInit {



  constructor() {
    (window as any).__onGCastApiAvailable = function (isAvailable) {
      if (isAvailable) {
          /**
           * Configure and initialize the Cast API if it's available
           */
          cast.framework.CastContext.getInstance().setOptions({
            receiverApplicationId: applicationID,
            autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
          });
      }
    };
  }

  /**
   * Listen for any Cast API sessions
   *
   * @param {Event} e
   */
  sessionListener(e) {
    console.log('New session ID:' + e.sessionId);
    session = e;
    session.addUpdateListener(this.sessionUpdateListener);
    session.addMessageListener(namespace, this.receiverMessage);
  }

  /**
   * Listen for updates regarding the current Cast API session
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
   * Listen for any discoverable Cast receivers
   *
   * @param {Event} e
   */
  receiverListener(e: Event | String) {
    if (e === 'available') {
      console.log('[LOG]: Receiver found');
    } else {
      console.log('[LOG]: Receiver list empty');
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
   * Stop the Cast sender app
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
   * @param {Object} message The message to send
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


  ngOnInit() {}

}