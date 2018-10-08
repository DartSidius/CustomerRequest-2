/**
 * Created by Vladyslav Lyfar on 08.10.2018.
 */
({
    handleShowModal: function(component, evt, helper) {
        let modalBody;
        $A.createComponent("c:KanbanCardDetails", {},
            function(content, status) {
                if (status === "SUCCESS") {
                    modalBody = content;
                    component.find('overlayLib').showCustomModal({
                        body: "qwerty",
                        showCloseButton: true,
                        //cssClass: "mymodal",
                        closeCallback: function() {
                            alert('You closed the alert!');
                        }
                    })
                }
            });
    },
    handleShowPopover : function(component, event, helper) {
        component.find('overlayLib').showCustomPopover({
            body: "Popovers are positioned relative to a reference element",
            referenceSelector: ".mypopover",
            cssClass: "popoverclass, cMyCmp"
        }).then(function (overlay) {
            setTimeout(function(){
                //close the popover after 3 seconds
                overlay.close();
            }, 3000);
        });
    }
})