/**
 * Created by Vladyslav Lyfar on 05.10.2018.
 */
({
    showKanbanCardDetails: function(component, event, helper) {
        let modalBody;
        $A.createComponent("c:KanbanCardDetails", {
                "kanbanCard": component.get("v.kanbanCard")
            },
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
    },
    handleCreateNewCardEvent: function(component, event) {
        let action = component.get("c.updateKanbanCard");
        action.setParams({
            "kanbanCard": event.getParam("KanbanCard")
        });
        action.setCallback(this, (response) => {
            let state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.kanbanCard", response.getReturnValue());
            }
        })

        $A.enqueueAction(action);
    },
    selectAction: function(component, event) {
        let selectedMenu = event.detail.menuItem.get("v.value");
        let customPopover;
        switch (selectedMenu) {
            case "Rename":
                customPopover = component.find("customPopover");
                $A.util.toggleClass(customPopover, "is-show");
                break;
            case "MoveTo":
                customPopover = component.find("customPopover1");
                $A.util.toggleClass(customPopover, "is-show");
                break;
            case "Copy":
                customPopover = component.find("customPopover2");
                $A.util.toggleClass(customPopover, "is-show");
                break;
        }
    },
    handleUpdateKanbanCardColumnEvent: function(component, event, helper) {
        let action = component.get("c.updateKanbanCard");
        let newKanbanColumnId = event.getParam("NewKanbanCardColumnId");
        let kanbanCard = component.get("v.kanbanCard");
        kanbanCard.KanbanColumn__c = newKanbanColumnId;
        action.setParams({
            "kanbanCard": kanbanCard
        });
        action.setCallback(this, (response) => {
            let state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.kanbanCard", response.getReturnValue());
            }
        });

        $A.enqueueAction(action);
    },
    handleCopyKanbanCardEvent: function(component, event) {
        let action = component.get("c.copyKanbanCard");
        let kanbanCard = component.get("v.kanbanCard");
        kanbanCard.KanbanColumn__c = event.getParam("NewKanbanCardColumnId");
        action.setParams({
            "kanbanCard": kanbanCard
        });
        action.setCallback(this, (response) => {
            let state = response.getState();
            if(state === "SUCCESS") {
                console.log(response.getReturnValue());
            }
        });

        $A.enqueueAction(action);
    }
})