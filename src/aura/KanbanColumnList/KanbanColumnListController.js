/**
 * Created by Vladyslav Lyfar on 05.10.2018.
 */
({
    handleCreateNewColumnEvent: function(component, event, helper) {
        helper.handleCreateNewColumnEvent(component, event);
    },
    handleOnDeleteKanbanColumnEvent: function(component, event, helper) {
        helper.removeDeletedColumnFromList(component, event);
    },
    handleOnCopyKanbanColumnEvent: function(component, event, helper) {
        helper.insertNewColumnToList(component, event);
    },
    handleOnMoveKanbanColumnEvent: function(component, event, helper) {
        helper.moveColumnToOtherBoard(component, event);
    },
    handleOnMoveAllKanbanCardsEvent: function(component, event, helper) {
        let movedKanbanCards = event.getParam("KanbanCards");
        helper.appendCardsToColumn(component, movedKanbanCards);
    },
    handleOnCopyKanbanCardEvent: function(component, event, helper) {
        let copiedKanbanCard = event.getParam("CopiedKanbanCard");
        helper.appendCardsToColumn(component, copiedKanbanCard);
    },
    handleOnMoveKanbanCardEvent: function(component, event, helper) {
        let movedKanbanCard = event.getParam("MovedKanbanCard");
        helper.appendCardsToColumn(component, movedKanbanCard);
    },
    onColumnChange: function(component, event, helper) {
        helper.shareKanbanColumns(component);
    }
})