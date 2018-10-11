/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */
({
    createNewCard: function (component) {
        let createNewCardEvent = component.getEvent("CreateNewCardEvent");
        let newKanbanCard = component.get("v.newKanbanCard");

        createNewCardEvent.setParams({
            "KanbanCard": newKanbanCard
        });

        component.set("v.newKanbanCard", {'sobjectType': 'KanbanCard__c', 'Name': ''});
        createNewCardEvent.fire();
    },
    showCreateCardForm: function(component) {
        let isCreateCardFormOpened = component.get("v.isCreateCardFormOpened");
        isCreateCardFormOpened = !isCreateCardFormOpened;
        component.set("v.isCreateCardFormOpened", isCreateCardFormOpened);
    }
})