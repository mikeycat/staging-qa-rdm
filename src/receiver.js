/**
 * This is the primary endpoint for the Cast sender that is associated with the dashboard app.
 * Currently, it renders a container containing the dashboard's graphs, and will remain alive
 * even after a sender app instance has terminated.
 * 
 * WARNING: Unfortunately, the majority of this code was tested against a temporary Firebase deployment;
 * after migrating to the live Heroku instance (qa-rdm.heroku), this receiver app unexpectedly dies shortly
 * after loading. Since this was discovered nearing the end of my term at Rogers, I was not able to resolve this issue,
 * however, my suspicion is that this lies with an issue in how the routes are defined in the Node.js package as deployed
 * onto Heroku. Theoretically, setting up a route to cast/receiver.html in the Node project should be enough to resolve this.
 */

 // TODO: Switch the namespace and app ID for the Cast app to a Rogers controlled one.
 //     NOTE: You MUST change the namespace within the associated Angular Sender component also.
var namespace = 'com.rafirahman.rdmqa';

function loadWait() {
    setTimeout(showPage, 5000);
    // Render the dashboard and hide the loading animation
    function showPage() {
        console.log("Turning off loader");
        document.getElementById("container").style.display = "block";
        $("#container").addClass("animate-bottom");
    }
}

/**
 * Load the dashboard and enable this page to act as a Cast API receiver
 */
window.onload = function () {
    // Load only the live dashboard grid into the receiver app
    $('#container').load("https://qa.rogersdigitalmedia.com/", function () {
        $('#container').load("https://qa.rogersdigitalmedia.com/", function () {
            loadWait();
        });
    });

    cast.receiver.logger.setLevelValue(0);
    window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    console.log('Starting Receiver Manager');

    castReceiverManager.onReady = function (event) {
        console.log('[LOG] Received Ready event: ' + JSON.stringify(event.data));
        window.castReceiverManager.setApplicationState('RDM QA Main Dashboard');
    };

    castReceiverManager.onSenderConnected = function (event) {
        console.log('[LOG] Sender Connected: ' + event.senderId);
    };

    castReceiverManager.onSenderDisconnected = function (event) {
        console.log('[LOG] Sender Disconnected: ' + event.senderId);
    };

    // Parse any received messages from the Cast sender app instance.
    window.messageBus = window.castReceiverManager.getCastMessageBus(
        'urn:x-cast:com.' + namespace, cast.receiver.CastMessageBus.MessageType.JSON
    );

    // Initialize the CastReceiverManager with an application status message.
    window.castReceiverManager.start({
        statusText: 'Rogers Digital Media Dashboard'
    });

    // After the CastReceiverManager has been initalized, attempt to keep the receiver alive indefinitely.
    window.messageBus.onMessage = function (event) {
        console.log('[LOG] Received From [' + event.senderId + ']: ' + event.data);
        console.log('[LOG]: Receiver manager started');
        $('#container').attr('data-refresh', 5);
        $('#container').load();
    }
};