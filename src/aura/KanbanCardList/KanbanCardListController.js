/**
 * Created by Vladyslav Lyfar on 05.10.2018.
 */
({
    handleCreateNewCardEvent: function(component, event) {
        let kanbanCards = component.get("v.kanbanCardList");
        kanbanCards.push(event.getParam("KanbanCard"));
        component.set("v.kanbanCardList", kanbanCards);
    }
})