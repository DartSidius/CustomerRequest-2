/**
 * Created by Vladyslav Lyfar on 05.10.2018.
 */
({
    handleShowModal: function(component, evt, helper) {
        var modalBody;
        $A.createComponent("c:modalContent", {},
            function(content, status) {
                if (status === "SUCCESS") {
                    modalBody = content;
                    component.find('overlayLib').showCustomModal({
                        header: "Application Confirmation",
                        body: "qwerty",
                        showCloseButton: true,
                        cssClass: "mymodal",
                        closeCallback: function() {
                            alert('You closed the alert!');
                        }
                    })
                }
            });
    }
})