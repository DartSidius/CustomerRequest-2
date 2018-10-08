/**
 * Created by Vladyslav Lyfar on 05.10.2018.
 */
({
    showKanbanCardDetails: function(component, event, helper) {
        let modalBody;
        $A.createComponent("c:KanbanCardDetails", {},
            function(content, status) {
                if (status === "SUCCESS") {
                    modalBody = content;
                    component.find('overlayLib').showCustomModal({
                        body: modalBody,
                        showCloseButton: true,
                        cssClass: "mymodal"
                    })
                }
            });
    }
})