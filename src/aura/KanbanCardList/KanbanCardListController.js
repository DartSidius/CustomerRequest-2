/**
 * Created by Vladyslav Lyfar on 05.10.2018.
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
    }
})