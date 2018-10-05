/**
 * Created by Vladyslav Lyfar on 05.10.2018.
 */
({
    showCreateCardForm: function(component) {
        let isCreateCardFormOpened = component.get("v.isCreateCardFormOpened");
        isCreateCardFormOpened = !isCreateCardFormOpened;
        component.set("v.isCreateCardFormOpened", isCreateCardFormOpened);
    },
    createNewCard: function(component, event) {
        let createNewCardEvent = component.getEvent("CreateNewCardEvent");
        let newKanbanCard = component.get("v.newKanbanCard");

        createNewCardEvent.setParams({
            "KanbanCard": newKanbanCard
        });

        component.set("v.newKanbanCard", {'sobjectType': 'KanbanCard__c', 'Name': ''});
        createNewCardEvent.fire();
    }
})