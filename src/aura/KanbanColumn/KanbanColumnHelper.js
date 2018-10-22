/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */
({
    doInit: function(component) {
        let action = component.get("c.getAllKanbanCards");
        action.setParams({
            "currentId": component.get("v.kanbanColumn").Id
        });
        action.setCallback(this, (response) => {
            let state = response.getState();
            if (state === "SUCCESS") {
                let kanbanCardList = response.getReturnValue();
                component.set("v.kanbanCards", kanbanCardList);
            }
        });

        $A.enqueueAction(action);
    //     let kanbanCardList = component.get("v.kanbanColumn").KanbanCards__r || [];
    //     component.set("v.kanbanCards", kanbanCardList);
    },
    saveKanbanColumn: function(component) {
        let action = component.get("c.updateKanbanColumn");
        action.setParams({
            "kanbanColumn": component.get("v.kanbanColumn")
        });
        action.setCallback(this, (response) => {
            let state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.kanbanColumn", response.getReturnValue());
            }
        });

        $A.enqueueAction(action);
        this.showRenameForm(component);
    },
    moveAllKanbanCardsToOtherColumn: function(component, event) {
        let action = component.get("c.moveAllKanbanCardsToOtherColumn");
        let kanbanCards = component.get("v.kanbanCards");
        kanbanCards.forEach((element) => {
            element.KanbanColumn__c = event.getParam("NewKanbanColumnId")
        });
        action.setParams({
            "kanbanCards": kanbanCards
        });
        action.setCallback(this, (response) => {
            let state = response.getState();
            if(state === "SUCCESS") {
                console.log("all cards moved");
                component.set("v.kanbanCards", []);
                let onMoveAllKanbanCardsEvent = component.getEvent("OnMoveAllKanbanCardsEvent");
                onMoveAllKanbanCardsEvent.setParams({
                    "KanbanCards": response.getReturnValue()
                });
                onMoveAllKanbanCardsEvent.fire();
            }
        });

        $A.enqueueAction(action);
    },
    handleUpdateKanbanColumnBoardEvent: function(component, event) {
        let newKanbanColumnBoardId = event.getParam("NewKanbanColumnBoardId");
        let action = component.get("c.updateKanbanColumn");
        let kanbanColumn = component.get("v.kanbanColumn");
        kanbanColumn.KanbanBoard__c = newKanbanColumnBoardId;
        action.setParams({
            "kanbanColumn": kanbanColumn
        });
        action.setCallback(this, (response) => {
            let state = response.getState();
            if(state === "SUCCESS") {
                let onMoveKanbanColumnEvent = component.getEvent("OnMoveKanbanColumnEvent");
                onMoveKanbanColumnEvent.setParams({
                    "MovedKanbanColumn": response.getReturnValue()
                });
                onMoveKanbanColumnEvent.fire();
            }
        });

        $A.enqueueAction(action);
    },
    showRenameForm: function(component) {
        let isRenameFormOpened = component.get("v.isRenameFormOpened");
        isRenameFormOpened = !isRenameFormOpened;
        component.set("v.isRenameFormOpened", isRenameFormOpened);
    },
    selectAction: function(component, event) {
        let selectedMenu = event.detail.menuItem.get("v.value");
        let customPopover, deleteConfirmation;
        switch (selectedMenu) {
            case "copyList":
                customPopover = component.find("customPopover2");
                $A.util.toggleClass(customPopover, "is-show");
                break;
            case "moveList":
                customPopover = component.find("customPopover");
                $A.util.toggleClass(customPopover, "is-show");
                break;
            case "moveAllCards":
                customPopover = component.find("customPopover1");
                $A.util.toggleClass(customPopover, "is-show");
                break;
            case "deleteAllCards":
                deleteConfirmation = confirm(`Delete all "${component.get("v.kanbanColumn").Name}" list cards?`);
                if(deleteConfirmation) {
                    this.deleteAllKanbanColumnCards(component);
                }
                break;
            case "deleteList":
                deleteConfirmation = confirm(`Delete column "${component.get("v.kanbanColumn").Name}"?`);
                if(deleteConfirmation) {
                    this.deleteKanbanColumn(component);
                }
                break;
        }
    },
    deleteKanbanColumn: function(component) {
        let action = component.get("c.deleteKanbanColumn");
        action.setParams({
            "kanbanColumn": component.get("v.kanbanColumn")
        });
        action.setCallback(this, (response) => {
            let state = response.getState();
            if(state === "SUCCESS") {
                console.log("column deleted");
                let OnDeleteKanbanColumnEvent = component.getEvent("OnDeleteKanbanColumnEvent");
                OnDeleteKanbanColumnEvent.setParams({
                    "DeletedKanbanColumn": response.getReturnValue()
                });
                OnDeleteKanbanColumnEvent.fire();
            }
        });

        $A.enqueueAction(action);
    },
    deleteAllKanbanColumnCards: function(component) {
        let action = component.get("c.deleteAllKanbanColumnCards");
        action.setParams({
           "currentId": component.get("v.kanbanColumn").Id
        });
        action.setCallback(this, (response) => {
            let state = response.getState();
            if(state === "SUCCESS") {
                console.log("all cards deleted");
                component.set("v.kanbanCards", []);
            }
        });

        $A.enqueueAction(action);
    },
    copyKanbanColumn: function(component, event) {
        let newKanbanColumnBoardId = event.getParam("NewKanbanColumnBoardId");
        let kanbanColumn = component.get("v.kanbanColumn");
        kanbanColumn.KanbanBoard__c = newKanbanColumnBoardId;
        let action = component.get("c.copyKanbanColumn");
        action.setParams({
            "kanbanColumn": kanbanColumn
        });
        action.setCallback(this, (response) => {
            let state = response.getState();
            if(state === "SUCCESS") {
                console.log(response.getReturnValue());
                let onCopyKanbanColumnEvent = component.getEvent("OnCopyKanbanColumnEvent");
                onCopyKanbanColumnEvent.setParams({
                    "CopiedKanbanColumn": response.getReturnValue()
                });
                onCopyKanbanColumnEvent.fire();
            }
        });

        $A.enqueueAction(action);
    },
    appendCards: function(component, event) {
        let params = event.getParam("arguments");
        if(params) {
            let kanbanColumn = component.get("v.kanbanColumn");
            let kanbanCards = component.get("v.kanbanCards");
            if(params.kanbanCards[0].KanbanColumn__c === kanbanColumn.Id) {
                let updatedKanbanCards = kanbanCards.concat(params.kanbanCards);
                component.set("v.kanbanCards", updatedKanbanCards);
            }
        }
    }
})