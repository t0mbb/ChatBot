(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
    fjs.parentNode.insertBefore(js, fjs);
    console.log("Messenger SDK is being loaded");
}(document, 'script', 'Messenger'));

window.extAsyncInit = function() {
    MessengerExtensions.getContext(facebookAppId,
        function success(thread_context){
            console.log("PSID received:", thread_context.psid); // Log PSID
            $("#psid").val(thread_context.psid);
        },
        function error(err){
            console.error("Error fetching PSID:", err); // Log error
            alert("Unable to retrieve Messenger context. Please open the link in Messenger.");
        }
    );
};

// Validate inputs and handle order submission
function validateInputFields() {
    const EMAIL_REG = /[a-zA-Z][a-zA-Z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/g;
    let email = $("#email");
    let orderNumber = $("#orderNumber");

    if (!email.val().match(EMAIL_REG)) {
        email.addClass("is-invalid");
        return true;
    } else {
        email.removeClass("is-invalid");
    }

    if (orderNumber.val() === "") {
        orderNumber.addClass("is-invalid");
        return true;
    } else {
        orderNumber.removeClass("is-invalid");
    }

    return false;
}

function handleClickButtonFindOrder(){
    $("#btnFindOrder").on("click", function(e) {
        let check = validateInputFields();
        let data = {
            psid: $("#psid").val(),
            customerName: $("#customerName").val(),
            email: $("#email").val(),
            orderNumber: $("#orderNumber").val()
        };

        if(!check) {
            // Close webview
            MessengerExtensions.requestCloseBrowser(function success() {
                // Webview closed
            }, function error(err) {
                console.log(err);
            });

            // Send data to node.js server
            $.ajax({
                url: `${window.location.origin}/set-info-order`,
                method: "POST",
                data: data,
                success: function(data) {
                    console.log("Data submitted:", data);
                },
                error: function(error) {
                    console.log("Error submitting data:", error);
                }
            });
        }
    });
}

handleClickButtonFindOrder();
