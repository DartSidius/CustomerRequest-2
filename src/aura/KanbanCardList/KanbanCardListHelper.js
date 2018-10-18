/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */
({
    handleCreateNewCardEvent: function(component, event) {
        let action = component.get("c.createNewKanbanCard");
        let kanbanCard = event.getParam("KanbanCard");
        kanbanCard.KanbanColumn__c = component.get("v.kanbanColumnId");
        action.setParams({
            "kanbanCard": kanbanCard
        });
        action.setCallback(this, (response) => {
            let state = response.getState();
            if(state === "SUCCESS") {
                let kanbanCards = component.get("v.kanbanCardList");
                kanbanCards.push(response.getReturnValue());
                component.set("v.kanbanCardList", kanbanCards);
            }
        });

        $A.enqueueAction(action);
    },
    removeDeletedCardFromList: function(component, event) {
        let kanbanCards = component.get("v.kanbanCardList");
        let cardToDelete = event.getParam("DeletedKanbanCard");
        let cardIndex = kanbanCards.findIndex((element, index, array) => {
            return element.Id === cardToDelete.Id;
        });
        kanbanCards.splice(cardIndex, 1);
        component.set("v.kanbanCardList", kanbanCards);
    },
    removeCardFromCardList: function(component, event) {
        let movedKanbanCard = event.getParam("MovedKanbanCard")[0];
        let currentColumnId = component.get("v.kanbanColumnId");
        if(movedKanbanCard.KanbanColumn__c !== currentColumnId) {
            let kanbanCards = component.get("v.kanbanCardList");
            let cardIndex = kanbanCards.findIndex((element, index, array) => {
                return element.Id === movedKanbanCard.Id;
            });
            kanbanCards.splice(cardIndex, 1);
            component.set("v.kanbanCardList", kanbanCards);
        }
    }
})