/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */
({
    showKanbanCardDetails: function(component) {
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
            case "DeleteCard":
                let deleteConfirmation = confirm(`Delete card "${component.get("v.kanbanCard").Name}"?`);
                if(deleteConfirmation) {
                    this.deleteKanbanCard(component);
                }
                break;
        }
    },
    deleteKanbanCard: function(component) {
        let action = component.get("c.deleteKanbanCard");
        action.setParams({
            "kanbanCard": component.get("v.kanbanCard")
        });
        action.setCallback(this, (response) => {
            let state = response.getState();
            if(state === "SUCCESS") {
                let onDeleteKanbanCardEvent = component.getEvent("OnDeleteKanbanCardEvent");
                onDeleteKanbanCardEvent.setParams({
                    "DeletedKanbanCard": response.getReturnValue()
                });
                onDeleteKanbanCardEvent.fire();
            }
        });

        $A.enqueueAction(action);
    },
    handleUpdateKanbanCardColumnEvent: function(component, event) {
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
                let onMoveKanbanCardEvent = component.getEvent("OnMoveKanbanCardEvent");
                onMoveKanbanCardEvent.setParams({
                    "MovedKanbanCard": new Array(response.getReturnValue())
                });
                onMoveKanbanCardEvent.fire();
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
            if (state === "SUCCESS") {
                let onCopyKanbanCardEvent = component.getEvent("OnCopyKanbanCardEvent");
                onCopyKanbanCardEvent.setParams({
                    "CopiedKanbanCard": new Array(response.getReturnValue())
                });
                onCopyKanbanCardEvent.fire();
            }
        });

        $A.enqueueAction(action);
    }
})