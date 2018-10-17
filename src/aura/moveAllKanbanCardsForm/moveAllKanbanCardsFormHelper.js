/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */
({
    getCurrentBoardColumns: function(component, event) {
        component.set("v.kanbanColumns", event.getParam("KanbanColumns"));
    },
    moveAllCardsToOtherColumn: function(component) {
        let moveAllKanbanCardsEvent = component.getEvent("MoveAllKanbanCardsEvent")
        moveAllKanbanCardsEvent.setParams({
            "NewKanbanColumnId": component.find('selectColumn').get('v.value')
        });
        moveAllKanbanCardsEvent.fire();
        this.hideForm(component);
    },
    hideForm: function(component) {
        this.togglePopover(component.getSuper());
    }
})