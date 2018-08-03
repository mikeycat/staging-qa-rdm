/**
 * Wait a reasonable time for everything to load
 */
function loadWait() {
    setTimeout(showPage, 5000);
    // Render the dashboard and hide the loading animation
    function showPage() {
        console.log("Turning off loader");
        $('.rogers-wave').css('display', 'none');
        document.getElementById("container").style.display = "block";
        $("#container").addClass("animate-bottom");
    }
}

/**
 * Load the dashboard and enable this page to act as a Cast API receiver
 */
window.onload = function () {
    // Load only the live dashboard grid into the receiver app
    $('#container').load("https://qa-rdm.herokuapp.com", function () {
        $('#container').load("https://qa-rdm.herokuapp.com", function () {
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

    window.messageBus = window.castReceiverManager.getCastMessageBus(
        'urn:x-cast:com.rafirahman.rdmqa', cast.receiver.CastMessageBus.MessageType.JSON
    );

    // Initialize the CastReceiverManager with an application status message.
    window.castReceiverManager.start({
        statusText: 'Rogers Digital Media Dashboard'
    });

    window.messageBus.onMessage = function (event) {
        console.log('[LOG] Received From [' + event.senderId + ']: ' + event.data);
        console.log('[LOG]: Receiver manager started');
        $('#container').attr('data-refresh', 5);
        $('#container').load();
    }
};